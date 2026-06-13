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
    '*.huayuesc.com',
    '*.huayuesc.vn',
    'cybersilkroads.com',
    '*.cybersilkroads.com',
  ],
  images: {
    // TAM THOI cho LAN phase: Next 16 chan private IP trong optimizer (SSRF guard).
    // GO BO khi anh chuyen het sang https://media.cybersilkroads.com
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'minio.huayuesc.com' },
      { protocol: 'http',  hostname: 'minio' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // MinIO staging/prod (LAN) + media domain public — anh san pham medusa-media
      { protocol: 'http',  hostname: '192.168.40.52', port: '9000' },
      { protocol: 'http',  hostname: '192.168.40.62', port: '9000' },
      { protocol: 'https', hostname: 'media.cybersilkroads.com' },
    ],
  },
}

export default nextConfig
