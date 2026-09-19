import type { Channel } from '@/types';

// The same personalization layer, delivered across every channel (deck slide 5).
export const channels: Channel[] = [
  { id: 'home', label: 'Homepage', icon: 'home' },
  { id: 'app', label: 'App', icon: 'smartphone' },
  { id: 'search', label: 'Search', icon: 'search' },
  { id: 'offers', label: 'Offers', icon: 'sell' },
  { id: 'loyalty', label: 'Loyalty', icon: 'loyalty' },
  { id: 'email', label: 'Email', icon: 'mail' },
];
