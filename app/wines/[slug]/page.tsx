import { notFound } from 'next/navigation'
import { wines } from '@/data/wines'
import WineDetailClient from './WineDetailClient'

type PageProps = {
  params: { slug: string }
}

export default function WineDetailPage({ params }: PageProps) {
  const wine = wines.find((w) => w.slug === params.slug)

  if (!wine) {
    return notFound()
  }
  return <WineDetailClient slug={params.slug} />
}

