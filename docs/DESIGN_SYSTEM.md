# Design System — Bag Of Rice

## Brand

- Name: Bag Of Rice
- Slogan: One Platform. Endless Opportunities.
- Brand component (`components/common/Brand.tsx`): text mark "Bag Of Rice" paired with an inline SVG shopping-bag icon (Lucide `ShoppingBag`), rendered in Luxury Gold on demand. No invented logo image; no stock branding.
- Slogan used in the brand header, homepage hero area, and footer.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Midnight Navy | #101B2C | Primary surfaces, headers, dark mode background |
| Navy-800 | #1A2940 | Elevated dark surfaces |
| Navy-700 | #24354F | Subtle dark elements |
| Luxury Gold | #F5B942 | Primary actions, accents, selected states |
| Gold-100 | #FDF3DC | Light gold tinted backgrounds |
| Emerald | #16A36A | Positive states, verification badges |
| Royal Violet | #7554D8 | Secondary accents |
| Cloud White | #F7F8FC | Light mode background |
| Main Text | #182235 | Primary typography |

Tailwind semantic colors: `bg`, `surface`, `text`, `muted`, `border`, `shadow` backed by CSS variables, with a `.dark` class override for dark mode. Dark mode toggled via `ThemeToggle`, persisted in `localStorage`.

## Typography

- Fonts: Inter, Manrope (system-ui fallback stack)
- Scale: display / h1 / h2 / h3 / body / small / tiny
- Clear hierarchy; readable at mobile and desktop sizes
- `text-wrap: balance` utility for headings

## Components

- Buttons: primary (gold), outline, ghost, icon; disabled and coming-soon states; focus-visible ring in gold
- Cards: rounded-2xl, subtle border, soft shadow, hover lift
- Inputs: rounded-xl, border, focus ring in gold
- Badges: default, gold, emerald, violet variants
- Container: max-w-7xl with responsive padding

## Layout and motion

- Rounded but sophisticated: 12px default, 16px/20px for cards, 9999px for badges/avatars
- Subtle shadows: soft, card, lift
- Restrained animations: fade-in, slide-up, soft pulse (used sparingly)
- Sticky header with blur background
- Responsive: mobile stack, tablet/desktop grids (2–4 columns)

## Accessibility

- Contrast ratios checked against navy/gold palette
- Focus-visible rings on all interactive elements
- `aria-label` on icon buttons, `sr-only` for hidden labels
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- Scrollbar styling for consistency

## Responsive breakpoints

Tailwind defaults: sm (640px), md (768px), lg (1024px), xl (1280px). Navigation collapses to a mobile drawer; grids adapt from 1 column (mobile) to 2–4 columns (desktop).