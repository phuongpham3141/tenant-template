# syntax=docker/dockerfile:1.7

# === STAGE 1: Base ===
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# === STAGE 2: Dependencies ===
FROM base AS deps
COPY package*.json .npmrc* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

# === STAGE 3: Development (cho dev VM) ===
FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 9000 7001
CMD ["npm", "run", "dev"]

# === STAGE 4: Builder (production build) ===
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# === STAGE 5: Production runtime ===
FROM node:20-alpine AS production
RUN apk add --no-cache curl
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 medusa && \
    adduser --system --uid 1001 medusa

# Medusa v2 puts the built server at .medusa/server
COPY --from=builder --chown=medusa:medusa /app/.medusa/server ./
COPY --from=builder --chown=medusa:medusa /app/medusa-config.ts ./
COPY --from=builder --chown=medusa:medusa /app/package*.json ./
COPY --from=builder --chown=medusa:medusa /app/.npmrc* ./

RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

USER medusa

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:9000/health || exit 1

CMD ["node", "index.js"]
