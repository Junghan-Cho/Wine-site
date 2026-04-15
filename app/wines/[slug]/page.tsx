import { notFound } from 'next/navigation'
import { wines } from '@/data/wines'
import WineDetailClient from './WineDetailClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function WineDetailPage({ params }: PageProps) {
  const { slug } = await params
  const wine = wines.find((w) => w.slug === slug)

  if (!wine) {
    return notFound()
  }
  return <WineDetailClient slug={slug} />
}

