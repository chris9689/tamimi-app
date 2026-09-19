import type { Product } from '@/types';
import { productImages } from './productImages';

// Illustrative catalogue grounded in real Tamimi Markets SKUs, brands and SAR
// prices (from tamimimarkets.com / shop.tamimimarkets.com). Prices/points are mock.
// Themari earns 2 points per 1 SAR. Emoji tiles render everywhere; a real `image`
// URL (when present) is attempted first and falls back to the emoji on error.

const R = 2; // Themari points per SAR

export const products: Product[] = [
  // ---------------- Fruits & Vegetables ----------------
  {
    id: 'blueberry', name: 'Blueberry', brand: "Driscoll's", category: 'fruits-veg',
    sizeLabel: '125 G', priceSAR: 10.8, wasPriceSAR: 12.95, pointsRate: R, emoji: '🫐',
    origin: 'USA', rating: 4.7, ratingCount: 210, stockState: 'in',
    tags: ['fresh', 'premium', 'imported', 'healthy'], baseScore: 72,
  },
  {
    id: 'apple-pinklady', name: 'Apple Pink Lady', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '500 G', priceSAR: 4.5, wasPriceSAR: 5.98, pointsRate: R, emoji: '🍎',
    origin: 'Italy', rating: 4.6, ratingCount: 340, stockState: 'in',
    tags: ['fresh', 'kids', 'back-to-school', 'healthy'], baseScore: 88,
    intentSignal: 'Lunchbox staple you buy weekly', offerLabel: 'Weekly offer',
  },
  {
    id: 'banana', name: 'Banana', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '1 KG', priceSAR: 4.95, pointsRate: R, emoji: '🍌', origin: 'Philippines',
    rating: 4.5, ratingCount: 520, stockState: 'in',
    tags: ['fresh', 'staple', 'kids', 'value'], baseScore: 94,
  },
  {
    id: 'potato', name: 'Potato', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '500 G', priceSAR: 3.4, wasPriceSAR: 3.75, pointsRate: R, emoji: '🥔',
    origin: 'KSA', rating: 4.4, ratingCount: 180, stockState: 'in',
    tags: ['fresh', 'staple', 'value', 'local'], baseScore: 83,
  },
  {
    id: 'onion-red', name: 'Onions Red', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '250 G', priceSAR: 1.8, wasPriceSAR: 1.99, pointsRate: R, emoji: '🧅',
    origin: 'KSA', rating: 4.3, ratingCount: 96, stockState: 'in',
    tags: ['fresh', 'staple', 'value', 'local'], baseScore: 79,
  },
  {
    id: 'tomato', name: 'Tomato', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '1 KG', priceSAR: 5.5, pointsRate: R, emoji: '🍅', origin: 'KSA',
    rating: 4.4, ratingCount: 150, stockState: 'in',
    tags: ['fresh', 'staple', 'local'], baseScore: 81,
  },
  {
    id: 'baby-spinach', name: 'Organic Baby Spinach', brand: 'Nature Fresh', category: 'fruits-veg',
    sizeLabel: '200 G', priceSAR: 8.95, pointsRate: R, emoji: '🥬', origin: 'KSA',
    rating: 4.8, ratingCount: 88, stockState: 'in',
    tags: ['organic', 'healthy', 'fresh', 'premium'], baseScore: 54,
    intentSignal: 'Matches your organic picks',
  },
  {
    id: 'avocado', name: 'Avocado Hass', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '2 pcs', priceSAR: 12.95, pointsRate: R, emoji: '🥑', origin: 'Kenya',
    rating: 4.6, ratingCount: 130, stockState: 'low',
    tags: ['fresh', 'healthy', 'premium', 'organic'], baseScore: 61,
  },
  {
    id: 'carrot', name: 'Carrots', brand: 'Tamimi Fresh', category: 'fruits-veg',
    sizeLabel: '1 KG', priceSAR: 4.75, pointsRate: R, emoji: '🥕', origin: 'KSA',
    rating: 4.4, ratingCount: 140, stockState: 'in',
    tags: ['fresh', 'staple', 'kids', 'value', 'healthy'], baseScore: 76,
  },
  {
    id: 'strawberry', name: 'Strawberry', brand: "Driscoll's", category: 'fruits-veg',
    sizeLabel: '250 G', priceSAR: 9.95, wasPriceSAR: 11.95, pointsRate: R, emoji: '🍓',
    origin: 'Egypt', rating: 4.6, ratingCount: 175, stockState: 'in',
    tags: ['fresh', 'premium', 'kids'], baseScore: 69,
  },

  // ---------------- Dairy & Eggs ----------------
  {
    id: 'labneh-almarai', name: 'Premium Labneh Full Fat', brand: 'Almarai', category: 'dairy',
    sizeLabel: '400 G', priceSAR: 9.5, wasPriceSAR: 13.95, pointsRate: R, emoji: '🥛',
    origin: 'KSA', rating: 4.7, ratingCount: 410, stockState: 'low',
    tags: ['staple', 'local', 'value'], baseScore: 90,
    intentSignal: 'Running low — you reorder every week',
  },
  {
    id: 'cooking-cream', name: 'Cooking Cream Full Fat', brand: 'Almarai', category: 'dairy',
    sizeLabel: '500 ML', priceSAR: 12.5, wasPriceSAR: 16.95, pointsRate: R, emoji: '🥛',
    origin: 'KSA', rating: 4.6, ratingCount: 260, stockState: 'in',
    tags: ['staple', 'local'], baseScore: 74,
  },
  {
    id: 'labneh-tamimi', name: 'Fresh Labneh Full Fat', brand: 'Tamimi Markets', category: 'dairy',
    sizeLabel: '400 G', priceSAR: 9.95, pointsRate: R, emoji: '🧈', origin: 'KSA',
    rating: 4.6, ratingCount: 190, stockState: 'in',
    tags: ['fresh', 'local', 'staple'], baseScore: 71,
  },
  {
    id: 'eggs-white', name: 'Large White Eggs', brand: 'Alyoum', category: 'dairy',
    sizeLabel: '30 pcs', priceSAR: 15.95, wasPriceSAR: 18.5, pointsRate: R, emoji: '🥚',
    origin: 'KSA', rating: 4.7, ratingCount: 500, stockState: 'in',
    tags: ['staple', 'value', 'family-pack', 'back-to-school'], baseScore: 92,
  },
  {
    id: 'milk-full', name: 'Fresh Milk Full Fat', brand: 'Almarai', category: 'dairy',
    sizeLabel: '2 L', priceSAR: 9.75, pointsRate: R, emoji: '🥛', origin: 'KSA',
    rating: 4.8, ratingCount: 640, stockState: 'out',
    tags: ['staple', 'family-pack', 'kids'], baseScore: 95, swapForId: 'milk-nadec',
    intentSignal: 'Your usual milk — reordered weekly',
  },
  {
    id: 'milk-nadec', name: 'Fresh Milk Full Fat', brand: 'Nadec', category: 'dairy',
    sizeLabel: '2 L', priceSAR: 9.75, pointsRate: R, emoji: '🥛', origin: 'KSA',
    rating: 4.7, ratingCount: 380, stockState: 'in',
    tags: ['staple', 'family-pack', 'kids'], baseScore: 82,
  },
  {
    id: 'milk-low', name: 'Low Fat Milk', brand: 'Almarai', category: 'dairy',
    sizeLabel: '2 L', priceSAR: 9.75, pointsRate: R, emoji: '🥛', origin: 'KSA',
    rating: 4.6, ratingCount: 300, stockState: 'in',
    tags: ['staple', 'healthy'], baseScore: 70,
  },
  {
    id: 'greek-yogurt', name: 'Greek Yogurt Plain', brand: 'Almarai', category: 'dairy',
    sizeLabel: '500 G', priceSAR: 11.5, pointsRate: R, emoji: '🍦', origin: 'KSA',
    rating: 4.7, ratingCount: 210, stockState: 'in',
    tags: ['healthy', 'organic', 'premium'], baseScore: 58,
    intentSignal: 'A repeat favourite in your basket',
  },
  {
    id: 'cheese-slices', name: 'Cheese Slices', brand: 'Puck', category: 'dairy',
    sizeLabel: '200 G', priceSAR: 8.95, pointsRate: R, emoji: '🧀', origin: 'KSA',
    rating: 4.5, ratingCount: 260, stockState: 'in',
    tags: ['kids', 'staple', 'back-to-school'], baseScore: 77,
  },
  {
    id: 'butter-lurpak', name: 'Butter Unsalted', brand: 'Lurpak', category: 'dairy',
    sizeLabel: '200 G', priceSAR: 14.95, pointsRate: R, emoji: '🧈', origin: 'Denmark',
    rating: 4.8, ratingCount: 150, stockState: 'in',
    tags: ['premium', 'imported', 'entertaining'], baseScore: 55,
  },

  // ---------------- Bakery ----------------
  {
    id: 'arabic-bread', name: 'Arabic Bread Large', brand: 'Tamimi Bakery', category: 'bakery',
    sizeLabel: '6 pcs', priceSAR: 4.0, pointsRate: R, emoji: '🫓', origin: 'KSA',
    rating: 4.6, ratingCount: 420, stockState: 'in',
    tags: ['staple', 'local', 'value'], baseScore: 89,
  },
  {
    id: 'milk-bread', name: 'Milk Bread Loaf', brand: 'Tamimi Bakery', category: 'bakery',
    sizeLabel: '600 G', priceSAR: 7.95, pointsRate: R, emoji: '🍞', origin: 'KSA',
    rating: 4.5, ratingCount: 230, stockState: 'in',
    tags: ['kids', 'staple', 'back-to-school'], baseScore: 78,
  },
  {
    id: 'brown-bread', name: 'Brown Bread', brand: 'Tamimi Bakery', category: 'bakery',
    sizeLabel: '600 G', priceSAR: 6.5, pointsRate: R, emoji: '🍞', origin: 'KSA',
    rating: 4.5, ratingCount: 160, stockState: 'in',
    tags: ['healthy', 'staple'], baseScore: 64,
  },
  {
    id: 'croissant', name: 'Butter Croissant', brand: 'Tamimi Bakery', category: 'bakery',
    sizeLabel: '4 pcs', priceSAR: 12.95, pointsRate: R, emoji: '🥐', origin: 'KSA',
    rating: 4.6, ratingCount: 190, stockState: 'in',
    tags: ['premium', 'entertaining', 'kids'], baseScore: 62,
  },
  {
    id: 'choc-cake', name: 'Chocolate Fudge Cake', brand: 'Tamimi Bakery', category: 'bakery',
    sizeLabel: '1 pc', priceSAR: 24.95, pointsRate: R, emoji: '🍰', origin: 'KSA',
    rating: 4.7, ratingCount: 120, stockState: 'in',
    tags: ['entertaining', 'premium', 'kids'], baseScore: 51,
  },

  // ---------------- Meat ----------------
  {
    id: 'veal-ground', name: 'Fresh Veal Ground', brand: 'Tamimi Butchery', category: 'meat',
    sizeLabel: '500 G', priceSAR: 32.5, wasPriceSAR: 38.48, pointsRate: R, emoji: '🥩',
    origin: 'KSA', rating: 4.6, ratingCount: 210, stockState: 'in',
    tags: ['family-pack', 'staple', 'local'], baseScore: 73,
  },
  {
    id: 'lamb-chops', name: 'Australian Lamb Chops', brand: 'Tamimi Butchery', category: 'meat',
    sizeLabel: '500 G', priceSAR: 44.95, pointsRate: R, emoji: '🍖', origin: 'Australia',
    rating: 4.7, ratingCount: 140, stockState: 'in',
    tags: ['premium', 'entertaining', 'imported'], baseScore: 60,
    intentSignal: 'Popular for weekend hosting',
  },
  {
    id: 'ribeye', name: 'Beef Ribeye Steak', brand: 'Tamimi Butchery', category: 'meat',
    sizeLabel: '300 G', priceSAR: 39.95, pointsRate: R, emoji: '🥩', origin: 'Australia',
    rating: 4.8, ratingCount: 110, stockState: 'in',
    tags: ['premium', 'entertaining', 'imported'], baseScore: 57,
  },
  {
    id: 'beef-cubes', name: 'Fresh Beef Cubes', brand: 'Tamimi Butchery', category: 'meat',
    sizeLabel: '500 G', priceSAR: 34.95, pointsRate: R, emoji: '🥩', origin: 'KSA',
    rating: 4.5, ratingCount: 130, stockState: 'in',
    tags: ['family-pack', 'staple'], baseScore: 66,
  },

  // ---------------- Poultry ----------------
  {
    id: 'chicken-whole', name: 'Fresh Whole Chicken', brand: 'Alyoum', category: 'poultry',
    sizeLabel: '1 KG', priceSAR: 15.95, wasPriceSAR: 18.95, pointsRate: R, emoji: '🍗',
    origin: 'KSA', rating: 4.6, ratingCount: 380, stockState: 'in',
    tags: ['staple', 'family-pack', 'value'], baseScore: 86,
  },
  {
    id: 'chicken-breast', name: 'Fresh Chicken Breast', brand: 'Alyoum', category: 'poultry',
    sizeLabel: '500 G', priceSAR: 18.95, pointsRate: R, emoji: '🍗', origin: 'KSA',
    rating: 4.7, ratingCount: 310, stockState: 'in',
    tags: ['healthy', 'staple', 'family-pack'], baseScore: 80,
    intentSignal: 'A repeat favourite in your basket',
  },
  {
    id: 'chicken-nuggets', name: 'Chicken Nuggets', brand: 'Sadia', category: 'poultry',
    sizeLabel: '400 G', priceSAR: 16.95, pointsRate: R, emoji: '🍗', origin: 'Brazil',
    rating: 4.4, ratingCount: 240, stockState: 'in',
    tags: ['kids', 'family-pack', 'back-to-school'], baseScore: 72,
  },

  // ---------------- Seafood ----------------
  {
    id: 'shrimp-jumbo', name: 'Fresh Jumbo Shrimp', brand: 'Tamimi Seafood', category: 'seafood',
    sizeLabel: '500 G', priceSAR: 42.95, pointsRate: R, emoji: '🦐', origin: 'KSA',
    rating: 4.6, ratingCount: 90, stockState: 'in',
    tags: ['premium', 'entertaining'], baseScore: 52,
  },
  {
    id: 'salmon-fillet', name: 'Norwegian Salmon Fillet', brand: 'Tamimi Seafood', category: 'seafood',
    sizeLabel: '400 G', priceSAR: 46.95, pointsRate: R, emoji: '🐟', origin: 'Norway',
    rating: 4.8, ratingCount: 130, stockState: 'in',
    tags: ['premium', 'healthy', 'imported', 'entertaining'], baseScore: 56,
  },
  {
    id: 'hammour', name: 'Fresh Hammour Fillet', brand: 'Tamimi Seafood', category: 'seafood',
    sizeLabel: '500 G', priceSAR: 38.95, pointsRate: R, emoji: '🐠', origin: 'KSA',
    rating: 4.5, ratingCount: 70, stockState: 'low',
    tags: ['premium', 'local', 'entertaining'], baseScore: 49,
  },

  // ---------------- Pantry ----------------
  {
    id: 'dates-sukkary', name: 'Dates Sukkary Premium', brand: 'Tamimi Markets', category: 'pantry',
    sizeLabel: '1 KG', priceSAR: 34.95, pointsRate: R, emoji: '🌴', origin: 'KSA',
    rating: 4.9, ratingCount: 300, stockState: 'in',
    tags: ['local', 'premium', 'entertaining'], baseScore: 68,
  },
  {
    id: 'olive-oil', name: 'Extra Virgin Olive Oil', brand: 'Tamimi Pantry', category: 'pantry',
    sizeLabel: '1 L', priceSAR: 39.95, pointsRate: R, emoji: '🫒', origin: 'Spain',
    rating: 4.7, ratingCount: 220, stockState: 'in',
    tags: ['premium', 'healthy', 'staple'], baseScore: 65,
  },
  {
    id: 'basmati-rice', name: 'Indian Mazza Basmati Rice', brand: 'Al Safi', category: 'pantry',
    sizeLabel: '5 KG', priceSAR: 54.95, wasPriceSAR: 62.0, pointsRate: R, emoji: '🍚',
    origin: 'India', rating: 4.7, ratingCount: 260, stockState: 'in',
    tags: ['staple', 'family-pack', 'value'], baseScore: 84,
  },
  {
    id: 'pasta', name: 'Spaghetti No.5', brand: 'Barilla', category: 'pantry',
    sizeLabel: '500 G', priceSAR: 6.95, pointsRate: R, emoji: '🍝', origin: 'Italy',
    rating: 4.6, ratingCount: 340, stockState: 'in',
    tags: ['staple', 'kids', 'value'], baseScore: 79,
  },
  {
    id: 'tuna', name: 'Light Tuna in Oil', brand: 'California Garden', category: 'pantry',
    sizeLabel: '3 x 170 G', priceSAR: 14.95, wasPriceSAR: 17.5, pointsRate: R, emoji: '🥫',
    origin: 'UAE', rating: 4.5, ratingCount: 280, stockState: 'in',
    tags: ['staple', 'value', 'family-pack'], baseScore: 75,
  },
  {
    id: 'cornflakes', name: 'Corn Flakes', brand: "Kellogg's", category: 'pantry',
    sizeLabel: '500 G', priceSAR: 18.95, pointsRate: R, emoji: '🥣', origin: 'KSA',
    rating: 4.5, ratingCount: 200, stockState: 'in',
    tags: ['kids', 'back-to-school', 'staple'], baseScore: 70,
  },
  {
    id: 'peanut-butter', name: 'Creamy Peanut Butter', brand: 'American Garden', category: 'pantry',
    sizeLabel: '510 G', priceSAR: 16.95, pointsRate: R, emoji: '🥜', origin: 'USA',
    rating: 4.6, ratingCount: 160, stockState: 'in',
    tags: ['kids', 'back-to-school'], baseScore: 61,
  },
  {
    id: 'honey', name: 'Natural Honey', brand: 'Al Shifa', category: 'pantry',
    sizeLabel: '500 G', priceSAR: 29.95, pointsRate: R, emoji: '🍯', origin: 'KSA',
    rating: 4.7, ratingCount: 190, stockState: 'in',
    tags: ['healthy', 'premium'], baseScore: 53,
  },

  // ---------------- Beverages ----------------
  {
    id: 'water-berain', name: 'Mineral Water', brand: 'Berain', category: 'beverages',
    sizeLabel: '40 x 330 ML', priceSAR: 15.95, wasPriceSAR: 18.0, pointsRate: R, emoji: '💧',
    origin: 'KSA', rating: 4.7, ratingCount: 610, stockState: 'in',
    tags: ['staple', 'family-pack', 'value'], baseScore: 91,
  },
  {
    id: 'pepsi', name: 'Pepsi Cola', brand: 'Pepsi', category: 'beverages',
    sizeLabel: '6 x 355 ML', priceSAR: 14.95, pointsRate: R, emoji: '🥤', origin: 'KSA',
    rating: 4.5, ratingCount: 420, stockState: 'in',
    tags: ['entertaining', 'kids', 'family-pack'], baseScore: 78,
  },
  {
    id: 'orange-juice', name: 'Orange Juice No Added Sugar', brand: 'Almarai', category: 'beverages',
    sizeLabel: '1.75 L', priceSAR: 12.95, pointsRate: R, emoji: '🧃', origin: 'KSA',
    rating: 4.6, ratingCount: 280, stockState: 'in',
    tags: ['kids', 'back-to-school', 'healthy'], baseScore: 74,
  },
  {
    id: 'laban', name: 'Laban Full Fat', brand: 'Almarai', category: 'beverages',
    sizeLabel: '1.75 L', priceSAR: 8.95, pointsRate: R, emoji: '🥛', origin: 'KSA',
    rating: 4.6, ratingCount: 250, stockState: 'in',
    tags: ['staple', 'local'], baseScore: 76,
  },

  // ---------------- Snacks ----------------
  {
    id: 'lays', name: 'Classic Salted Chips', brand: "Lay's", category: 'snacks',
    sizeLabel: '165 G', priceSAR: 8.95, pointsRate: R, emoji: '🥔', origin: 'KSA',
    rating: 4.4, ratingCount: 360, stockState: 'in',
    tags: ['kids', 'entertaining'], baseScore: 72,
  },
  {
    id: 'mms', name: "M&M's Chocolate", brand: "M&M's", category: 'snacks',
    sizeLabel: '400 G', priceSAR: 24.95, pointsRate: R, emoji: '🍫', origin: 'USA',
    rating: 4.6, ratingCount: 210, stockState: 'in',
    tags: ['kids', 'entertaining'], baseScore: 58,
  },
  {
    id: 'granola-bars', name: 'Oats & Honey Granola Bars', brand: 'Nature Valley', category: 'snacks',
    sizeLabel: '5 x 42 G', priceSAR: 15.95, pointsRate: R, emoji: '🍫', origin: 'USA',
    rating: 4.5, ratingCount: 170, stockState: 'in',
    tags: ['healthy', 'back-to-school', 'kids'], baseScore: 60,
  },
  {
    id: 'biscuits', name: 'Digestive Biscuits', brand: 'McVitie’s', category: 'snacks',
    sizeLabel: '400 G', priceSAR: 9.95, pointsRate: R, emoji: '🍪', origin: 'UK',
    rating: 4.5, ratingCount: 230, stockState: 'in',
    tags: ['kids', 'staple'], baseScore: 63,
  },

  // ---------------- Household ----------------
  {
    id: 'detergent', name: 'Original Detergent Powder', brand: 'Tide', category: 'household',
    sizeLabel: '3 KG', priceSAR: 39.95, wasPriceSAR: 47.0, pointsRate: R, emoji: '🧴',
    origin: 'KSA', rating: 4.6, ratingCount: 190, stockState: 'in',
    tags: ['family-pack', 'staple', 'value'], baseScore: 67,
  },
  {
    id: 'tissue', name: 'Facial Tissue', brand: 'Fine', category: 'household',
    sizeLabel: '6 x 130s', priceSAR: 21.95, pointsRate: R, emoji: '🧻', origin: 'KSA',
    rating: 4.5, ratingCount: 210, stockState: 'in',
    tags: ['staple', 'family-pack', 'value'], baseScore: 69,
  },

  // ---------------- Baby ----------------
  {
    id: 'diapers', name: 'Baby-Dry Diapers Size 4', brand: 'Pampers', category: 'baby',
    sizeLabel: '66 pcs', priceSAR: 79.95, wasPriceSAR: 92.0, pointsRate: R, emoji: '🧷',
    origin: 'KSA', rating: 4.7, ratingCount: 320, stockState: 'in',
    tags: ['family-pack', 'value'], baseScore: 62,
  },
  {
    id: 'baby-wipes', name: 'Fresh Clean Baby Wipes', brand: 'Pampers', category: 'baby',
    sizeLabel: '3 x 64', priceSAR: 24.95, pointsRate: R, emoji: '🧼', origin: 'KSA',
    rating: 4.6, ratingCount: 180, stockState: 'in',
    tags: ['family-pack', 'value'], baseScore: 55,
  },
];

// Attach matched feed photos (public/product-images/); unmatched keep the emoji.
for (const p of products) {
  const img = productImages[p.id];
  if (img) p.image = img;
}

// Shelves, search and recommendations only surface photo-backed products.
export const shoppableProducts: Product[] = products.filter((p) => p.image);

export const productMap: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.id, p]),
);

export function getProduct(id: string): Product | undefined {
  return productMap[id];
}

export function discountPct(p: Product): number | null {
  if (!p.wasPriceSAR || p.wasPriceSAR <= p.priceSAR) return null;
  return Math.round(((p.wasPriceSAR - p.priceSAR) / p.wasPriceSAR) * 100);
}
