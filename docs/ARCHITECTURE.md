# Architecture — Bag Of Rice

## Repository (single repository)

```
bag_of_rice/
  apps/web/                Frontend application (Vite + React + TypeScript)
    src/
      app/                 (reserved)
      assets/              (reserved)
      components/
        common/            Brand, Button, Card, Input, Badge, ThemeToggle
        layout/            Container, Header, Footer
        marketplace/       CurrencySelector, PriceDisplay, DemoTag, ProductCard, ProductGrid, CategoryFilters
      features/            (reserved for Phase 2+ domain features)
      hooks/               (reserved)
      lib/
        currency.ts        Money model, currency codes, formatting, safe arithmetic
        currencyContext.tsx Display currency context (localStorage persisted)
        countries.ts       ISO country list, region grouping
        i18n.ts            Translation-ready strings (en, fr skeleton)
        sampleData.ts      Labelled demonstration dataset
      pages/               Route page components
      routes/              (reserved)
      styles/              (reserved)
      types/               Core TypeScript types (Money, Product, Seller, Agent, Creator, Country, CurrencyCode, UserPreferences)
      utils/               (reserved)
      test/                Vitest setup
      main.tsx             Entry point
      App.tsx              Route configuration + root layout
    index.html
    package.json
    tailwind.config.js
    postcss.config.js
    vitest.config.ts
    tsconfig*.json
  docs/                    Documentation
  README.md
  .gitignore
```

## Technology choices

- **React 19** — UI library
- **TypeScript** — static typing; `verbatimModuleSyntax`, `noUnusedLocals`, strict null checks disabled per scaffold defaults but code written type-safe
- **Vite** — dev server and production bundler
- **Tailwind CSS v3** — design-system styling with class-based dark mode
- **React Router v7** — client-side routing
- **Lucide React** — consistent iconography
- **Vitest + jsdom + Testing Library** — unit tests
- **npm** — package manager

## Key architectural decisions

### Money model

Financial values are represented as `Money { minorUnits: number; currency: CurrencyCode }` using integer minor units (cents). All formatting goes through `Intl.NumberFormat` with the currency code. Currency-safe arithmetic throws when mixing currencies. No float math is used as the source of truth for financial values.

### Display currency

`CurrencyContextProvider` holds the user's preferred display currency, defaulting to USD, persisted in `localStorage`. Formatting uses the original transaction currency; no conversion is performed.

### Internationalization

Strings live in `lib/i18n.ts` keyed by English keys, with an English dictionary and a French skeleton. `t(key, locale)` falls back to English. Structure is ready for additional locales.

### Dates

`Intl.DateTimeFormat` with explicit `timeZone`; defaults to the user's detected time zone (`Intl.DateTimeFormat().resolvedOptions().timeZone`) or UTC.

### Routing

Single-page application with React Router. All Phase 1 routes are client-side. NotFoundRoute catches unknown paths. Auth and owner-dashboard routes are deliberately non-functional placeholders.

### Data

No backend, no database, no migrations in Phase 1. All data is in-memory sample data marked `isDemo: true`.

## What is deliberately absent

- Authentication (no login, sessions, JWT, cookies)
- Payments (no provider SDKs, no fake payment flows)
- Owner/admin access (no hardcoded owner account, no secret routes with privileges)
- Live exchange rates or currency conversion services
- Server-side rendering

## Future phases (not implemented)

Backend API integration, real authorization and roles, payments, seller/agent/creator onboarding, cart and checkout, search backend, databases and migrations.