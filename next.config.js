/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production validation alongside the running development server.
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  async headers() {
    return [{
      source: "/models/farrukh-hero.:hash.glb",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

export default nextConfig;
