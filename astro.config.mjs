import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from "@astrojs/tailwind";
import lottie from "astro-integration-lottie";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://duongital.com',
  markdown: {
    shikiConfig: {
      // theme: "github-light"
      theme: "slack-ochin",
      wrap: true
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
    lottie(), sentry({
      dsn: "https://26791de3aac046e096168af5f072ec60@o4508776494792704.ingest.us.sentry.io/4508776909766656",
      sourceMapsUploadOptions: {
        project: "duongital",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ]
});