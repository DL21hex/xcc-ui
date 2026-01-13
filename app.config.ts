import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: 'solid' })]
  },
  middleware: "./src/middleware.ts",
  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2025-09-27"
  }
});