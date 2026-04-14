'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-provider'
import { TYPE_LABEL_KEYS } from '@/lib/i18n/region-type-keys'
import { varietals } from '@/data/varietals'
import { withLangPrefix } from '@/lib/i18n/locale'
import { displayVarietal } from '@/lib/i18n/content'

const TYPE_FILTERS: { value: 'all' | string; labelKey: string }[] = [
  { value: 'all', labelKey: 'all_types' },
  { value: '레드', labelKey: 'filter_red' },
  { value: '화이트', labelKey: 'filter_white' },
  { value: '로제', labelKey: 'filter_rose' },
  { value: '스파클링', labelKey: 'filter_sparkling' },
]

export default function VarietalsPage() {
  const { lang, t } = useLanguage()
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all')

  const filtered =
    typeFilter === 'all'
      ? varietals
      : varietals.filter((v) => v.type === typeFilter)

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-2xl text-slate-50">{t('varietals_title')}</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          {t('varietals_subtitle')}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-slate-300">{t('type')}:</span>
        {TYPE_FILTERS.map((opt) => {
          const active = typeFilter === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTypeFilter(opt.value)}
              className={
                'rounded-full border px-3 py-1 text-xs ' +
                (active
                  ? 'border-accent bg-accent text-slate-900'
                  : 'border-slate-700 bg-surface text-slate-200 hover:border-slate-500')
              }
            >
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => {
          const dv = displayVarietal(v, lang)
          return (
            <Link
              key={v.id}
              href={withLangPrefix(`/varietals/${v.slug}`, lang)}
              className="flex flex-col rounded-xl border border-slate-800 bg-surface p-4 text-sm text-slate-200 transition-colors hover:border-accent"
            >
            {v.imageUrl && (
              <div className="mb-3 h-28 overflow-hidden rounded-lg bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.imageUrl}
                  alt={v.nameEn}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <div>
                <div className="font-semibold">{dv.name}</div>
                {lang === 'ko' && <div className="text-xs text-slate-400">{v.nameEn}</div>}
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200">
                {TYPE_LABEL_KEYS[v.type] ? t(TYPE_LABEL_KEYS[v.type]) : v.type}
              </span>
            </div>
            <p className="line-clamp-3 text-xs text-slate-300">
              {dv.oneLiner}
            </p>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-400">
          {t('no_varietals_match')}
        </p>
      )}
    </section>
  )
}

