import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react()],
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
  output: 'hybrid',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});