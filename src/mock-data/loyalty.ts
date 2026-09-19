import type { LoyaltyStatus, Persona, ThemariReward } from '@/types';

// Themari status is derived per persona so the loyalty screen shows offers on
// what they actually buy plus rewards from their own history. Illustrative only.

const rewardsByPersona: Record<string, ThemariReward[]> = {
  fatima: [
    { id: 'r-basket-20', title: 'SAR 20 off your weekly basket', subtitle: 'Because you shop every week', pointsCost: 2000, emoji: '🛒', fromHistory: true },
    { id: 'r-free-labneh', title: 'Free Greek Yoghurt 1KG', subtitle: 'A staple in your basket', pointsCost: 900, emoji: '🥛', fromHistory: true },
    { id: 'r-2x-dairy', title: '2× points on Dairy this week', subtitle: 'Your most-bought aisle', emoji: '⭐' },
  ],
  noura: [
    { id: 'r-fresh-15', title: 'SAR 15 off fresh produce', subtitle: 'Because you top up fresh weekly', pointsCost: 1500, emoji: '🥬', fromHistory: true },
    { id: 'r-free-yogurt', title: 'Free Almarai Greek Yogurt', subtitle: 'A repeat buy for you', pointsCost: 800, emoji: '🍦', fromHistory: true },
    { id: 'r-3x-organic', title: '3× points on Organic', subtitle: 'Matches your picks', emoji: '⭐' },
  ],
  khalid: [
    { id: 'r-meat-50', title: 'SAR 50 off premium meat', subtitle: 'For your weekend hosting', pointsCost: 3000, emoji: '🥩', fromHistory: true },
    { id: 'r-free-dates', title: 'Free Tamimi Sukkary Dates 1KG', subtitle: 'You buy these for guests', pointsCost: 1200, emoji: '🌴', fromHistory: true },
    { id: 'r-2x-entertain', title: '2× points on entertaining', subtitle: 'Your hosting essentials', emoji: '⭐' },
  ],
};

const activityByPersona: Record<string, number> = { fatima: 82, noura: 64, khalid: 91 };

const benefits = [
  'Earn 2 points per 1 SAR spent',
  'Member-only weekly offers',
  'Real-time points tracking',
  'Birthday & seasonal rewards',
];

export function buildLoyalty(persona: Persona): LoyaltyStatus {
  return {
    rank: persona.loyaltyRank,
    pointsBalance: persona.pointsBalance,
    nextRewardAt: Math.ceil((persona.pointsBalance + 1) / 500) * 500,
    monthlyActivityPct: activityByPersona[persona.id] ?? 60,
    benefits,
    rewards: rewardsByPersona[persona.id] ?? [],
  };
}
