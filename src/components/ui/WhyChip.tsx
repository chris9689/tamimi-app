import { useDemo } from '@/app/DemoContext';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface WhyChipProps {
  title: string;
  reasons: string[];
  label?: string;
  className?: string;
}

// A small "Why this?" pill that opens the reason popover.
export function WhyChip({ title, reasons, label = 'Why this?', className }: WhyChipProps) {
  const { openWhy } = useDemo();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openWhy(title, reasons);
      }}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-secondary/30 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary transition-colors hover:bg-secondary/20',
        className,
      )}
    >
      <Icon name="help" className="text-[12px]" />
      {label}
    </button>
  );
}
