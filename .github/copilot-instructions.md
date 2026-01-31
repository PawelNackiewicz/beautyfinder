# Beautyfinder Ecosystem - Global Business Rules

Beautyfinder is a dual-app ecosystem for the beauty & wellness industry, operating as a high-performance Monorepo.

B2C (Marketplace), `../apps/web-customer-site`, `../apps/api-customer` : Booking platform for clients (Next.js + NestJS). No Guest Checkout. Features: Last Minute deals, Social Media portfolios, medical/allergy history.

B2B (SaaS CRM), `../apps/web-customer-site`: Operating system for salons (React). Multi-location management. Roles: Owner, Manager, Reception, Staff.

Docs & UI, `../apps/docs` `../packages/ui`: Shared component library (Shadcn/Tailwind) documented via Storybook.

## Core Logic:

- **B2C Marketplace:** Mandatory registration, no Guest Checkout.
- **B2B SaaS:** Operating system for salons. MUST use our internal calendar (no external sync).
- **Monetization:** Hybrid model (SaaS Subscription + Commission per Marketplace booking).
- **Reviews:** Only allowed if `AppointmentStatus` is `COMPLETED` in the B2B system.
- **Loyalty:** Points are salon-scoped (Point in Salon X = Spend in Salon X).
- **Discipline:** "Blacklist" system blocks users after 3 "no-show" statuses.

## Technical Constraints:

- Monorepo structure.
- Frontend B2B: React (Vite/SPA) – focus on data density and performance.
- Frontend B2C: Next.js (App Router) – focus on SEO, Core Web Vitals, and conversion.
- Backend: NestJS (REST API) – centralized business logic for both apps.
- Styling: Tailwind CSS + Shadcn UI (Shared package), Atomic Design.
- Documentation: Storybook (housed in packages/ui or apps/docs).
- Data Layer: PostgreSQL (Prisma/TypeORM) with strict Multi-tenancy.
- No hardcoded secrets. Always use environment variables.

## Architectural Patterns

Shared Packages: Shared TypeScript interfaces and Zod schemas live in packages/shared. Always prioritize using shared types over local definitions.

API Design: Use NestJS Modules to separate B2B and B2C logic, but share the underlying Service layer for data consistency.

UI Consistency: Before creating a new UI component, check packages/ui. Use Storybook as the reference for existing components.

## SEO & Marketplace Guidelines

Local SEO is a priority for B2C. All salon-specific pages in Next.js must include structured data (JSON-LD) for LocalBusiness and AggregateRating.
