import type { Site, Ui, Features } from './types'

export const SITE: Site = {
  website: 'https://tiankaixie.com/',
  base: '/',
  title: "TK's Homepage",
  description:
    'AI researcher, developer, and builder. Working on the intersection of AI and everyday life.',
  author: 'Tiankai Xie',
  lang: 'en',
  ogLocale: 'en_US',
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/blog',
      title: 'Blog',
      displayMode: 'alwaysText',
      text: 'Blog',
    },
    {
      path: '/projects',
      title: 'Projects',
      displayMode: 'alwaysText',
      text: 'Projects',
    },
    {
      path: '/music',
      title: 'Music',
      displayMode: 'alwaysText',
      text: 'Music',
    },
    {
      path: '/changelog',
      title: 'Changelog',
      displayMode: 'iconToTextOnMobile',
      text: 'Changelog',
      icon: 'i-ri-draft-line',
    },
  ],
  socialLinks: [
    {
      link: 'https://github.com/tiankaixie',
      title: 'TK on GitHub',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
    {
      link: 'https://x.com/tiankaixie',
      title: 'TK on Twitter',
      displayMode: 'alwaysIcon',
      icon: 'i-ri-twitter-x-fill',
    },
    {
      link: 'https://www.linkedin.com/in/tiankaixie/',
      title: 'TK on LinkedIn',
      displayMode: 'alwaysIcon',
      icon: 'i-ri-linkedin-fill',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'socialLinks',
      'searchButton',
      'themeButton',
      // 'rssLink',
    ],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
  ],
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  githubView: {
    monorepos: [
      'tiankaixie/webpage',
      'tiankaixie/dotfiles',
      'tiankaixie/fui.nvim',
    ],
    mainLogoOverrides: [],
    subLogoMatches: [],
  },
}

/**
 * Configures whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
 */
export const FEATURES: Features = {
  share: [
    true,
    {
      twitter: [true, '@tiankaixie'],
      mastodon: false,
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'hover',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: 'Tiankai Xie',
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'particle',
    },
  ],
  slideEnterAnim: [true, { enterStep: 60 }],
}
