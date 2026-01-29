import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { wineries } from '../data/wineries'
import { wines } from '../data/wines'
import WineMap from '../components/WineMap'

const allRegions = Array.from(new Set(wineries.map((w) => w.region))).sort()
const REGIONS = ['전체', ...allRegions]

const WINE_TYPES = [
  { value: '전체', key: 'filter_all' },
  { value: '레드', key: 'type_red' },
  { value: '화이트', key: 'type_white' },
  { value: '로제', key: 'type_rose' },
  { value: '스파클링', key: 'type_sparkling' },
] as const

function wineryProducesType(winery: { wineSlugs: string[] }, wineType: string): boolean {
  if (wineType === '전체') return true
  return wines.some((w) => winery.wineSlugs.includes(w.slug) && w.type === wineType)
}

function getInitialRegion(searchParams: URLSearchParams): string {
  const r = searchParams.get('region')
  return r && REGIONS.includes(r) ? r : '전체'
}

function getInitialType(searchParams: URLSearchParams): string {
  const ty = searchParams.get('type')
  return ty && WINE_TYPES.some((t) => t.value === ty) ? ty : '전체'
}

export default function Map() {
  const { lang, t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [regionFilter, setRegionFilter] = useState(() => getInitialRegion(searchParams))
  const [typeFilter, setTypeFilter] = useState(() => getInitialType(searchParams))
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTasting, setFilterTasting] = useState(false)
  const [filterShop, setFilterShop] = useState(false)
  const [view, setView] = useState<'list' | 'map'>('list')

  const setRegion = (r: string) => {
    setRegionFilter(r)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (r === '전체') next.delete('region')
      else next.set('region', r)
      return next
    })
  }

  const setType = (ty: string) => {
    setTypeFilter(ty)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (ty === '전체') next.delete('type')
      else next.set('type', ty)
      return next
    })
  }

  useEffect(() => {
    setRegionFilter(getInitialRegion(searchParams))
    setTypeFilter(getInitialType(searchParams))
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = wineries
    if (regionFilter !== '전체') {
      list = list.filter((w) => w.region === regionFilter)
    }
    if (typeFilter !== '전체') {
      list = list.filter((w) => wineryProducesType(w, typeFilter))
    }
    if (filterTasting) {
      list = list.filter((w) => w.tastingAvailable === true)
    }
    if (filterShop) {
      list = list.filter((w) => w.hasShop === true)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (w) =>
          w.nameKo.toLowerCase().includes(q) ||
          w.nameEn.toLowerCase().includes(q) ||
          w.region.toLowerCase().includes(q)
      )
    }
    return list
  }, [regionFilter, typeFilter, searchQuery, filterTasting, filterShop])

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        {t('map_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {t('map_subtitle')}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>{t('map_region')}:</span>
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${regionFilter === r ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background:
                regionFilter === r ? 'var(--color-accent)' : 'transparent',
              color: regionFilter === r ? 'white' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {r}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setView('list')}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${view === 'list' ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: view === 'list' ? 'var(--color-accent)' : 'transparent',
              color: view === 'list' ? 'white' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {t('map_list')}
          </button>
          <button
            onClick={() => setView('map')}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${view === 'map' ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: view === 'map' ? 'var(--color-accent)' : 'transparent',
              color: view === 'map' ? 'white' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {t('map_map')}
          </button>
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>{t('map_type')}:</span>
        {WINE_TYPES.map(({ value, key }) => (
          <button
            key={value}
            onClick={() => setType(value)}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${typeFilter === value ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: typeFilter === value ? 'var(--color-accent)' : 'transparent',
              color: typeFilter === value ? 'white' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {t(key)}
          </button>
        ))}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filterTasting}
            onChange={(e) => setFilterTasting(e.target.checked)}
          />
          {t('map_tasting')}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filterShop}
            onChange={(e) => setFilterShop(e.target.checked)}
          />
          {t('map_shop')}
        </label>
        <input
          type="search"
          placeholder={t('map_searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginLeft: 'auto',
            padding: '0.5rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            fontSize: '0.9rem',
            minWidth: 180,
          }}
        />
      </div>

      {view === 'map' && <WineMap wineries={filtered} height={320} seeDetailLabel={t('map_seeDetail')} lang={lang} />}

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        {t('map_wineryList')}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {filtered.map((w) => (
          <Link
            key={w.id}
            to={`/wineries/${w.slug}`}
            style={{
              padding: '1rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              {lang === 'en' ? w.nameEn : w.nameKo}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'en' ? w.nameKo : w.nameEn}
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              {lang === 'en' && w.oneLinerEn ? w.oneLinerEn : w.oneLiner}
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.2rem 0.5rem',
                background: 'var(--color-border)',
                borderRadius: 4,
                fontSize: '0.8rem',
              }}
            >
              {w.region}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('map_noWineries')}
        </p>
      )}
    </section>
  )
}
