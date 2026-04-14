import { cookies, headers } from 'next/headers'
import { DEFAULT_LANG, isLang } from './locale'
import type { Lang } from './translations'

const LANG_COOKIE = 'vinhub-lang'

export async function getRequestLang(): Promise<Lang> {
  const h = await headers()
  const fromHeader = h.get('x-vinhub-lang')
  if (fromHeader && isLang(fromHeader)) return fromHeader

  const c = await cookies()
  const fromCookie = c.get(LANG_COOKIE)?.value
  if (fromCookie && isLang(fromCookie)) return fromCookie

  return DEFAULT_LANG
}

