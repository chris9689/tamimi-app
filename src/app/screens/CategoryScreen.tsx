import { useMemo, useState } from 'react';
import type { CategoryId, ProductTag } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { shoppableProducts, discountPct } from '@/mock-data/products';
import { categories, categoryMap } from '@/mock-data/categories';
import { rankProducts } from '@/services/decisionEngine';
import { cn } from '@/lib/utils';
import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { CategoryImage } from '@/components/ui/CategoryImage';
import { ReasonLine } from '@/components/ui/ReasonLine';
import { ProductGrid } from '@/components/product/ProductGrid';

type Filter = 'all' | 'offers' | 'organic' | 'family-pack';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'offers', label: 'On offer' },
  { id: 'organic', label: 'Organic' },
  { id: 'family-pack', label: 'Family packs' },
];

export function CategoryScreen() {
  const { persona, categoryId, setCategoryId, sortMode, toggleSort, pinnedIds, openWhy } = useDemo();
  const [filter, setFilter] = useState<Filter>('all');
  const cat = categoryMap[categoryId];

  // Order the category selector by this shopper's affinity, matching the Home rail.
  const orderedCategories = useMemo(() => {
    const aff = persona.affinity.categoryAffinity;
    return [...categories].sort(
      (a, b) => (aff[b.id as CategoryId] ?? 0) - (aff[a.id as CategoryId] ?? 0),
    );
  }, [persona]);

  const items = useMemo(() => {
    let pool = shoppableProducts.filter((p) => p.category === categoryId);
    if (filter === 'offers') pool = pool.filter((p) => discountPct(p) !== null);
    else if (filter !== 'all') pool = pool.filter((p) => p.tags.includes(filter as ProductTag));
    return rankProducts(pool, persona, { sortMode, pinnedIds, inStockOnly: true });
  }, [persona, categoryId, sortMode, filter, pinnedIds]);

  return (
    <div className="px-4 py-4 pb-8">
      {/* category selector */}
      <div className="hide-h-scroll -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
        {orderedCategories.map((c) => (
          <Chip key={c.id} active={c.id === categoryId} onClick={() => setCategoryId(c.id as CategoryId)}>
            <span>{c.emoji}</span>
            {c.name.split(' ')[0]}
          </Chip>
        ))}
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div>
          <h1 className="font-heading text-xl font-extrabold text-ink">{cat.name}</h1>
          <p className="text-[12px] text-muted">{cat.tagline}</p>
        </div>
        <CategoryImage category={cat} emojiClass="text-2xl" className="h-11 w-11 shrink-0" />
      </div>

      {/* Sorted-by-popularity ↔ Sorted-for-you toggle */}
      <div className="mb-2 rounded-xl2 bg-white p-1.5 shadow-card">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => sortMode !== 'popularity' && toggleSort()}
            className={cn(
              'flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-[12px] font-bold transition-colors',
              sortMode === 'popularity' ? 'bg-ink text-white' : 'text-muted hover:bg-black/[0.03]',
            )}
          >
            <Icon name="trending_up" className="text-[16px]" /> By popularity
          </button>
          <button
            type="button"
            onClick={() => sortMode !== 'foryou' && toggleSort()}
            className={cn(
              'flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-[12px] font-bold transition-colors',
              sortMode === 'foryou' ? 'bg-ink text-white' : 'text-muted hover:bg-black/[0.03]',
            )}
          >
            <Icon name="auto_awesome" filled className="text-[16px]" /> Sorted for you
          </button>
        </div>
      </div>
      <div className="mb-3 flex items-center gap-2">
        {sortMode === 'foryou' ? (
          <button
            type="button"
            onClick={() =>
              openWhy(`${cat.name} — sorted for you`, [
                'Same items, re-ranked by your affinity',
                `Your ${cat.name} & brand preferences move relevant items up`,
                'Toggle back to popularity to compare.',
              ])
            }
            className="text-left"
          >
            <ReasonLine reason="Same aisle, re-ranked for how you shop" className="decoration-dotted underline-offset-2 hover:underline" />
          </button>
        ) : (
          <p className="flex items-center gap-1 text-[11px] font-medium text-muted">
            <Icon name="groups" className="text-[13px]" /> Standard store popularity — the same for everyone
          </p>
        )}
      </div>

      {/* filters */}
      <div className="hide-h-scroll -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
        {filters.map((f) => (
          <Chip key={f.id} active={filter === f.id} tone="foryou" onClick={() => setFilter(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>

      <ProductGrid items={items} inlineRecs />
    </div>
  );
}
