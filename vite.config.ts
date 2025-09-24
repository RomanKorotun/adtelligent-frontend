import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import virtualModules from "./src/plugins/virtual_modules.plugin";

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
    virtualModules(),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src/api"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
      "@shared-types": path.resolve(__dirname, "src/types"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@config": path.resolve(__dirname, "src/config"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
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
