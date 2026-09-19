import { useMemo } from 'react';
import type { CategoryId, Product } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { shoppableProducts, productMap } from '@/mock-data/products';
import { categoryMap } from '@/mock-data/categories';
import { offers } from '@/mock-data/offers';
import { campaignByPersona } from '@/mock-data/campaigns';
import { rankProducts, rankOffers, diversify } from '@/services/decisionEngine';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';
import { ProductGrid, ProductRow } from '@/components/product/ProductGrid';
import { OfferCard } from '@/components/offers/OfferCard';
import { CategoryRail } from '@/components/category/CategoryRail';

export function HomeScreen() {
  const { persona, goToChapter, buildOccasion } = useDemo();

  const topCatId = useMemo(
    () =>
      (Object.entries(persona.affinity.categoryAffinity).sort(
        (a, b) => (b[1] ?? 0) - (a[1] ?? 0),
      )[0]?.[0] ?? 'fruits-veg') as CategoryId,
    [persona],
  );

  const forYou = useMemo(
    () => diversify(rankProducts(shoppableProducts, persona, { inStockOnly: true }), 8, 2),
    [persona],
  );
  const recentlyBought = useMemo(() => {
    const items = persona.lastWeekItemIds.map((id) => productMap[id]).filter(Boolean) as Product[];
    // inStockOnly:false so an out-of-stock usual can surface its same-size swap here.
    return rankProducts(items, persona, { inStockOnly: false }).slice(0, 8);
  }, [persona]);
  const rankedOffers = useMemo(() => rankOffers(offers, persona).slice(0, 6), [persona]);

  const campaign = campaignByPersona[persona.id] ?? campaignByPersona.fatima;
  const topCat = categoryMap[topCatId];

  return (
    <div className="space-y-6 px-4 py-4 pb-8">
      {/* Persona-specific campaign hero */}
      <button
        type="button"
        onClick={() => buildOccasion(campaign.prompt)}
        className={cn(
          'relative block w-full overflow-hidden rounded-xl3 bg-gradient-to-br p-4 text-left text-white shadow-float',
          campaign.gradient,
        )}
      >
        <p className="text-[11px] font-bold uppercase tracking-wide text-white/80">{campaign.eyebrow}</p>
        <p className="mt-1 max-w-[16rem] font-heading text-lg font-extrabold leading-tight">{campaign.title}</p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-ink">
          Build my list <Icon name="arrow_forward" className="text-[15px]" />
        </span>
      </button>

      <div>
        <SectionHeader title="Shop by category" />
        <CategoryRail />
      </div>

      {/* For You — reorders per persona */}
      <section>
        <SectionHeader
          title="For You"
          emoji="✨"
          social="Most added by shoppers like you this week"
          whyTitle="Your personalised homepage"
          whyReasons={[
            `Leads with your top aisles: ${topCat.name}`,
            ...persona.affinity.predictiveSignals,
          ]}
        />
        <ProductGrid items={forYou} />
      </section>

      {/* Offers ranked per persona */}
      <section>
        <SectionHeader
          title="Offers picked for you"
          emoji="🏷️"
          reason="Ranked by the aisles you actually buy"
          whyTitle="Offers picked for you"
          whyReasons={['Offers re-rank by your category & brand affinity', 'Themari-linked offers are boosted']}
          onSeeAll={() => goToChapter('offers')}
        />
        <div className="hide-h-scroll flex gap-3 overflow-x-auto pb-1">
          {rankedOffers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      {/* Recently bought — reorder your usuals (an out-of-stock usual shows its swap) */}
      <section>
        <SectionHeader
          title="Recently bought"
          emoji="🔁"
          social="Straight from your recent shops"
          whyTitle="Recently bought"
          whyReasons={['Built from your recent purchase history', 'An out-of-stock usual suggests a same-size, same-price swap']}
          onSeeAll={() => goToChapter('cart')}
        />
        <ProductRow items={recentlyBought} />
      </section>

    </div>
  );
}
