'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { useLanguage } from '@/lib/language-provider'
import { REGION_NAME_TO_KEY, TYPE_LABEL_KEYS } from '@/lib/i18n/region-type-keys'
import { wineries } from '@/data/wineries'
import { wines } from '@/data/wines'
import { withLangPrefix } from '@/lib/i18n/locale'
import { displayWine, displayWinery } from '@/lib/i18n/content'
import { trackViewContent } from '@/lib/analytics'

type PageProps = {
  params: { slug: string }
}

export default function WineryDetailPage({ params }: PageProps) {
  const { lang, t } = useLanguage()
  const winery = wineries.find((w) => w.slug === params.slug)

  useEffect(() => {
    if (!winery) return
    trackViewContent('winery', winery.slug)
  }, [winery])

  if (!winery) {
    return notFound()
  }

  const wineryWines = wines.filter((w) => w.winerySlug === winery.slug)
  const wineryDisplay = displayWinery(winery, lang)

  return (
    <section className="space-y-8">
      <Link href={withLangPrefix('/map', lang)} className="text-xs text-slate-400 hover:text-accent">
        ← {t('back_to_map')}
      </Link>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] md:items-start">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {winery.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={winery.imageUrl}
              alt={winery.nameEn}
              className="h-56 w-full object-cover md:h-64"
            />
          ) : (
            <div className="flex h-56 items-center justify-center text-xs text-slate-500 md:h-64">
              No image yet
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="font-display text-2xl text-slate-50">
              {wineryDisplay.name}
            </h1>
            {lang === 'ko' && <p className="text-sm text-slate-400">{winery.nameEn}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-100">
              {REGION_NAME_TO_KEY[winery.region] ? t(REGION_NAME_TO_KEY[winery.region]) : winery.region}
            </span>
            {wineryDisplay.classification && (
              <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-200">
                {wineryDisplay.classification}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-200">
            {wineryDisplay.oneLiner}
          </p>

          {winery.address && (
            <div className="space-y-1 text-sm text-slate-300">
              <h2 className="font-semibold text-slate-100">{t('address')}</h2>
              <p>{winery.address}</p>
            </div>
          )}

          {winery.website && (
            <a
              href={winery.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs text-accent hover:underline"
            >
              Visit producer website →
            </a>
          )}
        </div>
      </div>

      {wineryWines.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg text-slate-50">
            {t('wines_from_producer')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wineryWines.map((w) => {
              const wineDisplay = displayWine(w, lang)
              return (
                <Link
                  key={w.id}
                  href={withLangPrefix(`/wines/${w.slug}`, lang)}
                  className="flex flex-col rounded-xl border border-slate-800 bg-surface p-4 text-xs text-slate-200 transition-colors hover:border-accent"
                >
                {w.imageUrl && (
                  <div className="mb-2 h-24 overflow-hidden rounded-md bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.imageUrl}
                      alt={w.nameEn}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="font-semibold">{wineDisplay.name}</div>
                {lang === 'ko' && w.nameKo && <div className="text-[11px] text-slate-400">{w.nameEn}</div>}
                <div className="text-[11px] text-slate-400">
                  {REGION_NAME_TO_KEY[w.region] ? t(REGION_NAME_TO_KEY[w.region]) : w.region} · {TYPE_LABEL_KEYS[w.type] ? t(TYPE_LABEL_KEYS[w.type]) : w.type}
                </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

