import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // SSR entry lives in src/server.ts (error-page wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    // Vercel-native output only for real production builds (vite build);
    // dev-mode builds keep the default dist output.
    ...(mode === "production" ? [nitro({ preset: "vercel" })] : []),
  ],
}));
