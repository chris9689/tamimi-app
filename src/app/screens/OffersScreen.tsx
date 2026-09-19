import { useMemo } from 'react';
import { useDemo } from '@/app/DemoContext';
import { offers } from '@/mock-data/offers';
import { shoppableProducts, discountPct } from '@/mock-data/products';
import { rankOffers, rankProducts } from '@/services/decisionEngine';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ReasonLine } from '@/components/ui/ReasonLine';
import { OfferCard } from '@/components/offers/OfferCard';
import { ProductRow } from '@/components/product/ProductGrid';

export function OffersScreen() {
  const { persona, openWhy } = useDemo();
  const ranked = useMemo(() => rankOffers(offers, persona), [persona]);
  const deals = useMemo(
    () => rankProducts(shoppableProducts.filter((p) => discountPct(p) !== null), persona, { inStockOnly: true }).slice(0, 10),
    [persona],
  );

  return (
    <div className="px-4 py-4 pb-8">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h1 className="font-heading text-xl font-extrabold text-ink">Offers for you</h1>
          <button
            type="button"
            onClick={() =>
              openWhy('Offers ranked for you', [
                'Offers re-rank by your category & brand affinity',
                'Themari-linked offers are boosted',
                'Switch shopper to see the order change.',
              ])
            }
            className="mt-0.5 block text-left"
          >
            <ReasonLine reason="Ranked by the aisles & brands you buy" className="decoration-dotted underline-offset-2 hover:underline" />
          </button>
        </div>
        <span className="text-2xl">🏷️</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ranked.map((o) => (
          <OfferCard key={o.id} offer={o} variant="block" />
        ))}
      </div>

      <section className="mt-6">
        <SectionHeader
          title="Best deals for you"
          emoji="🔥"
          social="Trending with shoppers near you"
        />
        <ProductRow items={deals} />
      </section>

    </div>
  );
}
