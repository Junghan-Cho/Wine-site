import type { RecommendOption } from '../types/recommend'

export const styleOptions: RecommendOption[] = [
  { slug: 'light-white', label: '가벼운 화이트', labelEn: 'Light white', description: '산뜻하고 가벼운 화이트 와인을 만나보세요.', descriptionEn: 'Fresh, light white wines.', varietalSlugs: ['sauvignon-blanc', 'chardonnay', 'riesling'] },
  { slug: 'full-bodied-red', label: '풀바디 레드', labelEn: 'Full-bodied red', description: '굵은 타닌과 깊은 맛의 레드 와인.', descriptionEn: 'Bold tannins and deep red wines.', varietalSlugs: ['cabernet-sauvignon', 'merlot', 'syrah'] },
  { slug: 'sparkling', label: '스파클링', labelEn: 'Sparkling', description: '기분 좋은 스파클링 와인.', descriptionEn: 'Celebratory sparkling wines.', varietalSlugs: ['chardonnay', 'pinot-noir'] },
  { slug: 'rose', label: '로제', labelEn: 'Rosé', description: '가벼운 로제 와인.', descriptionEn: 'Light rosé wines.', varietalSlugs: ['pinot-noir', 'gamay'] },
  { slug: 'light-red', label: '가벼운 레드', labelEn: 'Light red', description: '부드럽고 섬세한 레드 와인.', descriptionEn: 'Soft, delicate red wines.', varietalSlugs: ['pinot-noir', 'gamay'] },
]

export const situationOptions: RecommendOption[] = [
  { slug: 'date', label: '데이트용', labelEn: 'For a date', description: '데이트에 어울리는 와인.', descriptionEn: 'Wines for a date.', varietalSlugs: ['pinot-noir', 'chardonnay', 'sauvignon-blanc'] },
  { slug: 'party', label: '파티용', labelEn: 'For a party', description: '파티와 잘 맞는 와인.', descriptionEn: 'Wines for a party.', varietalSlugs: ['chardonnay', 'sauvignon-blanc', 'merlot'] },
  { slug: 'solo', label: '혼자 마실 한 병', labelEn: 'Solo bottle', description: '혼자 즐기기 좋은 와인.', descriptionEn: 'Wines to enjoy alone.', varietalSlugs: ['pinot-noir', 'sauvignon-blanc'] },
  { slug: 'gift', label: '선물용', labelEn: 'As a gift', description: '선물하기 좋은 와인.', descriptionEn: 'Wines to gift.', varietalSlugs: ['cabernet-sauvignon', 'chardonnay'] },
  { slug: 'food-pairing', label: '음식과 함께', labelEn: 'With food', description: '음식과 페어링하기 좋은 와인.', descriptionEn: 'Wines to pair with food.', varietalSlugs: ['cabernet-sauvignon', 'pinot-noir', 'chardonnay', 'sauvignon-blanc', 'merlot'] },
]
