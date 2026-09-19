import type { ComponentType } from 'react';
import type { ChapterKey } from '@/types';
import { HomeScreen } from './HomeScreen';
import { CategoryScreen } from './CategoryScreen';
import { ProductScreen } from './ProductScreen';
import { SearchScreen } from './SearchScreen';
import { OccasionScreen } from './OccasionScreen';
import { OffersScreen } from './OffersScreen';
import { CartScreen } from './CartScreen';
import { LoyaltyScreen } from './LoyaltyScreen';
import { MadeForYouScreen } from './MadeForYouScreen';

export const screens: Record<ChapterKey, ComponentType> = {
  home: HomeScreen,
  category: CategoryScreen,
  product: ProductScreen,
  search: SearchScreen,
  occasion: OccasionScreen,
  offers: OffersScreen,
  cart: CartScreen,
  loyalty: LoyaltyScreen,
  madeforyou: MadeForYouScreen,
};
