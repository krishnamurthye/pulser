/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["placehold.co"], // Add the domain names for your images
  },
};

export default nextConfig;
