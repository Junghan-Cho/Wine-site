import type { MetadataRoute } from 'next'
import { SUPPORTED_LANGS } from '@/lib/i18n/translations'
import { wineries } from '@/data/wineries'
import { wines } from '@/data/wines'
import { varietals } from '@/data/varietals'

// NOTE: Next will host this at /sitemap.xml. We generate locale-prefixed URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

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
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: p === '/' ? 1 : 0.7,
      })
    }

    for (const v of varietals) {
      entries.push({
        url: `/${lang}/varietals/${v.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const w of wineries) {
      entries.push({
        url: `/${lang}/wineries/${w.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const w of wines) {
      entries.push({
        url: `/${lang}/wines/${w.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return entries
}

