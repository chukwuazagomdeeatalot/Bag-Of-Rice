# Project Blueprint — Bag Of Rice

## Brand

- **Name:** Bag Of Rice
- **Slogan:** One Platform. Endless Opportunities.
- **Positioning:** Global social commerce & creator marketplace
- **Personality:** Premium, luxurious, trustworthy, ambitious, innovative, welcoming

## Operating decisions

- Worldwide market from the beginning.
- Multiple currencies supported architecturally from the beginning (ISO currency codes; never assume NGN is the only or permanent currency).
- English is the initial interface language; translation-ready string foundations included.
- International countries, currencies, time zones and future translations prepared.
- Stored monetary values use integer minor units, always paired with a currency code. No JavaScript floats as financial source of truth. No live or arbitrary exchange rates. No currency conversion of real transaction values.

## Phase 1 pages and routes

| Route | Page | Status |
|-------|------|--------|
| / | Homepage | Implemented |
| /marketplace | Marketplace (search, filters, sort, product grid) | Implemented |
| /marketplace/products/:id | Product detail | Implemented |
| /sellers | Seller discovery | Implemented |
| /agents | Agent discovery + commission preview | Implemented |
| /creators | Creator discovery + video/post previews | Implemented |
| /about | Vision and slogan | Implemented |
| /contact | Contact layout (no real addresses/numbers) | Implemented |
| /login | Authentication placeholder (non-functional) | Implemented |
| /register | Registration placeholder (non-functional) | Implemented |
| /owner-dashboard | Protected-design placeholder only | Implemented |
| /* | Not found | Implemented |

## Design system

- Midnight Navy #101B2C, Luxury Gold #F5B942, Emerald #16A36A, Royal Violet #7554D8, Cloud White #F7F8FC, Main Text #182235
- Inter / Manrope typography scale
- Light and dark mode foundations (class-based, persisted in localStorage)
- Responsive mobile / tablet / desktop layout
- Brand component: text mark with inline SVG shopping-bag icon; no invented logo image

## Global-ready foundation

- `lib/currency.ts` — ISO currency codes, integer minor-unit money, `Intl.NumberFormat` formatting, currency-safe arithmetic
- `lib/countries.ts` — ISO 3166-1 alpha-2 country list, region grouping
- `lib/dates` utilities — time-zone-aware `Intl.DateTimeFormat`, user time zone detection
- `lib/i18n.ts` — translation-ready strings (en + fr skeleton), locale fallback
- `lib/currencyContext.tsx` — user preferred display currency persisted in localStorage

## Sample data

Small, realistic demonstration dataset (`lib/sampleData.ts`). Every record carries `isDemo: true` and is marked with a "Demonstration" badge in the UI. Not real platform activity.

## Out of scope for Phase 1

- Authentication, sessions, authorization
- Payments or checkout
- Database, migrations, live services
- Supplier/owner administration access

Next phase: backend integration, real authentication, and payments (not started).