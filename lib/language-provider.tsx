'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { translations, type Lang } from './i18n/translations'
import { DEFAULT_LANG } from './i18n/locale'

const STORAGE_KEY = 'vinhub-lang'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode
  initialLang: Lang
}) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return initialLang ?? DEFAULT_LANG
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
      const supported: Lang[] = ['ko', 'en', 'fr', 'it', 'es', 'de', 'pt', 'ja', 'zh']
      if (saved && supported.includes(saved)) return saved
    } catch (_) {}
    return initialLang ?? DEFAULT_LANG
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (_) {}
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang]
      const fallback = translations.en
      return dict?.[key] ?? fallback?.[key] ?? key
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
