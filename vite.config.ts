import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: isSsrBuild
        ? undefined
        : {
            manualChunks(id) {
              if (!id.includes("node_modules")) {
                return undefined;
              }

              if (
                id.includes("/react/") ||
                id.includes("/react-dom/") ||
                id.includes("/scheduler/") ||
                id.includes("/wouter/")
              ) {
                return "react-vendor";
              }

              if (id.includes("/framer-motion/")) {
                return "motion-vendor";
              }

              if (id.includes("/lucide-react/")) {
                return "icons-vendor";
              }

              if (id.includes("/react-helmet-async/")) {
                return "seo-vendor";
              }

              if (id.includes("/@vercel/")) {
                return "analytics-vendor";
              }

              if (id.includes("/sonner/")) {
                return "ui-vendor";
              }

              return undefined;
            },
          },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: command === "serve" ? ["localhost", "127.0.0.1"] : undefined,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
