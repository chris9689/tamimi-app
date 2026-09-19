import type { CategoryId } from '@/types';

// Curated "goes together" complements (cross-aisle) keyed by product id. Drives
// the "Completes your basket" and "You might also like" shelves so they are
// specific to the product, not a generic seed list. Ids are photo-backed only.
export const pairsWith: Record<string, string[]> = {
  // Breakfast
  'milk-full': ['cornflakes', 'orange-juice', 'greek-yogurt', 'banana'],
  'milk-nadec': ['cornflakes', 'orange-juice', 'milk-bread', 'banana'],
  'milk-low': ['granola-bars', 'blueberry', 'cornflakes', 'orange-juice'],
  cornflakes: ['milk-full', 'banana', 'honey', 'strawberry'],
  'eggs-white': ['milk-bread', 'cheese-slices', 'tomato', 'butter-lurpak'],
  'orange-juice': ['croissant', 'cornflakes', 'eggs-white', 'milk-bread'],
  croissant: ['orange-juice', 'butter-lurpak', 'honey', 'cheese-slices'],
  'peanut-butter': ['milk-bread', 'banana', 'brown-bread', 'honey'],
  honey: ['greek-yogurt', 'brown-bread', 'cornflakes', 'peanut-butter'],
  'greek-yogurt': ['honey', 'blueberry', 'granola-bars', 'strawberry'],
  'granola-bars': ['greek-yogurt', 'banana', 'orange-juice', 'blueberry'],
  // Breads & spreads
  'arabic-bread': ['cheese-slices', 'olive-oil', 'greek-yogurt', 'honey'],
  'milk-bread': ['peanut-butter', 'cheese-slices', 'eggs-white', 'orange-juice'],
  'brown-bread': ['peanut-butter', 'honey', 'butter-lurpak', 'avocado'],
  'butter-lurpak': ['brown-bread', 'arabic-bread', 'croissant', 'honey'],
  'cheese-slices': ['milk-bread', 'arabic-bread', 'tomato', 'eggs-white'],
  // Produce / salad
  tomato: ['onion-red', 'baby-spinach', 'olive-oil', 'cheese-slices'],
  'baby-spinach': ['tomato', 'avocado', 'olive-oil', 'cheese-slices'],
  avocado: ['brown-bread', 'eggs-white', 'tomato', 'baby-spinach'],
  'onion-red': ['tomato', 'potato', 'basmati-rice', 'carrot'],
  potato: ['onion-red', 'butter-lurpak', 'carrot', 'olive-oil'],
  carrot: ['onion-red', 'potato', 'baby-spinach', 'tomato'],
  'olive-oil': ['tomato', 'baby-spinach', 'pasta', 'arabic-bread'],
  // Fruit
  strawberry: ['greek-yogurt', 'blueberry', 'honey', 'cornflakes'],
  blueberry: ['greek-yogurt', 'cornflakes', 'honey', 'granola-bars'],
  'apple-pinklady': ['peanut-butter', 'cheese-slices', 'granola-bars', 'greek-yogurt'],
  banana: ['cornflakes', 'peanut-butter', 'greek-yogurt', 'milk-full'],
  // Mains
  'chicken-whole': ['basmati-rice', 'onion-red', 'olive-oil', 'arabic-bread'],
  'chicken-breast': ['baby-spinach', 'basmati-rice', 'olive-oil', 'brown-bread'],
  'chicken-nuggets': ['lays', 'potato', 'pepsi', 'tomato'],
  'lamb-chops': ['basmati-rice', 'onion-red', 'olive-oil', 'arabic-bread'],
  ribeye: ['potato', 'butter-lurpak', 'olive-oil', 'baby-spinach'],
  'beef-cubes': ['basmati-rice', 'onion-red', 'tomato', 'carrot'],
  'veal-ground': ['pasta', 'tomato', 'onion-red', 'basmati-rice'],
  'salmon-fillet': ['baby-spinach', 'olive-oil', 'brown-bread', 'avocado'],
  'shrimp-jumbo': ['basmati-rice', 'olive-oil', 'onion-red', 'arabic-bread'],
  hammour: ['basmati-rice', 'tomato', 'olive-oil', 'onion-red'],
  // Pantry
  'basmati-rice': ['chicken-whole', 'onion-red', 'tomato', 'olive-oil'],
  pasta: ['tomato', 'olive-oil', 'cheese-slices', 'onion-red'],
  tuna: ['pasta', 'onion-red', 'tomato', 'olive-oil'],
  'dates-sukkary': ['laban', 'greek-yogurt', 'water-berain', 'arabic-bread'],
  'cooking-cream': ['pasta', 'chicken-breast', 'basmati-rice', 'tomato'],
  // Drinks
  'water-berain': ['banana', 'apple-pinklady', 'granola-bars', 'orange-juice'],
  pepsi: ['lays', 'chicken-nuggets', 'mms', 'biscuits'],
  laban: ['dates-sukkary', 'arabic-bread', 'basmati-rice', 'chicken-whole'],
  // Snacks / treats
  lays: ['pepsi', 'mms', 'biscuits', 'orange-juice'],
  mms: ['lays', 'pepsi', 'choc-cake', 'biscuits'],
  biscuits: ['milk-full', 'greek-yogurt', 'orange-juice', 'pepsi'],
  'choc-cake': ['mms', 'strawberry', 'greek-yogurt', 'pepsi'],
  // Household / baby
  detergent: ['tissue', 'baby-wipes'],
  tissue: ['detergent', 'baby-wipes'],
  diapers: ['baby-wipes', 'tissue'],
  'baby-wipes': ['diapers', 'tissue'],
};

// Fallback when a product has no curated pairs: which categories complement each.
export const categoryPairs: Partial<Record<CategoryId, CategoryId[]>> = {
  'fruits-veg': ['dairy', 'pantry', 'bakery'],
  dairy: ['bakery', 'fruits-veg', 'pantry'],
  bakery: ['dairy', 'pantry', 'fruits-veg'],
  meat: ['pantry', 'fruits-veg', 'bakery'],
  poultry: ['pantry', 'fruits-veg', 'bakery'],
  seafood: ['pantry', 'fruits-veg', 'bakery'],
  pantry: ['fruits-veg', 'meat', 'poultry'],
  beverages: ['snacks', 'bakery'],
  snacks: ['beverages', 'bakery'],
  household: ['baby'],
  baby: ['household'],
  frozen: ['pantry'],
};
