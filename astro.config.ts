import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import tailwindcss from '@tailwindcss/vite'
import astroExpressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'

import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  integrations: [
    sitemap(),
    robotsTxt(),
    astroExpressiveCode(),
    mdx(),
    react(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
    directRenderScript: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: { chunkSizeWarningLimit: 1200 },
  },
})
