import { cn } from '@/lib/utils';

interface AvatarProps {
  initials: string;
  accent?: string;
  size?: number;
  className?: string;
  ring?: boolean;
}

export function Avatar({ initials, accent = '#E4002B', size = 40, className, ring }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-heading font-bold text-white',
        ring && 'ring-2 ring-white',
        className,
      )}
      style={{ background: accent, width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}
