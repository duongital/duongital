import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    base: ""
  },
  site: 'https://duongital.com',
  integrations: [mdx(), sitemap(), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), tailwind()]
});