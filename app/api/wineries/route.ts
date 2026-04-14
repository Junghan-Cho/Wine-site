import { NextResponse } from 'next/server'
import { wineries } from '@/data/wineries'
import { wines } from '@/data/wines'

const TYPE_VALUES = ['레드', '화이트', '로제', '스파클링'] as const

function wineryProducesType(slug: string, wineType: (typeof TYPE_VALUES)[number]): boolean {
  return wines.some((w) => w.winerySlug === slug && w.type === wineType)
}

export function GET(req: Request) {
  const url = new URL(req.url)
  const region = url.searchParams.get('region') ?? 'all'
  const type = url.searchParams.get('type') ?? 'all'
  const tasting = url.searchParams.get('tasting') === '1'
  const shop = url.searchParams.get('shop') === '1'
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase()

  let list = wineries.slice()

  if (region !== 'all') list = list.filter((w) => w.region === region)
  if (type !== 'all' && (TYPE_VALUES as readonly string[]).includes(type)) {
    list = list.filter((w) => wineryProducesType(w.slug, type as (typeof TYPE_VALUES)[number]))
  }
  if (tasting) list = list.filter((w) => w.tastingAvailable)
  if (shop) list = list.filter((w) => w.hasShop)
  if (q) {
    list = list.filter(
      (w) =>
        w.nameEn.toLowerCase().includes(q) ||
        w.nameKo.toLowerCase().includes(q) ||
        w.region.toLowerCase().includes(q),
    )
  }

  return NextResponse.json(
    {
      total: list.length,
      items: list,
    },
    {
      headers: {
        'cache-control': 'public, max-age=60',
      },
    },
  )
}

