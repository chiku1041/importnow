import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;

// Bindings for local `next dev` only. Calling this during `next build` starts
// workerd/miniflare, which can crash with access violations on Windows.
if (process.argv.includes("dev")) {
  initOpenNextCloudflareForDev();
}
