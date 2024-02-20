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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tanthanh.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'portfolio-0gem.onrender.com',
      },
    ],
  },
}
