// Shared domain types for the Tamimi Markets personalization prototype.
// All data is mock/illustrative. Currency is SAR. Themari earns 2 points / 1 SAR.

export type CategoryId =
  | 'fruits-veg'
  | 'dairy'
  | 'bakery'
  | 'meat'
  | 'poultry'
  | 'seafood'
  | 'pantry'
  | 'beverages'
  | 'snacks'
  | 'frozen'
  | 'household'
  | 'baby';

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  tagline: string;
  image?: string; // optional real image; UI falls back to emoji on error
}

export type StockState = 'in' | 'low' | 'out';

export type ProductTag =
  | 'fresh'
  | 'organic'
  | 'family-pack'
  | 'premium'
  | 'value'
  | 'back-to-school'
  | 'local'
  | 'imported'
  | 'staple'
  | 'entertaining'
  | 'kids'
  | 'healthy';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  sizeLabel: string;
  priceSAR: number;
  wasPriceSAR?: number;
  /** Overrides the "% OFF" deal badge text (e.g. "Weekly offer"). */
  offerLabel?: string;
  pointsRate: number; // Themari points earned per 1 SAR
  emoji: string;
  image?: string; // optional real URL; UI falls back to emoji on error
  rating?: number;
  ratingCount?: number;
  stockState: StockState;
  origin?: string;
  tags: ProductTag[];
  /** Baseline popularity 0..100 — drives "Sorted by popularity". */
  baseScore: number;
  /** When out of stock, the product to offer as a same-size/price swap. */
  swapForId?: string;
  /** A short predictive note the engine may surface (e.g. "You reorder weekly"). */
  intentSignal?: string;
}

export interface AffinityProfile {
  categoryAffinity: Partial<Record<CategoryId, number>>; // 0..1
  brandAffinity: Record<string, number>; // 0..1
  tagAffinity: Partial<Record<ProductTag, number>>; // 0..1
  priceSensitivity: number; // 0..1 (1 = chases deals)
  basketRhythm: 'weekly' | 'fortnightly';
  predictiveSignals: string[];
}

export interface PersonaHeroFlags {
  bigWeekendBasket?: boolean;
  backToSchool?: boolean;
  healthConscious?: boolean;
  entertains?: boolean;
  reordersWeekly?: boolean;
}

/** A fictional past order, shown in the "why you're seeing this" panel. */
export interface PersonaTxn {
  when: string; // "2 days ago", "Last Saturday"
  summary: string; // "Big weekend family shop"
  itemsPreview: string; // "Milk, eggs, chicken, rice +6 more"
  total: number; // SAR
}

/** An attribute-derived shopping intent, shown as the affinity profile. */
export interface PersonaIntent {
  label: string; // "Family stock-up"
  detail: string; // "Family-packs & staples on a weekly rhythm"
  strength: number; // 0..1
}

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  homeArea: string;
  segmentLabel: string; // "families in Al Khobar"
  avatarInitials: string;
  accent: string; // hex for avatar background
  loyaltyRank: string;
  pointsBalance: number;
  affinity: AffinityProfile;
  heroFlags: PersonaHeroFlags;
  /** Product ids that make up "last week's shop" for the cart rebuild. */
  lastWeekItemIds: string[];
  /** Fictional recent orders shown in the "why" panel. */
  transactions: PersonaTxn[];
  /** Attribute-based shopper intents shown in the "why" affinity profile. */
  intents: PersonaIntent[];
}

export type OfferKind = 'themari' | 'category' | 'basket' | 'personal';

export interface Offer {
  id: string;
  kind: OfferKind;
  title: string;
  subtitle: string;
  valueLabel: string;
  emoji: string;
  imageId?: string; // representative photo-backed product for the card image
  category?: CategoryId;
  brand?: string;
  tags?: ProductTag[];
  baseScore: number;
  themariLinked: boolean;
  disclaimer?: string;
}

export interface ThemariReward {
  id: string;
  title: string;
  subtitle: string;
  pointsCost?: number;
  emoji: string;
  fromHistory?: boolean;
}

export interface LoyaltyStatus {
  rank: string;
  pointsBalance: number;
  nextRewardAt: number;
  monthlyActivityPct: number;
  benefits: string[];
  rewards: ThemariReward[];
}

export interface Occasion {
  id: string;
  prompt: string;
  title: string;
  emoji: string;
  blurb: string;
  itemIds: string[];
  keywords: string[];
  perPersonaNote: Record<string, string>;
}

export interface SocialProofShelf {
  id: string;
  label: string;
  emoji: string;
  segment: string;
  itemIds: string[];
}

export interface Channel {
  id: string;
  label: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export type ChapterKey =
  | 'home'
  | 'category'
  | 'product'
  | 'search'
  | 'occasion'
  | 'offers'
  | 'cart'
  | 'loyalty'
  | 'madeforyou';

export interface Chapter {
  id: number;
  key: ChapterKey;
  title: string;
  navLabel: string;
  copy: string;
  icon: string;
  showInNav: boolean;
}

export type SortMode = 'popularity' | 'foryou';

// ---- Decision engine outputs ----

export interface RankFactor {
  label: string;
  weight: number; // 0..1 relative importance
  contribution: number; // 0..1 this product's realized value
}

export interface Guardrail {
  label: string;
  passed: boolean;
}

export interface RankedProduct {
  product: Product;
  score: number; // 0..100
  reasons: string[];
  factors: RankFactor[];
  pinned: boolean;
}

export interface AbTestResult {
  versionA: string;
  liftA: number;
  versionB: string;
  liftB: number;
  winner: 'A' | 'B';
  audience: string;
}

export interface DecisionExplanation {
  screen: string;
  headline: string;
  signals: string[];
  factors: RankFactor[];
  guardrails: Guardrail[];
  strategy: string;
  rules: string[];
  pinned: string[];
  abTest: AbTestResult;
}
