/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '/a/**',
          },
          {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '/f/**',
          },
        ],
      }
}

module.exports = nextConfig
