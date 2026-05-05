# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

FROM base AS deps
COPY package*.json .npmrc* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS production
RUN apk add --no-cache curl
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 payload && \
    adduser --system --uid 1001 payload

# Next.js standalone output bundles deps + server.js
COPY --from=builder --chown=payload:payload /app/.next/standalone ./
COPY --from=builder --chown=payload:payload /app/.next/static ./.next/static
COPY --from=builder --chown=payload:payload /app/public ./public

USER payload

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
