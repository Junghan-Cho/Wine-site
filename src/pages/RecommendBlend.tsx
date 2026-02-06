import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { varietals } from '../data/varietals'
import { wines } from '../data/wines'
import { wineries } from '../data/wineries'
import type { Winery } from '../types/winery'
import { getDataName } from '../utils/displayName'

const MAX_WINES = 24
const MAX_WINERIES = 12

export default function RecommendBlend() {
  const { lang, t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const paramVarietals = searchParams.getAll('v')
  const isResultView = paramVarietals.length > 0

  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(() =>
    new Set(paramVarietals)
  )

  const toggleVarietal = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const applyBlend = () => {
    const slugs = Array.from(selectedSlugs)
    if (slugs.length === 0) return
    const next = new URLSearchParams()
    slugs.forEach((s) => next.append('v', s))
    setSearchParams(next)
  }

  const matchingWines = useMemo(() => {
    if (!isResultView || paramVarietals.length === 0) return []
    const set = new Set(paramVarietals)
    return wines.filter((w) =>
      set.size > 0 && set.every((s) => w.varietalSlugs.includes(s))
    ).slice(0, MAX_WINES)
  }, [isResultView, paramVarietals])

  const matchingWinerySlugs = useMemo(() => {
    return [...new Set(matchingWines.map((w) => w.winerySlug))]
  }, [matchingWines])

  const matchingWineries = useMemo(() => {
    return matchingWinerySlugs
      .map((s) => wineries.find((w) => w.slug === s))
      .filter((w): w is Winery => w != null)
      .slice(0, MAX_WINERIES)
  }, [matchingWinerySlugs])

  const selectedVarietals = useMemo(
    () => varietals.filter((v) => selectedSlugs.has(v.slug)),
    [selectedSlugs]
  )

  if (isResultView) {
    return (
      <section>
        <Link
          to="/recommend/blend"
          style={{
            display: 'inline-block',
            marginBottom: '1rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
          }}
        >
          ← {t('recommend_back')}
        </Link>
        <h1 className="section-title">{t('recommend_blendTitle')}</h1>
        <p className="section-subtitle">
          {paramVarietals.map((s) => varietals.find((v) => v.slug === s)).filter(Boolean).map((v) => v ? getDataName(v, lang) : '').join(' + ')}
        </p>

        {matchingWines.length > 0 ? (
          <>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
              {t('recommend_wines')}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              {matchingWines.map((w) => (
                <Link
                  key={w.id}
                  to={`/wines/${w.slug}`}
                  className="card"
                  style={{
                    display: 'block',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  {w.imageUrl && (
                    <div
                      style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 6,
                        overflow: 'hidden',
                        marginBottom: '0.5rem',
                        background: 'var(--color-border)',
                      }}
                    >
                      <img
                        src={w.imageUrl}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    {getDataName(w, lang)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {w.region} · {w.type}
                  </div>
                </Link>
              ))}
            </div>
            {matchingWineries.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                  {t('recommend_wineries')}
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {matchingWineries.map((w) => (
                    <Link
                      key={w.id}
                      to={`/wineries/${w.slug}`}
                      className="card"
                      style={{ display: 'block' }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {getDataName(w, lang)}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        {w.region}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--color-text-muted)' }}>
            {t('recommend_noResults')}
          </p>
        )}
      </section>
    )
  }

  return (
    <section>
      <Link
        to="/recommend"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        ← {t('recommend_back')}
      </Link>
      <h1 className="section-title">{t('recommend_blendTitle')}</h1>
      <p className="section-subtitle">{t('recommend_blendSubtitle')}</p>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        {t('recommend_blendSelect')}
      </h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {varietals.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => toggleVarietal(v.slug)}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${selectedSlugs.has(v.slug) ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: selectedSlugs.has(v.slug) ? 'var(--color-accent-muted)' : 'var(--color-surface)',
              color: selectedSlugs.has(v.slug) ? 'var(--color-accent)' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {getDataName(v, lang)}
            {selectedSlugs.has(v.slug) ? ' ✓' : ''}
          </button>
        ))}
      </div>

      {selectedSlugs.size > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={applyBlend}
            className="btn btn-primary"
          >
            {t('recommend_blendSearch')}
          </button>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            {selectedVarietals.map((v) => getDataName(v, lang)).join(' + ')}
          </span>
        </div>
      ) : (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {t('recommend_blendNoSelection')}
        </p>
      )}
    </section>
  )
}
