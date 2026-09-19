// Persona-specific homepage campaign hero. Each points at an occasion collection
// and styles the hero band. Khalid's is themed for Saudi National Day (late Sept).
export interface Campaign {
  occasionId: string;
  prompt: string; // resolves to the occasion collection when "Build my list" is tapped
  eyebrow: string;
  title: string;
  emoji: string;
  gradient: string; // gradient stops for the hero background
}

export const campaignByPersona: Record<string, Campaign> = {
  fatima: {
    occasionId: 'back-to-school',
    prompt: 'Everything for back-to-school',
    eyebrow: 'Back-to-school is here',
    title: 'Lunchbox staples, healthy snacks & breakfast',
    emoji: '🎒',
    gradient: 'from-primary to-primary-dark',
  },
  noura: {
    occasionId: 'healthy-week',
    prompt: 'Plan a healthy week',
    eyebrow: 'Your wellness reset',
    title: 'Organic greens, lean protein & wholesome staples',
    emoji: '🥗',
    gradient: 'from-tertiary to-[#0b5f54]',
  },
  khalid: {
    occasionId: 'weekend-gathering',
    prompt: 'Host a weekend gathering',
    eyebrow: 'Host for National Day',
    title: 'Premium cuts, seafood & everything to host',
    emoji: '🎉',
    gradient: 'from-[#006C35] to-[#00461f]',
  },
};
