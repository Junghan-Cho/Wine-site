import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { styleOptions, situationOptions } from '../data/recommendData'
import { getOptionLabel } from '../utils/displayName'

export default function Recommend() {
  const { lang, t } = useLanguage()

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        {t('recommend_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        {t('recommend_subtitle')}
      </p>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{t('recommend_byStyle')}</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {styleOptions.map((opt) => (
          <Link
            key={opt.slug}
            to={`/recommend/style/${opt.slug}`}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
          >
            {getOptionLabel(opt, lang)}
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{t('recommend_bySituation')}</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {situationOptions.map((opt) => (
          <Link
            key={opt.slug}
            to={`/recommend/situation/${opt.slug}`}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
          >
            {getOptionLabel(opt, lang)}
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{t('recommend_byBlend')}</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
        {t('recommend_blendSubtitle')}
      </p>
      <Link
        to="/recommend/blend"
        className="btn btn-secondary"
        style={{ padding: '0.75rem 1.25rem' }}
      >
        {t('recommend_blendSearch')}
      </Link>
    </section>
  )
}
