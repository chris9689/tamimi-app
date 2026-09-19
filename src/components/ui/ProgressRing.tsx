import { cn } from '@/lib/utils';

interface ProgressRingProps {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  className?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  size = 108,
  stroke = 10,
  color = '#0F7A6C',
  trackColor = '#D7EFEA',
  className,
  label,
  sublabel,
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = c * (1 - clamped);
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      {(label || sublabel) && (
        <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label && <span className="font-heading text-lg font-extrabold text-ink">{label}</span>}
          {sublabel && <span className="text-[10px] font-medium uppercase tracking-wide text-muted">{sublabel}</span>}
        </span>
      )}
    </div>
  );
}
