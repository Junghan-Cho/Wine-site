import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { styleOptions, situationOptions } from '../data/recommendData'
import { varietals } from '../data/varietals'
import { wines } from '../data/wines'
import { wineries } from '../data/wineries'
import type { Winery } from '../types/winery'
import { getDataName, getDataNameSub, getOptionLabel, getOptionDescription } from '../utils/displayName'
import { TYPE_KEYS } from './VarietalList'

const MAX_WINES = 8
const MAX_WINERIES = 6
const PREVIEW_WINES = 4
const PREVIEW_WINERIES = 3

export default function RecommendResult() {
  const { lang, t } = useLanguage()
  const { type, slug } = useParams<{ type: string; slug: string }>()
  const [winesExpanded, setWinesExpanded] = useState(false)
  const [wineriesExpanded, setWineriesExpanded] = useState(false)
  const options = type === 'style' ? styleOptions : situationOptions
  const option = options.find((o) => o.slug === slug)

  if (!option) {
    return (
      <section>
        <p>{t('recommend_noResults')}</p>
        <Link to="/recommend">{t('recommend_back')}</Link>
      </section>
    )
  }

  const recommendedVarietals = option.varietalSlugs
    .map((s) => varietals.find((v) => v.slug === s))
    .filter(Boolean)
  const recommendedWinesAll = wines
    .filter((w) => w.varietalSlugs.some((vs) => option.varietalSlugs.includes(vs)))
    .slice(0, MAX_WINES)
  const recommendedWinerySlugs = [...new Set(recommendedWinesAll.map((w) => w.winerySlug))]
  const recommendedWineriesAll = recommendedWinerySlugs
    .map((s) => wineries.find((w) => w.slug === s))
    .filter((w): w is Winery => w != null)
    .slice(0, MAX_WINERIES)
  const displayedWines = winesExpanded ? recommendedWinesAll : recommendedWinesAll.slice(0, PREVIEW_WINES)
  const displayedWineries = wineriesExpanded ? recommendedWineriesAll : recommendedWineriesAll.slice(0, PREVIEW_WINERIES)
  const optionLabel = getOptionLabel(option, lang)
  const optionDesc = getOptionDescription(option, lang)

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

      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        "{optionLabel}" {t('recommend_resultTitle')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {optionDesc}
      </p>

      {recommendedVarietals.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            {t('recommend_results')}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {recommendedVarietals.map((v) =>
              v ? (
                <Link
                  key={v.id}
                  to={`/varietals/${v.slug}`}
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
                    {getDataName(v, lang)}
                  </div>
                  {getDataNameSub(v, lang) && (
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {getDataNameSub(v, lang)}
                    </div>
                  )}
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
                    {t(TYPE_KEYS[v.type])}
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </>
      )}

      {recommendedWinesAll.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            {t('recommend_wines')}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: recommendedWinesAll.length > PREVIEW_WINES ? '0.75rem' : '1.5rem',
            }}
          >
            {displayedWines.map((w) => (
              <Link
                key={w.id}
                to={`/wines/${w.slug}`}
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
                {w.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: 90,
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
          {recommendedWinesAll.length > PREVIEW_WINES && (
            <button
              type="button"
              onClick={() => setWinesExpanded((v) => !v)}
              style={{
                padding: '0.35rem 0.75rem',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                borderRadius: 6,
                fontSize: '0.85rem',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                marginBottom: '1.5rem',
              }}
            >
              {winesExpanded ? t('showLess') : `${t('showMore')} (${recommendedWinesAll.length - PREVIEW_WINES})`}
            </button>
          )}
        </>
      )}

      {recommendedWineriesAll.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            {t('recommend_wineries')}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: recommendedWineriesAll.length > PREVIEW_WINERIES ? '0.75rem' : '1.5rem',
            }}
          >
            {displayedWineries.map((w) => (
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
                {w.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: 90,
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
                  {w.region}
                </div>
              </Link>
            ))}
          </div>
          {recommendedWineriesAll.length > PREVIEW_WINERIES && (
            <button
              type="button"
              onClick={() => setWineriesExpanded((v) => !v)}
              style={{
                padding: '0.35rem 0.75rem',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                borderRadius: 6,
                fontSize: '0.85rem',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                marginBottom: '1.5rem',
              }}
            >
              {wineriesExpanded ? t('showLess') : `${t('showMore')} (${recommendedWineriesAll.length - PREVIEW_WINERIES})`}
            </button>
          )}
        </>
      )}

      {recommendedVarietals.length === 0 && recommendedWinesAll.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('recommend_noResults')}
        </p>
      )}
    </section>
  )
}
