/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Dev only: accept HMR/scripts from any origin so client components hydrate
  // when accessed via raw IP, alternate hostnames, ngrok/Cloudflare tunnels, etc.
  // Production deploy should narrow this to the actual public domain.
  allowedDevOrigins: [
    'shop.huayuesc.local',
    'en.huayuesc.local',
    'cn.huayuesc.local',
    'vi.huayuesc.local',
    'admin.huayuesc.local',
    'cms.huayuesc.local',
    'api.huayuesc.local',
    'metrics.huayuesc.local',
    'minio.huayuesc.local',
    '192.168.0.11',
    '192.168.137.52',
    'localhost',
    '127.0.0.1',
    'huayuesc.vkesys.com',
    '*.vkesys.com',
    'huayuesc.com',
    '*.huayuesc.com',
    'huayuesc.vn',
    '*.huayuesc.vn',
    'cybersilkroads.com',
    '10.0.0.2',
    '10.0.0.3',
    '192.168.40.3',
    '*.cybersilkroads.com',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio.huayuesc.com' },
      { protocol: 'http',  hostname: 'minio' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Dev-mode demo behind Cloudflare: prevent the CDN from caching stale JS
  // bundles (Turbopack dev chunk names are stable, so a cached bundle would
  // mask deploys). no-store makes Cloudflare always revalidate with origin.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
    ];
  },
}

export default nextConfig
