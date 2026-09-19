import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'deal' | 'foryou' | 'themari' | 'muted' | 'low' | 'out' | 'success' | 'pinned';

const tones: Record<Tone, string> = {
  deal: 'bg-primary text-white',
  foryou: 'bg-ink text-white',
  themari: 'bg-tertiary text-white',
  muted: 'bg-black/[0.06] text-muted',
  low: 'bg-warning/15 text-warning',
  out: 'bg-black/[0.06] text-muted',
  success: 'bg-success/15 text-success',
  pinned: 'bg-ink text-white',
};

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'muted', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-heading font-bold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
