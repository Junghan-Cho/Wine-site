import type { MetadataRoute } from 'next'
import { SUPPORTED_LANGS } from '@/lib/i18n/translations'

// NOTE: Next will host this at /sitemap.xml. We generate locale-prefixed URLs.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinhub.vercel.app').replace(/\/$/, '')

  const staticPaths = [
    '/',
    '/map',
    '/varietals',
    '/recommend',
    '/search',
    '/glossary',
    '/vinlog',
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const lang of SUPPORTED_LANGS) {
    for (const p of staticPaths) {
      const url = p === '/' ? `/${lang}` : `/${lang}${p}`
      entries.push({
        url: `${siteUrl}${url}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: p === '/' ? 1 : 0.7,
      })
    }
  }

  // Vercel 런타임에서 sitemap이 500이 되는 경우에도 기본 sitemap은 내려가도록 보호.
  try {
    const [{ varietals }, { wineries }, { wines }] = await Promise.all([
      import('@/data/varietals'),
      import('@/data/wineries'),
      import('@/data/wines'),
    ])

    for (const lang of SUPPORTED_LANGS) {
      for (const v of varietals) {
        entries.push({
          url: `${siteUrl}/${lang}/varietals/${v.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }

      for (const w of wineries) {
        entries.push({
          url: `${siteUrl}/${lang}/wineries/${w.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }

      for (const w of wines) {
        entries.push({
          url: `${siteUrl}/${lang}/wines/${w.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.5,
        })
      }
    }
  } catch {
    // ignore and keep static-only entries
  }

  return entries
}

