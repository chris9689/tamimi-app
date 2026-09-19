import { useMemo } from 'react';
import type { CategoryId } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { categories } from '@/mock-data/categories';
import { CategoryImage } from '@/components/ui/CategoryImage';

// Scrollable category rail, ordered by the current shopper's category affinity.
export function CategoryRail() {
  const { persona, setCategoryId, goToChapter } = useDemo();
  const ordered = useMemo(() => {
    const aff = persona.affinity.categoryAffinity;
    return [...categories].sort((a, b) => (aff[b.id as CategoryId] ?? 0) - (aff[a.id as CategoryId] ?? 0));
  }, [persona]);
  return (
    <div className="hide-h-scroll -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
      {ordered.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => {
            setCategoryId(c.id as CategoryId);
            goToChapter('category');
          }}
          className="flex w-16 shrink-0 flex-col items-center gap-1.5"
        >
          <CategoryImage
            category={c}
            emojiClass="text-3xl"
            className="h-16 w-16 rounded-2xl bg-white p-2 shadow-card ring-1 ring-black/[0.03]"
          />
          <span className="text-center text-[10px] font-medium leading-tight text-ink">{c.name.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
}
