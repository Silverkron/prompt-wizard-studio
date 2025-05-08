
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = process.env.VITE_BASE_URL || '/';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      wasm(), // Add WebAssembly support
      topLevelAwait(), // Required for WebAssembly
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
  };
});
