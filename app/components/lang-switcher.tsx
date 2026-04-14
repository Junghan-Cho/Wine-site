'use client'

import { useLanguage } from '@/lib/language-provider'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n/translations'
import { replaceLangInPathname } from '@/lib/i18n/locale'
import { usePathname, useRouter } from 'next/navigation'

const LABEL_KEYS: Record<Lang, string> = {
  ko: 'lang_ko',
  en: 'lang_en',
  fr: 'lang_fr',
  it: 'lang_it',
  es: 'lang_es',
  de: 'lang_de',
  pt: 'lang_pt',
  ja: 'lang_ja',
  zh: 'lang_zh',
}

export function LangSwitcher() {
  const { lang, setLang, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="lang-select"
        className="text-xs text-slate-400"
      >
        {t('language')}
      </label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => {
          const nextLang = e.target.value as Lang
          setLang(nextLang)
          router.push(replaceLangInPathname(pathname ?? '/', nextLang))
        }}
        className="rounded border border-slate-600 bg-slate-800/80 px-2 py-1.5 text-sm text-slate-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      >
        {SUPPORTED_LANGS.map((l) => (
          <option key={l} value={l}>
            {t(LABEL_KEYS[l])}
          </option>
        ))}
      </select>
    </div>
  )
}
