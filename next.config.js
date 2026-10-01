/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production validation alongside the running development server.
  distDir: process.env.NEXT_BUILD_DIR || ".next",
};

export default nextConfig;
