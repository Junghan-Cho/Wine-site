import { NextResponse } from 'next/server'
import { SUPPORTED_LANGS } from '@/lib/i18n/translations'
import { varietals } from '@/data/varietals'
import { wineries } from '@/data/wineries'
import { wines } from '@/data/wines'

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
  return 'https://vinhub.vercel.app'
}

function escXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function GET() {
  const base = siteOrigin()
  const lastmod = new Date().toISOString()
  const locs: string[] = []

  const staticPaths = ['/', '/map', '/varietals', '/recommend', '/search', '/glossary', '/vinlog']
  for (const lang of SUPPORTED_LANGS) {
    for (const p of staticPaths) {
      const path = p === '/' ? `/${lang}` : `/${lang}${p}`
      locs.push(`${base}${path}`)
    }
  }

  for (const lang of SUPPORTED_LANGS) {
    for (const v of varietals) {
      locs.push(`${base}/${lang}/varietals/${v.slug}`)
    }
    for (const w of wineries) {
      locs.push(`${base}/${lang}/wineries/${w.slug}`)
    }
    for (const w of wines) {
      locs.push(`${base}/${lang}/wines/${w.slug}`)
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => `  <url><loc>${escXml(loc)}</loc><lastmod>${escXml(lastmod)}</lastmod></url>`).join('\n')}
</urlset>`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
