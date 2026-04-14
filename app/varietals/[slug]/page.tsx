import { notFound } from 'next/navigation'
import { varietals } from '@/data/varietals'
import VarietalDetailClient from './VarietalDetailClient'

type PageProps = {
  params: { slug: string }
}

export default function VarietalDetailPage({ params }: PageProps) {
  const varietal = varietals.find((v) => v.slug === params.slug)

  if (!varietal) {
    return notFound()
  }
  return <VarietalDetailClient slug={params.slug} />
}

