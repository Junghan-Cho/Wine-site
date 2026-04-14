type ContentType = 'varietal' | 'winery' | 'wine' | 'style' | 'glossary'

type VinlogCtaLocation = 'hero' | 'footer' | 'content_inline'

export function trackViewContent(type: ContentType, id: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'view_content',
    content_type: type,
    content_id: id,
  })
}

export function trackVinlogCta(location: VinlogCtaLocation) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'click_vinlog_cta',
    location,
  })
}

export function trackSearch(q: string, scope: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'search',
    search_term: q,
    search_scope: scope,
  })
}

export function trackFilter(name: string, value: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'apply_filter',
    filter_name: name,
    filter_value: value,
  })
}

export function trackSubmitSuggestion(kind: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'submit_suggestion',
    suggestion_kind: kind,
  })
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

