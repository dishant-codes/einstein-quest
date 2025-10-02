import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const apiTarget = isDevelopment 
    ? 'http://localhost:5001' 
    : 'https://einstein-quest-server.onrender.com';

  return {
  base: "/",
  plugins: [
    react()
  ],
  root: "client",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          swiper: ['swiper'],
          icons: ['lucide-react']
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    assetsDir: 'assets',
    copyPublicDir: true
  },
  server: {
    port: 5000,
    host: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: !isDevelopment
      }
    }
  },
  preview: {
    port: 5000,
    host: true
  }
  };
});
