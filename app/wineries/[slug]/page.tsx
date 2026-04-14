import { notFound } from 'next/navigation'
import { wineries } from '@/data/wineries'
import WineryDetailClient from './WineryDetailClient'

type PageProps = {
  params: { slug: string }
}

export default function WineryDetailPage({ params }: PageProps) {
  const winery = wineries.find((w) => w.slug === params.slug)

  if (!winery) {
    return notFound()
  }
  return <WineryDetailClient slug={params.slug} />
}

