const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: 'daisyui.com' }, {hostname: 'firebasestorage.googleapis.com'}] },
};

module.exports = nextConfig;
