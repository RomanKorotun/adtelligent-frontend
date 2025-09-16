import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { imagetools } from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    Inspect(),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      format: { comments: false },
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "stats.html",
          open: true,
        }),
      ],
    },
  },
});
