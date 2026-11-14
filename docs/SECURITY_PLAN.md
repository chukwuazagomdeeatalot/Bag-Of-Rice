# Security Plan — Bag Of Rice (Phase 1)

## No secrets

- No API keys, credentials, or environment variables are stored in the repository.
- No `.env` files with real values are created.
- Do not commit secrets. `.gitignore` excludes dependency output and build artifacts.

## Authentication

- Authentication is NOT implemented in Phase 1.
- `/login` and `/register` are non-functional UI placeholders. No credentials are validated; no sessions or tokens are created.
- No fake authentication and no pretend-registered users.

## Authorization

- No administrator or owner access exists.
- `/owner-dashboard` is a protected-design placeholder only. It explicitly states that real authorization comes in a later phase.
- No secret or hardcoded owner account.

## Payments

- No connection to a live payment provider.
- No fake payment functionality.
- No checkout or cart implementation.

## Financial data handling

- Monetary values are stored as integer minor units paired with an ISO currency code.
- Floating-point numbers are never the source of truth for financial calculations.
- Currency-safe arithmetic throws on mismatched currencies.
- No live exchange rates are invented or fetched.
- No currency conversion is performed on transaction values; display formatting is separate from stored values.

## Sample data

- All products, sellers, agents, creators, ratings, and orders are demonstration data, flagged `isDemo: true` and badged "Demonstration".
- No real user data, real transactions, or real earnings are shown.

## Dependencies

- Lightweight, stable, compatible packages only (React, Tailwind, React Router, Lucide, Vitest, Testing Library).
- No heavyweight services.

## Review checklist before Phase 2

- [ ] Secrets scan: no keys or credentials committed
- [ ] Auth boundaries: placeholders remain non-functional until real implementation
- [ ] Payment boundaries: no payment code paths exist
- [ ] Money model review: integer minor units + currency code everywhere