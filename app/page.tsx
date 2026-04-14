'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-provider'
import { withLangPrefix } from '@/lib/i18n/locale'

export default function HomePage() {
  const { t, lang } = useLanguage()
  const titleLines = t('home_title').split('\n')
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t('home_eyebrow')}
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {t('home_subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={withLangPrefix('/map', lang)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-slate-50 shadow-sm hover:bg-primary-soft"
            >
              {t('open_map')}
            </Link>
            <Link
              href={withLangPrefix('/varietals', lang)}
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-200 hover:border-slate-500"
            >
              {t('browse_varietals')}
            </Link>
            <Link
              href={withLangPrefix('/recommend', lang)}
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-200 hover:border-slate-500"
            >
              {t('find_by_taste')}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-primary/60 via-surface to-accent/20 opacity-70 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-800 bg-gradient-to-br from-surface to-background p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span>{t('atlas_preview')}</span>
              <span>{t('key_regions')}</span>
            </div>
            <div className="grid gap-4 text-xs text-slate-200 sm:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{t('key_regions')}</p>
                  <div className="flex flex-wrap gap-2">
                    {['Bordeaux Left Bank', 'Burgundy Côte d’Or', 'Champagne', 'Tuscany', 'Rioja'].map(
                      (note) => (
                        <span
                          key={note}
                          className="rounded-full bg-slate-900 px-2 py-1 text-[11px] text-slate-100"
                        >
                          {note}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{t('varietals_section')}</p>
                  <div className="flex flex-wrap gap-2">
                    {['Cabernet Sauvignon', 'Pinot Noir', 'Chardonnay', 'Riesling'].map((note) => (
                      <span
                        key={note}
                        className="rounded-full bg-slate-900 px-2 py-1 text-[11px] text-slate-100"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Styles</p>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li>• Structured reds from Bordeaux, Rioja, Napa</li>
                    <li>• Elegant Pinot Noir from Burgundy & Oregon</li>
                    <li>• Mineral whites from Mosel & Chablis</li>
                    <li>• Classic Champagne houses</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Next step</p>
                  <p className="text-[11px] text-slate-300">
                    Pick a varietal, open the map, or start with a quick taste profile on the
                    Recommend page. When you are ready to log full tasting notes, continue in VinLog.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">01</p>
          <h2 className="font-display text-lg text-slate-50">Map & regions</h2>
          <p className="text-sm text-slate-300">
            Navigate the world&apos;s key wine regions on an interactive map and jump into benchmark
            producers.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">02</p>
          <h2 className="font-display text-lg text-slate-50">{t('varietals_styles')}</h2>
          <p className="text-sm text-slate-300">
            Learn how each grape tastes, where it thrives, and which iconic labels to look for.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">03</p>
          <h2 className="font-display text-lg text-slate-50">{t('recommend_teaser')}</h2>
          <p className="text-sm text-slate-300">
            Choose the body, acidity, tannin and occasion you want, and get a short list of wines and
            regions that fit.
          </p>
        </div>
      </section>
    </div>
  )
}

