import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { glossaryTerms } from '../data/glossaryTerms'

export default function Glossary() {
  const { lang, t } = useLanguage()
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(query.toLowerCase()) ||
          (term.termEn?.toLowerCase().includes(query.toLowerCase())) ||
          term.description.toLowerCase().includes(query.toLowerCase()) ||
          (term.descriptionEn?.toLowerCase().includes(query.toLowerCase()))
      )
    : glossaryTerms

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        {t('glossary_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {t('glossary_subtitle')}
      </p>

      <input
        type="search"
        placeholder={t('glossary_searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '0.6rem 1rem',
          marginBottom: '1.5rem',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          color: 'var(--color-text)',
          fontSize: '1rem',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((term) => {
          const termLabel = lang === 'en' && term.termEn ? term.termEn : term.term
          const termSub = lang === 'en' ? term.term : term.termEn
          const desc = (lang === 'en' && term.descriptionEn) ? term.descriptionEn : term.description
          return (
            <article
              key={term.id}
              style={{
                padding: '1rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
              }}
            >
              <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>
                {termLabel}
                {termSub && termSub !== termLabel && (
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                    }}
                  >
                    {termSub}
                  </span>
                )}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: 'var(--color-text-muted)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </p>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('glossary_noResults')}
        </p>
      )}
    </section>
  )
}
