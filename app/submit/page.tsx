'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-provider'
import { trackSubmitSuggestion } from '@/lib/analytics'

export default function SubmitPage() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-2xl text-slate-50">{t('nav_submit')}</h1>
        <p className="text-sm text-slate-300">
          {t('submit_subtitle')}
        </p>
      </header>

      <form
        className="space-y-4 rounded-xl border border-slate-800 bg-surface p-5"
        onSubmit={async (e) => {
          e.preventDefault()
          setStatus('sending')
          setError(null)
          try {
            const form = new FormData(e.currentTarget)
            const kind = String(form.get('kind') ?? '')
            const res = await fetch('/api/ugc/submit', {
              method: 'POST',
              body: JSON.stringify({
                kind,
                name: String(form.get('name') ?? ''),
                email: String(form.get('email') ?? ''),
                message: String(form.get('message') ?? ''),
                website: String(form.get('website') ?? ''),
                // honeypot
                company: String(form.get('company') ?? ''),
              }),
              headers: { 'content-type': 'application/json' },
            })
            if (!res.ok) {
              const json = (await res.json().catch(() => null)) as { error?: string } | null
              throw new Error(json?.error ?? 'Submit failed')
            }
            setStatus('sent')
            trackSubmitSuggestion(kind)
            ;(e.currentTarget as HTMLFormElement).reset()
          } catch (err) {
            setStatus('error')
            setError(err instanceof Error ? err.message : 'Unknown error')
          }
        }}
      >
        {/* honeypot */}
        <input
          tabIndex={-1}
          autoComplete="off"
          name="company"
          className="hidden"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-200">
            <span className="text-xs text-slate-400">{t('submit_kind')}</span>
            <select
              name="kind"
              required
              className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent"
              defaultValue="winery"
            >
              <option value="winery">{t('submit_kind_winery')}</option>
              <option value="wine">{t('submit_kind_wine')}</option>
              <option value="varietal">{t('submit_kind_varietal')}</option>
              <option value="other">{t('submit_kind_other')}</option>
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-200">
            <span className="text-xs text-slate-400">{t('submit_name')}</span>
            <input
              name="name"
              required
              placeholder="예: Chateau XYZ"
              className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-200">
            <span className="text-xs text-slate-400">{t('submit_email')}</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
            />
          </label>

          <label className="space-y-1 text-sm text-slate-200">
            <span className="text-xs text-slate-400">{t('submit_website')}</span>
            <input
              name="website"
              type="url"
              placeholder="https://…"
              className="w-full rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
            />
          </label>
        </div>

        <label className="space-y-1 text-sm text-slate-200">
          <span className="text-xs text-slate-400">{t('submit_message')}</span>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="어떤 정보를 추가/수정하면 좋을지 적어주세요."
            className="w-full resize-none rounded-lg border border-slate-700 bg-background px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent"
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
          >
            {status === 'sending' ? t('submit_sending') : t('submit_send')}
          </button>
          <div className="text-xs text-slate-400">
            {status === 'sent' && <span className="text-accent">{t('submit_sent')}</span>}
            {status === 'error' && <span className="text-red-300">{error}</span>}
          </div>
        </div>
      </form>
    </section>
  )
}

