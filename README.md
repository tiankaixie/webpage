# Tiankai Xie — Personal Website

Personal website for Tiankai Xie's research and writing. The interface uses a restrained monochrome editorial system with experimental motion and media.

## Development

This project uses Astro, MDX, and Tailwind CSS. Use pnpm as the package manager.

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
- Changelog: `src/content/changelog/`
- Site and feature configuration: `src/config.ts`

## Architecture

Astro renders the site statically, while Markdown and MDX content is processed at build time.

The site started from [Astro AntfuStyle Theme](https://github.com/lin-stephanie/astro-antfustyle-theme) and retains its Markdown processing and content collection foundations.
