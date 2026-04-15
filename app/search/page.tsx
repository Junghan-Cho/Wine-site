import Link from 'next/link'
import { searchAll } from '@/lib/search/search'
import { getRequestLang } from '@/lib/i18n/request-lang'
import { withLangPrefix } from '@/lib/i18n/locale'
import { getDisplayTerm } from '@/data/glossary'
import type { SearchResultItem } from '@/lib/search/types'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const lang = await getRequestLang()
  const sp = await searchParams
  const qRaw = (sp.q ?? '').trim()
  const hasQuery = qRaw.length > 0
  const result = hasQuery ? searchAll(qRaw, 'all') : { q: '', total: 0, items: [] }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Search</p>
        <h1 className="font-display text-3xl text-slate-50 sm:text-4xl">검색</h1>
        <form className="max-w-md">
          <input
            name="q"
            defaultValue={sp.q}
            placeholder="품종, 산지, 와인, 용어 등을 검색하세요"
            className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
          />
        </form>
        {!hasQuery && <p className="text-sm text-slate-400">검색어를 입력하면 결과가 표시됩니다.</p>}
      </header>

      {hasQuery && (
        <section className="space-y-6">
          <ResultSection
            title="품종"
            items={result.items
              .filter(isVarietalItem)
              .slice(0, 20)
              .map((it) => ({
                href: withLangPrefix(`/varietals/${it.varietal.slug}`, lang),
                label: it.varietal.nameEn,
              }))}
          />
          <ResultSection
            title="와이너리"
            items={result.items
              .filter(isWineryItem)
              .slice(0, 20)
              .map((it) => ({
                href: withLangPrefix(`/wineries/${it.winery.slug}`, lang),
                label: it.winery.nameEn,
              }))}
          />
          <ResultSection
            title="와인"
            items={result.items
              .filter(isWineItem)
              .slice(0, 20)
              .map((it) => ({
                href: withLangPrefix(`/wines/${it.wine.slug}`, lang),
                label: it.wine.nameEn,
              }))}
          />
          <ResultSection
            title="용어"
            items={result.items
              .filter(isGlossaryItem)
              .slice(0, 20)
              .map((it) => ({
                href: withLangPrefix('/glossary', lang) + '?q=' + encodeURIComponent(getDisplayTerm(it.term, lang)),
                label: getDisplayTerm(it.term, lang),
              }))}
          />
        </section>
      )}
    </div>
  )
}

function ResultSection({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  if (items.length === 0) return null
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
      <ul className="flex flex-wrap gap-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs hover:border-accent hover:text-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function isVarietalItem(it: SearchResultItem): it is Extract<SearchResultItem, { kind: 'varietal' }> {
  return it.kind === 'varietal'
}

function isWineryItem(it: SearchResultItem): it is Extract<SearchResultItem, { kind: 'winery' }> {
  return it.kind === 'winery'
}

function isWineItem(it: SearchResultItem): it is Extract<SearchResultItem, { kind: 'wine' }> {
  return it.kind === 'wine'
}

function isGlossaryItem(it: SearchResultItem): it is Extract<SearchResultItem, { kind: 'glossary' }> {
  return it.kind === 'glossary'
}

