'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-provider'
import { withLangPrefix } from '@/lib/i18n/locale'
import { LangSwitcher } from './lang-switcher'

export function HeaderNav() {
  const { t, lang } = useLanguage()
  const pathname = usePathname()
  const base = pathname ?? '/'
  const homeHref = withLangPrefix('/', lang)

  return (
    <nav className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6">
      <div className="flex items-baseline gap-2">
        <Link href={homeHref} className="font-display text-xl tracking-tight">
          {t('nav_siteName')}
        </Link>
        <span className="text-xs text-slate-400">{t('tagline')}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-300">
        <Link href={withLangPrefix('/varietals', lang)} className="hover:text-white">
          {t('nav_varietals')}
        </Link>
        <Link href={withLangPrefix('/map', lang)} className="hover:text-white">
          {t('nav_map')}
        </Link>
        <Link href={withLangPrefix('/recommend', lang)} className="hover:text-white">
          {t('nav_recommend')}
        </Link>
        <Link href={withLangPrefix('/search', lang)} className="hover:text-white">
          {t('nav_search')}
        </Link>
        <Link href={withLangPrefix('/glossary', lang)} className="hover:text-white">
          {t('nav_glossary')}
        </Link>
        <Link
          href={withLangPrefix('/vinlog', lang)}
          className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-200 hover:border-accent hover:text-accent"
        >
          {t('nav_vinlog')}
        </Link>
        <LangSwitcher />
      </div>
    </nav>
  )
}
