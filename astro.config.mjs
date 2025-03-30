// @ts-check
import { defineConfig } from 'astro/config';
import config from '~/site.config'
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://ivyneeds.rest",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  }
});