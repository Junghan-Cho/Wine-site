import type { ReactNode } from 'react'
import { LanguageProvider } from '@/lib/language-provider'
import { HeaderNav } from './components/header-nav'
import { Footer } from './components/footer'
import './globals.css'
import { getRequestLang } from '@/lib/i18n/request-lang'
import { SUPPORTED_LANGS } from '@/lib/i18n/translations'

export async function generateMetadata() {
  const lang = await getRequestLang()

  return {
    title: 'Vinhub – World Wine Map & Varietal Showroom',
    description:
      '지도와 품종, 세계 유명 와인 데이터를 중심으로 탐색하는 와인 쇼룸. VinLog 앱으로 이어지는 테이스팅 기록 진입로.',
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `/${l}`])
      ),
    },
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getRequestLang()
  return (
    <html lang={lang}>
      <body>
        <LanguageProvider initialLang={lang}>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-800 bg-surface/80 backdrop-blur">
              <HeaderNav />
            </header>
          <main className="flex-1">
            <div className="mx-auto w-full max-w-content px-6 py-10">{children}</div>
          </main>
          <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}

