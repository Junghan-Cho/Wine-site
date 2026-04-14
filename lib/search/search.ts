import { wineries } from '@/data/wineries'
import { wines } from '@/data/wines'
import { varietals } from '@/data/varietals'
import { glossaryTerms, searchGlossary } from '@/data/glossary'
import type { SearchResponse, SearchScope, SearchResultItem } from './types'

function includesAny(haystack: (string | undefined)[], q: string): boolean {
  return haystack.some((v) => typeof v === 'string' && v.toLowerCase().includes(q))
}

export function searchAll(qRaw: string, scope: SearchScope = 'all'): SearchResponse {
  const q = (qRaw ?? '').trim().toLowerCase()
  if (!q) return { q: '', total: 0, items: [] }

  const items: SearchResultItem[] = []

  if (scope === 'all' || scope === 'varietals') {
    for (const v of varietals) {
      if (includesAny([v.nameKo, v.nameEn, v.oneLiner, v.oneLinerEn, v.tasteAndAroma, v.tasteAndAromaEn], q)) {
        items.push({ kind: 'varietal', varietal: v })
      }
    }
  }

  if (scope === 'all' || scope === 'wineries') {
    for (const w of wineries) {
      if (includesAny([w.nameKo, w.nameEn, w.region, w.oneLiner, w.oneLinerEn, w.address], q)) {
        items.push({ kind: 'winery', winery: w })
      }
    }
  }

  if (scope === 'all' || scope === 'wines') {
    for (const w of wines) {
      // Wine 타입에 실제로 존재하는 필드만 검색 대상으로 사용
      if (includesAny([w.nameKo, w.nameEn, w.type, w.region, w.oneLiner], q)) {
        items.push({ kind: 'wine', wine: w })
      }
    }
  }

  if (scope === 'all' || scope === 'glossary') {
    // Reuse existing matcher (multilingual fields).
    const terms = q ? searchGlossary(q) : glossaryTerms
    for (const t of terms) items.push({ kind: 'glossary', term: t })
  }

  return { q, total: items.length, items }
}

