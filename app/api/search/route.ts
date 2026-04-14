import { NextResponse } from 'next/server'
import { searchAll } from '@/lib/search/search'
import type { SearchScope } from '@/lib/search/types'

export function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') ?? ''
  const scope = (url.searchParams.get('scope') ?? 'all') as SearchScope
  const result = searchAll(q, scope)
  return NextResponse.json(result, {
    headers: {
      'cache-control': 'public, max-age=60',
    },
  })
}

