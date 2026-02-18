# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beautyfinder is a dual-app monorepo ecosystem for the beauty & wellness industry:

**B2C Marketplace** (`apps/web-customer-site` + `apps/api-customer`): Booking platform for clients. Features Last Minute deals, Social Media portfolios, medical/allergy history.

**B2B SaaS** (`apps/web-manager`): Operating system for salons with multi-location management and role-based access (Owner, Manager, Reception, Staff).

**Shared**: Component library via Storybook (`apps/docs`), UI components (`packages/ui`), TypeScript/ESLint configs.

## Monorepo Structure

This is a **Turbo + pnpm** monorepo. All workspaces are defined in `pnpm-workspace.yaml`:
- `apps/`: NestJS backend, Next.js client app, Vite-based manager app, Storybook docs
- `packages/`: Shared configs and UI components

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | NestJS (Node.js) | REST API on port 3001 |
| **B2C Frontend** | Next.js 16 (App Router) | SEO-optimized client booking platform (port 3000) |
| **B2B Frontend** | Vite + React 19 | High-performance SPA for salon operations |
| **Styling** | Tailwind CSS v4 + Shadcn UI | Component library in `packages/ui` |
| **Database** | PostgreSQL 17 | Run via Docker at `pg-playground/` |
| **Auth** | Clerk | B2C authentication only |
| **Maps** | Leaflet + react-leaflet | Salon discovery in B2C |
| **Forms** | React Hook Form + Zod | Form handling and validation |
| **Data Fetching** | TanStack Query (React Query) | B2B data layer |
| **Routing** | TanStack Router (B2B) + Next.js App Router (B2C) | URL-based navigation |

## Development Commands

### Root Commands (Turbo-based, run from project root)

```bash
# Start development servers for all apps
pnpm dev

# Build all apps and packages
pnpm build

# Lint all code
pnpm lint

# Format code
pnpm format

# Type-check all TypeScript
pnpm check-types
```

### Filtered Commands (Target specific workspaces)

```bash
# Example: develop only the customer site
pnpm dev --filter=web-customer-site

# Example: lint only the API
pnpm lint --filter=api-customer

# Example: build only the manager app
pnpm build --filter=web-manager
```

### App-Specific Commands

**NestJS Backend** (`apps/api-customer`):
```bash
cd apps/api-customer
pnpm dev              # Watch mode
pnpm build            # Production build
pnpm test             # Run Jest tests
pnpm test:watch       # Watch mode
pnpm test:cov         # Coverage report
pnpm test:e2e         # E2E tests (./test/jest-e2e.json)
pnpm lint             # Run ESLint with auto-fix
```

**Next.js B2C** (`apps/web-customer-site`):
```bash
cd apps/web-customer-site
pnpm dev              # Start dev server on :3000
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # Run ESLint
pnpm check-types      # Type checking
```

**Vite + React B2B Manager** (`apps/web-manager`):
```bash
cd apps/web-manager
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm test             # Run unit tests (Vitest)
pnpm test:watch       # Watch mode
pnpm lint             # Run ESLint
```

**Storybook Docs** (`apps/docs`):
```bash
cd apps/docs
pnpm dev              # Start Storybook dev server
pnpm build            # Build static Storybook site
```

## Database Setup

PostgreSQL runs via Docker. Use the provided Docker Compose:

```bash
cd pg-playground
docker-compose up -d
```

This starts:
- **PostgreSQL** (user: `admin`, password: `strongpassword123`, db: `jsonbdb`) on port 5432
- **PgAdmin** (admin@example.com / pgadmin_password) on port 5050

The database is used by the NestJS backend. Connection string format: `postgresql://admin:strongpassword123@localhost:5432/jsonbdb`

## Architecture Patterns

### Shared Types and Interfaces
- **Location**: `packages/shared` (not yet created; planned for future use)
- **Rule**: Use shared types across B2B and B2C instead of duplicating types locally
- **Current State**: Types are co-located per app; migrate to `packages/shared` as they're identified

### NestJS Module Structure
- **B2C Logic**: `apps/api-customer/src/` contains modules like `SalonModule`, `ReviewModule`
- **Separation**: Modules separate B2B and B2C logic but share underlying services for data consistency
- **Services**: Business logic lives in service classes; controllers handle HTTP routing

### UI Component Development
- **Location**: `packages/ui` (Shadcn-based component library)
- **Documentation**: Components are documented via Storybook in `apps/docs`
- **Before Building**: Check `packages/ui` for existing components before creating new ones
- **Atomic Design**: Follow atomic design principles (atoms → molecules → organisms)

### B2C Next.js App Router
- **Structure**: Uses Next.js App Router (file-based routing in `app/` directory)
- **Styling**: Tailwind CSS with PostCSS (see `postcss.config.mjs`)
- **SEO**: All salon-specific pages must include structured data (JSON-LD) for LocalBusiness and AggregateRating
- **Auth**: Clerk integration (environment variables in `.env`)
- **API Calls**: Use the NestJS backend at `process.env.NEXT_PUBLIC_API_URL` (default: `http://localhost:3001`)

### B2B Vite + React SPA
- **Routing**: TanStack Router (file-based routing config in `src/routes/`)
- **Data Fetching**: TanStack Query for server state management
- **Form Validation**: Zod schemas with React Hook Form
- **State**: Component-level state; TanStack Query for async data
- **Build**: Vite for fast HMR and optimized production builds

## Environment Variables

### B2C Frontend (`apps/web-customer-site/.env`)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...  # From Clerk dashboard
CLERK_SECRET_KEY=...                    # From Clerk dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/profile
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### NestJS Backend (`apps/api-customer/.env`)
```
PORT=3001  # Default port for API
```

**Important**: Never commit `.env` files. Use `.env.example` as a template.

## Key Business Logic & Constraints

- **Mandatory Registration**: B2C marketplace does NOT support guest checkout
- **Calendar**: B2B system uses internal calendar only (no external sync)
- **Reviews**: Only allowed if `AppointmentStatus` is `COMPLETED`
- **Loyalty**: Points are salon-scoped (points in Salon X = spend in Salon X)
- **Blacklist System**: Users marked as "no-show" 3 times are blocked
- **Multi-tenancy**: Strict multi-tenancy enforcement in PostgreSQL queries
- **Monetization**: Hybrid model (SaaS Subscription + Commission per booking)

## Testing

- **Backend**: Jest (configured in `apps/api-customer/package.json`)
  - Unit tests: `*.spec.ts` files alongside source
  - E2E tests: `test/jest-e2e.json` configuration
- **B2B Frontend**: Vitest (configured in `apps/web-manager/package.json`)
  - Project: `unit` (default)
  - Watch mode: `pnpm test:watch`
- **B2C Frontend**: No test setup yet

## Linting & Formatting

- **ESLint**: Configured per-app via `eslint.config.js` / `eslint.config.mjs`
- **Shared Config**: `packages/eslint-config` for consistency
- **Prettier**: Root-level configuration (3.7.4)
- **Commands**:
  - `pnpm lint` (all apps)
  - `pnpm format` (format TypeScript, TSX, and Markdown files)

## File Structure Quick Reference

```
beautyfinder/
├── apps/
│   ├── api-customer/          # NestJS backend (REST API)
│   │   └── src/
│   │       ├── salon/         # Salon business logic
│   │       └── review/        # Review business logic
│   ├── web-customer-site/     # Next.js B2C marketplace
│   │   ├── app/               # App Router pages and layouts
│   │   ├── components/        # Page-specific components
│   │   └── proxy.ts           # API proxy configuration
│   ├── web-manager/           # Vite + React B2B SaaS
│   │   └── src/
│   │       └── routes/        # TanStack Router definitions
│   └── docs/                  # Storybook component documentation
├── packages/
│   ├── ui/                    # Shadcn + Tailwind component library
│   ├── eslint-config/         # Shared ESLint rules
│   └── typescript-config/     # Shared tsconfig.json files
├── pg-playground/             # Docker Compose for PostgreSQL
├── turbo.json                 # Turbo build configuration
├── pnpm-workspace.yaml        # Workspace definitions
└── package.json               # Root scripts
```

## Turbo Configuration

- **`turbo.json`** defines task dependencies and caching behavior:
  - `build`: Depends on dependencies' `build` tasks; inputs include `.env*` files; outputs: `.next/**`
  - `lint` & `check-types`: Depend on dependencies' same tasks
  - `dev`: No caching; persistent (long-running)

## Running Tests

```bash
# Backend (all tests)
cd apps/api-customer && pnpm test

# Backend (single test file)
cd apps/api-customer && pnpm test app.controller.spec.ts

# Backend (watch mode)
cd apps/api-customer && pnpm test:watch

# Backend (coverage)
cd apps/api-customer && pnpm test:cov

# B2B Frontend (all tests)
cd apps/web-manager && pnpm test

# B2B Frontend (watch mode)
cd apps/web-manager && pnpm test:watch
```

## Common Workflows

### Adding a New Endpoint (Backend)

1. Create or update a module in `apps/api-customer/src/` (e.g., `salon/`)
2. Define the service (business logic) and controller (HTTP routing)
3. Run `pnpm dev --filter=api-customer` to test
4. Write tests in `.spec.ts` files
5. Run `pnpm test --filter=api-customer`

### Adding a New Page (B2C)

1. Create a folder structure in `apps/web-customer-site/app/`
2. Add a `page.tsx` file for the route
3. If using dynamic data, fetch from the NestJS API
4. Add structured data (JSON-LD) if it's a salon-specific page
5. Test locally with `pnpm dev --filter=web-customer-site`

### Adding a New Component

1. Check `packages/ui` for similar components first
2. If creating a new one, add it to `packages/ui` and document in Storybook
3. Export from `packages/ui/index.ts` so it can be imported by apps

### Running a Specific Test

```bash
cd apps/api-customer
pnpm test -- --testNamePattern="test name or pattern"
```

## Debugging

### Backend
- Use `pnpm start:debug --filter=api-customer` for Node.js debugging
- Attach debugger to port 9229

### Frontend
- Use browser DevTools (F12)
- React DevTools browser extension recommended
- TanStack Query DevTools available in `web-manager`

### Logs
- Check terminal output from `pnpm dev` for real-time logs
- Review `.turbo/` cache logs if builds fail silently

## Notes for Future Enhancements

1. **Shared Packages**: Create `packages/shared` for shared types and Zod schemas as the codebase grows
2. **Database ORM**: Currently no ORM (Prisma/TypeORM) is integrated; add when database layer is formalized
3. **B2C Tests**: Add test setup for `web-customer-site` (Next.js supports Jest/Vitest)
4. **API Documentation**: Consider adding Swagger/OpenAPI documentation to NestJS backend
5. **Error Handling**: Establish consistent error response formats across the API
