import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://munakata-kids-unv.jp',
  integrations: [react(), sitemap()],
  adapter: vercel(),
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
  output: 'hybrid',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});