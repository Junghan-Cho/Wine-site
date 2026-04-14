import { SUPPORTED_LANGS, type Lang } from './translations'

export const DEFAULT_LANG: Lang = 'en'

export function isLang(maybe: string): maybe is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(maybe)
}

export function getLangFromPathname(pathname: string): Lang | null {
  const seg = pathname.split('/').filter(Boolean)[0]
  if (!seg) return null
  return isLang(seg) ? seg : null
}

export function stripLangPrefix(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return '/'
  if (isLang(parts[0])) parts.shift()
  return `/${parts.join('/')}`
}

export function withLangPrefix(pathname: string, lang: Lang): string {
  const stripped = stripLangPrefix(pathname)
  return stripped === '/' ? `/${lang}` : `/${lang}${stripped}`
}

export function replaceLangInPathname(pathname: string, nextLang: Lang): string {
  return withLangPrefix(pathname, nextLang)
}

