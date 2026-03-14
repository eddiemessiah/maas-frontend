/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://maas-api.up.railway.app",
  },
  experimental: {
    serverComponentsExternalPackages: ["bls-eth-wasm", "@lighthouse-web3/sdk"],
  },
};

export default nextConfig;
