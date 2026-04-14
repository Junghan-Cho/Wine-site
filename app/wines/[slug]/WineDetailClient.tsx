'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useLanguage } from '@/lib/language-provider'
import { REGION_NAME_TO_KEY, TYPE_LABEL_KEYS } from '@/lib/i18n/region-type-keys'
import { wines } from '@/data/wines'
import { wineries } from '@/data/wineries'
import { varietals } from '@/data/varietals'
import { withLangPrefix } from '@/lib/i18n/locale'
import { displayVarietal, displayWine, displayWinery } from '@/lib/i18n/content'
import { trackViewContent } from '@/lib/analytics'

export default function WineDetailClient({ slug }: { slug: string }) {
  const { lang, t } = useLanguage()
  const wine = wines.find((w) => w.slug === slug)

  useEffect(() => {
    if (!wine) return
    trackViewContent('wine', wine.slug)
  }, [wine])

  if (!wine) return null

  const winery = wineries.find((w) => w.slug === wine.winerySlug)
  const wineVarietals = varietals.filter((v) => wine.varietalSlugs.includes(v.slug))
  const tech = wine.technical || {}
  const wineDisplay = displayWine(wine, lang)
  const wineryDisplay = winery ? displayWinery(winery, lang) : null

  return (
    <section className="space-y-8">
      <Link
        href={winery ? withLangPrefix(`/wineries/${winery.slug}`, lang) : withLangPrefix('/map', lang)}
        className="text-xs text-slate-400 hover:text-accent"
      >
        ← {winery && wineryDisplay ? `${t('back_to')} ${wineryDisplay.name}` : t('back_to_map')}
      </Link>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] md:items-start">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {wine.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={wine.imageUrl} alt={wine.nameEn} className="h-56 w-full object-cover md:h-64" />
          ) : (
            <div className="flex h-56 items-center justify-center text-xs text-slate-500 md:h-64">No image yet</div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="font-display text-2xl text-slate-50">{wineDisplay.name}</h1>
            {lang === 'ko' && wine.nameKo && <p className="text-sm text-slate-400">{wine.nameEn}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-100">
              {TYPE_LABEL_KEYS[wine.type] ? t(TYPE_LABEL_KEYS[wine.type]) : wine.type}
            </span>
            <span className="text-slate-400">
              {REGION_NAME_TO_KEY[wine.region] ? t(REGION_NAME_TO_KEY[wine.region]) : wine.region}
              {winery && (
                <>
                  {' · '}
                  <Link href={withLangPrefix(`/wineries/${winery.slug}`, lang)} className="text-accent hover:underline">
                    {wineryDisplay?.name ?? winery.nameEn}
                  </Link>
                </>
              )}
            </span>
          </div>

          {wine.oneLiner && <p className="text-sm text-slate-200">{wine.oneLiner}</p>}

          {Object.keys(tech).length > 0 && (
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-200">
              <h2 className="text-sm font-semibold text-slate-100">{t('technical_sheet')}</h2>
              <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1">
                {tech.alcohol && (
                  <>
                    <dt className="text-slate-400">Alcohol</dt>
                    <dd>{tech.alcohol}</dd>
                  </>
                )}
                {tech.acidity && (
                  <>
                    <dt className="text-slate-400">Acidity</dt>
                    <dd>{tech.acidity}</dd>
                  </>
                )}
                {tech.pH && (
                  <>
                    <dt className="text-slate-400">pH</dt>
                    <dd>{tech.pH}</dd>
                  </>
                )}
                {tech.residualSugar && (
                  <>
                    <dt className="text-slate-400">Residual sugar</dt>
                    <dd>{tech.residualSugar}</dd>
                  </>
                )}
                {tech.barrel && (
                  <>
                    <dt className="text-slate-400">Oak / ageing</dt>
                    <dd>{tech.barrel}</dd>
                  </>
                )}
                {tech.bottlingDate && (
                  <>
                    <dt className="text-slate-400">Bottling</dt>
                    <dd>{tech.bottlingDate}</dd>
                  </>
                )}
                {tech.blend && (
                  <>
                    <dt className="text-slate-400">Blend</dt>
                    <dd>{tech.blend}</dd>
                  </>
                )}
              </dl>
              {wine.technicalPdfUrl && (
                <a href={wine.technicalPdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-[11px] text-accent hover:underline">
                  Download full tech sheet (PDF)
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {wineVarietals.length > 0 && (
        <div className="space-y-3 text-xs">
          <h2 className="font-display text-lg text-slate-50">{t('varietals_section')}</h2>
          <div className="flex flex-wrap gap-2">
            {wineVarietals.map((v) => (
              <Link key={v.id} href={withLangPrefix(`/varietals/${v.slug}`, lang)} className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:border-accent">
                {displayVarietal(v, lang).name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

