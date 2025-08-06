/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize for better performance
  swcMinify: true,
  
  // Configure webpack to handle workspace packages
  transpilePackages: ['common'],
  
  // Configure webpack aliases
  webpack: (config) => {
    config.resolve.alias['@common'] = path.resolve(__dirname, '../common/src');
    return config;
  },
};

module.exports = nextConfig;
