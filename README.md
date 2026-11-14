# Bag Of Rice

One Platform. Endless Opportunities.

Global Social Commerce & Creator Marketplace — Phase 1 storefront.

## Status

**Phase 1 complete** — Foundation, architecture and premium design system.
No live backend, no authentication, no payments. All content is clearly labelled demonstration data.

## Technology

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (client-side routing)
- Lucide React (icons)
- Vitest + jsdom + Testing Library (unit tests)

## Project layout

```
bag_of_rice/
  apps/web/            Vite + React frontend (single repository)
  docs/                PROJECT_BLUEPRINT.md, ARCHITECTURE.md, DESIGN_SYSTEM.md,
                       SECURITY_PLAN.md, PHASE_LOG.md
  README.md
  .gitignore
```

## Commands (run inside apps/web)

```
npm install          Install dependencies
npm run dev          Start dev server (http://localhost:5173)
npm run build        TypeScript check + production build to dist/
npm test             Run Vitest suite (32 tests)
npm run lint         Run oxlint
```

## Verified in Phase 1

- `tsc -b` typecheck: clean
- `npm run build`: production build succeeds
- `npm test`: 32 tests across 5 files, all passing
- Dev server starts and all routes render

## Scope boundaries (by design)

- No authentication implementation (login/register are non-functional UI placeholders)
- No owner or administrator access (owner dashboard is a protected-design placeholder)
- No payments, no live payment provider, no fake payment functionality
- No database, no migrations
- No live exchange rates or currency conversion
- All sample data labelled as demonstration data

See `docs/` for the full blueprint, architecture, design system, security plan, and phase log.