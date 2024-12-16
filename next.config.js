/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.cnsl-tikjda.com',
          // port:'8001'

        },
      ],
      },
}
module.exports = nextConfig
