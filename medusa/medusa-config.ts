import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: (process.env.MEDUSA_WORKER_MODE as any) || "shared",
  },
  admin: {
    vite: () => ({
      server: {
        allowedHosts: [
          'admin.huayuesc.local',
          'api.huayuesc.local',
          '.huayuesc.local',
          '.huayuesc.com',
          'localhost',
        ],
      },
    }),
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION || "us-east-1",
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              additional_client_config: { forcePathStyle: true },
            },
          },
        ],
      },
    },
    { resolve: "@medusajs/medusa/cache-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/event-bus-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/workflow-engine-redis", options: { redis: { url: process.env.REDIS_URL } } },

    // Custom domain modules (R16)
    { resolve: "./src/modules/marketplace" },
    { resolve: "./src/modules/catalog-ext" },
    { resolve: "./src/modules/rfq" },
    { resolve: "./src/modules/escrow" },
    { resolve: "./src/modules/payment-abstract" },
    { resolve: "./src/modules/fulfillment-pro" },
    { resolve: "./src/modules/returns" },
    { resolve: "./src/modules/dispute" },
    { resolve: "./src/modules/tenant" },
    { resolve: "./src/modules/auth-security" },
    { resolve: "./src/modules/rbac" },
    { resolve: "./src/modules/gdpr" },
    { resolve: "./src/modules/tax-engine" },
    { resolve: "./src/modules/audit-log" },
    { resolve: "./src/modules/search-platform" },
    { resolve: "./src/modules/notification-bus" },
    { resolve: "./src/modules/experimentation" },
    { resolve: "./src/modules/media-layer" },
    { resolve: "./src/modules/live-commerce" },
    { resolve: "./src/modules/ai-platform" },
    { resolve: "./src/modules/marketing-ads" },
    { resolve: "./src/modules/marketing-email" },
    { resolve: "./src/modules/vn-sourcing" },
    { resolve: "./src/modules/communication" },
    { resolve: "./src/modules/ai-livestream" },
  ],
})
