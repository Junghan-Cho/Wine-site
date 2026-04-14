import type { Winery } from '@/types/winery'
import type { Wine } from '@/types/wine'
import type { Varietal } from '@/types/varietal'
import type { GlossaryTerm } from '@/data/glossary'

export type SearchScope = 'wineries' | 'wines' | 'varietals' | 'glossary' | 'all'

export type SearchResultItem =
  | { kind: 'winery'; winery: Winery }
  | { kind: 'wine'; wine: Wine }
  | { kind: 'varietal'; varietal: Varietal }
  | { kind: 'glossary'; term: GlossaryTerm }

export type SearchResponse = {
  q: string
  total: number
  items: SearchResultItem[]
}

