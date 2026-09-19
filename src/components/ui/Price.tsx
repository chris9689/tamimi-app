import { cn, formatMoney } from '@/lib/utils';

interface RiyalIconProps {
  className?: string;
  size?: number;
}

// Official-style Saudi Riyal symbol; inherits text color via currentColor.
export function RiyalIcon({ className, size = 14 }: RiyalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block shrink-0', className)}
      aria-hidden
    >
      <g clipPath="url(#clip0_riyal)">
        <path
          d="M13.0695 20.7923C12.6948 21.6232 12.4471 22.5249 12.3522 23.4706L20.2824 21.7848C20.6572 20.9541 20.9047 20.0521 20.9998 19.1065L13.0695 20.7923Z"
          fill="currentColor"
        />
        <path
          d="M20.2824 16.7344C20.6571 15.9037 20.9049 15.0017 20.9998 14.0561L14.8223 15.3699V12.8443L20.2822 11.684C20.657 10.8533 20.9047 9.95134 20.9996 9.00571L14.8222 10.3184V1.23537C13.8756 1.76684 13.0349 2.47429 12.3516 3.30877V10.8437L9.88104 11.3689V0C8.93448 0.531286 8.09384 1.23892 7.41049 2.0734V11.8938L1.88261 13.0684C1.50787 13.8992 1.25997 14.8011 1.16489 15.7467L7.41049 14.4194V17.6001L0.717104 19.0224C0.342364 19.8532 0.0946551 20.7551 -0.000244141 21.7007L7.00586 20.2118C7.57619 20.0932 8.06638 19.756 8.38507 19.292L9.66995 17.3871V17.3867C9.80333 17.1896 9.88104 16.952 9.88104 16.6961V13.8943L12.3516 13.3692V18.4205L20.2822 16.734L20.2824 16.7344Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_riyal">
          <rect width="21" height="23.4706" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface PriceProps {
  value: number;
  className?: string;
  iconSize?: number;
  strike?: boolean;
}

export function Price({ value, className, iconSize = 13, strike }: PriceProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5 tabular-nums', strike && 'line-through', className)}>
      <RiyalIcon size={iconSize} className="translate-y-[0.5px] opacity-90" />
      {formatMoney(value)}
    </span>
  );
}
