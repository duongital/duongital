import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from "@astrojs/tailwind";

import sentry from "@sentry/astro";

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
      theme: "github-dark",
      // theme: "slack-ochin",
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
    sentry({
      dsn: "https://26791de3aac046e096168af5f072ec60@o4508776494792704.ingest.us.sentry.io/4508776909766656",
      sourceMapsUploadOptions: {
        project: "duongital",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ]
});