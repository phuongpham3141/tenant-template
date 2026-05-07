/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['shop.huayuesc.local'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio.huayuesc.com' },
      { protocol: 'http',  hostname: 'minio' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
}

export default nextConfig
