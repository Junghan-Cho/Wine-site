import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LANG, isLang } from '@/lib/i18n/locale'

const LANG_COOKIE = 'vinhub-lang'
const PUBLIC_FILE = /\.(.*)$/

function pickLangFromAcceptLanguage(value: string | null): string | null {
  if (!value) return null
  // very small parser: "en-US,en;q=0.9,ko;q=0.8"
  const candidates = value
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean) as string[]

  for (const c of candidates) {
    const base = c.split('-')[0]
    if (base && isLang(base)) return base
    if (c && isLang(c)) return c
  }
  return null
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  // If already prefixed: rewrite internally, set cookie + header for SSR.
  if (first && isLang(first)) {
    const lang = first
    const url = req.nextUrl.clone()
    url.pathname = `/${segments.slice(1).join('/')}`
    if (url.pathname === '/') url.pathname = '/'
    url.search = search

    const res = NextResponse.rewrite(url)
    res.cookies.set(LANG_COOKIE, lang, { path: '/', sameSite: 'lax' })
    res.headers.set('x-vinhub-lang', lang)
    return res
  }

  // No prefix: redirect to best lang prefix (cookie > accept-language > default).
  const cookieLang = req.cookies.get(LANG_COOKIE)?.value
  const acceptLang = pickLangFromAcceptLanguage(req.headers.get('accept-language'))
  const lang = (cookieLang && isLang(cookieLang) ? cookieLang : null) ?? acceptLang ?? DEFAULT_LANG

  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`
  redirectUrl.search = search

  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
}

