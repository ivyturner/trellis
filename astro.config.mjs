// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import config from './src/site.config'
import tailwindcss from '@tailwindcss/vite';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    pagefind()
  ],
  markdown: {
    shikiConfig: {
      theme: "gruvbox-dark-soft"
    },
  },

  experimental: {
  contentIntellisense: true,
    fonts: [{
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--fontapi-inter"
    }]
  }
});