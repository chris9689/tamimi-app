import { useState } from 'react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  product: Product;
  className?: string;
  emojiClass?: string;
}

// Attempts a real image URL when present, always falling back to the emoji tile
// so the app renders even if an image fails to load.
export function ProductImage({ product, className, emojiClass }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(product.image) && !failed;
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-white',
        className,
      )}
    >
      {showImg ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className={cn('leading-none', emojiClass ?? 'text-5xl')}>{product.emoji}</span>
      )}
    </div>
  );
}
