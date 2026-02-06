import type { Lang } from '../i18n/translations'

/**
 * 품종/와이너리/와인 등 데이터의 표시 이름.
 * - 한국어 선택 시: 한글(nameKo)
 * - 그 외(영/프/이/일/중): 영문(nameEn) → 한 페이지에 한/영 섞이지 않게
 */
export function getDataName(
  item: { nameKo: string; nameEn: string },
  lang: Lang
): string {
  return lang === 'ko' ? item.nameKo : item.nameEn
}

/**
 * 보조 이름(반대 언어). 한국어 화면에서는 영문, 영어 화면에서는 한글 표시용.
 * 프/이/일/중 선택 시에는 보조명 없음(해당 언어만 보이게).
 */
export function getDataNameSub(
  item: { nameKo: string; nameEn: string },
  lang: Lang
): string | undefined {
  if (lang === 'ko') return item.nameEn
  if (lang === 'en') return item.nameKo
  return undefined
}

/**
 * 스타일/상황 옵션 라벨. 한국어면 label, 그 외는 labelEn(없으면 label).
 */
export function getOptionLabel(
  opt: { label: string; labelEn?: string | null },
  lang: Lang
): string {
  return lang === 'ko' ? opt.label : (opt.labelEn ?? opt.label)
}

/**
 * 옵션 설명(description). 한국어면 description, 그 외는 descriptionEn.
 */
export function getOptionDescription(
  opt: { description: string; descriptionEn?: string | null },
  lang: Lang
): string {
  return lang === 'ko' ? opt.description : (opt.descriptionEn ?? opt.description)
}

/**
 * 한/영 텍스트. 한국어면 ko, 그 외는 en(없으면 ko).
 */
export function getBilingualText(
  ko: string,
  en: string | undefined | null,
  lang: Lang
): string {
  return lang === 'ko' ? ko : (en ?? ko)
}
