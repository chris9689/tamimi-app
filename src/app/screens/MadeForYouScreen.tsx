import { useMemo } from 'react';
import { useDemo } from '@/app/DemoContext';
import { productMap, shoppableProducts } from '@/mock-data/products';
import { rankProducts, diversify } from '@/services/decisionEngine';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';

export function MadeForYouScreen() {
  const { persona, madeForSource, addToCart, goToChapter } = useDemo();
  const source = madeForSource ? productMap[madeForSource] : undefined;
  const swap = source?.swapForId ? productMap[source.swapForId] : undefined;

  const picks = useMemo(
    () =>
      diversify(
        rankProducts(
          shoppableProducts.filter(
            (p) => p.stockState !== 'out' && p.id !== madeForSource && p.id !== source?.swapForId,
          ),
          persona,
          { inStockOnly: true },
        ),
        8,
        2,
      ),
    [persona, madeForSource, source],
  );

  return (
    <div className="px-4 py-4 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => goToChapter('home')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card"
          aria-label="Back"
        >
          <Icon name="arrow_back" className="text-[22px]" />
        </button>
        <h1 className="font-heading text-xl font-extrabold text-ink">Made for you</h1>
      </div>
      <p className="mb-4 flex items-center gap-1 text-[12px] text-muted">
        <Icon name="auto_awesome" filled className="text-[14px] text-muted" /> Never a dead end — a personal page just for you.
      </p>

      {source && (
        <div className="mb-4 rounded-xl2 border border-line bg-white p-3 shadow-card">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <Icon name="production_quantity_limits" className="text-[18px] text-primary" />
            {source.brand} {source.name} is out of stock
          </p>
          {swap ? (
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-tertiary-container/60 p-2.5">
              <ProductImage product={swap} className="h-14 w-14 rounded-lg" emojiClass="text-2xl" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-tertiary">Same size &amp; price swap</p>
                <p className="truncate text-[13px] font-bold text-ink">{swap.brand} {swap.name}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted">{swap.sizeLabel} · <Price value={swap.priceSAR} iconSize={11} className="font-semibold" /></p>
              </div>
              <Button size="sm" onClick={() => addToCart(swap)}>Add swap</Button>
            </div>
          ) : (
            <p className="mt-1 text-[12px] text-muted">Here's a personal selection instead.</p>
          )}
        </div>
      )}

      <SectionHeader
        title="Picked for you"
        emoji="✨"
        social="Loved by shoppers with baskets like yours"
        whyTitle="Made for you"
        whyReasons={['Affinity-led picks, all in stock', 'Turns a dead-end into a personal return page', 'In-stock only guardrail applied']}
      />
      <ProductGrid items={picks} />

    </div>
  );
}
