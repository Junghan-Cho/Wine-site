import { notFound } from 'next/navigation'
import { varietals } from '@/data/varietals'
import VarietalDetailClient from './VarietalDetailClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function VarietalDetailPage({ params }: PageProps) {
  const { slug } = await params
  const varietal = varietals.find((v) => v.slug === slug)

  if (!varietal) {
    return notFound()
  }
  return <VarietalDetailClient slug={slug} />
}

