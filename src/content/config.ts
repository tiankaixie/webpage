import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { feedLoader } from '@ascorbic/feed-loader'
import { githubReleasesLoader } from 'astro-loader-github-releases'
import { githubPrsLoader } from 'astro-loader-github-prs'
import { pageSchema, streamsSchema } from './schema'

const githubToken = import.meta.env.GITHUB_TOKEN

const disabledGithubLoader = (
  name: string,
  schema: ReturnType<
    typeof githubReleasesLoader | typeof githubPrsLoader
  >['schema']
) => ({
  name,
  schema,
  load: async ({ store }: { store: { clear: () => void } }) => {
    store.clear()
  },
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    toc: z.boolean(),
    ogImage: z.union([z.string(), z.boolean()]),
    pubDate: z.date(),
    radio: z.boolean(),
    video: z.boolean(),
    platform: z.string(),
    share: z.boolean(),
    draft: z.boolean(),
    lastModDate: z.string().optional(),
    minutesRead: z.number().optional(),
    redirect: z.string().optional(),
  }),
})

const changelog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
    pubDate: z.date(),
    ogImage: z.union([z.string(), z.boolean()]).optional(),
    toc: z.boolean().optional().default(true),
  }),
})

const streams = defineCollection({
  type: 'data',
  schema: streamsSchema,
})

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})

const githubReleases = githubReleasesLoader({
  loadMode: 'repoList',
  modeConfig: {
    repos: [
      'withastro/astro',
      'withastro/starlight',
      'lin-stephanie/astro-loaders',
      'lin-stephanie/astro-antfustyle-theme',
    ],
    monthsBack: 3,
    entryReturnType: 'byRelease',
    githubToken,
  },
})

const releases = defineCollection({
  loader: githubToken
    ? githubReleases
    : disabledGithubLoader('github-releases-disabled', githubReleases.schema),
})

const githubPrs = githubPrsLoader({
  search:
    'repo:withastro/astro repo:withastro/starlight repo:lin-stephanie/astro-antfustyle-theme',
  monthsBack: 2,
  githubToken,
})

const prs = defineCollection({
  loader: githubToken
    ? githubPrs
    : disabledGithubLoader('github-prs-disabled', githubPrs.schema),
})

const home = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    features: z.array(
      z.object({
        name: z.string(),
        link: z.string().optional(),
      })
    ),
  }),
})

export const collections = {
  pages,
  blog,
  changelog,
  streams,
  feeds,
  releases,
  prs,
  home,
}
