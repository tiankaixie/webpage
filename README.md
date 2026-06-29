# Tiankai Xie — Personal Website

Personal website for Tiankai Xie's research, projects, writing, and music references. The interface uses a restrained monochrome system with experimental motion and media.

## Development

This project uses Astro, MDX, React, Tailwind CSS, and Pagefind. Use pnpm as the package manager.

```sh
pnpm install
pnpm dev
```

Quality checks:

```sh
pnpm check
pnpm lint
pnpm format
pnpm build
```

## Content

- Blog posts: `src/content/blog/`
- Projects: `src/content/projects/data.json`
- Changelog: `src/content/changelog/`
- Music: `src/data/music.ts`
- Site and feature configuration: `src/config.ts`

## Architecture

Astro renders the site statically. React is reserved for the interactive music gallery, while Markdown and MDX content is processed at build time. Pagefind generates the search index after the production build.

The site started from [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and retains its Markdown processing and content collection foundations.
