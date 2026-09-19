// Real product photos matched from the Woolworths product feed
// (public/1789434106487.csv) to the illustrative catalogue. Files are stored
// locally in public/product-images/. ProductImage falls back to the emoji tile
// if a product has no image here or the file fails to load.
// Labneh has no equivalent in the source feed, so it stays emoji-only.
export const productImages: Record<string, string> = {
  // Fruits & Vegetables
  blueberry: '/product-images/blueberry.jpg',
  'apple-pinklady': '/product-images/apple-pinklady.jpg',
  banana: '/product-images/banana.jpg',
  potato: '/product-images/potato.jpg',
  'onion-red': '/product-images/onion-red.jpg',
  tomato: '/product-images/tomato.jpg',
  'baby-spinach': '/product-images/baby-spinach.jpg',
  avocado: '/product-images/avocado.jpg',
  carrot: '/product-images/carrot.jpg',
  strawberry: '/product-images/strawberry.jpg',
  // Dairy & Eggs
  'cooking-cream': '/product-images/cooking-cream.jpg',
  'eggs-white': '/product-images/eggs-white.jpg',
  'milk-full': '/product-images/milk-full.jpg',
  'milk-nadec': '/product-images/milk-nadec.jpg',
  'milk-low': '/product-images/milk-low.jpg',
  'greek-yogurt': '/product-images/greek-yogurt.jpg',
  'cheese-slices': '/product-images/cheese-slices.jpg',
  'butter-lurpak': '/product-images/butter-lurpak.jpg',
  // Bakery
  'arabic-bread': '/product-images/arabic-bread.jpg',
  'milk-bread': '/product-images/milk-bread.jpg',
  'brown-bread': '/product-images/brown-bread.jpg',
  croissant: '/product-images/croissant.jpg',
  'choc-cake': '/product-images/choc-cake.jpg',
  // Meat
  'veal-ground': '/product-images/veal-ground.jpg',
  'lamb-chops': '/product-images/lamb-chops.jpg',
  ribeye: '/product-images/ribeye.jpg',
  'beef-cubes': '/product-images/beef-cubes.jpg',
  // Poultry
  'chicken-whole': '/product-images/chicken-whole.jpg',
  'chicken-breast': '/product-images/chicken-breast.jpg',
  'chicken-nuggets': '/product-images/chicken-nuggets.jpg',
  // Seafood
  'shrimp-jumbo': '/product-images/shrimp-jumbo.jpg',
  'salmon-fillet': '/product-images/salmon-fillet.jpg',
  hammour: '/product-images/hammour.jpg',
  // Pantry
  'dates-sukkary': '/product-images/dates-sukkary.jpg',
  'olive-oil': '/product-images/olive-oil.jpg',
  'basmati-rice': '/product-images/basmati-rice.jpg',
  pasta: '/product-images/pasta.jpg',
  tuna: '/product-images/tuna.jpg',
  cornflakes: '/product-images/cornflakes.jpg',
  'peanut-butter': '/product-images/peanut-butter.jpg',
  honey: '/product-images/honey.jpg',
  // Beverages
  'water-berain': '/product-images/water-berain.jpg',
  pepsi: '/product-images/pepsi.jpg',
  'orange-juice': '/product-images/orange-juice.jpg',
  laban: '/product-images/laban.jpg',
  // Snacks
  lays: '/product-images/lays.jpg',
  mms: '/product-images/mms.jpg',
  'granola-bars': '/product-images/granola-bars.jpg',
  biscuits: '/product-images/biscuits.jpg',
  // Household
  detergent: '/product-images/detergent.jpg',
  tissue: '/product-images/tissue.jpg',
  // Baby
  diapers: '/product-images/diapers.jpg',
  'baby-wipes': '/product-images/baby-wipes.jpg',
};
