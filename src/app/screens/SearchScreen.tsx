import { useMemo, useState } from 'react';
import { useDemo } from '@/app/DemoContext';
import { smartSearch } from '@/services/decisionEngine';
import { Icon } from '@/components/ui/Icon';
import { Chip } from '@/components/ui/Chip';
import { ReasonLine } from '@/components/ui/ReasonLine';
import { ProductGrid } from '@/components/product/ProductGrid';

const suggestions = [
  'healthy breakfast',
  'back-to-school snacks',
  'something for guests',
  'cheap family dinner',
  'fresh',
  'حليب',
];

export function SearchScreen() {
  const { persona, searchQuery, setSearchQuery, openWhy } = useDemo();
  const [q, setQ] = useState(searchQuery);

  const { results, expanded } = useMemo(() => smartSearch(searchQuery, persona), [searchQuery, persona]);
  const run = (val: string) => {
    setQ(val);
    setSearchQuery(val);
  };

  return (
    <div className="px-4 py-4 pb-8">
      <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 shadow-card">
        <Icon name="search" className="text-[22px] text-primary" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(q)}
          placeholder="Search groceries — try meaning, not just words"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
        />
        {q && (
          <button type="button" onClick={() => run('')} aria-label="Clear">
            <Icon name="close" className="text-[20px] text-muted" />
          </button>
        )}
      </div>

      <p className="mt-2 flex items-center gap-1 text-[11px] text-muted">
        <Icon name="translate" className="text-[13px] text-muted" />
        Understands meaning — even in Arabic. Try <span className="font-semibold text-ink">حليب</span> (milk).
      </p>

      {/* suggestions */}
      <div className="mt-3">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">Try</p>
        <div className="hide-h-scroll -mx-4 flex gap-2 overflow-x-auto px-4">
          {suggestions.map((s) => (
            <Chip key={s} active={searchQuery === s} tone="foryou" onClick={() => run(s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>

      {searchQuery && (
        <div className="mt-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-[15px] font-extrabold text-ink">
              {results.length} results for “{searchQuery}”
            </h2>
            <button
              type="button"
              onClick={() =>
                openWhy(`Search: “${searchQuery}”`, [
                  'Query expanded to meaning, not just keywords',
                  'Results ranked by your affinity',
                  expanded.length ? `Understood as: ${expanded.join(', ')}` : 'Direct keyword match',
                ])
              }
              className="text-left"
            >
              <ReasonLine reason="Ranked for you" className="decoration-dotted underline-offset-2 hover:underline" />
            </button>
          </div>

          {expanded.length > 0 && (
            <p className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
              <Icon name="lightbulb" filled className="text-[13px] text-muted" />
              Understood as:
              {expanded.map((e) => (
                <span key={e} className="rounded-full bg-black/[0.05] px-2 py-0.5 font-semibold text-ink">
                  {e}
                </span>
              ))}
            </p>
          )}

          {results.length > 0 ? (
            <ProductGrid items={results} showRank inlineRecs />
          ) : (
            <div className="rounded-xl2 bg-white p-6 text-center shadow-card">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-[13px] font-semibold text-ink">No exact match</p>
              <p className="text-[12px] text-muted">Try one of the suggestions above.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
