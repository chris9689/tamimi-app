import { useMemo, useState } from 'react';
import { useDemo } from '@/app/DemoContext';
import { occasions, occasionMap } from '@/mock-data/occasions';
import { productMap } from '@/mock-data/products';
import { rankProducts } from '@/services/decisionEngine';
import { Icon } from '@/components/ui/Icon';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import { ReasonLine } from '@/components/ui/ReasonLine';
import { ProductGrid } from '@/components/product/ProductGrid';

export function OccasionScreen() {
  const { persona, personaId, occasionQuery, activeOccasionId, buildOccasion, addToCart, openWhy } = useDemo();
  const [q, setQ] = useState(occasionQuery);
  const occ = occasionMap[activeOccasionId] ?? occasions[0];

  const items = useMemo(
    () => rankProducts(occ.itemIds.map((id) => productMap[id]).filter(Boolean), persona),
    [persona, occ],
  );

  const addAll = () => items.forEach((r) => addToCart(r.product));

  return (
    <div className="px-4 py-4 pb-8">
      <h1 className="font-heading text-xl font-extrabold text-ink">Own every season</h1>
      <p className="mb-3 text-[12px] text-muted">Describe an occasion in plain words — it assembles and ranks itself for you.</p>

      <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 shadow-card">
        <Icon name="auto_awesome" filled className="text-[20px] text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && buildOccasion(q)}
          placeholder="e.g. Everything for back-to-school"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
        />
        <Button size="sm" onClick={() => buildOccasion(q)}>Build</Button>
      </div>

      <div className="hide-h-scroll -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
        {occasions.map((o) => (
          <Chip key={o.id} active={o.id === activeOccasionId} onClick={() => buildOccasion(o.prompt)}>
            <span>{o.emoji}</span>
            {o.title}
          </Chip>
        ))}
      </div>

      {/* Resolved collection */}
      <div
        className="mt-4 overflow-hidden rounded-xl3 p-4 text-white shadow-float"
        style={{ background: 'linear-gradient(135deg,#0F7A6C,#0b5f54)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-3xl">{occ.emoji}</span>
          <div>
            <p className="font-heading text-lg font-extrabold leading-tight">{occ.title}</p>
            <p className="text-[11px] text-white/85">{occ.blurb}</p>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1 rounded-lg bg-white/15 px-2 py-1.5 text-[11px]">
          <Icon name="auto_awesome" filled className="text-[13px]" />
          {occ.perPersonaNote[personaId]}
        </p>
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[15px] font-extrabold text-ink">{items.length} items, ranked for you</h2>
          <button
            type="button"
            onClick={() =>
              openWhy(occ.title, [
                'We assembled the occasion checklist',
                'Then ranked it by your affinity',
                occ.perPersonaNote[personaId],
              ])
            }
            className="mt-0.5 block text-left"
          >
            <ReasonLine reason="Collection ranked for you" className="decoration-dotted underline-offset-2 hover:underline" />
          </button>
        </div>
        <Button size="sm" variant="primary" icon="add_shopping_cart" onClick={addAll}>
          Add all
        </Button>
      </div>

      <ProductGrid items={items} showRank />
    </div>
  );
}
