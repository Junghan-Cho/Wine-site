import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { varietals } from '../data/varietals'
import type { VarietalType } from '../types/varietal'

export const TYPE_KEYS: Record<VarietalType | '전체', string> = {
  '전체': 'filter_all',
  '레드': 'type_red',
  '화이트': 'type_white',
  '로제': 'type_rose',
  '스파클링': 'type_sparkling',
  '기타': 'type_other',
}

const TYPES: (VarietalType | '전체')[] = ['전체', '레드', '화이트', '로제', '스파클링', '기타']

export default function VarietalList() {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState<VarietalType | '전체'>('전체')

  const filtered =
    filter === '전체'
      ? varietals
      : varietals.filter((v) => v.type === filter)

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
        {t('varietals_title')}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {t('varietals_subtitle')}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {TYPES.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${filter === value ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: filter === value ? 'var(--color-accent)' : 'transparent',
              color: filter === value ? 'white' : 'var(--color-text)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {t(TYPE_KEYS[value])}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {filtered.map((v) => (
          <Link
            key={v.id}
            to={`/varietals/${v.slug}`}
            style={{
              display: 'block',
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
            <div
              style={{
                height: 100,
                background: 'var(--color-border)',
                borderRadius: 6,
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
              }}
            >
              {v.imageUrl ? (
                <img src={v.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
              ) : (
                ''
              )}
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              {lang === 'en' ? v.nameEn : v.nameKo}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {lang === 'en' ? v.nameKo : v.nameEn}
            </div>
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
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {t('noVarietalsInType')}
        </p>
      )}
    </section>
  )
}
