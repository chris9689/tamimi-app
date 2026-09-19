import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  title?: string;
}

export function Icon({ name, className, filled, title }: IconProps) {
  return (
    <span
      aria-hidden={title ? undefined : true}
      title={title}
      className={cn('material-symbols-outlined select-none', filled && 'filled', className)}
    >
      {name}
    </span>
  );
}
