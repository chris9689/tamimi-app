import { useDemo } from '@/app/DemoContext';
import { formatPoints } from '@/lib/utils';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Icon } from '@/components/ui/Icon';

export function HeaderBar() {
  const { persona, loyalty, cartCount, deliveryMode, toggleDeliveryMode, goToChapter } = useDemo();

  return (
    <header className="relative z-30 shrink-0 bg-card pt-11 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between px-4 pt-1">
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] font-semibold text-ink"
          onClick={toggleDeliveryMode}
        >
          <Icon name="location_on" filled className="text-[18px] text-primary" />
          <span className="max-w-[5.5rem] truncate">{persona.homeArea}</span>
          <Icon name="expand_more" className="text-[16px] text-muted" />
        </button>

        <BrandLogo />

        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-tertiary-container px-2 py-1 text-[11px] font-bold text-tertiary">
            <Icon name="loyalty" filled className="text-[13px]" />
            {formatPoints(loyalty.pointsBalance)}
          </span>
          <button
            type="button"
            aria-label="Cart"
            onClick={() => goToChapter('cart')}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-black/[0.05]"
          >
            <Icon name="shopping_cart" className="text-[22px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pb-2.5 pt-2.5">
        <button
          type="button"
          onClick={() => goToChapter('search')}
          className="flex w-full items-center gap-2 rounded-full border border-line bg-canvas/70 px-3.5 py-2.5 text-left text-[13px] text-muted"
        >
          <Icon name="search" className="text-[20px] text-primary" />
          Search groceries, brands, recipes…
          <Icon name="mic" className="ml-auto text-[18px] text-muted" />
        </button>
      </div>

      <button
        type="button"
        onClick={toggleDeliveryMode}
        className="flex w-full items-center justify-center gap-1.5 bg-primary py-1.5 text-[12px] font-semibold text-white"
      >
        <Icon name={deliveryMode === 'delivery' ? 'local_shipping' : 'storefront'} className="text-[16px]" />
        {deliveryMode === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
        <span className="opacity-70">· tap to switch</span>
      </button>
    </header>
  );
}
