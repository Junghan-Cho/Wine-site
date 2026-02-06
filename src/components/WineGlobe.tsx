import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Winery } from '../types/winery'

interface WineGlobeProps {
  wineries: Winery[]
  height: number
  lang: 'ko' | 'en' | 'fr' | 'it' | 'ja' | 'zh'
  seeDetailLabel: string
}

export default function WineGlobe({ wineries, height, lang, seeDetailLabel }: WineGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<ReturnType<typeof import('globe.gl').default> | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current || wineries.length === 0) return

    let mounted = true
    const el = containerRef.current

    import('globe.gl').then((mod) => {
      if (!mounted || !el) return
      const Globe = mod.default
      const globe = (typeof Globe === 'function' ? new (Globe as new (el: HTMLElement) => unknown)(el) : (Globe as (el: HTMLElement) => unknown)(el)) as {
        pointsData: (d: unknown[]) => unknown
        pointLat: (acc: (d: { lat: number }) => number) => unknown
        pointLng: (acc: (d: { lng: number }) => number) => unknown
        pointLabel: (acc: (d: { name: string }) => string) => unknown
        pointColor: () => unknown
        pointAltitude: () => unknown
        pointRadius: () => unknown
        width: (w: number) => unknown
        height: (h: number) => unknown
        backgroundColor: (c: string) => unknown
        onPointClick: (fn: (p: { slug: string }) => void) => unknown
        _destructor?: () => void
      }
      if (!mounted) {
        if (typeof globe._destructor === 'function') globe._destructor()
        return
      }
      globeRef.current = globe

      const points = wineries.map((w) => ({
        lat: w.lat,
        lng: w.lng,
        name: lang === 'en' ? w.nameEn : w.nameKo,
        slug: w.slug,
      }))

      globe.pointsData(points)
      globe.pointLat((d: { lat: number }) => d.lat)
      globe.pointLng((d: { lng: number }) => d.lng)
      globe.pointLabel((d: { name: string }) => d.name)
      globe.pointColor(() => '#a8323e')
      globe.pointAltitude(0.02)
      globe.pointRadius(0.3)
      globe.width(el.offsetWidth)
      globe.height(height)
      globe.backgroundColor('transparent')
      globe.onPointClick((p: { slug: string }) => navigate(`/wineries/${p.slug}`))
    })

    return () => {
      mounted = false
      if (globeRef.current && typeof (globeRef.current as { _destructor?: () => void })._destructor === 'function') {
        (globeRef.current as { _destructor: () => void })._destructor()
      }
      globeRef.current = null
    }
  }, [wineries, height, lang, navigate])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        background: 'var(--color-bg)',
      }}
      aria-label="3D Globe"
    />
  )
}
