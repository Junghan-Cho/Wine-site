'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { useLanguage } from '@/lib/language-provider'
import { REGION_NAME_TO_KEY, TYPE_LABEL_KEYS } from '@/lib/i18n/region-type-keys'
import { varietals } from '@/data/varietals'
import { wines } from '@/data/wines'
import { withLangPrefix } from '@/lib/i18n/locale'
import { displayVarietal, displayWine } from '@/lib/i18n/content'
import { trackViewContent } from '@/lib/analytics'

type PageProps = {
  params: { slug: string }
}

const BODY_LABEL_KEYS: Record<string, string> = {
  가벼움: 'light_refreshing',
  미디엄: 'medium_versatile',
  풀바디: 'full_powerful',
}

export default function VarietalDetailPage({ params }: PageProps) {
  const { lang, t } = useLanguage()
  const varietal = varietals.find((v) => v.slug === params.slug)

  useEffect(() => {
    if (!varietal) return
    trackViewContent('varietal', varietal.slug)
  }, [varietal])

  if (!varietal) {
    return notFound()
  }

  const relatedVarietals = varietals.filter((v) => varietal.relatedVarietalSlugs.includes(v.slug))
  const winesFromVarietal = wines.filter((w) => w.varietalSlugs.includes(varietal.slug))
  const dv = displayVarietal(varietal, lang)

  return (
    <section className="space-y-8">
      <Link href={withLangPrefix('/varietals', lang)} className="text-xs text-slate-400 hover:text-accent">
        ← {t('back_to_varietals')}
      </Link>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] md:items-start">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {varietal.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={varietal.imageUrl}
              alt={varietal.nameEn}
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
              {dv.name}
            </h1>
            {lang === 'ko' && <p className="text-sm text-slate-400">{varietal.nameEn}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-100">
              {TYPE_LABEL_KEYS[varietal.type] ? t(TYPE_LABEL_KEYS[varietal.type]) : varietal.type}
            </span>
            {varietal.regions.length > 0 && (
              <span className="text-slate-400">
                · {varietal.regions.map((r) => REGION_NAME_TO_KEY[r] ? t(REGION_NAME_TO_KEY[r]) : r).join(', ')}
              </span>
            )}
            {varietal.body && (
              <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-200">
                {t('body')}: {BODY_LABEL_KEYS[varietal.body] ? t(BODY_LABEL_KEYS[varietal.body]) : varietal.body}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-200">
            {dv.oneLiner}
          </p>
          <div className="space-y-1 text-sm text-slate-300">
            <h2 className="font-semibold text-slate-100">{t('taste_aroma')}</h2>
            <p className="text-sm text-slate-300">
              {dv.tasteAndAroma}
            </p>
          </div>
        </div>
      </div>

      {varietal.pairings.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg text-slate-50">{t('food_pairings')}</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {varietal.pairings.map((p) => (
              <span
                key={p}
                className="rounded-full bg-slate-900 px-3 py-1 text-slate-100"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {winesFromVarietal.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg text-slate-50">
            {t('representative_wines')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {winesFromVarietal.map((w) => {
              const dw = displayWine(w, lang)
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
                <div className="font-semibold">{dw.name}</div>
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

      {relatedVarietals.length > 0 && (
        <div className="space-y-3">
            <h2 className="font-display text-lg text-slate-50">
            {t('related_varietals')}
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {relatedVarietals.map((v) => (
              <Link
                key={v.id}
                href={withLangPrefix(`/varietals/${v.slug}`, lang)}
                className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:border-accent"
              >
                {displayVarietal(v, lang).name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

