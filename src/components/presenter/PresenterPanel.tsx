import { useDemo } from '@/app/DemoContext';
import { chapterByKey } from '@/app/chapters';
import { explainScreen } from '@/services/decisionEngine';
import { productMap } from '@/mock-data/products';
import { personas } from '@/mock-data/users';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { PoweredByMastercard } from '@/components/ui/PoweredByMastercard';

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <span className="relative block h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
      <span
        className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
        style={{ width: `${Math.round(Math.min(1, value) * 100)}%`, background: color }}
      />
    </span>
  );
}

export function PresenterPanel() {
  const { persona, personaId, setPersona, chapter, pinnedIds, replayDecision, resetDemo, togglePresenter } = useDemo();
  const pinnedNames = pinnedIds.map((id) => productMap[id]?.name).filter(Boolean) as string[];
  const x = explainScreen(chapter, persona, pinnedNames);
  const screenTitle = chapterByKey[chapter]?.title ?? chapter;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-canvas shadow-frame ring-1 ring-black/[0.04]">
      <div className="flex items-center justify-between gap-2 bg-ink px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Icon name="insights" filled className="text-[22px] text-secondary" />
          <div>
            <p className="font-heading text-sm font-extrabold leading-tight">Why shown now</p>
            <p className="text-[11px] text-white/70">Presenter mode · {screenTitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={togglePresenter}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
          aria-label="Close presenter"
        >
          <Icon name="close" className="text-[20px]" />
        </button>
      </div>

      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        <div className="rounded-xl2 bg-white p-3 shadow-card">
          <p className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="group" className="text-[14px]" /> Switch shopper
          </p>
          <div className="grid gap-1.5">
            {personas.map((p) => {
              const active = p.id === personaId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersona(p.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border p-2 text-left transition-colors',
                    active ? 'border-primary bg-primary/[0.04]' : 'border-line hover:bg-black/[0.02]',
                  )}
                >
                  <Avatar initials={p.avatarInitials} accent={p.accent} size={34} ring={active} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold text-ink">{p.name}</span>
                    <span className="block truncate text-[11px] text-muted">{p.tagline}</span>
                  </span>
                  {active && <Icon name="check_circle" filled className="text-[18px] text-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-[13px] font-semibold text-ink">{x.headline}</p>

        <section>
          <h4 className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="sensors" className="text-[14px]" /> Signals in play
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {x.signals.map((s) => (
              <span key={s} className="rounded-full bg-secondary/10 px-2 py-1 text-[11px] font-medium text-secondary">
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h4 className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="tune" className="text-[14px]" /> Ranking factors (for this shopper)
          </h4>
          <ul className="space-y-2">
            {x.factors.map((f) => (
              <li key={f.label} className="grid grid-cols-[9rem_1fr_2.2rem] items-center gap-2">
                <span className="text-[11px] text-ink">{f.label}</span>
                <Bar value={f.contribution} color="#FF671B" />
                <span className="text-right text-[10px] font-semibold text-muted">
                  w{Math.round(f.weight * 100)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="verified_user" className="text-[14px]" /> Guardrails
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {x.guardrails.map((g) => (
              <span
                key={g.label}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium',
                  g.passed ? 'bg-success/15 text-success' : 'bg-primary/10 text-primary',
                )}
              >
                <Icon name={g.passed ? 'check_circle' : 'cancel'} filled className="text-[13px]" />
                {g.label}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl2 bg-white p-3 shadow-card">
          <h4 className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="handyman" className="text-[14px]" /> Merchandiser controls
          </h4>
          <p className="text-[12px] text-ink">{x.strategy}</p>
          <ul className="mt-2 space-y-1">
            {x.rules.map((r) => (
              <li key={r} className="flex items-center gap-1.5 text-[11px] text-muted">
                <Icon name="rule" className="text-[13px] text-tertiary" />
                {r}
              </li>
            ))}
          </ul>
          {pinnedNames.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-ink">Pinned:</span>
              {pinnedNames.map((n) => (
                <span key={n} className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">
                  <Icon name="push_pin" filled className="text-[11px]" />
                  {n}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 rounded-lg bg-canvas px-2 py-1.5 text-[10px] text-muted">
            Machine ranks · humans set strategy, rules &amp; pins. Nothing is a black box.
          </p>
        </section>

        <section className="rounded-xl2 bg-white p-3 shadow-card">
          <h4 className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted">
            <Icon name="science" className="text-[14px]" /> A/B test · {x.abTest.audience}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className={cn('rounded-xl border p-2', x.abTest.winner === 'A' ? 'border-success bg-success/5' : 'border-line')}>
              <p className="text-[10px] font-bold uppercase text-muted">Version A</p>
              <p className="text-[11px] leading-tight text-ink">{x.abTest.versionA}</p>
              <p className={cn('mt-1 font-heading text-sm font-extrabold', x.abTest.liftA >= 0 ? 'text-success' : 'text-primary')}>
                {x.abTest.liftA >= 0 ? '+' : ''}{x.abTest.liftA}%
              </p>
            </div>
            <div className={cn('rounded-xl border p-2', x.abTest.winner === 'B' ? 'border-success bg-success/5' : 'border-line')}>
              <p className="text-[10px] font-bold uppercase text-muted">Version B</p>
              <p className="text-[11px] leading-tight text-ink">{x.abTest.versionB}</p>
              <p className={cn('mt-1 font-heading text-sm font-extrabold', x.abTest.liftB >= 0 ? 'text-success' : 'text-primary')}>
                {x.abTest.liftB >= 0 ? '+' : ''}{x.abTest.liftB}%
              </p>
            </div>
          </div>
          <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-success">
            <Icon name="emoji_events" filled className="text-[14px]" />
            Version {x.abTest.winner} wins → scales to everyone
          </p>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" icon="restart_alt" onClick={resetDemo}>
            Reset
          </Button>
          <Button variant="dark" icon="replay" onClick={replayDecision}>
            Replay
          </Button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <PoweredByMastercard />
        </div>
      </div>
    </div>
  );
}
