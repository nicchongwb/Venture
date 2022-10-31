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
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // {
          //   key: 'Content-Security-Policy',
          //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          // },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          },
        ],
      },
    ]
  },

}
module.exports = nextConfig
