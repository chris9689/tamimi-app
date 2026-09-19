import { useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types';
import { useDemo } from '@/app/DemoContext';
import { productMap } from '@/mock-data/products';
import { completeBasket, rankProducts } from '@/services/decisionEngine';
import { cn, formatPoints } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';
import { QtyStepper } from '@/components/ui/QtyStepper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductRow } from '@/components/product/ProductGrid';

function CartLine({ item }: { item: CartItem }) {
  const { setQty, openProduct } = useDemo();
  const { product, qty } = item;
  return (
    <div className="flex items-center gap-3 rounded-xl2 bg-white p-2.5 shadow-card">
      <button type="button" onClick={() => openProduct(product.id)}>
        <ProductImage product={product} className="h-16 w-16 rounded-xl" emojiClass="text-3xl" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{product.brand}</p>
        <p className="truncate text-[13px] font-medium text-ink">{product.name}</p>
        <p className="text-[11px] text-muted">{product.sizeLabel}</p>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <Price value={product.priceSAR * qty} iconSize={12} className="font-heading text-[14px] font-extrabold text-ink" />
          {product.wasPriceSAR && <Price value={product.wasPriceSAR * qty} strike iconSize={10} className="text-[10px] text-muted" />}
        </div>
      </div>
      <QtyStepper qty={qty} size="sm" onInc={() => setQty(product.id, qty + 1)} onDec={() => setQty(product.id, qty - 1)} />
    </div>
  );
}

export function CartScreen() {
  const { persona, cart, cartCount, cartSubtotal, cartPoints, goToChapter } = useDemo();
  const [placed, setPlaced] = useState(false);

  const inCartIds = new Set(cart.map((i) => i.product.id));
  const lastWeek = persona.lastWeekItemIds.map((id) => productMap[id]).filter(Boolean) as Product[];
  const reorderAll = useMemo(() => rankProducts(lastWeek, persona), [persona]);
  const reorder = reorderAll.filter((r) => !inCartIds.has(r.product.id));
  const complete = useMemo(
    () => completeBasket(cart.map((i) => i.product.id), persona, reorderAll.map((r) => r.product.id)),
    [cart, persona, reorderAll],
  );

  const reorderSection = reorder.length > 0 && (
    <section className="mt-6">
      <SectionHeader
        title="Reorder your usuals"
        emoji="🔁"
        reason={`From your last ${persona.affinity.basketRhythm} shop — add back just what you need`}
        whyTitle="Reorder your usuals"
        whyReasons={[
          'Built from your recent purchase history',
          'You decide, per item, what to add back',
          'Out-of-stock staples suggest a same-size, same-price swap',
        ]}
      />
      <ProductRow items={reorder} />
    </section>
  );

  if (cartCount === 0) {
    return (
      <div className="px-4 py-4 pb-8">
        <h1 className="font-heading text-xl font-extrabold text-ink">Your cart</h1>
        <p className="mb-2 text-[12px] text-muted">Your cart is empty — reorder your usuals or start fresh.</p>
        {reorderSection}
        <Button className="mt-6" variant="outline" block icon="storefront" onClick={() => goToChapter('home')}>
          Browse the store
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-8">
      <h1 className="mb-3 font-heading text-xl font-extrabold text-ink">Your cart · {cartCount}</h1>

      <div className="space-y-2.5">
        {cart.map((item) => (
          <CartLine key={item.product.id} item={item} />
        ))}
      </div>

      {reorderSection}

      {complete.length > 0 && (
        <section className="mt-6">
          <SectionHeader
            title="Complete the basket"
            emoji="🧺"
            social="Frequently bought together by shoppers near you"
            whyTitle="Complete the basket"
            whyReasons={['Suggested from real co-purchases in similar baskets', 'Ranked for you']}
          />
          <ProductRow items={complete} />
        </section>
      )}

      {/* Summary */}
      <div className="mt-6 rounded-xl2 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-muted">Subtotal</span>
          <Price value={cartSubtotal} iconSize={13} className="font-heading font-extrabold text-ink" />
        </div>
        <div className="mt-1 flex items-center justify-between text-[13px]">
          <span className="text-muted">Themari points earned</span>
          <Badge tone="themari">+{formatPoints(cartPoints)} pts</Badge>
        </div>
        <div className="mt-1 flex items-center justify-between text-[12px] text-muted">
          <span>Delivery</span>
          <span className="font-semibold text-success">FREE</span>
        </div>
        <Button className="mt-3" block size="lg" icon="lock" onClick={() => setPlaced(true)}>
          Checkout · <Price value={cartSubtotal} iconSize={13} className="ml-1" />
        </Button>
        {placed && (
          <p className={cn('mt-2 flex items-center justify-center gap-1 rounded-lg bg-success/10 px-2 py-2 text-[12px] font-semibold text-success')}>
            <Icon name="check_circle" filled className="text-[16px]" />
            Order placed (demo) — you earned {formatPoints(cartPoints)} Themari points!
          </p>
        )}
      </div>
    </div>
  );
}
