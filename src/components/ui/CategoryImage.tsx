import { useState } from 'react';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryImageProps {
  category: Category;
  className?: string;
  emojiClass?: string;
}

// Renders the category's real image when present, falling back to the emoji tile
// so the department rail still shows something if an image fails to load.
export function CategoryImage({ category, className, emojiClass }: CategoryImageProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(category.image) && !failed;
  return (
    <span className={cn('flex items-center justify-center overflow-hidden', className)}>
      {showImg ? (
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className={cn('leading-none', emojiClass ?? 'text-3xl')}>{category.emoji}</span>
      )}
    </span>
  );
}
