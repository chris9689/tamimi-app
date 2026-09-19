import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded, className, ...rest }: CardProps) {
  return (
    <div
      className={cn('rounded-xl2 bg-card shadow-card', padded && 'p-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
