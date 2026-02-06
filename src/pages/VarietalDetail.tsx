import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { varietals } from '../data/varietals'
import { wines } from '../data/wines'
import { getDataName, getDataNameSub, getBilingualText } from '../utils/displayName'
import { TYPE_KEYS } from './VarietalList'

const PAIRING_PREVIEW = 2

export default function VarietalDetail() {
  const { lang, t } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const [pairingExpanded, setPairingExpanded] = useState(false)
  const varietal = varietals.find((v) => v.slug === slug)

  if (!varietal) {
    return (
      <section>
        <p>{t('noVarietal')}</p>
        <Link to="/varietals">{t('backToVarietals')}</Link>
      </section>
    )
  }

  const related = varietal.relatedVarietalSlugs
    .map((s) => varietals.find((v) => v.slug === s))
    .filter(Boolean)
  const winesFromVarietal = wines.filter((w) => w.varietalSlugs.includes(varietal.slug))
  const name = getDataName(varietal, lang)
  const nameSub = getDataNameSub(varietal, lang)
  const oneLiner = getBilingualText(varietal.oneLiner, varietal.oneLinerEn, lang)
  const tasteAndAroma = getBilingualText(varietal.tasteAndAroma, varietal.tasteAndAromaEn, lang)

  return (
    <section>
      <Link
        to="/varietals"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        ← {t('backToVarietals')}
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
          }}
        >
          {varietal.imageUrl ? (
            <img
              src={varietal.imageUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
            />
          ) : null}
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{name}</h1>
          {nameSub && (
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              {nameSub}
            </div>
          )}
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.6rem',
              background: 'var(--color-border)',
              borderRadius: 4,
              fontSize: '0.85rem',
            }}
          >
            {t(TYPE_KEYS[varietal.type])}
          </span>
          {varietal.regions.length > 0 && (
            <span
              style={{
                marginLeft: '0.5rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
              }}
            >
              · {varietal.regions.join(', ')}
            </span>
          )}
        </div>
      </div>

      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>{oneLiner}</p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }} />

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('tasteAndAroma')}</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {tasteAndAroma}
      </p>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('regions')}</h2>
      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
        {varietal.regions.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('pairings')}</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: varietal.pairingDetails?.length ? '0.75rem' : '1.5rem',
        }}
      >
        {varietal.pairings.map((p) => (
          <span
            key={p}
            style={{
              padding: '0.35rem 0.75rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              fontSize: '0.9rem',
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {varietal.pairingDetails && varietal.pairingDetails.length > 0 && (
        <>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
            {t('pairingDetailSection')}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '0.5rem' }}>
            {(pairingExpanded ? varietal.pairingDetails : varietal.pairingDetails.slice(0, PAIRING_PREVIEW)).map((pd, i) => (
              <li
                key={i}
                style={{
                  padding: '0.75rem 0',
                  borderBottom: i < (pairingExpanded ? varietal.pairingDetails! : varietal.pairingDetails!.slice(0, PAIRING_PREVIEW)).length - 1 ? '1px solid var(--color-border)' : undefined,
                }}
              >
                <strong style={{ fontSize: '0.95rem' }}>
                  {getBilingualText(pd.foodKo, pd.foodEn, lang)}
                </strong>
                {lang === 'ko' && pd.foodEn && (
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginLeft: '0.35rem' }}>
                    ({pd.foodEn})
                  </span>
                )}
                <p style={{ margin: '0.35rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{t('pairing_why')}: </span>
                  {getBilingualText(pd.reasonKo, pd.reasonEn, lang)}
                </p>
              </li>
            ))}
          </ul>
          {varietal.pairingDetails.length > PAIRING_PREVIEW && (
            <button
              type="button"
              onClick={() => setPairingExpanded((v) => !v)}
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
              {pairingExpanded ? t('showLess') : `${t('showMore')} (${varietal.pairingDetails.length - PAIRING_PREVIEW})`}
            </button>
          )}
          {varietal.pairingDetails.length <= PAIRING_PREVIEW && <div style={{ marginBottom: '1.5rem' }} />}
        </>
      )}

      {varietal.body && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('body')}</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            {varietal.body}
          </p>
        </>
      )}

      {winesFromVarietal.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('representativeWines')}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {winesFromVarietal.map((w) => (
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
        </>
      )}

      {related.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('relatedVarietals')}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {related.map((v) =>
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
