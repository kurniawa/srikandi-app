/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: 'daisyui.com' }] },
};

module.exports = nextConfig;
