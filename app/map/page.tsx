'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-provider'
import { REGION_NAME_TO_KEY, TYPE_LABEL_KEYS } from '@/lib/i18n/region-type-keys'
import { wineries } from '@/data/wineries'
import { withLangPrefix } from '@/lib/i18n/locale'
import { trackFilter } from '@/lib/analytics'

const allRegions = Array.from(new Set(wineries.map((w) => w.region))).sort()
const ALL_REGIONS_VALUE = 'All regions'
const REGION_FILTERS = [ALL_REGIONS_VALUE, ...allRegions]

/** 데이터용 타입 값(한글). 필터 비교용으로 유지. */
const TYPE_VALUES = ['All types', '레드', '화이트', '로제', '스파클링'] as const

export default function MapPage() {
  const { lang, t } = useLanguage()
  const showKorean = lang === 'ko'
  const [regionFilter, setRegionFilter] = useState<string>(ALL_REGIONS_VALUE)
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_VALUES)[number]>('All types')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTasting, setFilterTasting] = useState(false)
  const [filterShop, setFilterShop] = useState(false)
  const [items, setItems] = useState(wineries)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const abort = new AbortController()
    const run = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('region', regionFilter === ALL_REGIONS_VALUE ? 'all' : regionFilter)
        params.set('type', typeFilter === 'All types' ? 'all' : typeFilter)
        if (filterTasting) params.set('tasting', '1')
        if (filterShop) params.set('shop', '1')
        if (searchQuery.trim()) params.set('q', searchQuery.trim())

        const res = await fetch(`/api/wineries?${params.toString()}`, {
          signal: abort.signal,
        })
        if (!res.ok) throw new Error('Failed to fetch wineries')
        const json = (await res.json()) as { items: typeof wineries; total: number }
        setItems(json.items)
      } catch (e) {
        if (!abort.signal.aborted) {
          // keep last good results on error
        }
      } finally {
        if (!abort.signal.aborted) setLoading(false)
      }
    }
    run()
    return () => abort.abort()
  }, [regionFilter, typeFilter, filterTasting, filterShop, searchQuery])

  const filtered = useMemo(() => items, [items])

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-2xl text-slate-50">{t('map_title')}</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          {t('map_subtitle')}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="mr-1 text-slate-300">{t('region')}:</span>
        {REGION_FILTERS.map((r) => {
          const active = regionFilter === r
          const regionLabel = r === ALL_REGIONS_VALUE ? t('all_regions') : (REGION_NAME_TO_KEY[r] ? t(REGION_NAME_TO_KEY[r]) : r)
          return (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRegionFilter(r)
                trackFilter('region', r)
              }}
              className={
                'rounded-full border px-3 py-1 ' +
                (active
                  ? 'border-accent bg-accent text-slate-900'
                  : 'border-slate-700 bg-surface text-slate-200 hover:border-slate-500')
              }
            >
              {regionLabel}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-300">{t('type')}:</span>
          {TYPE_VALUES.map((typeVal) => {
            const active = typeFilter === typeVal
            const typeLabel = typeVal === 'All types' ? t('all_types') : (TYPE_LABEL_KEYS[typeVal] ? t(TYPE_LABEL_KEYS[typeVal]) : typeVal)
            return (
              <button
                key={typeVal}
                type="button"
                onClick={() => {
                  setTypeFilter(typeVal)
                  trackFilter('type', typeVal)
                }}
                className={
                  'rounded-full border px-3 py-1 ' +
                  (active
                    ? 'border-accent bg-accent text-slate-900'
                    : 'border-slate-700 bg-surface text-slate-200 hover:border-slate-500')
                }
              >
                {typeLabel}
              </button>
            )
          })}
        </div>
        <label className="flex items-center gap-1 text-slate-300">
          <input
            type="checkbox"
            className="h-3 w-3 rounded border-slate-700 bg-slate-900"
            checked={filterTasting}
            onChange={(e) => {
              setFilterTasting(e.target.checked)
              trackFilter('tastingAvailable', e.target.checked ? '1' : '0')
            }}
          />
          {t('tasting_available')}
        </label>
        <label className="flex items-center gap-1 text-slate-300">
          <input
            type="checkbox"
            className="h-3 w-3 rounded border-slate-700 bg-slate-900"
            checked={filterShop}
            onChange={(e) => {
              setFilterShop(e.target.checked)
              trackFilter('hasShop', e.target.checked ? '1' : '0')
            }}
          />
          {t('has_shop')}
        </label>
        <input
          type="search"
          placeholder={t('search_name_region')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto rounded-full border border-slate-700 bg-surface px-3 py-1 text-xs text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w) => (
          <Link
            key={w.id}
            href={withLangPrefix(`/wineries/${w.slug}`, lang)}
            className="flex flex-col rounded-xl border border-slate-800 bg-surface p-4 text-sm text-slate-200 transition-colors hover:border-accent"
          >
            <div className="mb-1 font-semibold">{showKorean ? w.nameKo : w.nameEn}</div>
            {showKorean && <div className="mb-2 text-xs text-slate-400">{w.nameEn}</div>}
            <p className="line-clamp-3 text-xs text-slate-300">
              {w.oneLinerEn || w.oneLiner}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-slate-100">
                {REGION_NAME_TO_KEY[w.region] ? t(REGION_NAME_TO_KEY[w.region]) : w.region}
              </span>
              {w.tastingAvailable && <span>{t('tasting')}</span>}
              {w.hasShop && <span>{t('shop')}</span>}
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <p className="text-sm text-slate-400">Loading…</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-slate-400">
          {t('no_wineries_match')}
        </p>
      )}
    </section>
  )
}

