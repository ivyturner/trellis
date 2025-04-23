// @ts-check
import { defineConfig } from 'astro/config';
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
});