import type { GlossaryTerm } from '../types/glossary'

export const glossaryTerms: GlossaryTerm[] = [
  { id: '1', term: '타닌', termEn: 'Tannin', description: '포도 껍질·씨·대에 있는 성분. 입안에서 씁쓸하고 까끌한 느낌을 주며, 레드 와인에서 구조감을 만든다.', descriptionEn: 'Compound in grape skins, seeds, and stems. Adds astringency and structure to red wines.' },
  { id: '2', term: '산도', termEn: 'Acidity', description: '와인의 신맛·선명함을 주는 성분. 산도가 높으면 상쾌하고 오래 보관하기 좋다.', descriptionEn: 'Gives wine freshness and clarity. Higher acidity aids aging and balance.' },
  { id: '3', term: '바디', termEn: 'Body', description: '입안에서 느껴지는 와인의 무게감. 가벼움·미디엄·풀바디로 표현한다.', descriptionEn: 'The weight of wine on the palate. Described as light, medium, or full-bodied.' },
  { id: '4', term: '잔류당', termEn: 'Residual Sugar', description: '발효 후 와인에 남은 당분. 적으면 드라이(건조), 많으면 스위트(당도)로 부른다.', descriptionEn: 'Sugar left after fermentation. Low = dry, high = sweet.' },
  { id: '5', term: '오크', termEn: 'Oak', description: '참나무 통에서 숙성할 때 나는 향·맛. 바닐라, 스모키, 토스트 느낌이 난다.', descriptionEn: 'Flavor and aroma from barrel aging: vanilla, smoke, toast.' },
  { id: '6', term: 'AOC', termEn: 'Appellation d\'Origine Contrôlée', description: '프랑스 원산지 통제 명칭. 포도 재배 지역·품종·제조 방식이 법으로 정해져 있다.', descriptionEn: 'French controlled designation of origin. Regulates region, grape varieties, and winemaking.' },
  { id: '7', term: '배럴', termEn: 'Barrel', description: '참나무 통. 와인을 통에서 숙성하면 오크 향과 구조감이 더해진다. 신통/구통, 숙성 기간을 표기한다.', descriptionEn: 'Oak vessel for aging. New vs. used barrel and aging time are often stated.' },
  { id: '8', term: '블렌드', termEn: 'Blend', description: '여러 품종을 섞어 만든 와인. 품종 비율(%)로 표기한다.', descriptionEn: 'Wine made from more than one grape variety. Often shown as percentages.' },
  { id: '9', term: '드라이', termEn: 'Dry', description: '당도가 낮아 달지 않은 와인. 대부분의 레드·화이트가 드라이하다.', descriptionEn: 'Low residual sugar; not sweet. Most red and white table wines are dry.' },
  { id: '10', term: '페어링', termEn: 'Pairing', description: '와인과 음식을 함께 맞춰 먹는 것. 맛·질감이 잘 어울리면 페어링이 좋다고 한다.', descriptionEn: 'Matching wine with food. Good pairing balances flavor and texture.' },
  // 마스터 수준: 분류·등급
  { id: '11', term: '1855 보르도 등급', termEn: '1855 Bordeaux Classification', description: '1855 만국박람회 때 나폴레옹 3세가 요청해 정한 보르도 메도크·소테른 등급. 1급~5급(크뤼 클라세)과 소테른 1급·2급이 있다.', descriptionEn: 'Classification of Médoc and Sauternes châteaux for the 1855 Exposition. Premier Cru Classé to Cinquièmes Crus; Sauternes Premier and Deuxième Crus.' },
  { id: '12', term: '그랑 크뤼', termEn: 'Grand Cru', description: '부르고뉴·샹파뉴 등에서 최고 등급 포도원 또는 와인. AOC 규정에 따라 의미가 다름(부르고뉴=포도원 등급, 샹파뉴=마을 등급).', descriptionEn: 'Top-tier vineyard or wine in Burgundy, Champagne, etc. Meaning varies by AOC (e.g. Burgundy = vineyard rank, Champagne = village rank).' },
  { id: '13', term: '1급 포도원', termEn: 'Premier Cru', description: '부르고뉴에서 그랑 크뤼 다음 등급. 마을명 + 1급 포도원명으로 표기(예: 퓌니몽라셰 레 셀렉시옹).', descriptionEn: 'In Burgundy, the rank below Grand Cru. Shown as village + Premier Cru name (e.g. Puligny-Montrachet Les Pucelles).' },
  { id: '14', term: 'DOCG', termEn: 'DOCG', description: '이탈리아 원산지 통제·보증 명칭. DOC보다 규정이 엄격. 바롤로, 바르바레스코, 브루넬로, 키안티 클라시코 등이 DOCG.', descriptionEn: 'Italian controlled and guaranteed designation of origin. Stricter than DOC. Barolo, Barbaresco, Brunello, Chianti Classico are DOCG.' },
  { id: '15', term: '독점 포도원', termEn: 'Monopole', description: '한 생산자만 소유한 포도원. 예: 로마네 콩티(DRC 독점).', descriptionEn: 'A vineyard owned by a single producer. E.g. Romanée-Conti (monopole of DRC).' },
]
