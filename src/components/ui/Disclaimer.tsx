import { cn } from '@/lib/utils';

interface DisclaimerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Disclaimer({ children, className }: DisclaimerProps) {
  return (
    <p className={cn('text-[10px] leading-snug text-muted', className)}>
      {children ?? 'Illustrative data. Subject to Themari programme rules.'}
    </p>
  );
}
