import type { Persona } from '@/types';

// Three shoppers whose affinity profiles are deliberately different, so switching
// persona visibly re-orders the home feed, PLP, recommendations and offers.

export const personas: Persona[] = [
  {
    id: 'fatima',
    name: 'Fatima',
    tagline: 'Busy parent · big weekend basket',
    homeArea: 'Al Khobar',
    segmentLabel: 'families in Al Khobar',
    avatarInitials: 'FA',
    accent: '#D81B60',
    loyaltyRank: 'Themari Gold',
    pointsBalance: 4820,
    heroFlags: { bigWeekendBasket: true, backToSchool: true, reordersWeekly: true },
    affinity: {
      categoryAffinity: {
        dairy: 0.9,
        poultry: 0.85,
        pantry: 0.82,
        'fruits-veg': 0.76,
        bakery: 0.7,
        beverages: 0.62,
        household: 0.6,
        baby: 0.5,
      },
      brandAffinity: { Almarai: 0.9, Alyoum: 0.82, 'Al Safi': 0.72, 'Tamimi Markets': 0.7, Nadec: 0.6, Pampers: 0.55 },
      tagAffinity: { 'family-pack': 0.95, staple: 0.9, value: 0.86, 'back-to-school': 0.85, kids: 0.8 },
      priceSensitivity: 0.8,
      basketRhythm: 'weekly',
      predictiveSignals: [
        'Back-to-school season approaching',
        'Milk usually reordered this week',
        'Big weekend basket due',
      ],
    },
    lastWeekItemIds: [
      'milk-full', 'eggs-white', 'banana', 'chicken-whole', 'greek-yogurt',
      'arabic-bread', 'basmati-rice', 'water-berain', 'apple-pinklady', 'tuna',
    ],
    intents: [
      { label: 'Family stock-up', detail: 'Family-packs & multipacks, big weekend baskets', strength: 0.95 },
      { label: 'Everyday staples reorder', detail: 'Milk, eggs & bread on a weekly rhythm', strength: 0.9 },
      { label: 'Back-to-school prep', detail: 'Lunchbox snacks, juice & kid-friendly picks', strength: 0.85 },
      { label: 'Value seeker', detail: 'Leans into promotions & bulk value', strength: 0.82 },
      { label: 'Trusted local brands', detail: 'Almarai, Alyoum & Al Safi', strength: 0.7 },
    ],
    transactions: [
      { when: '2 days ago', summary: 'Midweek top-up', itemsPreview: 'Full-fat milk ×2, eggs, bananas, Arabic bread', total: 68.4 },
      { when: 'Last Saturday', summary: 'Big weekend family shop', itemsPreview: 'Whole chicken, 5kg basmati, laundry powder, snacks +12', total: 342.75 },
      { when: '1 week ago', summary: 'School lunchbox run', itemsPreview: 'Orange juice, cheese slices, granola bars +5', total: 96.2 },
      { when: '2 weeks ago', summary: 'Weekend family shop', itemsPreview: 'Veal mince, 40pk water, diapers +14', total: 388.1 },
    ],
  },
  {
    id: 'noura',
    name: 'Noura',
    tagline: 'Health-conscious · fresh & organic',
    homeArea: 'Al Khobar',
    segmentLabel: 'health-focused shoppers',
    avatarInitials: 'NO',
    accent: '#0F7A6C',
    loyaltyRank: 'Themari Silver',
    pointsBalance: 3110,
    heroFlags: { healthConscious: true, reordersWeekly: true },
    affinity: {
      categoryAffinity: {
        'fruits-veg': 0.95,
        dairy: 0.72,
        seafood: 0.66,
        pantry: 0.6,
        bakery: 0.5,
      },
      brandAffinity: { 'Nature Fresh': 0.9, "Driscoll's": 0.86, Almarai: 0.6, 'Al Shifa': 0.6, 'Tamimi Seafood': 0.55 },
      tagAffinity: { organic: 0.95, healthy: 0.92, fresh: 0.9, premium: 0.6 },
      priceSensitivity: 0.3,
      basketRhythm: 'weekly',
      predictiveSignals: [
        'Browses organic every week',
        'Greek yogurt is a repeat buy',
        'Fresh produce top-up expected',
      ],
    },
    lastWeekItemIds: [
      'baby-spinach', 'greek-yogurt', 'blueberry', 'salmon-fillet', 'avocado',
      'milk-low', 'brown-bread', 'honey',
    ],
    intents: [
      { label: 'Clean eating', detail: 'Organic & healthy-tagged items first', strength: 0.95 },
      { label: 'Fresh-first', detail: 'Daily produce & short shelf-life picks', strength: 0.9 },
      { label: 'Protein & wellness', detail: 'Greek yogurt, salmon & eggs', strength: 0.8 },
      { label: 'Quality over price', detail: 'Chooses premium, low price sensitivity', strength: 0.75 },
      { label: 'Trusted fresh brands', detail: "Nature Fresh & Driscoll's", strength: 0.7 },
    ],
    transactions: [
      { when: 'Yesterday', summary: 'Fresh produce top-up', itemsPreview: 'Baby spinach, blueberries, avocado', total: 54.3 },
      { when: '4 days ago', summary: 'Wellness restock', itemsPreview: 'Greek yogurt, natural honey, low-fat milk', total: 62.15 },
      { when: '1 week ago', summary: 'Weekend fresh shop', itemsPreview: 'Salmon fillet, brown bread, strawberries +4', total: 128.9 },
      { when: '2 weeks ago', summary: 'Clean-eating basket', itemsPreview: 'Organic greens, olive oil, mixed nuts +6', total: 141.5 },
    ],
  },
  {
    id: 'khalid',
    name: 'Khalid',
    tagline: 'Weekend host · shops around occasions',
    homeArea: 'Al Khobar',
    segmentLabel: 'weekend hosts',
    avatarInitials: 'KH',
    accent: '#B45309',
    loyaltyRank: 'Themari Platinum',
    pointsBalance: 6540,
    heroFlags: { entertains: true },
    affinity: {
      categoryAffinity: {
        meat: 0.92,
        seafood: 0.86,
        bakery: 0.7,
        pantry: 0.66,
        beverages: 0.62,
        dairy: 0.55,
      },
      brandAffinity: { 'Tamimi Butchery': 0.88, 'Tamimi Seafood': 0.82, Lurpak: 0.72, 'Tamimi Markets': 0.65, Pepsi: 0.6 },
      tagAffinity: { entertaining: 0.95, premium: 0.9, imported: 0.75 },
      priceSensitivity: 0.25,
      basketRhythm: 'fortnightly',
      predictiveSignals: [
        'Hosts most weekends',
        'Prefers premium cuts',
        'Shops around occasions',
      ],
    },
    lastWeekItemIds: [
      'lamb-chops', 'shrimp-jumbo', 'ribeye', 'dates-sukkary', 'butter-lurpak',
      'pepsi', 'croissant', 'olive-oil',
    ],
    intents: [
      { label: 'Weekend entertaining', detail: 'Premium cuts & seafood for hosting', strength: 0.95 },
      { label: 'Premium quality', detail: 'Top-tier & imported picks', strength: 0.9 },
      { label: 'Occasion-driven', detail: 'Shops around events, fortnightly rhythm', strength: 0.82 },
      { label: 'Chef-grade fresh', detail: 'Butchery & seafood counters', strength: 0.8 },
      { label: 'Low price sensitivity', detail: 'Chooses quality over deals', strength: 0.7 },
    ],
    transactions: [
      { when: '3 days ago', summary: 'Weekend hosting prep', itemsPreview: 'Ribeye, lamb chops, jumbo prawns +5', total: 412.6 },
      { when: 'Last weekend', summary: 'Entertaining basket', itemsPreview: 'Lurpak butter, dates, croissants +6', total: 268.4 },
      { when: '2 weeks ago', summary: 'Occasion shop', itemsPreview: 'Premium cuts, olive oil, beverages +8', total: 501.25 },
      { when: '3 weeks ago', summary: 'Guest night', itemsPreview: 'Seafood platter, bakery, sodas +5', total: 356.8 },
    ],
  },
];

export const personaMap: Record<string, Persona> = Object.fromEntries(
  personas.map((p) => [p.id, p]),
);

export const defaultPersonaId = 'fatima';
