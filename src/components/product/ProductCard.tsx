import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { discountPct } from '@/mock-data/products';
import { cn, formatPoints } from '@/lib/utils';
import { cardEntrance } from '@/animations/variants';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';
import { QtyStepper } from '@/components/ui/QtyStepper';
import { Icon } from '@/components/ui/Icon';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'shelf';
  className?: string;
  rank?: number;
  onAdd?: (product: Product) => void;
}

export function ProductCard({
  product,
  variant = 'grid',
  className,
  rank,
  onAdd,
}: ProductCardProps) {
  const { cart, addToCart, setQty, openProduct, openMadeForYou } = useDemo();
  const qty = cart.find((i) => i.product.id === product.id)?.qty ?? 0;
  const pct = discountPct(product);
  const oos = product.stockState === 'out';

  return (
    <motion.div
      layout
      variants={cardEntrance}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl2 bg-card shadow-card ring-1 ring-black/[0.03] transition-shadow hover:shadow-float',
        variant === 'shelf' && 'w-[9.5rem] shrink-0',
        className,
      )}
      onClick={() => openProduct(product.id)}
    >
      <div className="relative">
        <ProductImage
          product={product}
          className={cn('h-28 w-full', oos && 'opacity-40 grayscale')}
          emojiClass="text-[2.75rem]"
        />

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {pct !== null && <Badge tone="deal">{product.offerLabel ?? `${pct}% OFF`}</Badge>}
        </div>

        {typeof rank === 'number' && (
          <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 font-heading text-xs font-bold text-ink shadow-sm">
            {rank}
          </span>
        )}

        {product.stockState === 'low' && !oos && (
          <span className="absolute bottom-2 left-2">
            <Badge tone="low">Low stock</Badge>
          </span>
        )}

        {!oos ? (
          <div className="absolute bottom-2 right-2">
            <QtyStepper
              qty={qty}
              size="sm"
              onInc={() => {
                if (qty <= 0) {
                  addToCart(product);
                  onAdd?.(product);
                } else {
                  setQty(product.id, qty + 1);
                }
              }}
              onDec={() => setQty(product.id, qty - 1)}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openMadeForYou(product.id);
            }}
            className="absolute inset-x-2 bottom-2 inline-flex items-center justify-center gap-1 rounded-full bg-ink px-2 py-1.5 text-[11px] font-bold text-white"
          >
            <Icon name="swap_horiz" className="text-[14px]" /> See swap
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{product.brand}</p>
        <p className="mt-0.5 line-clamp-2 text-[13px] font-medium leading-snug text-ink">{product.name}</p>
        <p className="mt-0.5 text-[11px] text-muted">{product.sizeLabel}</p>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <Price value={product.priceSAR} className="font-heading text-[15px] font-extrabold text-ink" />
          {product.wasPriceSAR && (
            <Price value={product.wasPriceSAR} strike iconSize={11} className="text-[11px] text-muted" />
          )}
        </div>
        <p className="mt-0.5 text-[10px] font-semibold text-tertiary">
          +{formatPoints(product.priceSAR * product.pointsRate)} Themari pts
        </p>
      </div>
    </motion.div>
  );
}
