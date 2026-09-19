# Tamimi Markets × Mastercard — Personalization Demo

A high-fidelity, clickable prototype of a **personalised Tamimi Markets grocery app**, built to
make the **Mastercard Dynamic Yield / Experience OS** personalization story tangible. It looks and
feels like a shipping Saudi grocery app, but has **no backend** — every product, price, point and
offer is **mock/illustrative** (currency is **SAR**).

> One layer that makes what you already run personal. Switch the shopper and watch the whole store
> re-rank; open presenter mode to see exactly *why*.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Build / typecheck:

```bash
npm run build    # tsc -b && vite build
```

Requires Node 18+. If your environment blocks install scripts, run `node node_modules/esbuild/install.js` once after `npm install`.

## Demo tour (2 minutes)

1. **Switch shopper** in the top bar (Fatima → Noura → Khalid) and watch the **For You** feed,
   category order, offers and reason lines re-rank live. This is the core "aha".
2. Open **Categories** and flip **By popularity ↔ Sorted for you** — the same aisle, re-ranked.
3. Open **Search**, try *"healthy breakfast"*, *"something for guests"* or Arabic **حليب** — it
   understands meaning, not just keywords, then ranks per shopper.
4. Press **P** (or **Why shown now**) to open **presenter mode**: signals, weighted ranking factors,
   guardrails, the merchandiser controls (strategy · rules · pinned) and an A/B test result.
5. Tap the **🎒 Back-to-school** hero to build an occasion; open **Cart** to *Rebuild last week*;
   open **Themari** for loyalty made from your own history.

The small **"Why this?"** pills throughout open a per-block reason popover.

## The three shoppers

| Shopper | Profile | The app leads with |
| --- | --- | --- |
| **Fatima** | Busy parent · big weekend basket | Staples, family packs, back-to-school, "rebuild last week" |
| **Noura** | Health-conscious | Fresh, organic, repeat favourites |
| **Khalid** | Weekend host | Premium cuts, seafood, entertaining, occasions |

## The ten personalization use cases

| # | Use case | Where to see it |
| --- | --- | --- |
| 1 | Personalised homepage | **Home** — reorders per shopper with reason lines + channels strip |
| 2 | Engine that learns each shopper | **Presenter** — live affinity signals & predictions |
| 3 | Aisle sorted for how they shop | **Category** — Popularity ↔ **Sorted for you** toggle |
| 4 | Love it + completes the basket | **Product / Cart** — two recommendation rows |
| 5 | Smarter search | **Search** — semantic + per-shopper ranking, any language |
| 6 | Cart finishes the weekly shop | **Cart** — "Rebuild last week" + "Complete the basket" |
| 7 | Never a dead end | Out-of-stock → same-size/price swap + **Made for you** page |
| 8 | Best shoppers become merchandisers | **Home** — social-proof shelves |
| 9 | Own every season | **Occasion builder** — plain words → ranked collection |
| 10 | Loyalty made for them | **Themari** — offers + rewards from own history |
| + | Team keeps a hand on the shelf | **Presenter** — strategy · rules · pinned products |
| + | Test everything, scale what works | **Presenter** — A/B card (A +12% vs B −2%) |

## How it works

- **`src/services/decisionEngine.ts`** — a deterministic, pure scoring function that ranks products
  and offers for the active shopper's affinity profile, returns human-readable `reasons[]`, and
  powers both the "Sorted for you" order and the presenter explanations. No real service calls.
- **`src/mock-data/`** — typed, illustrative catalogue grounded in real Tamimi SKUs, brands and SAR
  prices (Almarai, Al Safi, Driscoll's, Pepsi, Tamimi…), plus personas, offers, occasions, Themari
  loyalty and social-proof shelves.
- **`src/app/DemoContext.tsx`** — single source of truth for persona, navigation, cart, search,
  occasion and presenter state.

## Tech

React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · Framer Motion 11. No backend, auth or
payments.

## Assets & disclaimers

- **Illustrative data only** — all products, prices, points, basket sizes and lift %s are mock and
  labelled as such. Not affiliated with or endorsed by Tamimi Markets.
- Product visuals use **emoji tiles** with a real-image fallback path; the Tamimi wordmark is
  recreated in-app (drop a licensed logo into `public/assets/` to swap it in).
- The **"Powered by Mastercard"** mark reflects the demo context. Real logos/photography may need
  clearance before any external sharing.
