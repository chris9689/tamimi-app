import type {
  AbTestResult,
  CategoryId,
  ChapterKey,
  DecisionExplanation,
  Guardrail,
  Offer,
  Persona,
  Product,
  RankFactor,
  RankedProduct,
  SortMode,
} from '@/types';
import { categoryMap } from '@/mock-data/categories';
import { productMap, shoppableProducts } from '@/mock-data/products';
import { pairsWith, categoryPairs } from '@/mock-data/recommendations';

// Deterministic, pure scoring. No randomness, no service calls — so presenter
// mode always explains a stable decision. All logic is illustrative.

const WEIGHTS = {
  popularity: 0.18,
  category: 0.28,
  brand: 0.16,
  preference: 0.2,
  seasonal: 0.1,
  deal: 0.08,
};

interface TagContribution {
  value: number;
  topTag?: string;
}

function tagContribution(product: Product, persona: Persona): TagContribution {
  let best = 0;
  let topTag: string | undefined;
  for (const t of product.tags) {
    const a = persona.affinity.tagAffinity[t] ?? 0;
    if (a > best) {
      best = a;
      topTag = t;
    }
  }
  return { value: best, topTag };
}

function seasonalContribution(product: Product, persona: Persona): number {
  if (persona.heroFlags.backToSchool && product.tags.includes('back-to-school')) return 1;
  if (persona.heroFlags.entertains && product.tags.includes('entertaining')) return 0.9;
  if (persona.heroFlags.healthConscious && (product.tags.includes('organic') || product.tags.includes('healthy'))) return 0.8;
  return 0.15;
}

function buildReasons(product: Product, persona: Persona, ctx: TagContribution): string[] {
  const reasons: string[] = [];
  const cat = categoryMap[product.category];
  const catAff = persona.affinity.categoryAffinity[product.category] ?? 0;
  const brandAff = persona.affinity.brandAffinity[product.brand] ?? 0;

  if (persona.heroFlags.backToSchool && product.tags.includes('back-to-school')) {
    reasons.push('You shop this before school starts');
  } else if (persona.heroFlags.entertains && product.tags.includes('entertaining')) {
    reasons.push('Great for your weekend hosting');
  }

  if (product.intentSignal && persona.heroFlags.reordersWeekly && product.tags.includes('staple')) {
    reasons.push(product.intentSignal);
  }

  if (catAff >= 0.7) reasons.push(`Because you shop ${cat.name.toLowerCase()} weekly`);
  else if (catAff >= 0.45) reasons.push(`You buy ${cat.name.toLowerCase()} regularly`);

  if (brandAff >= 0.7) reasons.push(`You often choose ${product.brand}`);

  if (ctx.value >= 0.6) {
    switch (ctx.topTag) {
      case 'organic':
        reasons.push('Matches your organic picks');
        break;
      case 'healthy':
        reasons.push('A healthier choice you prefer');
        break;
      case 'family-pack':
        reasons.push('Sized for your family basket');
        break;
      case 'premium':
        reasons.push('A premium pick for you');
        break;
      case 'entertaining':
        reasons.push('Perfect for entertaining');
        break;
      default:
        break;
    }
  }

  if (product.wasPriceSAR && persona.affinity.priceSensitivity >= 0.6) {
    reasons.push('On offer — and you love a deal');
  }

  const unique = [...new Set(reasons)];
  return unique.length ? unique.slice(0, 2) : ['Popular with shoppers like you'];
}

export function scoreProduct(product: Product, persona: Persona, pinnedIds: string[] = []): RankedProduct {
  const catAff = persona.affinity.categoryAffinity[product.category] ?? 0.1;
  const brandAff = persona.affinity.brandAffinity[product.brand] ?? 0.1;
  const tagCtx = tagContribution(product, persona);
  const seasonal = seasonalContribution(product, persona);
  const deal = product.wasPriceSAR ? persona.affinity.priceSensitivity : 0.1;
  const pop = product.baseScore / 100;

  const factors: RankFactor[] = [
    { label: 'Popularity', weight: WEIGHTS.popularity, contribution: pop },
    { label: 'Category affinity', weight: WEIGHTS.category, contribution: catAff },
    { label: 'Brand affinity', weight: WEIGHTS.brand, contribution: brandAff },
    { label: 'Preference match', weight: WEIGHTS.preference, contribution: tagCtx.value },
    { label: 'Seasonal fit', weight: WEIGHTS.seasonal, contribution: seasonal },
    { label: 'Deal × price sensitivity', weight: WEIGHTS.deal, contribution: deal },
  ];

  let score = factors.reduce((s, f) => s + f.weight * f.contribution, 0) * 100;
  const pinned = pinnedIds.includes(product.id);
  if (pinned) score = 105;

  return {
    product,
    score: Math.min(105, Math.round(score * 10) / 10),
    reasons: buildReasons(product, persona, tagCtx),
    factors,
    pinned,
  };
}

interface RankOptions {
  sortMode?: SortMode;
  pinnedIds?: string[];
  inStockOnly?: boolean;
}

export function rankProducts(list: Product[], persona: Persona, opts: RankOptions = {}): RankedProduct[] {
  const pinnedIds = opts.pinnedIds ?? [];
  let pool = list;
  if (opts.inStockOnly) pool = pool.filter((p) => p.stockState !== 'out');
  const ranked = pool.map((p) => scoreProduct(p, persona, pinnedIds));

  if (opts.sortMode === 'popularity') {
    return [...ranked].sort(
      (a, b) => b.product.baseScore - a.product.baseScore || a.product.name.localeCompare(b.product.name),
    );
  }
  return [...ranked].sort(
    (a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name),
  );
}

// ---- Offers ----

function offerScore(offer: Offer, persona: Persona): number {
  let s = (offer.baseScore / 100) * 0.3;
  if (offer.category) s += (persona.affinity.categoryAffinity[offer.category] ?? 0) * 0.4;
  if (offer.brand) s += (persona.affinity.brandAffinity[offer.brand] ?? 0) * 0.15;
  if (offer.tags) {
    let best = 0;
    for (const t of offer.tags) best = Math.max(best, persona.affinity.tagAffinity[t] ?? 0);
    s += best * 0.25;
  }
  if (offer.themariLinked) s += 0.05;
  return s;
}

export function rankOffers(list: Offer[], persona: Persona): Offer[] {
  return [...list]
    .map((o) => ({ o, s: offerScore(o, persona) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.o);
}

// ---- "Completes the basket" / "You might also like" (product-level rec graph) ----

// Caps items per category so a shelf isn't dominated by one aisle; tops up if short.
export function diversify(ranked: RankedProduct[], count: number, capPerCategory = 2): RankedProduct[] {
  const picked: RankedProduct[] = [];
  const overflow: RankedProduct[] = [];
  const perCat = new Map<string, number>();
  for (const r of ranked) {
    const n = perCat.get(r.product.category) ?? 0;
    if (n < capPerCategory) {
      picked.push(r);
      perCat.set(r.product.category, n + 1);
    } else {
      overflow.push(r);
    }
  }
  return [...picked, ...overflow].slice(0, count);
}

// Complements for one or more anchor products: curated pairings take priority,
// then a category-level fallback fills the rest, both ranked for the shopper.
function complementsFor(anchorIds: string[], persona: Persona, excludeIds: string[] = []): RankedProduct[] {
  const skip = new Set([...anchorIds, ...excludeIds]);
  const anchors = anchorIds.map((id) => productMap[id]).filter(Boolean) as Product[];

  const curatedIds = new Set<string>();
  anchors.forEach((a) => (pairsWith[a.id] ?? []).forEach((id) => curatedIds.add(id)));
  const curated = rankProducts(
    [...curatedIds].filter((id) => !skip.has(id)).map((id) => productMap[id]).filter(Boolean) as Product[],
    persona,
    { inStockOnly: true },
  );

  const seen = new Set([...skip, ...curated.map((r) => r.product.id)]);
  const cats = new Set<CategoryId>();
  anchors.forEach((a) => (categoryPairs[a.category] ?? []).forEach((c) => cats.add(c)));
  const fallback = rankProducts(
    shoppableProducts.filter((p) => cats.has(p.category) && !seen.has(p.id)),
    persona,
    { inStockOnly: true },
  );

  return [...curated, ...fallback];
}

export function completeBasket(cartIds: string[], persona: Persona, excludeIds: string[] = []): RankedProduct[] {
  return diversify(complementsFor(cartIds, persona, excludeIds), 6, 2);
}

// "You might also like" for a listing add — product complements first, then
// same-aisle alternatives, skipping anything already on screen.
export function youMightAlsoLike(
  productId: string,
  persona: Persona,
  excludeIds: string[] = [],
): RankedProduct[] {
  const product = productMap[productId];
  if (!product) return [];
  const complements = diversify(complementsFor([productId], persona, excludeIds), 8, 2);
  const seen = new Set([productId, ...excludeIds, ...complements.map((r) => r.product.id)]);
  const sameCat = rankProducts(
    shoppableProducts.filter((p) => p.category === product.category && !seen.has(p.id)),
    persona,
    { inStockOnly: true },
  );
  return [...complements, ...sameCat].slice(0, 10);
}

// ---- Smarter search (semantic-ish + personal ranking) ----

const synonyms: Record<string, string[]> = {
  healthy: ['organic', 'healthy', 'fresh'],
  health: ['organic', 'healthy', 'fresh'],
  breakfast: ['cornflakes', 'milk', 'eggs', 'bread', 'juice', 'yogurt'],
  cheap: ['value'],
  budget: ['value'],
  offer: ['value'],
  deal: ['value'],
  kids: ['kids', 'back-to-school'],
  school: ['back-to-school', 'kids'],
  lunchbox: ['back-to-school', 'kids'],
  host: ['entertaining', 'premium'],
  party: ['entertaining'],
  guests: ['entertaining', 'premium'],
  fresh: ['fresh', 'organic'],
  fish: ['seafood'],
  milk: ['dairy'],
  bread: ['bakery'],
  // A few Arabic terms — semantic search works in any language.
  'حليب': ['dairy'],
  'خبز': ['bakery'],
  'لحم': ['meat'],
  'فواكه': ['fruits-veg'],
  'عرض': ['value'],
};

export interface SearchResult {
  results: RankedProduct[];
  expanded: string[];
}

export function smartSearch(query: string, persona: Persona): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { results: [], expanded: [] };
  const terms = q.split(/\s+/);
  const expanded = new Set<string>();
  terms.forEach((t) => (synonyms[t] ?? []).forEach((s) => expanded.add(s)));

  const matches = shoppableProducts.filter((p) => {
    const hay = [p.name, p.brand, categoryMap[p.category].name, ...p.tags].join(' ').toLowerCase();
    const direct = terms.some((t) => hay.includes(t));
    const sem = [...expanded].some(
      (e) => (p.tags as string[]).includes(e) || p.category === e || hay.includes(e),
    );
    return direct || sem;
  });

  return { results: rankProducts(matches, persona, { inStockOnly: true }), expanded: [...expanded] };
}

// ---- Presenter "why shown now" ----

function maxCategory(persona: Persona): string {
  let best = 0;
  let id: CategoryId | undefined;
  for (const [k, v] of Object.entries(persona.affinity.categoryAffinity)) {
    if ((v ?? 0) > best) {
      best = v ?? 0;
      id = k as CategoryId;
    }
  }
  return id ? categoryMap[id].name : '—';
}

function maxBrand(persona: Persona): string {
  let best = 0;
  let name = '—';
  for (const [k, v] of Object.entries(persona.affinity.brandAffinity)) {
    if (v > best) {
      best = v;
      name = k;
    }
  }
  return name;
}

function maxOf(record: Record<string, number> | Partial<Record<string, number>>): number {
  return Math.max(0, ...Object.values(record).map((v) => v ?? 0));
}

const abByScreen: Record<ChapterKey, AbTestResult> = {
  home: { versionA: 'Personalised "For You" hero', liftA: 12, versionB: 'Single promo banner', liftB: -2, winner: 'A', audience: '10% of app traffic' },
  category: { versionA: 'Sorted for you', liftA: 9, versionB: 'Sorted by popularity', liftB: 1, winner: 'A', audience: '8% of aisle views' },
  product: { versionA: 'Affinity + completes-basket rows', liftA: 11, versionB: 'Generic "bought together"', liftB: 0, winner: 'A', audience: '9% of product views' },
  search: { versionA: 'Semantic + personal ranking', liftA: 15, versionB: 'Keyword match only', liftB: -3, winner: 'A', audience: '12% of searches' },
  occasion: { versionA: 'Ranked occasion collection', liftA: 14, versionB: 'Static occasion list', liftB: 2, winner: 'A', audience: '7% of shoppers' },
  offers: { versionA: 'Offers ranked per shopper', liftA: 12, versionB: 'Same offers for everyone', liftB: -1, winner: 'A', audience: '9% of offer views' },
  cart: { versionA: 'Reorder usuals + complete basket', liftA: 18, versionB: 'Empty cart', liftB: 0, winner: 'A', audience: '11% of carts' },
  loyalty: { versionA: 'Rewards from own history', liftA: 13, versionB: 'Generic rewards', liftB: -1, winner: 'A', audience: '10% of members' },
  madeforyou: { versionA: 'Personal "Made for you" return', liftA: 10, versionB: 'Standard 404 / empty state', liftB: -4, winner: 'A', audience: '6% of dead-ends' },
};

const strategyByScreen: Record<ChapterKey, { headline: string; strategy: string; rules: string[] }> = {
  home: {
    headline: 'Homepage led by this shopper',
    strategy: "Lead with the shopper's top aisles and predicted needs — not one identical homepage.",
    rules: ['In-stock items only', 'Respect pinned seasonal products', 'One deal per row', 'Intent boosts relevant tags'],
  },
  category: {
    headline: 'Aisle re-ranked for how they shop',
    strategy: 'Re-rank the aisle by this shopper’s affinity, blended with store popularity.',
    rules: ['Keep pinned products in position', 'In-stock first', 'Blend popularity + affinity'],
  },
  product: {
    headline: 'What they love + what completes the basket',
    strategy: 'Two rows: led by the shopper, then completed by real baskets.',
    rules: ['Affinity-led first row', 'Co-purchase second row', 'Swap if out of stock'],
  },
  search: {
    headline: 'Search that understands, then personalises',
    strategy: 'Understand meaning with synonyms, then rank per shopper.',
    rules: ['Expand query semantically', 'Personal affinity breaks ties', 'In-stock first'],
  },
  occasion: {
    headline: 'The season, assembled and ranked',
    strategy: 'Assemble the occasion checklist, then rank it for this shopper.',
    rules: ['Cover the occasion checklist', 'Rank by affinity', 'Swap out-of-stock items'],
  },
  offers: {
    headline: 'Offers ranked for them',
    strategy: 'Rank offers by the aisles and brands this shopper actually buys.',
    rules: ['Themari-linked boosted', 'Affinity-led ordering', 'One per category'],
  },
  cart: {
    headline: 'A cart that finishes the weekly shop',
    strategy: 'Reorder your usuals item by item, then complete with real co-purchases.',
    rules: ['Reorder from history, per item', 'Complete with co-purchases', 'Swap out-of-stock'],
  },
  loyalty: {
    headline: 'Themari made for them',
    strategy: 'Offer rewards on what they actually buy, from their own history.',
    rules: ['Rewards from own history', 'Points on top aisles', 'Themari rules apply'],
  },
  madeforyou: {
    headline: 'Never a dead end',
    strategy: 'Turn an out-of-stock or empty result into a personal return page.',
    rules: ['Same size/price swaps', 'Affinity-led picks', 'In-stock only'],
  },
};

export function explainScreen(
  screen: ChapterKey,
  persona: Persona,
  pinnedNames: string[] = [],
): DecisionExplanation {
  const meta = strategyByScreen[screen];
  const signals = [
    `Top aisle: ${maxCategory(persona)}`,
    `Preferred brand: ${maxBrand(persona)}`,
    `Basket rhythm: ${persona.affinity.basketRhythm}`,
    ...persona.affinity.predictiveSignals,
  ];

  const seasonal = persona.heroFlags.backToSchool
    ? 1
    : persona.heroFlags.entertains
      ? 0.9
      : persona.heroFlags.healthConscious
        ? 0.8
        : 0.3;

  const factors: RankFactor[] = [
    { label: 'Category affinity', weight: WEIGHTS.category, contribution: maxOf(persona.affinity.categoryAffinity) },
    { label: 'Preference match', weight: WEIGHTS.preference, contribution: maxOf(persona.affinity.tagAffinity) },
    { label: 'Brand affinity', weight: WEIGHTS.brand, contribution: maxOf(persona.affinity.brandAffinity) },
    { label: 'Popularity', weight: WEIGHTS.popularity, contribution: 0.6 },
    { label: 'Seasonal fit', weight: WEIGHTS.seasonal, contribution: seasonal },
    { label: 'Deal × price sensitivity', weight: WEIGHTS.deal, contribution: persona.affinity.priceSensitivity },
  ];

  const guardrails: Guardrail[] = [
    { label: 'In-stock only', passed: true },
    { label: 'Margin protected', passed: true },
    { label: 'Brand safety', passed: true },
    { label: 'Pinned products respected', passed: true },
  ];

  return {
    screen,
    headline: meta.headline,
    signals,
    factors,
    guardrails,
    strategy: meta.strategy,
    rules: meta.rules,
    pinned: pinnedNames,
    abTest: abByScreen[screen],
  };
}
