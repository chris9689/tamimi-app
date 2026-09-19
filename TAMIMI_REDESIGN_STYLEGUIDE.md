# Tamimi Markets Redesign Styleguide & Agent Brief

> **Purpose:** A hand-off document to prompt another AI coding agent to **re-skin the existing
> prototype to authentic Tamimi Markets branding**. It captures the *current* design system, the
> *target* brand direction, exact design tokens, file locations, and guardrails so the redesign is
> consistent and low-risk.

---

## 1. How to use this document (prompt for the next agent)

Paste the following as the task, then attach this file:

> Re-skin this React + Tailwind grocery prototype to match the **Tamimi Markets** brand identity
> described in `TAMIMI_REDESIGN_STYLEGUIDE.md`. Change **only visual design tokens and styling** —
> colors, typography, radius, shadow, spacing rhythm, iconography accents, and brand marks. Do **not**
> change app logic, routing, state (`DemoContext`), the decision engine, mock data shapes, or
> component APIs. Work token-first: update `tailwind.config.js` and `src/styles/index.css`, then let
> components inherit. Verify visually at each screen. Keep the "Powered by Mastercard" context intact.

**Golden rule:** This is a *restyle*, not a *rebuild*. Prefer editing design tokens over editing
component markup. If a component hardcodes a color, replace it with a semantic token.

---

## 2. Project snapshot

- **Stack:** React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · Framer Motion 11. No backend.
- **Run:** `npm install` then `npm run dev` → http://localhost:5173
- **Shape:** A mobile-framed, clickable personalization demo for a Saudi grocery app (currency SAR),
  with a presenter/"why" layer explaining Mastercard Dynamic Yield personalization.
- **Design token sources (edit these first):**
  - [tailwind.config.js](tailwind.config.js) — colors, fonts, shadows, radius, keyframes
  - [src/styles/index.css](src/styles/index.css) — base body styles, fonts, scrollbars, icon font
  - [index.html](index.html) — Google Fonts, `theme-color`, favicon, title

---

## 3. Current design system (as-built — the "from")

The prototype currently leans on a **Mastercard-red** primary. The redesign re-points this to
Tamimi's *own* crimson (`#BE1E2E`, a warmer/deeper red — see §4), keeps Mastercard only as a
"powered by" endorsement, and adopts Tamimi's clean white-card + red-ribbon layout language.

### Color tokens (current — `tailwind.config.js`)

| Token | Hex | Role today |
| --- | --- | --- |
| `primary` | `#E4002B` | Primary actions, active nav, hero accents (Mastercard red) |
| `primary-dark` | `#B80022` | Hover/pressed primary |
| `primary-container` | `#FCE4E8` | Tonal chips/fills on primary |
| `on-primary` | `#ffffff` | Text/icon on primary |
| `secondary` | `#FF671B` | Secondary buttons, offer accents (orange) |
| `secondary-container` | `#FFE7D6` | Tonal secondary fills |
| `tertiary` | `#0F7A6C` | Fresh/organic accents (teal-green) |
| `tertiary-container` | `#D7EFEA` | Tonal tertiary fills |
| `ink` | `#1A1A1A` | Primary text, dark buttons |
| `muted` | `#6E6E78` | Secondary text |
| `canvas` | `#F2EFEA` | App background (warm paper) |
| `card` | `#ffffff` | Surfaces |
| `line` | `#EAE6DF` | Borders/dividers |
| `success` | `#1A7F37` | Positive states |
| `warning` | `#B7791F` | Caution states |

### Typography (current)

- **Body:** `Noto Sans` (400/500/600/700)
- **Headings:** `Plus Jakarta Sans` (400–800), token `font-heading`
- **Icons:** Material Symbols Outlined (variable font, `.filled` variant)
- Loaded via Google Fonts in [index.html](index.html).

### Shape & elevation (current)

- **Radius:** Tailwind defaults + `xl2 = 1.25rem`, `xl3 = 1.75rem`; buttons are fully `rounded-full`.
- **Shadows:** `card = 0 4px 12px rgba(0,0,0,0.04)`, `float = 0 8px 20px rgba(0,0,0,0.08)`,
  `frame = 0 30px 80px rgba(23,23,23,0.28)` (phone frame).
- **Motion:** `shimmer` skeleton keyframe; screen transitions via keyed `motion.div` (enter-on-mount).

---

## 4. Target: Tamimi Markets brand direction (the "to")

> ✅ **Verified against the live store** (https://shop.tamimimarkets.com/hot-deals, inspected
> 2026-09). Tamimi's actual brand color is **crimson red**, *not* green. So this is **not a hue
> swap** — it's aligning the prototype's Mastercard-red to Tamimi's *own* crimson, adopting Tamimi's
> logo, red angled "% OFF" ribbons, clean white-card layout, and a small green leaf as a minor logo
> accent. Mastercard stays only as a "powered by" endorsement.

**What the live store actually looks like:**
- **Primary brand color:** crimson red `#BE1E2E` (top promo bar, wordmark, active nav, circular `+`
  add buttons, angled "% OFF" ribbons). This is a *warmer, deeper* red than Mastercard's `#E4002B`.
- **Logo:** lowercase wordmark **"tamimi markets"** in crimson, with Arabic **أسواق التميمي** above
  it, joined by a small **green leaf/tick accent** (`~#38761D`).
- **Canvas:** white / very light gray; product cards are white with thin light-gray borders
  (`~#E6E7E9`). Clean and airy, *not* the warm-beige paper of the current prototype.
- **Text:** near-black `#000`/`#333`, muted gray `#59585B` and `#6D6E71`.
- **Body font:** **Calibri** (system-style humanist sans), used for both Latin and Arabic.
- **Product cards:** angled red "NN% OFF" ribbon top-left; large discounted price with the SAR/riyal
  symbol; small strikethrough original price; brand + country-of-origin caption; red circular `+`.
- **Payments/loyalty cues:** **mada** (Saudi debit network) and **Themari** loyalty are prominent —
  reinforce the endorsement/loyalty story, not Mastercard as the hero.

> ⚠️ Hexes below are sampled from the live site's computed styles. If the user supplies an official
> brand kit / logo SVG, override to match precisely.

### Target color tokens (sampled from the live store)

| Token | Hex | Role |
| --- | --- | --- |
| `primary` | `#BE1E2E` | Tamimi crimson — primary actions, active nav, ribbons, brand marks |
| `primary-dark` | `#9C1826` | Hover/pressed primary |
| `primary-container` | `#F7E1E3` | Tonal crimson chips/fills |
| `on-primary` | `#ffffff` | Text/icon on primary |
| `secondary` | `#38761D` | Fresh green leaf accent — fresh/organic cues, subtle highlights |
| `secondary-container` | `#E2EFDB` | Tonal green fills |
| `tertiary` | `#C8791A` | Warm amber — optional offers/loyalty (Themari) highlight |
| `tertiary-container` | `#FBEBD6` | Tonal amber fills |
| `ink` | `#1A1A1A` | Primary text, dark buttons |
| `muted` | `#59585B` | Secondary text (neutral gray) |
| `canvas` | `#F7F7F8` | App background — clean near-white |
| `card` | `#ffffff` | Surfaces |
| `line` | `#E6E7E9` | Borders/dividers |
| `success` | `#38761D` | Positive (aligns to brand green leaf) |
| `warning` | `#C8791A` | Caution states |

**Key intent:** shift the primary from Mastercard `#E4002B` → Tamimi crimson `#BE1E2E`; replace the
current orange `secondary` with Tamimi's green leaf accent; move the canvas from warm beige
(`#F2EFEA`) to clean near-white (`#F7F7F8`). Adopt the **angled red "% OFF" ribbon** on product/offer
cards.

### Typography direction

- Body `Noto Sans` is a strong choice (excellent Arabic support — the app shows Arabic search e.g.
  حليب) and reads close to the site's Calibri. **Keep Noto Sans for body** unless a brand font is
  provided. Optionally add `Calibri, 'Segoe UI'` ahead of Noto Sans in the stack to nudge closer to
  the live store on Windows.
- Headings: keep `Plus Jakarta Sans`. The live store uses plain Calibri for headings, so if
  matching exactly, drop the heading font to the body stack. If changing, update both
  `tailwind.config.js` `fontFamily.heading` **and** the Google Fonts link in [index.html](index.html).

### Shape & elevation direction

- The live store uses **squarer cards with thin borders and minimal shadow** (flatter than the
  current prototype). Consider reducing card radius slightly and leaning on `line` borders over heavy
  shadows. Buttons/pills can stay `rounded-full` (a reasonable app-friendly deviation).
- Adopt the **angled ribbon** pattern for discount badges (top-left, crimson, white text).
- Update phone-frame `theme-color` in [index.html](index.html) from `#E4002B` to `#BE1E2E`.

---

## 5. Brand marks & assets

- **Wordmark:** The Tamimi wordmark is currently *recreated in-app* — see
  [src/components/ui/BrandLogo.tsx](src/components/ui/BrandLogo.tsx). Recolor to Tamimi crimson
  `#BE1E2E`; the real logo is lowercase **"tamimi markets"** with Arabic **أسواق التميمي** above and a
  small **green leaf accent** (`#38761D`). If a licensed logo SVG/PNG is provided, drop it into
  `public/assets/` and swap the component to use it.
- **Favicon:** `public/favicon.svg` — recolor to Tamimi crimson `#BE1E2E`.
- **Powered by Mastercard:** [src/components/ui/PoweredByMastercard.tsx](src/components/ui/PoweredByMastercard.tsx)
  — **keep as-is** (endorsement). Ensure it still reads well against a crimson surface.
- **Discount ribbons:** Adopt the live store's **angled crimson "NN% OFF" ribbon** (top-left, white
  text) on offer/product cards — apply in [OfferCard.tsx](src/components/offers/OfferCard.tsx) and
  [ProductCard.tsx](src/components/product/ProductCard.tsx).
- **Themari loyalty:** Tamimi's real loyalty program is **Themari** — the app already models it
  ([src/mock-data/loyalty.ts](src/mock-data/loyalty.ts), [src/app/screens/LoyaltyScreen.tsx](src/app/screens/LoyaltyScreen.tsx)).
  Use the amber `tertiary` accent for Themari surfaces if extra warmth is wanted.
- Product visuals use emoji tiles with an image fallback ([src/components/ui/ProductImage.tsx](src/components/ui/ProductImage.tsx)) — no change needed.

---

## 6. Component & screen inventory (where styling lives)

Restyle by editing tokens first; only touch these files if a color/shape is hardcoded.

### UI primitives — [src/components/ui/](src/components/ui/)
`Avatar`, `Badge`, `BrandLogo`, `Button`, `Card`, `Chip`, `Disclaimer`, `Drawer`, `Icon`, `Modal`,
`PoweredByMastercard`, `Price`, `ProductImage`, `ProgressRing`, `QtyStepper`, `ReasonLine`,
`SectionHeader`, `WhyChip`.

- [Button.tsx](src/components/ui/Button.tsx) variants: `primary`, `secondary`, `outline`, `ghost`,
  `dark`, `tonal` — all reference tokens; recolors automatically once tokens change. Verify `tonal`
  (uses `primary-container` + `primary` text) reads well in crimson.
- `ProgressRing`, `Badge`, `Chip`, `WhyChip` may carry accent colors tied to `primary`/`secondary`.

### Layout — [src/components/layout/](src/components/layout/)
`AppShell`, `BottomNav`, `DemoControls`, `HeaderBar`, `MobileFrame`, `PersonaSwitcher`.
- `HeaderBar` and `BottomNav` carry the strongest brand color — check active/selected states.
- `MobileFrame` uses the `frame` shadow; `theme-color` lives in [index.html](index.html).

### Feature blocks
- Home: [src/components/home/ChannelsStrip.tsx](src/components/home/ChannelsStrip.tsx)
- Category: [src/components/category/CategoryRail.tsx](src/components/category/CategoryRail.tsx)
- Offers: [src/components/offers/OfferCard.tsx](src/components/offers/OfferCard.tsx) (crimson "% OFF" ribbon candidate)
- Product: [src/components/product/ProductCard.tsx](src/components/product/ProductCard.tsx), [ProductGrid.tsx](src/components/product/ProductGrid.tsx)
- Presenter: [src/components/presenter/PresenterPanel.tsx](src/components/presenter/PresenterPanel.tsx), [WhyModal.tsx](src/components/presenter/WhyModal.tsx), [WhyPanel.tsx](src/components/presenter/WhyPanel.tsx)

### Screens — [src/app/screens/](src/app/screens/)
`HomeScreen`, `CategoryScreen`, `ProductScreen`, `CartScreen`, `SearchScreen`, `OffersScreen`,
`OccasionScreen`, `LoyaltyScreen`, `MadeForYouScreen`. Restyle should require little-to-no change here
if tokens are used consistently.

---

## 7. Redesign checklist (order of operations)

1. **Tokens:** Update the color table in [tailwind.config.js](tailwind.config.js) to the target
   palette (§4). Adjust shadows only if desired.
2. **Base:** Update [src/styles/index.css](src/styles/index.css) `body` background if it hardcodes a
   beige (`#e9e5df`) — align to new `canvas`.
3. **Head:** Update `theme-color` and (if fonts change) the Google Fonts `<link>` in [index.html](index.html).
4. **Brand marks:** Recolor [BrandLogo.tsx](src/components/ui/BrandLogo.tsx) and `public/favicon.svg`.
5. **Hunt hardcoded colors:** Grep for hex/`red`/`#E4002B`/`primary` misuse across `src/` and replace
   with semantic tokens. See §8.
6. **Verify per screen** at http://localhost:5173 — Home, Category (Popularity↔Sorted for you), Search
   (try "healthy breakfast" + Arabic حليب), Product, Cart, Offers, Occasion, Themari/Loyalty, Presenter
   (press `P`). Check active nav, buttons, chips, discount ribbons, loyalty accents, presenter panel.
7. **Contrast:** Confirm text on crimson `primary` and amber `tertiary` meets AA (≥4.5:1 for body).
8. **Typecheck/build:** `npm run build` (`tsc -b && vite build`) must pass clean.

---

## 8. Find hardcoded colors before you start

Run these to locate anything not using tokens (so the restyle is complete):

```bash
# Hex colors and Mastercard red in source
grep -rniE "#[0-9a-f]{3,6}|E4002B|B80022|FF671B" src/
# Tailwind arbitrary color values e.g. bg-[#...], text-[#...]
grep -rniE "\[#[0-9a-f]{3,6}\]" src/
# Raw color names that should be tokens
grep -rniE "\b(bg|text|border|from|to|via)-(red|orange|green|amber)-[0-9]" src/
```

Every match should resolve to a semantic token (`primary`, `secondary`, `tertiary`, `success`,
`warning`, `ink`, `muted`, `canvas`, `card`, `line`) — not a raw hex — so future re-themes are trivial.

---

## 9. Guardrails (do NOT change)

- App logic, routing, and state: [src/app/DemoContext.tsx](src/app/DemoContext.tsx),
  [src/app/App.tsx](src/app/App.tsx), [src/app/chapters.ts](src/app/chapters.ts).
- Personalization engine: [src/services/decisionEngine.ts](src/services/decisionEngine.ts).
- Mock data shapes & content: [src/mock-data/](src/mock-data/) (recolor is fine; don't change SKUs,
  prices, or types).
- Type definitions: [src/types/index.ts](src/types/index.ts).
- Component prop APIs and file structure.
- Animation behavior (respect the Framer Motion note: screen swaps use keyed `motion.div` enter-on-mount,
  not `AnimatePresence mode="wait"` — see project memory).
- Keep the **"Powered by Mastercard"** mark and all **"illustrative data only"** disclaimers.

---

## 10. Acceptance criteria

- [ ] Primary is Tamimi crimson `#BE1E2E` (distinct from Mastercard `#E4002B`); no `#E4002B` family
      remains as a *brand primary*.
- [ ] Green leaf accent (`secondary`) and angled crimson "% OFF" ribbons applied on cards/offers.
- [ ] Canvas is clean near-white (`#F7F7F8`), not the old warm beige.
- [ ] All colors flow from `tailwind.config.js` tokens; no stray hardcoded hex in `src/`.
- [ ] `theme-color`, favicon, and `BrandLogo` reflect Tamimi crimson.
- [ ] Arabic + English text both render cleanly (Noto Sans retained for body).
- [ ] AA contrast on primary/secondary surfaces.
- [ ] `npm run build` passes; every screen verified visually.
- [ ] "Powered by Mastercard" and disclaimers intact.
```
