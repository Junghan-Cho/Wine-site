export interface WineTechnical {
  alcohol?: string
  acidity?: string
  pH?: string
  residualSugar?: string
  barrel?: string
  bottlingDate?: string
  blend?: string
}

export interface Wine {
  id: string
  slug: string
  nameKo: string
  nameEn: string
  winerySlug: string
  type: string
  region: string
  oneLiner?: string
  imageUrl?: string
  varietalSlugs: string[]
  technical: WineTechnical
  technicalPdfUrl?: string
}
