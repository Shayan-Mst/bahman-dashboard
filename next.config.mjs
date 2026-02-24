/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the secret sauce for Chakra UI v3 and Lucide performance
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "lucide-react"],
  },
  // If you are using images from dummyjson.com, you need this too
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
    ],
  },
};

export default nextConfig;