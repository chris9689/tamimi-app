import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'foryou';
}

export function Chip({ active, onClick, children, className, tone = 'default' }: ChipProps) {
  const activeClass =
    tone === 'foryou'
      ? 'bg-ink text-white border-ink'
      : 'bg-ink text-white border-ink';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
        active ? activeClass : 'border-line bg-white text-ink hover:bg-black/[0.03]',
        className,
      )}
    >
      {children}
    </button>
  );
}
