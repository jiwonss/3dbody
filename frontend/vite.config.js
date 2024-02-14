import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "3D Body",
        short_name: "3D Body",
        theme_color: "#ffffff",
        display: 'standalone',
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/realms": {
        target: "https://auth.meshcapade.com", //타겟이 되는 api url를 입력합니다.
        changeOrigin: true, 
        secure: false,
        ws: true,
      },
      "/avatars":{
        target: "https://api.meshcapade.com/api/v1", //타겟이 되는 api url를 입력합니다.
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
});
