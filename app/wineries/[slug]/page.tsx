import { notFound } from 'next/navigation'
import { wineries } from '@/data/wineries'
import WineryDetailClient from './WineryDetailClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function WineryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const winery = wineries.find((w) => w.slug === slug)

  if (!winery) {
    return notFound()
  }
  return <WineryDetailClient slug={slug} />
}

