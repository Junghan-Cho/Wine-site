export interface Winery {
  id: string
  slug: string
  nameKo: string
  nameEn: string
  region: string
  address?: string
  lat: number
  lng: number
  oneLiner: string
  oneLinerEn?: string
  /** 마스터 수준: 분류(1855 1급, Grand Cru, DOCG 등) */
  classificationKo?: string
  classificationEn?: string
  imageUrl?: string
  website?: string
  tastingAvailable?: boolean
  hasShop?: boolean
  wineSlugs: string[]
}
