export type VarietalType = '레드' | '화이트' | '로제' | '스파클링' | '기타'

/** 음식 페어링 상세: 음식명 + 왜 잘 맞는지 이유 */
export interface PairingDetail {
  foodKo: string
  foodEn?: string
  reasonKo: string
  reasonEn?: string
}

export interface Varietal {
  id: string
  slug: string
  nameKo: string
  nameEn: string
  type: VarietalType
  imageUrl?: string
  oneLiner: string
  oneLinerEn?: string
  tasteAndAroma: string
  tasteAndAromaEn?: string
  regions: string[]
  pairings: string[]
  /** 상세 페어링(음식명 + 이유). 있으면 상세 섹션에 표시 */
  pairingDetails?: PairingDetail[]
  body?: '가벼움' | '미디엄' | '풀바디'
  relatedVarietalSlugs: string[]
}

export interface VarietalCard {
  id: string
  slug: string
  nameKo: string
  nameEn: string
  type: VarietalType
  imageUrl?: string
}
