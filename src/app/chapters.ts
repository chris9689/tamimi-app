import type { Chapter } from '@/types';

// Ordered customer-facing screens. `showInNav` items become the bottom tab bar:
// Home · Categories · Offers · Themari · Cart. The rest are reached in-app
// (search from the header, product from a tap, occasion + made-for-you from links).
export const chapters: Chapter[] = [
  { id: 0, key: 'home', title: 'For You', navLabel: 'Home', copy: 'Your personalised store', icon: 'home', showInNav: true },
  { id: 1, key: 'category', title: 'Category', navLabel: 'Categories', copy: 'Sorted for how you shop', icon: 'grid_view', showInNav: true },
  { id: 2, key: 'search', title: 'Search', navLabel: 'Search', copy: 'Understands what you mean', icon: 'search', showInNav: false },
  { id: 3, key: 'product', title: 'Product', navLabel: 'Product', copy: 'What you love + completes the basket', icon: 'shopping_bag', showInNav: false },
  { id: 4, key: 'occasion', title: 'Occasions', navLabel: 'Occasions', copy: 'Own every season', icon: 'celebration', showInNav: false },
  { id: 5, key: 'offers', title: 'Offers', navLabel: 'Offers', copy: 'Deals picked for you', icon: 'sell', showInNav: true },
  { id: 6, key: 'loyalty', title: 'Themari', navLabel: 'Themari', copy: 'Loyalty made for you', icon: 'loyalty', showInNav: true },
  { id: 7, key: 'cart', title: 'Cart', navLabel: 'Cart', copy: 'Finish the weekly shop', icon: 'shopping_cart', showInNav: true },
  { id: 8, key: 'madeforyou', title: 'Made for you', navLabel: 'Made for you', copy: 'Never a dead end', icon: 'auto_awesome', showInNav: false },
];

export const chapterByKey = Object.fromEntries(chapters.map((c) => [c.key, c])) as Record<
  Chapter['key'],
  Chapter
>;

export const navChapters = chapters.filter((c) => c.showInNav);
