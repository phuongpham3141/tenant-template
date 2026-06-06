/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  devIndicators: false,
  // Long cache for static images (recompressed assets). Helps PageSpeed
  // "efficient cache policy" + repeat-view speed. stale-while-revalidate keeps
  // returning visitors fast while picking up rebuilt images within the window.
  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
  // Dev only: accept HMR/scripts from any origin so client components hydrate
  // when accessed via raw IP, alternate hostnames, ngrok/Cloudflare tunnels, etc.
  allowedDevOrigins: [
    'shop.huayuesc.local', 'en.huayuesc.local', 'cn.huayuesc.local', 'vi.huayuesc.local',
    'admin.huayuesc.local', 'cms.huayuesc.local', 'api.huayuesc.local', 'metrics.huayuesc.local',
    'minio.huayuesc.local', '192.168.0.11', '192.168.137.52', 'localhost', '127.0.0.1',
    'huayuesc.vkesys.com', '*.vkesys.com', 'huayuesc.com', '*.huayuesc.com',
    'huayuesc.vn', '*.huayuesc.vn', 'cybersilkroads.com', '10.0.0.2', '10.0.0.3',
    '192.168.40.3', '*.cybersilkroads.com',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio.huayuesc.com' },
      { protocol: 'http',  hostname: 'minio' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
