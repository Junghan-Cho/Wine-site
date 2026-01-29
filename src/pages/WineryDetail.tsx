import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { wineries } from '../data/wineries'
import { wines } from '../data/wines'

export default function WineryDetail() {
  const { lang, t } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const winery = wineries.find((w) => w.slug === slug)

  if (!winery) {
    return (
      <section>
        <p>{t('winery_notFound')}</p>
        <Link to="/map">{t('map_backToMap')}</Link>
      </section>
    )
  }

  const wineryWines = winery.wineSlugs
    .map((s) => wines.find((w) => w.slug === s))
    .filter(Boolean)
  const name = lang === 'en' ? winery.nameEn : winery.nameKo
  const nameSub = lang === 'en' ? winery.nameKo : winery.nameEn
  const oneLiner = (lang === 'en' && winery.oneLinerEn) ? winery.oneLinerEn : winery.oneLiner
  const classification = (lang === 'en' && winery.classificationEn) ? winery.classificationEn : winery.classificationKo

  return (
    <section>
      <Link
        to="/map"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        ← {t('map_backToMap')}
      </Link>

      <div className="detail-header-grid">
        <div
          style={{
            height: 220,
            background: 'var(--color-border)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            overflow: 'hidden',
          }}
        >
          {winery.imageUrl ? (
            <img
              src={winery.imageUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
            />
          ) : null}
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {name}
          </h1>
          <div
            style={{
              color: 'var(--color-text-muted)',
              marginBottom: '0.5rem',
            }}
          >
            {nameSub}
          </div>
          {classification && (
            <div
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-accent)',
                marginBottom: '0.5rem',
              }}
            >
              {t('winery_classification')}: {classification}
            </div>
          )}
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.6rem',
              background: 'var(--color-border)',
              borderRadius: 4,
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
            }}
          >
            {winery.region}
          </span>
          {winery.website && (
            <div style={{ marginTop: '0.5rem' }}>
              <a
                href={winery.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}
              >
                {t('winery_website')} →
              </a>
            </div>
          )}
        </div>
      </div>

      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
        {oneLiner}
      </p>

      {winery.address && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {t('winery_address')}
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {winery.address}
          </p>
        </>
      )}

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        {t('winery_wines')}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {wineryWines.map((w) =>
          w ? (
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
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {lang === 'en' ? w.nameEn : w.nameKo}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                {w.type} · {w.region}
              </div>
            </Link>
          ) : null
        )}
      </div>

      {wineryWines.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('winery_noWines')}
        </p>
      )}
    </section>
  )
}
