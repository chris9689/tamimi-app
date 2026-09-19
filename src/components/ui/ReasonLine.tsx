import { cn } from '@/lib/utils';

interface ReasonLineProps {
  reason: string;
  className?: string;
}

// A subtle, seamless line explaining why a block was shown — normal muted color.
export function ReasonLine({ reason, className }: ReasonLineProps) {
  return <span className={cn('text-[11px] leading-snug text-muted', className)}>{reason}</span>;
}
