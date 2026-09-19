import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 'fruits-veg', name: 'Fruits & Vegetables', emoji: '🥬', tagline: 'Fresh every morning', image: '/fruits_vegetables.webp' },
  { id: 'dairy', name: 'Dairy & Eggs', emoji: '🧀', tagline: 'Chilled & fresh', image: '/dairy.webp' },
  { id: 'bakery', name: 'Bakery', emoji: '🥖', tagline: 'Baked in-store daily', image: '/bakery.png' },
  { id: 'meat', name: 'Meat', emoji: '🥩', tagline: 'Butcher fresh', image: '/meat.png' },
  { id: 'poultry', name: 'Poultry', emoji: '🍗', tagline: 'Farm fresh', image: '/poultry.png' },
  { id: 'seafood', name: 'Seafood', emoji: '🐟', tagline: 'From the Gulf', image: '/seafood.png' },
  { id: 'pantry', name: 'Pantry', emoji: '🫙', tagline: 'Everyday essentials', image: '/rice_pasta.webp' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤', tagline: 'Stay refreshed', image: '/water_beverages.webp' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', tagline: 'Treats & bites', image: '/snacks.webp' },
  { id: 'frozen', name: 'Frozen', emoji: '🧊', tagline: 'Freezer favourites', image: '/frozen.webp' },
  { id: 'household', name: 'Household', emoji: '🧺', tagline: 'Home & clean', image: '/household.png' },
  { id: 'baby', name: 'Baby', emoji: '🍼', tagline: 'Little ones', image: '/baby.png' },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);
