import { useDemo } from '@/app/DemoContext';
import { navChapters } from '@/app/chapters';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function BottomNav() {
  const { chapter, goToChapter, cartCount } = useDemo();

  return (
    <nav className="relative z-30 shrink-0 border-t border-line bg-card/95 backdrop-blur">
      <ul className="flex items-stretch justify-around px-1 pb-1.5 pt-1.5">
        {navChapters.map((c) => {
          const active = chapter === c.key;
          return (
            <li key={c.key} className="flex-1">
              <button
                type="button"
                onClick={() => goToChapter(c.key)}
                className={cn(
                  'flex w-full flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold transition-colors',
                  active ? 'text-primary' : 'text-muted hover:text-ink',
                )}
              >
                <span className="relative">
                  <Icon name={c.icon} filled={active} className="text-[24px]" />
                  {c.key === 'cart' && cartCount > 0 && (
                    <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </span>
                {c.navLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
