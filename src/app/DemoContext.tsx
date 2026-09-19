import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  CartItem,
  CategoryId,
  ChapterKey,
  LoyaltyStatus,
  Persona,
  Product,
  SortMode,
} from '@/types';
import { personaMap, defaultPersonaId } from '@/mock-data/users';
import { buildLoyalty } from '@/mock-data/loyalty';
import { occasions } from '@/mock-data/occasions';
import { productMap } from '@/mock-data/products';

// Products a merchandiser has pinned (seasonal / promoted). They rank to the top
// wherever they appear and are surfaced as a control in presenter mode.
const PINNED_IDS = ['apple-pinklady', 'dates-sukkary'];

interface WhyState {
  open: boolean;
  title: string;
  reasons: string[];
}

interface DemoContextValue {
  personaId: string;
  persona: Persona;
  loyalty: LoyaltyStatus;
  setPersona: (id: string) => void;

  chapter: ChapterKey;
  goToChapter: (key: ChapterKey) => void;

  categoryId: CategoryId;
  setCategoryId: (id: CategoryId) => void;
  productId: string | null;
  openProduct: (id: string) => void;

  sortMode: SortMode;
  setSortMode: (m: SortMode) => void;
  toggleSort: () => void;

  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartPoints: number;
  rebuildLastWeek: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  submitSearch: (q: string) => void;

  occasionQuery: string;
  activeOccasionId: string;
  buildOccasion: (query: string) => void;

  madeForSource: string | null;
  openMadeForYou: (sourceId?: string) => void;

  presenterOpen: boolean;
  togglePresenter: () => void;

  whyState: WhyState;
  openWhy: (title: string, reasons: string[]) => void;
  closeWhy: () => void;

  deliveryMode: 'pickup' | 'delivery';
  toggleDeliveryMode: () => void;

  replayToken: number;
  replayDecision: () => void;
  resetDemo: () => void;

  pinnedIds: string[];
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [personaId, setPersonaId] = useState<string>(defaultPersonaId);
  const [chapter, setChapter] = useState<ChapterKey>('home');
  const [categoryId, setCategoryId] = useState<CategoryId>('fruits-veg');
  const [productId, setProductId] = useState<string | null>('apple-pinklady');
  const [sortMode, setSortMode] = useState<SortMode>('foryou');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [occasionQuery, setOccasionQuery] = useState('Everything for back-to-school');
  const [activeOccasionId, setActiveOccasionId] = useState('back-to-school');
  const [madeForSource, setMadeForSource] = useState<string | null>(null);
  const [presenterOpen, setPresenterOpen] = useState(false);
  const [whyState, setWhyState] = useState<WhyState>({ open: false, title: '', reasons: [] });
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('delivery');
  const [replayToken, setReplayToken] = useState(0);

  const persona = personaMap[personaId];
  const loyalty = useMemo(() => buildLoyalty(persona), [persona]);

  const replayDecision = useCallback(() => setReplayToken((t) => t + 1), []);

  const setPersona = useCallback((id: string) => {
    setPersonaId(id);
    setCart([]);
    setReplayToken((t) => t + 1);
  }, []);

  const goToChapter = useCallback((key: ChapterKey) => {
    setChapter(key);
    setReplayToken((t) => t + 1);
  }, []);

  const openProduct = useCallback((id: string) => {
    setProductId(id);
    setChapter('product');
    setReplayToken((t) => t + 1);
  }, []);

  const toggleSort = useCallback(() => {
    setSortMode((m) => (m === 'foryou' ? 'popularity' : 'foryou'));
    setReplayToken((t) => t + 1);
  }, []);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const rebuildLastWeek = useCallback(() => {
    const items: CartItem[] = [];
    for (const id of persona.lastWeekItemIds) {
      let product = productMap[id];
      if (!product) continue;
      // Never a dead end: swap an out-of-stock staple for a same-size/price match.
      if (product.stockState === 'out' && product.swapForId) {
        product = productMap[product.swapForId] ?? product;
      }
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) existing.qty += 1;
      else items.push({ product, qty: 1 });
    }
    setCart(items);
    setChapter('cart');
    setReplayToken((t) => t + 1);
  }, [persona]);

  const submitSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setChapter('search');
    setReplayToken((t) => t + 1);
  }, []);

  const buildOccasion = useCallback((query: string) => {
    const q = query.trim().toLowerCase();
    const match =
      occasions.find((o) => o.keywords.some((k) => q.includes(k))) ??
      occasions.find((o) => q && o.title.toLowerCase().includes(q)) ??
      occasions[0];
    setActiveOccasionId(match.id);
    setOccasionQuery(query);
    setChapter('occasion');
    setReplayToken((t) => t + 1);
  }, []);

  const openMadeForYou = useCallback((sourceId?: string) => {
    setMadeForSource(sourceId ?? null);
    setChapter('madeforyou');
    setReplayToken((t) => t + 1);
  }, []);

  const togglePresenter = useCallback(() => setPresenterOpen((o) => !o), []);
  const openWhy = useCallback((title: string, reasons: string[]) => {
    setWhyState({ open: true, title, reasons });
  }, []);
  const closeWhy = useCallback(() => setWhyState((s) => ({ ...s, open: false })), []);
  const toggleDeliveryMode = useCallback(
    () => setDeliveryMode((m) => (m === 'delivery' ? 'pickup' : 'delivery')),
    [],
  );

  const resetDemo = useCallback(() => {
    setPersonaId(defaultPersonaId);
    setChapter('home');
    setCategoryId('fruits-veg');
    setProductId('apple-pinklady');
    setSortMode('foryou');
    setCart([]);
    setSearchQuery('');
    setOccasionQuery('Everything for back-to-school');
    setActiveOccasionId('back-to-school');
    setPresenterOpen(false);
    setWhyState({ open: false, title: '', reasons: [] });
    setReplayToken((t) => t + 1);
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((s, i) => s + i.product.priceSAR * i.qty, 0),
    [cart],
  );
  const cartPoints = useMemo(
    () => cart.reduce((s, i) => s + i.product.priceSAR * i.qty * i.product.pointsRate, 0),
    [cart],
  );

  const value: DemoContextValue = {
    personaId,
    persona,
    loyalty,
    setPersona,
    chapter,
    goToChapter,
    categoryId,
    setCategoryId,
    productId,
    openProduct,
    sortMode,
    setSortMode,
    toggleSort,
    cart,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartPoints,
    rebuildLastWeek,
    searchQuery,
    setSearchQuery,
    submitSearch,
    occasionQuery,
    activeOccasionId,
    buildOccasion,
    madeForSource,
    openMadeForYou,
    presenterOpen,
    togglePresenter,
    whyState,
    openWhy,
    closeWhy,
    deliveryMode,
    toggleDeliveryMode,
    replayToken,
    replayDecision,
    resetDemo,
    pinnedIds: PINNED_IDS,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within a DemoProvider');
  return ctx;
}
