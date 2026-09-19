import type { Occasion } from '@/types';

// Occasions turn a plain-words prompt into a collection that the engine then
// ranks per shopper. Back-to-school is the hero occasion.

export const occasions: Occasion[] = [
  {
    id: 'back-to-school',
    prompt: 'Everything for back-to-school',
    title: 'Back-to-school lunchbox',
    emoji: '🎒',
    blurb: 'Lunchbox staples, healthy snacks and breakfast — sorted for the school run.',
    itemIds: [
      'milk-bread', 'peanut-butter', 'apple-pinklady', 'orange-juice', 'granola-bars',
      'cheese-slices', 'cornflakes', 'banana', 'water-berain', 'chicken-nuggets', 'biscuits', 'carrot',
    ],
    keywords: ['school', 'lunchbox', 'kids', 'breakfast', 'snacks', 'study'],
    perPersonaNote: {
      fatima: 'Ranked for a family — value & family packs first.',
      noura: 'Healthier swaps floated to the top.',
      khalid: 'Quick grab-and-go picks first.',
    },
  },
  {
    id: 'weekend-gathering',
    prompt: 'Host a weekend gathering',
    title: 'Weekend gathering',
    emoji: '🍽️',
    blurb: 'Premium cuts, seafood and sides to host with ease.',
    itemIds: ['lamb-chops', 'ribeye', 'shrimp-jumbo', 'salmon-fillet', 'dates-sukkary', 'butter-lurpak', 'pepsi', 'choc-cake', 'olive-oil'],
    keywords: ['host', 'entertain', 'weekend', 'bbq', 'guests', 'dinner', 'party'],
    perPersonaNote: {
      fatima: 'Family-sized portions prioritised.',
      noura: 'Leaner seafood picks first.',
      khalid: 'Premium, entertaining-first — made for you.',
    },
  },
  {
    id: 'ramadan-iftar',
    prompt: 'Everything for a Ramadan iftar table',
    title: 'Ramadan iftar table',
    emoji: '🌙',
    blurb: 'Dates, laban, soups and mains for a generous iftar.',
      itemIds: ['dates-sukkary', 'laban', 'water-berain', 'basmati-rice', 'chicken-whole', 'arabic-bread', 'greek-yogurt', 'olive-oil'],
    keywords: ['ramadan', 'iftar', 'suhoor', 'fasting', 'dates'],
    perPersonaNote: {
      fatima: 'Family staples and value packs first.',
      noura: 'Balanced, wholesome choices first.',
      khalid: 'Generous, premium spread first.',
    },
  },
  {
    id: 'healthy-week',
    prompt: 'Plan a healthy week',
    title: 'Healthy week',
    emoji: '🥗',
    blurb: 'Fresh produce, lean protein and wholesome staples.',
    itemIds: ['baby-spinach', 'avocado', 'blueberry', 'salmon-fillet', 'greek-yogurt', 'brown-bread', 'honey', 'chicken-breast', 'carrot'],
    keywords: ['healthy', 'diet', 'fresh', 'organic', 'clean', 'fitness'],
    perPersonaNote: {
      fatima: 'Kid-friendly healthy options first.',
      noura: 'Organic & fresh-first — made for you.',
      khalid: 'Premium healthy picks first.',
    },
  },
];

export const occasionMap: Record<string, Occasion> = Object.fromEntries(
  occasions.map((o) => [o.id, o]),
);
