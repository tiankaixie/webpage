import { SITE } from '~/config'

export async function GET() {
  const base = import.meta.env.BASE_URL

  const manifest = {
    name: SITE.title,
    short_name: 'TK Home',
    description: SITE.description,
    icons: [
      { src: `${base}icon-192.png`, type: 'image/png', sizes: '192x192' },
      { src: `${base}icon-512.png`, type: 'image/png', sizes: '512x512' },
      {
        src: `${base}icon-mask.png`,
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
    scope: base,
    start_url: base,
    display: 'standalone',
    theme_color: '#0a0a0a',
    background_color: '#ffffff',
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
    },
  })
}
