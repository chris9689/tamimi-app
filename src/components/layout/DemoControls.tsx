import { useDemo } from '@/app/DemoContext';
import { PoweredByMastercard } from '@/components/ui/PoweredByMastercard';
import { Icon } from '@/components/ui/Icon';

export function DemoControls() {
  const { togglePresenter } = useDemo();
  return (
    <div className="mb-5 flex flex-col items-center gap-1.5 text-center">
      <p className="font-heading text-xl font-extrabold tracking-tight text-ink">Tamimi Markets × Mastercard</p>
      <PoweredByMastercard label="Personalization demo · Powered by Mastercard" />
      <button
        type="button"
        onClick={togglePresenter}
        className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
      >
        <Icon name="tune" className="text-[13px]" />
        Press <kbd className="rounded bg-black/10 px-1 text-[10px] text-ink">P</kbd> for controls &amp; shopper switch
      </button>
    </div>
  );
}
