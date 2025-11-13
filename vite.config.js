import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(
    {
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/icon-192.png', 'icons/icon-512.png', 'screenshots/01.jpg'],
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: "App with storage",
        short_name: "Practica",
        description: "Aplicacion de practica con almacenamiento",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        screenshots: [
          {
            src: "/screenshots/01.jpg",
            sizes: "720x410",
            type: "image/jpg",
            form_factor: "wide"
          }, {
            src: "/screenshots/01.jpg",
            sizes: "736x1309",
            type: "image/jpg",
            form_factor: "narrow"
          }
        ],
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          }, {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }
  )],
  server: {
    host: true
  },
})
