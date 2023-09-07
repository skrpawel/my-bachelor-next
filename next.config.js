/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    appName: 'trainKEEPER.',
  },
  swcMinify: true,
};

module.exports = nextConfig;
