import type { Lang } from './translations'
import type { Winery } from '@/types/winery'
import type { Wine } from '@/types/wine'
import type { Varietal } from '@/types/varietal'

export function displayName(entity: { nameKo?: string; nameEn?: string }, lang: Lang): string {
  if (lang === 'ko') return entity.nameKo ?? entity.nameEn ?? ''
  return entity.nameEn ?? entity.nameKo ?? ''
}

export function displayOneLiner(entity: { oneLiner?: string; oneLinerEn?: string }, lang: Lang): string {
  if (lang === 'ko') return entity.oneLiner ?? entity.oneLinerEn ?? ''
  return entity.oneLinerEn ?? entity.oneLiner ?? ''
}

export function displayTasteAndAroma(entity: { tasteAndAroma?: string; tasteAndAromaEn?: string }, lang: Lang): string {
  if (lang === 'ko') return entity.tasteAndAroma ?? entity.tasteAndAromaEn ?? ''
  return entity.tasteAndAromaEn ?? entity.tasteAndAroma ?? ''
}

export function displayWinery(w: Winery, lang: Lang) {
  return {
    name: displayName(w, lang),
    oneLiner: displayOneLiner(w, lang),
    classification: lang === 'ko' ? (w.classificationKo ?? w.classificationEn) : (w.classificationEn ?? w.classificationKo),
  }
}

export function displayWine(w: Wine, lang: Lang) {
  return {
    name: displayName(w, lang),
    oneLiner: lang === 'ko' ? (w.oneLiner ?? '') : (w.oneLiner ?? ''),
  }
}

export function displayVarietal(v: Varietal, lang: Lang) {
  return {
    name: displayName(v, lang),
    oneLiner: displayOneLiner(v, lang),
    tasteAndAroma: displayTasteAndAroma(v, lang),
  }
}

