import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import type { Lang } from '../i18n/translations'

const LANG_OPTIONS: { value: Lang; labelKey: string }[] = [
  { value: 'ko', labelKey: 'lang_ko' },
  { value: 'en', labelKey: 'lang_en' },
  { value: 'fr', labelKey: 'lang_fr' },
  { value: 'it', labelKey: 'lang_it' },
  { value: 'ja', labelKey: 'lang_ja' },
  { value: 'zh', labelKey: 'lang_zh' },
]

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
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="lang-select" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {t('lang_ko').startsWith('한') ? '언어' : lang === 'en' ? 'Lang' : lang === 'fr' ? 'Langue' : lang === 'it' ? 'Lingua' : lang === 'ja' ? '言語' : '语言'}
        </label>
        <select
          id="lang-select"
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          style={{
            padding: '0.35rem 0.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          {LANG_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </span>
    </nav>
  )
}
