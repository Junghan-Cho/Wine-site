import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { varietals } from '../data/varietals'
import { wineries } from '../data/wineries'
import { wines } from '../data/wines'
import { getDataName, getDataNameSub } from '../utils/displayName'

type Tab = 'all' | 'varietals' | 'wineries' | 'wines'

export default function Search() {
  const { lang, t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [tab, setTab] = useState<Tab>('all')

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
  }, [searchParams])

  const q = query.trim().toLowerCase()
  const varietalResults = q
    ? varietals.filter(
        (v) =>
          v.nameKo.toLowerCase().includes(q) ||
          v.nameEn.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.regions.some((r) => r.toLowerCase().includes(q))
      )
    : []
  const wineryResults = q
    ? wineries.filter(
        (w) =>
          w.nameKo.toLowerCase().includes(q) ||
          w.nameEn.toLowerCase().includes(q) ||
          w.region.toLowerCase().includes(q) ||
          w.oneLiner.toLowerCase().includes(q) ||
          (w.oneLinerEn?.toLowerCase().includes(q))
      )
    : []
  const wineResults = q
    ? wines.filter(
        (w) =>
          w.nameKo.toLowerCase().includes(q) ||
          w.nameEn.toLowerCase().includes(q) ||
          w.type.toLowerCase().includes(q) ||
          w.region.toLowerCase().includes(q)
      )
    : []

  const hasResults =
    varietalResults.length > 0 ||
    wineryResults.length > 0 ||
    wineResults.length > 0
  const showVarietals = tab === 'all' || tab === 'varietals'
  const showWineries = tab === 'all' || tab === 'wineries'
  const showWines = tab === 'all' || tab === 'wines'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) setSearchParams({ q: query.trim() })
  }

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        {t('search_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {t('search_subtitle')}
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: 400 }}>
          <input
            type="search"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.6rem 1.25rem',
              background: 'var(--color-accent)',
              border: 'none',
              borderRadius: 8,
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t('search_button')}
          </button>
        </div>
      </form>

      {query.trim() && (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            {(['all', 'varietals', 'wineries', 'wines'] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                style={{
                  padding: '0.5rem 1rem',
                  border: `1px solid ${tab === tabKey ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: tab === tabKey ? 'var(--color-accent)' : 'transparent',
                  color: tab === tabKey ? 'white' : 'var(--color-text)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                {tabKey === 'all' && t('search_all')}
                {tabKey === 'varietals' && `${t('search_varietals')} (${varietalResults.length})`}
                {tabKey === 'wineries' && `${t('search_wineries')} (${wineryResults.length})`}
                {tabKey === 'wines' && `${t('search_wines')} (${wineResults.length})`}
              </button>
            ))}
          </div>

          {!hasResults && (
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('search_noResults')} "{query}"
            </p>
          )}

          {hasResults && showVarietals && varietalResults.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {t('search_varietals')}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {varietalResults.map((v) => (
                  <li key={v.id} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      to={`/varietals/${v.slug}`}
                      style={{
                        display: 'block',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      {getDataName(v, lang)}
                      {getDataNameSub(v, lang) ? ` (${getDataNameSub(v, lang)})` : ''} · {v.type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasResults && showWineries && wineryResults.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {t('search_wineries')}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {wineryResults.map((w) => (
                  <li key={w.id} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      to={`/wineries/${w.slug}`}
                      style={{
                        display: 'block',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      {getDataName(w, lang)}
                      {getDataNameSub(w, lang) ? ` (${getDataNameSub(w, lang)})` : ''} · {w.region}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasResults && showWines && wineResults.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {t('search_wines')}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {wineResults.map((w) => (
                  <li key={w.id} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      to={`/wines/${w.slug}`}
                      style={{
                        display: 'block',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      {getDataName(w, lang)} · {w.type} · {w.region}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {!query.trim() && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('search_enterQuery')}
        </p>
      )}
    </section>
  )
}
