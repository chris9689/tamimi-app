import { useDemo } from '@/app/DemoContext';
import { Icon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';

// Left-side panel: the reasoning behind a specific personalized element the
// shopper clicked (e.g. the "For You" heading or a product's reason line).
export function WhyPanel() {
  const { whyState, persona, closeWhy } = useDemo();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-canvas shadow-frame ring-1 ring-black/[0.04]">
      <div className="flex items-center justify-between gap-2 bg-ink px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Icon name="auto_awesome" filled className="text-[20px]" />
          <div>
            <p className="font-heading text-sm font-extrabold leading-tight">Why you're seeing this</p>
            <p className="text-[11px] text-white/70">Personalization reasoning</p>
          </div>
        </div>
        <button
          type="button"
          onClick={closeWhy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
          aria-label="Close"
        >
          <Icon name="close" className="text-[20px]" />
        </button>
      </div>

      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-ink">{whyState.title}</p>
          <ul className="space-y-2">
            {whyState.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-[13px] text-ink shadow-card">
                <Icon name="check_circle" filled className="mt-0.5 text-[16px] text-tertiary" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Attribute-based intent / affinity profile for this shopper */}
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="insights" filled className="text-[14px] text-secondary" />
            Shopper intent profile
          </p>
          <div className="space-y-2.5 rounded-xl bg-white p-3 shadow-card">
            {persona.intents.map((it) => (
              <div key={it.label}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-ink">{it.label}</span>
                  <span className="text-[10px] font-bold text-muted">{Math.round(it.strength * 100)}%</span>
                </div>
                <p className="text-[10.5px] leading-snug text-muted">{it.detail}</p>
                <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                  <span className="block h-full rounded-full bg-secondary" style={{ width: `${Math.round(it.strength * 100)}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fictional recent purchase history for this shopper */}
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="receipt_long" filled className="text-[14px] text-primary" />
            Recent purchase history
          </p>
          <div className="space-y-2">
            {persona.transactions.map((t, i) => (
              <div key={i} className="rounded-xl bg-white p-2.5 shadow-card">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-ink">{t.summary}</span>
                  <Price value={t.total} iconSize={11} className="font-heading text-[12px] font-extrabold text-ink" />
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">{t.itemsPreview}</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-muted">
                  <Icon name="schedule" className="text-[11px]" />
                  {t.when}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
