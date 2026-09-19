import type { Product, SocialProofShelf } from '@/types';

// "Best shoppers become merchandisers" — crowd-sourced shelves labelled explicitly.

export const socialProofShelves: SocialProofShelf[] = [
  {
    id: 'families-alkhobar',
    label: 'Most added by families in Al Khobar this week',
    emoji: '👨‍👩‍👧‍👦',
    segment: 'families in Al Khobar',
    itemIds: ['milk-full', 'eggs-white', 'chicken-whole', 'banana', 'water-berain', 'arabic-bread', 'basmati-rice', 'greek-yogurt'],
  },
  {
    id: 'back-to-school-loved',
    label: 'Most loved for back-to-school',
    emoji: '🎒',
    segment: 'parents shopping back-to-school',
    itemIds: ['apple-pinklady', 'milk-bread', 'orange-juice', 'granola-bars', 'cheese-slices', 'peanut-butter', 'cornflakes', 'chicken-nuggets'],
  },
  {
    id: 'trending-alkhobar',
    label: 'Trending in Al Khobar this week',
    emoji: '🔥',
    segment: 'shoppers near you',
    itemIds: ['cheese-slices', 'veal-ground', 'dates-sukkary', 'pepsi', 'strawberry', 'salmon-fillet'],
  },
];

// Short, varied social messaging used sparingly under recommendation titles / on the PDP.
export const socialMessages = [
  'Most added by families in Al Khobar this week',
  'A weekly bestseller, trusted by thousands',
  'Most loved this Ramadan',
  'A favourite with parents this season',
  'Selling fast near you',
];

export function socialProofLine(seed: string, product?: Product): string {
  if (product?.tags.includes('back-to-school')) return 'Reorder this before school starts';
  const sum = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  return socialMessages[sum % socialMessages.length];
}
