import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { wines } from '../data/wines'
import { wineries } from '../data/wineries'
import { varietals } from '../data/varietals'
import { getDataName, getDataNameSub } from '../utils/displayName'

export default function WineDetail() {
  const { lang, t } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const wine = wines.find((w) => w.slug === slug)

  if (!wine) {
    return (
      <section>
        <p>{t('wine_notFound')}</p>
        <Link to="/map">{t('map_backToMap')}</Link>
      </section>
    )
  }

  const winery = wineries.find((w) => w.slug === wine.winerySlug)
  const wineVarietals = wine.varietalSlugs
    .map((s) => varietals.find((v) => v.slug === s))
    .filter(Boolean)
  const tech = wine.technical
  const hasTech = Object.keys(tech).length > 0
  const wineName = getDataName(wine, lang)
  const wineNameSub = getDataNameSub(wine, lang)
  const wineryName = winery ? getDataName(winery, lang) : ''

  return (
    <section>
      <Link
        to={winery ? `/wineries/${winery.slug}` : '/map'}
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        ← {winery ? (lang === 'ko' ? `${winery.nameKo}로` : `Back to ${winery.nameEn}`) : t('map_backToMap')}
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
          {wine.imageUrl ? (
            <img
              src={wine.imageUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
            />
          ) : null}
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            {wineName}
          </h1>
          {wineNameSub && (
            <div
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              {wineNameSub}
            </div>
          )}
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.6rem',
              background: 'var(--color-border)',
              borderRadius: 4,
              fontSize: '0.85rem',
              marginRight: '0.5rem',
            }}
          >
            {wine.type}
          </span>
          <span
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
            }}
          >
            {wine.region}
            {winery && (
              <>
                {' · '}
                <Link
                  to={`/wineries/${winery.slug}`}
                  style={{ color: 'var(--color-accent)' }}
                >
                  {wineryName}
                </Link>
              </>
            )}
          </span>
        </div>
      </div>

      {wine.oneLiner && (
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
          {wine.oneLiner}
        </p>
      )}

      {hasTech && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            {t('wine_technicalSheet')}
          </h2>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <dl
              style={{
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0.5rem 1.5rem',
              }}
            >
              {tech.alcohol && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_alcohol')}</dt>
                  <dd style={{ margin: 0 }}>{tech.alcohol}</dd>
                </>
              )}
              {tech.acidity && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_acidity')}</dt>
                  <dd style={{ margin: 0 }}>{tech.acidity}</dd>
                </>
              )}
              {tech.pH && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_ph')}</dt>
                  <dd style={{ margin: 0 }}>{tech.pH}</dd>
                </>
              )}
              {tech.residualSugar && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_residualSugar')}</dt>
                  <dd style={{ margin: 0 }}>{tech.residualSugar}</dd>
                </>
              )}
              {tech.barrel && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_barrel')}</dt>
                  <dd style={{ margin: 0 }}>{tech.barrel}</dd>
                </>
              )}
              {tech.bottlingDate && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_bottlingDate')}</dt>
                  <dd style={{ margin: 0 }}>{tech.bottlingDate}</dd>
                </>
              )}
              {tech.blend && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>{t('wine_blend')}</dt>
                  <dd style={{ margin: 0 }}>{tech.blend}</dd>
                </>
              )}
            </dl>
          </div>
          {wine.technicalPdfUrl && (
            <a
              href={wine.technicalPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'var(--color-accent)',
                color: 'white',
                borderRadius: 6,
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
              }}
            >
              {t('wine_downloadPdf')}
            </a>
          )}
        </>
      )}

      {wineVarietals.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {t('wine_varietals')}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {wineVarietals.map((v) =>
              v ? (
                <Link
                  key={v.id}
                  to={`/varietals/${v.slug}`}
                  style={{
                    padding: '0.35rem 0.75rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 6,
                    fontSize: '0.9rem',
                  }}
                >
                  {getDataName(v, lang)}
                </Link>
              ) : null
            )}
          </div>
        </>
      )}

      {winery && (
        <p
          style={{
            marginTop: '1.5rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.85rem',
          }}
        >
          {t('wine_source')}: {wineryName}
        </p>
      )}

      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <button
          type="button"
          onClick={() => window.alert('VinLog 앱이 곧 출시됩니다! 조금만 기다려주세요.')}
          className="btn btn-primary"
          style={{
            width: '100%',
            maxWidth: 360,
            padding: '0.875rem 1.5rem',
            fontSize: '1rem',
          }}
        >
          {t('vinlog_cta')}
        </button>
      </div>
    </section>
  )
}
