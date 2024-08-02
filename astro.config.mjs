import { defineConfig } from "astro/config";
import AstroPWA from '@vite-pwa/astro'
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware"
  }),
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ['../..']
      }
    },
  },
  integrations: [
    AstroPWA({
        mode: 'development',
        base: '/',
        scope: '/',
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        manifest: {
          name: 'Cozy',
          short_name: 'Cozy',
          theme_color: '#ffffff',
        },
        pwaAssets: {
          config: true,
        },
        workbox: {
          navigateFallback: '/',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        },
        devOptions: {
          enabled: false,
          navigateFallbackAllowlist: [/^\//],
        },
        experimental: {
          directoryAndTrailingSlashHandler: true,
        }
    })
  ]
});