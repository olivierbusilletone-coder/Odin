import { defineConfig } from "vite";

export default defineConfig({
  base: "./",

  build: {
    chunkSizeWarningLimit: 1500
  },

  define: {
    global: "globalThis",
    "process.env": {}
  },

  resolve: {
    alias: {
      buffer: "buffer",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util/"
    }
  },

  optimizeDeps: {
    include: [
      "buffer",
      "process/browser",
      "stream-browserify",
      "util"
    ]
  }
});