/** @type {import('next').NextConfig} */
const securityHeaders = []
const ContentSecurityPolicy = `
  img-src 'self' data: https://firebasestorage.googleapis.com;
`

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ]
  },

}
module.exports = nextConfig
