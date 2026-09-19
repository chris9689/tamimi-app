import { useMemo } from 'react';
import { useDemo } from '@/app/DemoContext';
import { offers } from '@/mock-data/offers';
import { rankOffers } from '@/services/decisionEngine';
import { formatPoints } from '@/lib/utils';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Icon } from '@/components/ui/Icon';
import { RiyalIcon } from '@/components/ui/Price';
import { ReasonLine } from '@/components/ui/ReasonLine';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { OfferCard } from '@/components/offers/OfferCard';

export function LoyaltyScreen() {
  const { persona, loyalty, openWhy } = useDemo();
  const themariOffers = useMemo(
    () => rankOffers(offers.filter((o) => o.themariLinked), persona),
    [persona],
  );
  const progress = loyalty.pointsBalance / loyalty.nextRewardAt;

  return (
    <div className="px-4 py-4 pb-8">
      {/* Themari card */}
      <div className="overflow-hidden rounded-xl3 bg-gradient-to-br from-tertiary to-[#0b5f54] p-4 text-white shadow-float">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white/80">
              <Icon name="loyalty" filled className="text-[14px]" /> Themari
            </p>
            <p className="font-heading text-lg font-extrabold">{loyalty.rank}</p>
          </div>
          <ProgressRing
            value={progress}
            size={92}
            stroke={9}
            color="#ffffff"
            trackColor="rgba(255,255,255,0.25)"
            label={formatPoints(loyalty.pointsBalance)}
            sublabel="points"
          />
        </div>
        <p className="mt-2 flex items-center gap-1 text-[11px] text-white/85">
          {formatPoints(loyalty.nextRewardAt - loyalty.pointsBalance)} points to your next reward · earns 2 pts / 1
          <RiyalIcon size={11} className="translate-y-[1px]" />
        </p>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={() =>
            openWhy('Themari made for you', [
              'Rewards are built from what you actually buy',
              'Points boosts land on your top aisles',
              'Your existing Themari programme stays as-is',
            ])
          }
          className="block text-left"
        >
          <ReasonLine reason="Rewards from your own history" className="decoration-dotted underline-offset-2 hover:underline" />
        </button>
      </div>

      {/* Rewards from history */}
      <section className="mt-4">
        <SectionHeader title="Rewards for you" emoji="🎁" />
        <div className="space-y-2.5">
          {loyalty.rewards.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-xl2 bg-white p-3 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tertiary-container text-2xl">{r.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-ink">{r.title}</p>
                <p className="text-[11px] text-muted">{r.subtitle}</p>
              </div>
              {r.fromHistory && (
                <span className="shrink-0 rounded-full bg-tertiary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-tertiary">
                  From your history
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Personalised Themari offers */}
      <section className="mt-6">
        <SectionHeader title="Themari offers on what you buy" emoji="⭐" reason="Personalised to your aisles" />
        <div className="hide-h-scroll flex gap-3 overflow-x-auto pb-1">
          {themariOffers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-6 rounded-xl2 bg-white p-4 shadow-card">
        <p className="mb-2 font-heading text-[14px] font-extrabold text-ink">Your Themari benefits</p>
        <ul className="grid grid-cols-1 gap-2">
          {loyalty.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[12px] text-ink">
              <Icon name="check_circle" filled className="text-[16px] text-tertiary" />
              {b}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
