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
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },

  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  minify: false, // Disable minification
}
