import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio.huayuesc.com' },
      { protocol: 'http',  hostname: 'minio' },
    ],
  },
}

export default withPayload(nextConfig)
