import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <section style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
        {t('home_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        {t('home_subtitle')}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <Link
          to="/varietals"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'var(--color-accent)',
            color: 'white',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          {t('home_ctaVarietals')}
        </Link>
        <Link
          to="/recommend"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          {t('home_ctaRecommend')}
        </Link>
        <Link
          to="/map"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          {t('home_ctaMap')}
        </Link>
      </div>
    </section>
  )
}
