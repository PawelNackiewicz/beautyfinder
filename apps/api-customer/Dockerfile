# ── Stage 1: Base ─────────────────────────────────────────────────────────────
# Shared base image with pnpm installed
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# ── Stage 2: Dependencies ────────────────────────────────────────────────────
# Install only production + workspace dependencies
FROM base AS deps

# Copy workspace config files needed for install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api-customer/package.json ./apps/api-customer/package.json

# Create stub package.json for workspace packages referenced by api-customer
# (needed so pnpm doesn't fail on missing workspace deps)
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install all dependencies (including devDependencies for build stage)
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build ───────────────────────────────────────────────────────────
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api-customer/node_modules ./apps/api-customer/node_modules

# Copy source code for api-customer
COPY apps/api-customer ./apps/api-customer
COPY packages/typescript-config ./packages/typescript-config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Generate Prisma client
RUN cd apps/api-customer && npx prisma generate

# Build the NestJS application
RUN cd apps/api-customer && npx nest build

# ── Stage 4: Production ─────────────────────────────────────────────────────
FROM node:22-alpine AS production

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Security: run as non-root
RUN addgroup --system --gid 1001 nestjs && \
    adduser --system --uid 1001 nestjs
WORKDIR /app

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-customer/package.json ./apps/api-customer/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=build /app/apps/api-customer/dist ./apps/api-customer/dist

# Copy Prisma schema + generated client (needed at runtime for PrismaPg adapter)
COPY --from=build /app/apps/api-customer/prisma ./apps/api-customer/prisma
COPY --from=build /app/apps/api-customer/node_modules/.prisma ./apps/api-customer/node_modules/.prisma
COPY --from=build /app/node_modules/.pnpm/@prisma+client*/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.pnpm/prisma*/node_modules/prisma ./node_modules/prisma

USER nestjs

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

# Health check: uses the /health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

CMD ["node", "apps/api-customer/dist/main.js"]
