import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://munakata-kids-unv.jp',
  integrations: [react(), sitemap()],
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  // trailingSlash: 'always',
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `@import "src/styles/_index.scss";`
  //       }
  //     }
  //   }
  // },
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true,
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});