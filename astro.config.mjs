import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from "@astrojs/tailwind";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://duongital.com',
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    shikiConfig: {
      // theme: "github-light",
      theme: "slack-ochin",
      // wrap: true
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    tailwind(),
  ]
});