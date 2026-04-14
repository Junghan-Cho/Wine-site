'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-provider'
import { withLangPrefix } from '@/lib/i18n/locale'

export function Footer() {
  const { t, lang } = useLanguage()
  return (
    <footer className="border-t border-slate-800 bg-surface/80">
      <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Vinhub. {t('copyright')}</span>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[11px] text-slate-500">
            {t('tagline')}
          </span>
          <Link href={withLangPrefix('/vinlog', lang)} className="text-[11px] text-accent hover:underline">
            {t('nav_vinlog')}
          </Link>
          <Link href={withLangPrefix('/glossary', lang)}>{t('nav_glossary')}</Link>
          <Link href={withLangPrefix('/submit', lang)}>{t('nav_submit')}</Link>
        </div>
      </div>
    </footer>
  )
}
