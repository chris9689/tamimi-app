import { Fragment, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { RankedProduct } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { youMightAlsoLike } from '@/services/decisionEngine';
import { staggerContainer } from '@/animations/variants';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { ProductCard } from './ProductCard';

interface ProductRowProps {
  items: RankedProduct[];
  showRank?: boolean;
  replayKey?: string | number;
  className?: string;
}

// Horizontal scrolling "shelf" of product cards.
export function ProductRow({ items, showRank, replayKey, className }: ProductRowProps) {
  return (
    <motion.div
      key={replayKey}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={cn('hide-h-scroll flex gap-3 overflow-x-auto pb-1', className)}
    >
      {items.map((r, i) => (
        <ProductCard
          key={r.product.id}
          product={r.product}
          rank={showRank ? i + 1 : undefined}
          variant="shelf"
        />
      ))}
    </motion.div>
  );
}

interface ProductGridProps {
  items: RankedProduct[];
  showRank?: boolean;
  replayKey?: string | number;
  className?: string;
  /** Show an inline "You might also like" shelf under a product after it's added. */
  inlineRecs?: boolean;
}

// Two-column grid. `layout` on each card animates the reshuffle when order changes.
export function ProductGrid({ items, showRank, replayKey, className, inlineRecs }: ProductGridProps) {
  const { persona } = useDemo();
  const [addedId, setAddedId] = useState<string | null>(null);

  const recs = useMemo(
    () => (addedId ? youMightAlsoLike(addedId, persona, items.map((r) => r.product.id)).slice(0, 10) : []),
    [addedId, persona, items],
  );

  const addedIdx = addedId ? items.findIndex((r) => r.product.id === addedId) : -1;
  // Insert the shelf just above the 2-col row that holds the added product.
  const insertBefore = addedIdx >= 0 ? Math.floor(addedIdx / 2) * 2 : -1;

  return (
    <motion.div
      key={replayKey}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={cn('grid grid-cols-2 gap-3', className)}
    >
      {items.map((r, i) => (
        <Fragment key={r.product.id}>
          {inlineRecs && i === insertBefore && recs.length > 0 && (
            <InlineRecShelf recs={recs} onClose={() => setAddedId(null)} />
          )}
          <ProductCard
            product={r.product}
            rank={showRank ? i + 1 : undefined}
            variant="grid"
            onAdd={inlineRecs ? (p) => setAddedId(p.id) : undefined}
          />
        </Fragment>
      ))}
    </motion.div>
  );
}

// Full-width "You might also like" shelf inserted into the grid after an add.
function InlineRecShelf({ recs, onClose }: { recs: RankedProduct[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="col-span-2 -mx-4 border-y border-tertiary/20 bg-tertiary-container px-4 py-3"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-heading text-[14px] font-extrabold text-ink">
          <Icon name="add_shopping_cart" filled className="text-[16px] text-tertiary" />
          You might also like
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-black/[0.06]"
        >
          <Icon name="close" className="text-[16px]" />
        </button>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="hide-h-scroll -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1"
      >
        {recs.map((r) => (
          <ProductCard key={r.product.id} product={r.product} variant="shelf" className="snap-start" />
        ))}
      </motion.div>
    </motion.div>
  );
}
