import { useMemo } from 'react';
import { useDemo } from '@/app/DemoContext';
import { products, productMap, discountPct, shoppableProducts } from '@/mock-data/products';
import { categoryMap } from '@/mock-data/categories';
import { socialProofLine } from '@/mock-data/socialProof';
import { completeBasket, rankProducts } from '@/services/decisionEngine';
import { formatPoints } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';
import { QtyStepper } from '@/components/ui/QtyStepper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductRow } from '@/components/product/ProductGrid';

export function ProductScreen() {
  const { persona, productId, cart, addToCart, setQty, goToChapter, openMadeForYou } = useDemo();
  const product = (productId && productMap[productId]) || products[0];

  const love = useMemo(
    () => rankProducts(shoppableProducts.filter((p) => p.category === product.category && p.id !== product.id), persona, { inStockOnly: true }).slice(0, 8),
    [product, persona],
  );
  const complete = useMemo(
    () =>
      completeBasket([product.id], persona, [
        ...love.map((r) => r.product.id),
        ...(product.swapForId ? [product.swapForId] : []),
      ]),
    [product, persona, love],
  );

  const qty = cart.find((i) => i.product.id === product.id)?.qty ?? 0;
  const pct = discountPct(product);
  const oos = product.stockState === 'out';
  const swap = product.swapForId ? productMap[product.swapForId] : undefined;
  const cat = categoryMap[product.category];

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => goToChapter('home')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card"
          aria-label="Back"
        >
          <Icon name="arrow_back" className="text-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => goToChapter('cart')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card"
          aria-label="Cart"
        >
          <Icon name="shopping_cart" className="text-[20px]" />
        </button>
      </div>

      <div className="relative mx-4 overflow-hidden rounded-xl3 bg-white shadow-card">
        <ProductImage product={product} className={oos ? 'h-56 w-full opacity-40 grayscale' : 'h-56 w-full'} emojiClass="text-8xl" />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {pct !== null && <Badge tone="deal">{product.offerLabel ?? `${pct}% OFF`}</Badge>}
          {product.stockState === 'low' && <Badge tone="low">Low stock</Badge>}
          {oos && <Badge tone="out">Out of stock</Badge>}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-primary">{product.brand}</p>
        <h1 className="mt-0.5 font-heading text-xl font-extrabold leading-tight text-ink">{product.name}</h1>
        <p className="mt-0.5 text-[12px] text-muted">
          {product.sizeLabel} · {cat.name}
          {product.origin ? ` · ${product.origin}` : ''}
        </p>

        {product.rating && (
          <p className="mt-1 flex items-center gap-1 text-[12px] text-ink">
            <Icon name="star" filled className="text-[15px] text-warning" />
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-muted">({product.ratingCount} ratings)</span>
          </p>
        )}

        <div className="mt-2 flex items-baseline gap-2">
          <Price value={product.priceSAR} iconSize={18} className="font-heading text-2xl font-extrabold text-ink" />
          {product.wasPriceSAR && <Price value={product.wasPriceSAR} strike iconSize={12} className="text-[13px] text-muted" />}
          <span className="ml-auto text-[11px] font-semibold text-tertiary">+{formatPoints(product.priceSAR * product.pointsRate)} pts</span>
        </div>

        {/* single social proof highlight */}
        <p className="mt-3 flex items-center gap-1 text-[11px] text-muted">
          <Icon name="group" className="text-[13px]" /> {socialProofLine(product.id, product)}
        </p>

        {/* add / swap */}
        <div className="mt-4">
          {oos ? (
            <div className="rounded-xl2 border border-line bg-white p-3">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <Icon name="production_quantity_limits" className="text-[18px] text-primary" /> Out of stock
              </p>
              {swap && (
                <div className="mt-2 flex items-center gap-3 rounded-xl bg-tertiary-container/60 p-2.5">
                  <ProductImage product={swap} className="h-14 w-14 rounded-lg" emojiClass="text-2xl" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-tertiary">Same size &amp; price swap</p>
                    <p className="truncate text-[13px] font-bold text-ink">{swap.brand} {swap.name}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted">{swap.sizeLabel} · <Price value={swap.priceSAR} iconSize={11} className="font-semibold" /></p>
                  </div>
                  <Button size="sm" onClick={() => addToCart(swap)}>Add swap</Button>
                </div>
              )}
              <Button className="mt-2" block variant="dark" icon="auto_awesome" onClick={() => openMadeForYou(product.id)}>
                See “Made for you” instead
              </Button>
            </div>
          ) : qty > 0 ? (
            <div className="flex items-center justify-between rounded-full bg-primary/[0.06] p-1.5 pl-4">
              <span className="text-[13px] font-semibold text-ink">In your cart</span>
              <QtyStepper qty={qty} onInc={() => setQty(product.id, qty + 1)} onDec={() => setQty(product.id, qty - 1)} />
            </div>
          ) : (
            <Button block size="lg" icon="add_shopping_cart" onClick={() => addToCart(product)}>
              Add to cart · <Price value={product.priceSAR} iconSize={14} className="ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* What you love + completes the basket */}
      <section className="mt-6 px-4">
        <SectionHeader
          title="What you love"
          emoji="💚"
          social="A top pick in this aisle this week"
          whyTitle="What you love"
          whyReasons={['Led by your affinity in this aisle', 'Your preferred brands rank higher']}
        />
        <ProductRow items={love} />
      </section>

      <section className="mt-6 px-4">
        <SectionHeader
          title="Completes your basket"
          emoji="🧺"
          social="Frequently bought together by shoppers near you"
          whyTitle="Completes your basket"
          whyReasons={['Suggested from real co-purchases', 'Ranked for you']}
        />
        <ProductRow items={complete} />
      </section>

    </div>
  );
}
