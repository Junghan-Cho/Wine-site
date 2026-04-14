'use client'

import { useLanguage } from '@/lib/language-provider'
import { searchGlossary, getDisplayTerm, getDisplayDefinition } from '../../data/glossary'

interface Props {
  searchParams: { q?: string; pro?: string }
}

export default function GlossaryPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? '').trim()
  const professionalOnly = (searchParams?.pro ?? '1') !== '0'
  const terms = searchGlossary(q).filter((t) => (professionalOnly ? isProfessionalTerm(t.slug) : true))
  const { lang, t } = useLanguage()

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Glossary</p>
        <h1 className="font-display text-3xl text-slate-50 sm:text-4xl">
          {t('glossary_title')}
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          {t('glossary_subtitle')}
        </p>
        <form className="max-w-md space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-surface/60 px-3 py-2 text-xs text-slate-200">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={professionalOnly}
                className="h-4 w-4 accent-accent"
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set('pro', e.currentTarget.checked ? '1' : '0')
                  // 기존 검색어 유지
                  if (q) url.searchParams.set('q', q)
                  else url.searchParams.delete('q')
                  window.location.href = url.toString()
                }}
              />
              전문용어만 보기
            </label>
            <span className="text-slate-500">향 디스크립터는 숨김(기본)</span>
          </div>
          <input
            name="q"
            defaultValue={q}
            placeholder={t('glossary_placeholder')}
            className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
          />
        </form>
      </header>

      <section className="space-y-4">
        <p className="text-xs text-slate-400">
          {t('glossary_count').replace('{n}', String(terms.length))}
          {q && (
            <>
              {' '}
              · <span className="text-slate-500">{t('glossary_search_label')}:</span>{' '}
              <span className="font-mono text-slate-200">&quot;{q}&quot;</span>
            </>
          )}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {terms.map((term) => (
            <article
              key={term.slug}
              className="rounded-2xl border border-slate-800 bg-surface/60 p-4 text-sm text-slate-200"
            >
              <h2 className="text-sm font-semibold text-slate-50">
                {getDisplayTerm(term, lang)}
              </h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                {term.category}
              </p>
              {term.levels && term.levels.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {term.levels.map((lv) => (
                    <span
                      key={lv}
                      className="rounded-full border border-slate-700 bg-background px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300"
                    >
                      {lv}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-2 text-sm text-slate-300">{getDisplayDefinition(term, lang)}</p>
              {term.example && (
                <p className="mt-2 text-xs text-slate-400">
                  {t('glossary_example')}: <span className="italic">{term.example}</span>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function isProfessionalTerm(slug: string): boolean {
  // 대량 생성된 향(디스크립터) 항목은 기본적으로 숨김
  if (slug.startsWith('aroma-') || slug.startsWith('aroma-note-')) return false
  return true
}
