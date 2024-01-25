import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import tailwind from "@astrojs/tailwind";
import lottie from "astro-integration-lottie";

// https://astro.build/config
export default defineConfig({
  site: 'https://duongital.com',
  markdown: {
    shikiConfig: {
      // theme: "github-light"
      theme: "slack-ochin"
    }
  },
  integrations: [
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    tailwind(),
    lottie()
  ]
});