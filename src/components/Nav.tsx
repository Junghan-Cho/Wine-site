import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Nav() {
  const { lang, setLang, t } = useLanguage()

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--nav-gap)',
        background: 'var(--color-surface)',
      }}
    >
      <Link to="/" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
        {t('nav_siteName')}
      </Link>
      <Link to="/varietals">{t('nav_varietals')}</Link>
      <Link to="/recommend">{t('nav_recommend')}</Link>
      <Link to="/map">{t('nav_map')}</Link>
      <Link to="/glossary">{t('nav_glossary')}</Link>
      <Link to="/search">{t('nav_search')}</Link>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.25rem' }}>
        <button
          type="button"
          onClick={() => setLang('ko')}
          style={{
            padding: '0.35rem 0.6rem',
            border: `1px solid ${lang === 'ko' ? 'var(--color-accent)' : 'var(--color-border)'}`,
            background: lang === 'ko' ? 'var(--color-accent)' : 'transparent',
            color: lang === 'ko' ? 'white' : 'var(--color-text)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          KO
        </button>
        <button
          type="button"
          onClick={() => setLang('en')}
          style={{
            padding: '0.35rem 0.6rem',
            border: `1px solid ${lang === 'en' ? 'var(--color-accent)' : 'var(--color-border)'}`,
            background: lang === 'en' ? 'var(--color-accent)' : 'transparent',
            color: lang === 'en' ? 'white' : 'var(--color-text)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          EN
        </button>
      </span>
    </nav>
  )
}
