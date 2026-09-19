import type { Offer } from '@/types';
import { productMap } from '@/mock-data/products';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { ProductImage } from '@/components/ui/ProductImage';

interface OfferCardProps {
  offer: Offer;
  variant?: 'shelf' | 'block';
  className?: string;
}

export function OfferCard({ offer, variant = 'shelf', className }: OfferCardProps) {
  const imgProduct = offer.imageId ? productMap[offer.imageId] : undefined;

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl2 bg-white p-3 shadow-card ring-1 ring-black/[0.03]',
        variant === 'shelf' && 'w-[13.5rem] shrink-0',
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {imgProduct ? (
          <ProductImage product={imgProduct} className="h-12 w-12 shrink-0 rounded-lg" emojiClass="text-2xl" />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-canvas text-2xl">
            {offer.emoji}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[12px] font-bold leading-tight text-ink">{offer.title}</p>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{offer.subtitle}</p>
        </div>
      </div>

      {/* Value label on its own row so long copy never cramps the pill */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={cn(
            'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 font-heading text-[11px] font-bold',
            offer.themariLinked ? 'bg-tertiary text-white' : 'bg-primary/10 text-primary',
          )}
        >
          {offer.valueLabel}
        </span>
        {offer.themariLinked && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-tertiary">
            <Icon name="loyalty" filled className="text-[12px]" /> Themari-linked
          </span>
        )}
      </div>
    </div>
  );
}
