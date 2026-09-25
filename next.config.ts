import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  typedRoutes: true,
  async rewrites() {
    return [{ source: '/__design-system', destination: '/design-system' }]
  },
}

export default nextConfig
