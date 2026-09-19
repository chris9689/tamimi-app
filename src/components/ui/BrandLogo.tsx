import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
}

// Real Tamimi Markets wordmark from /public/tamimi-logo.svg.
export function BrandLogo({ className }: BrandLogoProps) {
  return <img src="/tamimi-logo.svg" alt="Tamimi Markets" className={cn('h-[26px] w-auto', className)} />;
}
