require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'storage.cloud.google.com',
        pathname: '/portfolio-database-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/portfolio-database-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'portfolio-m47y.onrender.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thanhtan0501.vercel.app',
      },
    ],
  },
}
