# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog and portfolio website using the AntfuStyle theme. It's a customizable, feature-rich theme inspired by antfu.me with support for blogs, projects, music, and changelog pages.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (opens browser automatically)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run sync` - Sync Astro types and schema

### Code Quality & Formatting
- `npm run lint` - Run ESLint with caching
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Check code formatting with Prettier
- `npm run format:write` - Apply Prettier formatting with caching
- `npm run check` - Run Astro's built-in type checking

### Build Pipeline
- `npm run postbuild` - Runs after build to generate search index with Pagefind

## Architecture

### Core Structure
- **Framework**: Astro 4.x with experimental content layer enabled
- **Styling**: UnoCSS with custom theme and animations
- **Content**: MDX and Markdown with custom plugins
- **Search**: Pagefind for client-side search
- **Type Safety**: Full TypeScript support with Zod schemas

### Key Directories
- `src/components/` - Reusable UI components organized by category
  - `backgrounds/` - Animated background components (Dot, Particle, Plum, Rose)
  - `base/` - Core UI components (NavBar, Footer, BlogCard, etc.)
  - `music/` - Music-related React components
  - `views/` - Content display components (ListView, GithubView, etc.)
  - `widgets/` - Small interactive components (ThemeSwitch, SearchSwitch, etc.)
- `src/content/` - Content collections with schemas
- `src/layouts/` - Page layout components
- `src/pages/` - Route definitions and page components
- `src/utils/` - Utility functions for common operations
- `plugins/` - Custom Remark/Rehype plugins for content processing

### Content Collections
- `blog/` - Blog posts with full frontmatter schema
- `projects/` - Project data (JSON-based)
- `changelog/` - Version changelog entries
- `streams/` - Stream data (JSON-based)
- `feeds/` - External RSS feed integration
- `releases/` - GitHub releases via astro-loader-github-releases
- `prs/` - GitHub PRs via astro-loader-github-prs

### Configuration System
- `src/config.ts` - Main site configuration (SITE, UI, FEATURES)
- `astro.config.ts` - Astro framework configuration
- `unocss.config.ts` - UnoCSS utility-first CSS configuration
- `eslint.config.js` - ESLint configuration with Astro support

### Custom Plugins
- `plugins/remark-directive-sugar.ts` - Enhanced markdown directive syntax
- `plugins/remark-generate-og-image.ts` - Dynamic OG image generation
- `plugins/remark-image-container.ts` - Image container processing
- `plugins/remark-reading-time.ts` - Reading time calculation

### Key Features
- **Animated Backgrounds**: Four types (Dot, Particle, Plum, Rose) with customizable settings
- **OG Image Generation**: Dynamic social media images using Satori
- **GitHub Integration**: Automatic loading of releases and PRs
- **Search**: Client-side search with Pagefind
- **Theme System**: Light/dark mode with smooth transitions
- **Content Processing**: Enhanced markdown with callouts, math, and custom directives

## Development Notes

### Content Management
- Blog posts use full frontmatter schema defined in `src/content/config.ts`
- Projects and streams use JSON data files in their respective content directories
- All content supports TypeScript type safety through Zod schemas

### Styling Approach
- UnoCSS for utility-first styling
- Custom CSS in `src/styles/` for complex components
- Responsive design with mobile-first approach
- Animated backgrounds using CSS animations and JavaScript

### Performance Considerations
- Astro's partial hydration for optimal performance
- React components only where interactivity is needed
- Optimized image handling with Astro's image service
- Build-time content processing for better runtime performance

### Testing & Quality
- ESLint with Astro-specific rules
- Prettier for consistent formatting
- Pre-commit hooks via simple-git-hooks
- Astro's built-in type checking

## Common Patterns

### Adding New Content
- Blog posts: Add `.md` files to `src/content/blog/`
- Projects: Update `src/content/projects/data.json`
- Streams: Update `src/content/streams/data.json`

### Component Development
- Use Astro components for static content
- Use React components for interactive features
- Follow existing naming conventions and file organization
- Implement proper TypeScript types

### Configuration Updates
- Site-wide settings in `src/config.ts`
- UI layout and navigation in the `UI` export
- Feature toggles in the `FEATURES` export