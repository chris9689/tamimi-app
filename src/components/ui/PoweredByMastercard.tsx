import { cn } from '@/lib/utils';

interface PoweredByMastercardProps {
  className?: string;
  label?: string;
}

// Discreet, contextually-appropriate Mastercard mark (recreated symbol — do not
// alter). Used because this is a Mastercard × Tamimi personalization demo.
export function PoweredByMastercard({
  className,
  label = 'Powered by Mastercard',
}: PoweredByMastercardProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-medium text-muted', className)}>
      <span className="relative inline-block h-4 w-[26px]" aria-hidden>
        <span className="absolute left-0 top-0 h-4 w-4 rounded-full" style={{ background: '#EB001B' }} />
        <span
          className="absolute right-0 top-0 h-4 w-4 rounded-full mix-blend-multiply"
          style={{ background: '#F79E1B' }}
        />
      </span>
      {label}
    </span>
  );
}
