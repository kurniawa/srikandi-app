/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: 'daisyui.com' }] },
};

module.exports = nextConfig;
