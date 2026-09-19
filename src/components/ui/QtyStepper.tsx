import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface QtyStepperProps {
  qty: number;
  onInc: () => void;
  onDec: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

// Shows a round "+" when the item isn't in the basket yet, and a −/qty/+ stepper
// once it is (grocery baskets are multi-unit).
export function QtyStepper({ qty, onInc, onDec, size = 'md', className }: QtyStepperProps) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const icon = size === 'sm' ? 'text-[18px]' : 'text-[20px]';

  if (qty <= 0) {
    return (
      <button
        type="button"
        aria-label="Add to cart"
        onClick={(e) => {
          e.stopPropagation();
          onInc();
        }}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform active:scale-90 hover:bg-primary-dark',
          dim,
          className,
        )}
      >
        <Icon name="add" className={icon} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-primary text-white shadow-sm',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDec}
        className={cn('inline-flex items-center justify-center rounded-full transition-transform active:scale-90', dim)}
      >
        <Icon name={qty === 1 ? 'delete' : 'remove'} className={icon} />
      </button>
      <span className="min-w-[1.25rem] text-center font-heading text-sm font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onInc}
        className={cn('inline-flex items-center justify-center rounded-full transition-transform active:scale-90', dim)}
      >
        <Icon name="add" className={icon} />
      </button>
    </div>
  );
}
