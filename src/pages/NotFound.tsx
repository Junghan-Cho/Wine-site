import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section
      style={{
        textAlign: 'center',
        padding: '3rem 1rem',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
        {t('notFound_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {t('notFound_message')}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.2rem',
          background: 'var(--color-accent)',
          color: 'white',
          borderRadius: 6,
          fontSize: '0.95rem',
        }}
      >
        {t('notFound_back')}
      </Link>
    </section>
  )
}
