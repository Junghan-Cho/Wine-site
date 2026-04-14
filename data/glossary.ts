export type GlossaryCategory =
  | 'structure'
  | 'aroma'
  | 'winemaking'
  | 'viticulture'
  | 'service'
  | 'faults'
  | 'law'
  | 'other'

export type GlossaryLevelTag = 'wset3' | 'diploma' | 'mw'

/** 언어별 용어명(term) 접미사. ko는 term, en은 termEn, 그 외 termFr 등 */
export type TermLangKey = 'termEn' | 'termFr' | 'termIt' | 'termEs' | 'termDe' | 'termPt' | 'termJa' | 'termZh'
export type DefinitionLangKey = 'definitionEn' | 'definitionFr' | 'definitionIt' | 'definitionEs' | 'definitionDe' | 'definitionPt' | 'definitionJa' | 'definitionZh'

export interface GlossaryTerm {
  slug: string
  term: string
  termEn?: string
  termFr?: string
  termIt?: string
  termEs?: string
  termDe?: string
  termPt?: string
  termJa?: string
  termZh?: string
  category: GlossaryCategory
  /** 난이도/출처 태그. UI 필터링/검색에 사용 */
  levels?: GlossaryLevelTag[]
  definition: string
  definitionEn?: string
  definitionFr?: string
  definitionIt?: string
  definitionEs?: string
  definitionDe?: string
  definitionPt?: string
  definitionJa?: string
  definitionZh?: string
  example?: string
  relatedSlugs?: string[]
}

const LANG_TO_TERM_KEY: Record<string, TermLangKey | undefined> = {
  ko: undefined,
  en: 'termEn',
  fr: 'termFr',
  it: 'termIt',
  es: 'termEs',
  de: 'termDe',
  pt: 'termPt',
  ja: 'termJa',
  zh: 'termZh',
}

const LANG_TO_DEFINITION_KEY: Record<string, DefinitionLangKey | undefined> = {
  ko: undefined,
  en: 'definitionEn',
  fr: 'definitionFr',
  it: 'definitionIt',
  es: 'definitionEs',
  de: 'definitionDe',
  pt: 'definitionPt',
  ja: 'definitionJa',
  zh: 'definitionZh',
}

export function getDisplayTerm(term: GlossaryTerm, lang: string): string {
  if (lang === 'ko') return term.term
  const key = LANG_TO_TERM_KEY[lang]
  const value = key ? term[key] : undefined
  return value ?? term.termEn ?? term.term
}

export function getDisplayDefinition(term: GlossaryTerm, lang: string): string {
  if (lang === 'ko') return term.definition
  const key = LANG_TO_DEFINITION_KEY[lang]
  const value = key ? term[key] : undefined
  return value ?? term.definitionEn ?? term.definition
}

const manualGlossaryTerms: GlossaryTerm[] = [
  // --- Structure (WSET SAT · Diploma) ---
  {
    slug: 'acidity',
    term: '산도(Acidity)',
    termEn: 'Acidity',
    termFr: 'Acidité',
    termIt: 'Acidità',
    termEs: 'Acidez',
    termDe: 'Säure',
    termPt: 'Acidez',
    termJa: '酸度',
    termZh: '酸度',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '와인이 입안에서 주는 상큼함과 긴장감의 정도. WSET SAT에서는 low–medium(−)–medium–medium(+)–high로 평가. 타트aric, malic, lactic acid 등이 기여.',
    definitionEn:
      'The degree of freshness and tension wine gives in the mouth. WSET SAT rates low–medium(−)–medium–medium(+)–high. Tartaric, malic, lactic acid, etc. contribute.',
    example: 'Riesling, Sauvignon Blanc, Assyrtiko는 일반적으로 높은 산도를 가집니다.',
  },
  {
    slug: 'tannin',
    term: '타닌(Tannin)',
    termEn: 'Tannin',
    termFr: 'Tanin',
    termIt: 'Tanino',
    termEs: 'Tanino',
    termDe: 'Tannin',
    termPt: 'Tanino',
    termJa: 'タンニン',
    termZh: '单宁',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '주로 포도 껍질, 씨, 줄기, 오크에서 오는 폴리페놀. 입안에서 수렴감(astringency)과 거칠기를 줌. 품질 평가 시 타닌의 양(level)과 성질(nature: ripe/smooth vs green/harsh)을 구분.',
    definitionEn:
      'Polyphenols mainly from grape skins, seeds, stems and oak. Give astringency and grip in the mouth. Quality assessment considers level and nature (ripe/smooth vs green/harsh).',
  },
  {
    slug: 'body',
    term: '바디(Body)',
    termEn: 'Body',
    termFr: 'Corps',
    termIt: 'Corpo',
    termEs: 'Cuerpo',
    termDe: 'Körper',
    termPt: 'Corpo',
    termJa: 'ボディ',
    termZh: '酒体',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '입안에서 느껴지는 무게감과 질감. WSET SAT: light–medium(−)–medium–medium(+)–full. 알코올, 당도, 추출물, 글리세린이 복합 작용.',
    definitionEn:
      'Weight and texture perceived in the mouth. WSET SAT: light–medium(−)–medium–medium(+)–full. Alcohol, sweetness, extract and glycerol all contribute.',
    example: 'Barolo, Napa Cabernet는 full body, Mosel Kabinett Riesling은 light body로 평가됩니다.',
  },
  {
    slug: 'dry',
    term: '드라이(Dry)',
    termEn: 'Dry',
    termFr: 'Sec',
    termIt: 'Secco',
    termEs: 'Seco',
    termDe: 'Trocken',
    termPt: 'Seco',
    termJa: 'ドライ',
    termZh: '干型',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '잔당(Residual sugar)이 거의 없어 단맛이 느껴지지 않는 스타일. WSET 당도 스케일: dry–off-dry–medium-dry–medium-sweet–sweet–luscious.',
    definitionEn:
      'Style with little or no residual sugar and no perceived sweetness. WSET sweetness scale: dry–off-dry–medium-dry–medium-sweet–sweet–luscious.',
    example: '대부분의 보르도 레드, Champagne Brut는 dry에 해당합니다.',
  },
  {
    slug: 'residual-sugar',
    term: '잔류당(Residual sugar)',
    termEn: 'Residual sugar',
    termFr: 'Sucre résiduel',
    termIt: 'Zucchero residuo',
    termEs: 'Azúcar residual',
    termDe: 'Restzucker',
    termPt: 'Açúcar residual',
    termJa: '残糖',
    termZh: '残糖',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '발효 후 와인에 남은 당의 양. 당도 스타일(dry/sweet)과 밀접. 측정 단위 g/L. 과일 향과 구분해 실제 당도를 평가해야 함.',
    definitionEn:
      'Sugar remaining in wine after fermentation. Directly linked to dry/sweet style. Measured in g/L. Must be assessed separately from fruity aromas.',
  },
  {
    slug: 'finish',
    term: '피니시(Finish)',
    termEn: 'Finish',
    termFr: 'Finale',
    termIt: 'Finale',
    termEs: 'Final',
    termDe: 'Abgang',
    termPt: 'Final',
    termJa: 'フィニッシュ',
    termZh: '余味',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '삼킨 뒤 향과 맛이 지속되는 길이와 질. WSET SAT: short–medium(−)–medium–medium(+)–long. 품질 지표로 사용.',
    definitionEn:
      'Length and character of aromas and flavours after swallowing. WSET SAT: short–medium(−)–medium–medium(+)–long. Used as a quality indicator.',
  },
  {
    slug: 'extract',
    term: '추출물(Extract)',
    termEn: 'Extract',
    termFr: 'Extrait',
    termIt: 'Estratto',
    termEs: 'Extracto',
    termDe: 'Extrakt',
    termPt: 'Extrato',
    termJa: 'エキス',
    termZh: '浸出物',
    category: 'structure',
    levels: ['diploma'],
    definition:
      '당·알코올을 제외한 고형분(폴리페놀, 미네랄, 산 등). 바디·텍스처·피니시에 기여. 과잉 추출은 거칠고 쓴 맛을 낼 수 있음.',
    definitionEn:
      'Non-sugar, non-alcohol solids (polyphenols, minerals, acids). Contribute to body, texture and finish. Over-extraction can give harsh, bitter flavours.',
  },
  {
    slug: 'mousse',
    term: '무스(Mousse)',
    termEn: 'Mousse',
    termFr: 'Mousse',
    termIt: 'Mousse',
    termEs: 'Mousse',
    termDe: 'Mousse',
    termPt: 'Mousse',
    termJa: 'ムース',
    termZh: '慕斯',
    category: 'structure',
    levels: ['wset3', 'diploma'],
    definition:
      '스파클링 와인에서 거품의 질감. WSET: delicate–creamy–aggressive. 전통 방식은 보통 creamy, 탱크 방식은 더 거칠 수 있음.',
    definitionEn:
      'Texture of the bubbles in sparkling wine. WSET: delicate–creamy–aggressive. Traditional method often creamy; tank method can be coarser.',
  },
  // --- Aroma (SAT Primary / Secondary / Tertiary) ---
  {
    slug: 'primary-aromas',
    term: '1차 향(Primary aromas)',
    termEn: 'Primary aromas',
    termFr: 'Arômes primaires',
    termIt: 'Aromi primari',
    termEs: 'Aromas primarios',
    termDe: 'Primäraromen',
    termPt: 'Aromas primários',
    termJa: '一次香',
    termZh: '一级香气',
    category: 'aroma',
    definition:
      '포도 품종과 발효에서 오는 향. WSET Lexicon: floral, green fruit, citrus, stone fruit, tropical fruit, red fruit, black fruit, herbaceous, herbal, spice, fruit ripeness 등.',
    definitionEn:
      'Aromas from grape variety and fermentation. WSET Lexicon: floral, green fruit, citrus, stone fruit, tropical fruit, red fruit, black fruit, herbaceous, herbal, spice, fruit ripeness, etc.',
  },
  {
    slug: 'secondary-aromas',
    term: '2차 향(Secondary aromas)',
    termEn: 'Secondary aromas',
    termFr: 'Arômes secondaires',
    termIt: 'Aromi secondari',
    termEs: 'Aromas secundarios',
    termDe: 'Sekundäraromen',
    termPt: 'Aromas secundários',
    termJa: '二次香',
    termZh: '二级香气',
    category: 'aroma',
    definition:
      '발효·숙성 과정에서 생기는 향. 효모 유래(biscuit, bread, brioche), 말롤락틱(butter, cream), 오크(vanilla, cloves, cedar, smoke).',
    definitionEn:
      'Aromas from fermentation and maturation. Yeast-derived (biscuit, bread, brioche), malolactic (butter, cream), oak (vanilla, cloves, cedar, smoke).',
  },
  {
    slug: 'tertiary-aromas',
    term: '3차 향(Tertiary aromas)',
    termEn: 'Tertiary aromas',
    termFr: 'Arômes tertiaires',
    termIt: 'Aromi terziari',
    termEs: 'Aromas terciarios',
    termDe: 'Tertiäraromen',
    termPt: 'Aromas terciários',
    termJa: '三次香',
    termZh: '三级香气',
    category: 'aroma',
    definition:
      '병·오크 장기 숙성에서 오는 향. 레드: leather, earth, mushroom, tobacco, forest floor. 화이트: dried fruit, petrol, nuts, honey.',
    definitionEn:
      'Aromas from bottle or oak ageing. Red: leather, earth, mushroom, tobacco, forest floor. White: dried fruit, petrol, nuts, honey.',
  },
  {
    slug: 'development',
    term: '발전 단계(Development)',
    termEn: 'Development',
    termFr: 'Développement',
    termIt: 'Sviluppo',
    termEs: 'Desarrollo',
    termDe: 'Entwicklung',
    termPt: 'Desenvolvimento',
    termJa: '熟成段階',
    termZh: '发展程度',
    category: 'aroma',
    definition:
      'WSET SAT에서 코의 발전 상태. youthful–developing–fully developed–tired/past its best. 병숙성·산화 정도를 나타냄.',
    definitionEn:
      'WSET SAT nose development state: youthful–developing–fully developed–tired/past its best. Reflects bottle age and oxidation.',
  },
  {
    slug: 'reduction',
    term: '리덕션(Reduction)',
    termEn: 'Reduction',
    termFr: 'Réduction',
    termIt: 'Riduzione',
    termEs: 'Reducción',
    termDe: 'Reduktion',
    termPt: 'Redução',
    termJa: '還元',
    termZh: '还原',
    category: 'aroma',
    definition:
      '산소 접촉이 적을 때 나타나는 휘발성 황 화합물. 경미하면 flint, struck match(긍정적); 과하면 rotten egg, cabbage(결함).',
    definitionEn:
      'Volatile sulphur compounds when oxygen exposure is low. Slight: flint, struck match (positive); excessive: rotten egg, cabbage (fault).',
    relatedSlugs: ['reduction-fault'],
  },
  // --- Winemaking (Diploma D1 수준) ---
  {
    slug: 'oak',
    term: '오크 숙성(Oak ageing)',
    termEn: 'Oak ageing',
    termFr: 'Élevage en fût de chêne',
    termIt: 'Affinamento in legno',
    termEs: 'Crianza en roble',
    termDe: 'Ausbau in Eiche',
    termPt: 'Estágio em carvalho',
    termJa: 'オーク熟成',
    termZh: '橡木陈酿',
    category: 'winemaking',
    definition:
      '오크 배럴에서 숙성. 종(프랑스/미국), 제작(toast level), 크기(barrique 225L vs foudre), 신/구에 따라 바닐라, 토스트, 스파이스, 텍스처 변화. Inert vessel(스테인리스, 콘크리트)과 대비.',
    definitionEn:
      'Ageing in oak barrels. Species (French/American), toast level, size (barrique 225L vs foudre), new/used affect vanilla, toast, spice and texture. Contrast with inert vessels (stainless, concrete).',
    example: 'Rioja Gran Reserva, Barossa Shiraz, 오크 숙성 Chardonnay.',
  },
  {
    slug: 'malolactic-conversion',
    term: '말롤락틱 발효(Malolactic conversion, MLC)',
    termEn: 'Malolactic conversion (MLC)',
    termFr: 'Fermentation malolactique',
    termIt: 'Fermentazione malolattica',
    termEs: 'Fermentación maloláctica',
    termDe: 'Malolaktische Gärung',
    termPt: 'Fermentação malolática',
    termJa: 'マロラクティック発酵',
    termZh: '苹果酸-乳酸发酵',
    category: 'winemaking',
    definition:
      '말산을 젖산으로 전환하는 박테리아 발효. 산도 감소, 버터·크림 노트, 미생물 안정화. 대부분의 레드와 많은 화이트에서 수행.',
    definitionEn:
      'Bacterial fermentation converting malic to lactic acid. Lowers acidity, adds butter/cream notes, microbial stability. Used in most reds and many whites.',
    example: '버터리한 Chardonnay, 대부분의 보르도/부르고뉴 레드.',
  },
  {
    slug: 'noble-rot',
    term: '귀부(Botrytis / Noble rot)',
    termEn: 'Botrytis / Noble rot',
    termFr: 'Pourriture noble',
    termIt: 'Muffa nobile',
    termEs: 'Podredumbre noble',
    termDe: 'Edelfäule',
    termPt: 'Podridão nobre',
    termJa: '貴腐',
    termZh: '贵腐',
    category: 'winemaking',
    definition:
      'Botrytis cinerea가 건조 조건에서 포도 껍질을 뚫어 수분 증발·당 농축. 귀부 와인은 당·산·풍미가 집약됨.',
    definitionEn:
      'Botrytis cinerea under dry conditions pierces grape skins, evaporating water and concentrating sugar. Noble rot wines are intense in sugar, acid and flavour.',
    example: 'Sauternes, Tokaji Aszú, Beerenauslese, Trockenbeerenauslese.',
  },
  {
    slug: 'carbonic-maceration',
    term: '탄산 매세레이션(Carbonic maceration)',
    termEn: 'Carbonic maceration',
    termFr: 'Macération carbonique',
    termIt: 'Macerazione carbonica',
    termEs: 'Maceración carbónica',
    termDe: 'Kohlensäuremaischung',
    termPt: 'Maceração carbónica',
    termJa: '炭酸マセラシオン',
    termZh: '二氧化碳浸渍',
    category: 'winemaking',
    definition:
      '온전한 포도 알을 CO2 분위기에서 발효. 내부 알코올 발효로 부드러운 타닌, 베리·바나나 향. 보졸레 누보, 일부 스페인/신세계에서 사용.',
    definitionEn:
      'Fermenting whole grapes in a CO2-rich atmosphere. Intracellular fermentation gives soft tannins, berry and banana aromas. Used in Beaujolais Nouveau, some Spanish and New World wines.',
  },
  {
    slug: 'lees',
    term: '리스(Lees)',
    termEn: 'Lees',
    termFr: 'Lie',
    termIt: 'Feccia',
    termEs: 'Lías',
    termDe: 'Hefesatz',
    termPt: 'Borras',
    termJa: '澱',
    termZh: '酒泥',
    category: 'winemaking',
    definition:
      '발효 후 침전하는 효모·고형물. Sur lie(리스 위에 두기), batonnage(교반)로 텍스처·풍미(bread, cream) 부여. 화이트·스파클링에서 흔함.',
    definitionEn:
      'Sediment of yeast and solids after fermentation. Sur lie ageing and batonnage add texture and flavour (bread, cream). Common in white and sparkling.',
  },
  {
    slug: 'fining',
    term: '피닝(Fining)',
    termEn: 'Fining',
    termFr: 'Collage',
    termIt: 'Chiarifica',
    termEs: 'Clarificación',
    termDe: 'Schönung',
    termPt: 'Colagem',
    termJa: '清澄',
    termZh: '下胶',
    category: 'winemaking',
    definition:
      '불안정 물질을 제거하기 위해 bentonite, egg white, casein, PVPP 등을 넣어 침전·제거하는 정제. 탁도 감소, 타닌 부드럽게 함.',
    definitionEn:
      'Clarification by adding bentonite, egg white, casein, PVPP, etc. to precipitate and remove unstable matter. Reduces haze and can soften tannin.',
  },
  {
    slug: 'filtration',
    term: '여과(Filtration)',
    termEn: 'Filtration',
    termFr: 'Filtration',
    termIt: 'Filtrazione',
    termEs: 'Filtración',
    termDe: 'Filtration',
    termPt: 'Filtração',
    termJa: '濾過',
    termZh: '过滤',
    category: 'winemaking',
    definition:
      'Depth filtration(거친 여과)와 surface/membrane filtration(미세 여과). 미생물·고형물 제거. 과도한 여과는 풍미 손실 우려.',
    definitionEn:
      'Depth (coarse) and surface/membrane (fine) filtration to remove microbes and solids. Over-filtration can strip flavour.',
  },
  {
    slug: 'traditional-method',
    term: '전통 방식(Traditional method)',
    termEn: 'Traditional method',
    termFr: 'Méthode traditionnelle',
    termIt: 'Metodo classico',
    termEs: 'Método tradicional',
    termDe: 'Traditionelle Flaschengärung',
    termPt: 'Método tradicional',
    termJa: '伝統方式',
    termZh: '传统法',
    category: 'winemaking',
    definition:
      'Champagne 방식: 1차 발효 후 병에 tirage, 2차 발효 in bottle, lees ageing, riddling, disgorgement, dosage. Cremant, Cava, Cap Classique 등에서 사용.',
    definitionEn:
      'Champagne method: primary fermentation, then tirage into bottle, second fermentation in bottle, lees ageing, riddling, disgorgement, dosage. Used in Crémant, Cava, Cap Classique, etc.',
  },
  {
    slug: 'dosage',
    term: '도사주(Dosage / Liqueur d\'expédition)',
    termEn: 'Dosage / Liqueur d\'expédition',
    termFr: 'Dosage / Liqueur d\'expédition',
    termIt: 'Dosaggio',
    termEs: 'Dosaje',
    termDe: 'Dosage',
    termPt: 'Dosagem',
    termJa: 'ドサージュ',
    termZh: '补液',
    category: 'winemaking',
    definition:
      '스파클링 와인 디고르주망 후 첨가하는 설탕·와인 혼합액. 최종 당도 결정. Brut nature(무첨가)–Brut–Extra dry–Sec–Demi-sec–Doux.',
    definitionEn:
      'Sugar and wine mixture added after disgorgement to set final sweetness. Brut nature (no dosage)–Brut–Extra dry–Sec–Demi-sec–Doux.',
  },
  {
    slug: 'flor',
    term: '플로르(Flor)',
    termEn: 'Flor',
    termFr: 'Flor',
    termIt: 'Flor',
    termEs: 'Flor',
    termDe: 'Flor',
    termPt: 'Flor',
    termJa: 'フロール',
    termZh: '酒花',
    category: 'winemaking',
    definition:
      'Sherry 제조 시 표면에 생기는 효모 막. Fino/Manzanilla는 flor 아래 biological ageing로 산화 억제, 짠·견과류·빵 향. 15% abv 근처에서 번성.',
    definitionEn:
      'Film of yeast on the surface in Sherry production. Fino/Manzanilla age under flor (biological ageing), limiting oxidation; salty, nutty, bread notes. Flor thrives around 15% abv.',
    example: 'Fino, Manzanilla.',
  },
  {
    slug: 'oxidative-ageing',
    term: '산화 숙성(Oxidative ageing)',
    termEn: 'Oxidative ageing',
    termFr: 'Élevage oxydatif',
    termIt: 'Affinamento ossidativo',
    termEs: 'Crianza oxidativa',
    termDe: 'Oxidativer Ausbau',
    termPt: 'Estágio oxidativo',
    termJa: '酸化熟成',
    termZh: '氧化陈酿',
    category: 'winemaking',
    definition:
      '산소 접촉을 허용한 숙성. Sherry Oloroso, Tawny Port, 일부 Vin Jaune. 견과류, 카라멜, 건과일 노트.',
    definitionEn:
      'Ageing with oxygen exposure. Sherry Oloroso, Tawny Port, some Vin Jaune. Nut, caramel and dried fruit notes.',
  },
  // --- Viticulture (Diploma D1) ---
  {
    slug: 'veraison',
    term: '베레존(Véraison)',
    termEn: 'Véraison',
    termFr: 'Véraison',
    termIt: 'Invaiatura',
    termEs: 'Envero',
    termDe: 'Farbumschlag',
    termPt: 'Pintor',
    termJa: 'ヴェレゾン',
    termZh: '转色期',
    category: 'viticulture',
    definition:
      '포도 알이 자라 색이 변하고 당이 쌓이기 시작하는 시기. 성숙 단계의 시작. 레드 품종은 초록→보라/검정으로 변함.',
    definitionEn:
      'Stage when berries grow, change colour and begin to accumulate sugar; start of ripening. Red varieties turn from green to purple/black.',
  },
  {
    slug: 'phylloxera',
    term: '필록세라(Phylloxera)',
    termEn: 'Phylloxera',
    termFr: 'Phylloxéra',
    termIt: 'Fillossera',
    termEs: 'Filoxera',
    termDe: 'Reblaus',
    termPt: 'Filoxera',
    termJa: 'フィロキセラ',
    termZh: '根瘤蚜',
    category: 'viticulture',
    definition:
      'Vitis vinifera 뿌리를 공격하는 진딧물. 19세기 말 유럽 포도원 대부분 피해. 미국 품종 뿌리대(rootstock)에 접목해 재식으로 대응.',
    definitionEn:
      'Aphid that attacks Vitis vinifera roots. Devastated most European vineyards in the late 19th century. Addressed by grafting onto American rootstocks.',
  },
  {
    slug: 'rootstock',
    term: '뿌리대(Rootstock)',
    termEn: 'Rootstock',
    termFr: 'Porte-greffe',
    termIt: 'Portinnesto',
    termEs: 'Portainjerto',
    termDe: 'Unterlage',
    termPt: 'Porta-enxerto',
    termJa: '台木',
    termZh: '砧木',
    category: 'viticulture',
    definition:
      '접목 시 뿌리 역할을 하는 품종. Phylloxera·선충 저항성, 건조·습지 적응, 활력 조절 등. 예: 101-14, 3309, SO4.',
    definitionEn:
      'Variety used as the root system when grafting. Provides phylloxera/nematode resistance, drought/wet adaptation, vigour control. E.g. 101-14, 3309, SO4.',
  },
  {
    slug: 'canopy-management',
    term: '캐노피 관리(Canopy management)',
    termEn: 'Canopy management',
    termFr: 'Conduite du feuillage',
    termIt: 'Gestione della chioma',
    termEs: 'Manejo del dosel',
    termDe: 'Laubwandmanagement',
    termPt: 'Maneio da copa',
    termJa: '樹冠管理',
    termZh: '树冠管理',
    category: 'viticulture',
    definition:
      '잎·순의 배치로 햇빛 노출, 통풍, 병 관리. Trellising, pruning(spur/cane), leaf removal, hedging. 품질·스타일·수확량에 영향.',
    definitionEn:
      'Arrangement of leaves and shoots for light exposure, airflow and disease control. Trellising, pruning (spur/cane), leaf removal, hedging. Affects quality, style and yield.',
  },
  {
    slug: 'terroir',
    term: '테루아르(Terroir)',
    termEn: 'Terroir',
    termFr: 'Terroir',
    termIt: 'Terroir',
    termEs: 'Terruño',
    termDe: 'Terroir',
    termPt: 'Terroir',
    termJa: 'テロワール',
    termZh: '风土',
    category: 'viticulture',
    definition:
      '포도재배지의 토양, 지형, 기후, 인간 요소가 복합적으로 작용해 와인에 주는 고유한 성격. 보르도·부르고뉴 등에서 품질 설명의 핵심 개념.',
    definitionEn:
      'The combined effect of soil, topography, climate and human factors on a vineyard, giving wine its distinct character. Central to quality in Bordeaux, Burgundy, etc.',
  },
  {
    slug: 'biodynamic',
    term: '생역동농법(Biodynamic)',
    termEn: 'Biodynamic',
    termFr: 'Biodynamie',
    termIt: 'Biodinamica',
    termEs: 'Biodinámica',
    termDe: 'Biodynamik',
    termPt: 'Biodinâmica',
    termJa: 'ビオディナミ',
    termZh: '生物动力法',
    category: 'viticulture',
    definition:
      '유기농 위에 루돌프 슈타이너의 생역동 원리(우주 리듬, 준비제)를 적용. Demeter 등 인증. 일부 명품 포도원에서 채택.',
    definitionEn:
      'Rudolf Steiner\'s biodynamic principles (cosmic rhythms, preparations) applied on top of organic farming. Demeter certification. Adopted by some premium estates.',
  },
  // --- Service ---
  {
    slug: 'decanting',
    term: '디캔팅(Decanting)',
    termEn: 'Decanting',
    termFr: 'Décantation',
    termIt: 'Decantazione',
    termEs: 'Decantación',
    termDe: 'Dekantieren',
    termPt: 'Decantação',
    termJa: 'デカンタ',
    termZh: '醒酒',
    category: 'service',
    definition:
      '병에서 다른 용기로 옮겨 산소 노출 또는 침전물 분리. 젊은 풀바디 레드(탄닌 부드럽게), 오래된 레드(침전 제거)에 사용.',
    definitionEn:
      'Pouring from bottle into another vessel for aeration or to separate sediment. Used for young full-bodied reds (soften tannin) and older reds (remove sediment).',
  },
  {
    slug: 'serving-temperature',
    term: '서빙 온도(Serving temperature)',
    termEn: 'Serving temperature',
    termFr: 'Température de service',
    termIt: 'Temperatura di servizio',
    termEs: 'Temperatura de servicio',
    termDe: 'Serviertemperatur',
    termPt: 'Temperatura de serviço',
    termJa: 'サーブ温度',
    termZh: '侍酒温度',
    category: 'service',
    definition:
      'WSET 가이드: 가벼운 화이트/스파클링 6–10°C, 풀바디 화이트 10–13°C, 라이트 레드 13°C, 풀바디 레드 15–18°C. 포트/리큐어 15–18°C.',
    definitionEn:
      'WSET guide: light white/sparkling 6–10°C, full-bodied white 10–13°C, light red 13°C, full-bodied red 15–18°C. Port/liqueur 15–18°C.',
  },
  {
    slug: 'glassware',
    term: '글라스웨어(Glassware)',
    termEn: 'Glassware',
    termFr: 'Verre',
    termIt: 'Bicchiere',
    termEs: 'Copa',
    termDe: 'Glas',
    termPt: 'Copa',
    termJa: 'グラス',
    termZh: '杯具',
    category: 'service',
    definition:
      '형태가 향 휘발·집중에 영향. 레드용 큰 볼, 화이트/스파클링용 작은 볼. ISO tasting glass는 중립적 평가용.',
    definitionEn:
      'Shape affects release and concentration of aromas. Large bowl for red, smaller for white/sparkling. ISO tasting glass for neutral assessment.',
  },
  // --- Faults (WSET L3/Diploma) ---
  {
    slug: 'cork-taint',
    term: '코르크 오염(TCA / Cork taint)',
    termEn: 'TCA / Cork taint',
    termFr: 'Goût de bouchon',
    termIt: 'Sentore di tappo',
    termEs: 'Gusto a corcho',
    termDe: 'Korkgeschmack',
    termPt: 'Sabor a rolha',
    termJa: 'コルク汚染',
    termZh: '木塞污染',
    category: 'faults',
    definition:
      '2,4,6-trichloroanisole(TCA) 등으로 인한 곰팡이·습지 냄새. 코르크, 나무, 창고 오염에서 발생. 와인을 평평하고 과일 향을 죽게 함.',
    definitionEn:
      'Mouldy, damp aromas from 2,4,6-trichloroanisole (TCA) etc. From cork, wood or warehouse contamination. Flattens wine and dulls fruit.',
  },
  {
    slug: 'brettanomyces',
    term: '브레타노마이세스(Brettanomyces)',
    termEn: 'Brettanomyces',
    termFr: 'Brettanomyces',
    termIt: 'Brettanomyces',
    termEs: 'Brettanomyces',
    termDe: 'Brettanomyces',
    termPt: 'Brettanomyces',
    termJa: 'ブレタノマイセス',
    termZh: '酒香酵母',
    category: 'faults',
    definition:
      '효모로 인한 결함. 소량이면 leather, spice(일부 지역에서 허용); 과다 시 band-aid, barnyard, metallic. 위생·SO2 관리로 억제.',
    definitionEn:
      'Yeast-related fault. In small amounts: leather, spice (accepted in some regions); excess: band-aid, barnyard, metallic. Controlled by hygiene and SO2.',
  },
  {
    slug: 'volatile-acidity',
    term: '휘발산(Volatile acidity, VA)',
    termEn: 'Volatile acidity (VA)',
    termFr: 'Acidité volatile',
    termIt: 'Acidità volatile',
    termEs: 'Acidez volátil',
    termDe: 'Flüchtige Säure',
    termPt: 'Acidez volátil',
    termJa: '揮発酸',
    termZh: '挥发酸',
    category: 'faults',
    definition:
      '아세트산 등 휘발성 산. 소량이면 복잡함; 과다 시 vinegar, nail polish. Acetobacter 등에 의함. 법적 한도 존재.',
    definitionEn:
      'Volatile acids such as acetic. In small amounts can add complexity; in excess: vinegar, nail polish. From Acetobacter etc. Legal limits apply.',
  },
  {
    slug: 'oxidation-fault',
    term: '산화 결함(Oxidation)',
    termEn: 'Oxidation',
    termFr: 'Oxydation',
    termIt: 'Ossidazione',
    termEs: 'Oxidación',
    termDe: 'Oxidation',
    termPt: 'Oxidação',
    termJa: '酸化',
    termZh: '氧化',
    category: 'faults',
    definition:
      '과도한 산소 노출. 색 갈변(화이트), 향·맛의 신선함 상실, sherry/nutty. 저장 불량, 마개 불량 등 원인.',
    definitionEn:
      'Excessive oxygen exposure. Browning (white), loss of freshness in aroma and flavour, sherry/nutty character. Caused by poor storage, faulty closure, etc.',
  },
  {
    slug: 'reduction-fault',
    term: '리덕션 결함(Reduction)',
    termEn: 'Reduction (fault)',
    termFr: 'Réduction (défaut)',
    termIt: 'Riduzione (difetto)',
    termEs: 'Reducción (defecto)',
    termDe: 'Reduktion (Fehler)',
    termPt: 'Redução (defeito)',
    termJa: '還元臭',
    termZh: '还原味',
    category: 'faults',
    definition:
      '산소 부족 상태에서 휘발성 황 화합물. 경미: flint, match; 과다: rotten egg, cabbage, rubber. 디캔팅·교반으로 일부 완화 가능.',
    definitionEn:
      'Volatile sulphur compounds in low-oxygen conditions. Slight: flint, match; excessive: rotten egg, cabbage, rubber. Can be partly relieved by decanting or stirring.',
  },
  // --- Law (WSET L3 · Diploma) ---
  {
    slug: 'aoc',
    term: 'AOC / AOP(Appellation d\'origine contrôlée / protégée)',
    termEn: 'AOC / AOP',
    termFr: 'AOC / AOP',
    termIt: 'AOC / AOP',
    termEs: 'AOC / AOP',
    termDe: 'AOC / AOP',
    termPt: 'AOC / AOP',
    termJa: 'AOC / AOP',
    termZh: 'AOC / AOP',
    category: 'law',
    definition:
      '프랑스·EU 원산지 통제 명칭. 지역, 품종, 수확량, 재배·양조 관행 규정. 품질·정체성 보장의 기초.',
    definitionEn:
      'French/EU protected designation of origin. Regulates region, varieties, yields, viticultural and winemaking practices. Basis for quality and identity.',
    example: 'Bordeaux AOC, Chablis AOC, Champagne AOC.',
  },
  {
    slug: 'docg',
    term: 'DOCG / DOC(Denominazione di origine controllata e garantita)',
    termEn: 'DOCG / DOC',
    termFr: 'DOCG / DOC',
    termIt: 'DOCG / DOC',
    termEs: 'DOCG / DOC',
    termDe: 'DOCG / DOC',
    termPt: 'DOCG / DOC',
    termJa: 'DOCG / DOC',
    termZh: 'DOCG / DOC',
    category: 'law',
    definition:
      '이탈리아 최상위 원산지 명칭. DOC보다 엄격한 규정·품질 검사. Riserva, Classico 등 부가 규정과 함께 사용.',
    definitionEn:
      'Italy\'s top-tier designation of origin. Stricter rules and quality checks than DOC. Used with terms like Riserva, Classico.',
    example: 'Barolo DOCG, Chianti Classico DOCG, Brunello di Montalcino DOCG.',
  },
  {
    slug: 'pradikat',
    term: '프레디카트(Prädikat)',
    termEn: 'Prädikat',
    termFr: 'Prädikat',
    termIt: 'Prädikat',
    termEs: 'Prädikat',
    termDe: 'Prädikat',
    termPt: 'Prädikat',
    termJa: 'プレディカーツ',
    termZh: '等级',
    category: 'law',
    definition:
      '독일·오스트리아 Qualitätswein에서 당도(숙성도) 구분. Kabinett–Spätlese–Auslese–Beerenauslese–Trockenbeerenauslese–Eiswein. 각 구역별 최소 must weight 규정.',
    definitionEn:
      'German/Austrian Qualitätswein sugar (ripeness) levels: Kabinett–Spätlese–Auslese–Beerenauslese–Trockenbeerenauslese–Eiswein. Minimum must weight per region.',
    example: 'Mosel Kabinett, Rheingau Spätlese.',
  },
  {
    slug: 'grand-cru',
    term: '그랑 크뤼(Grand cru)',
    termEn: 'Grand cru',
    termFr: 'Grand cru',
    termIt: 'Grand cru',
    termEs: 'Grand cru',
    termDe: 'Grand cru',
    termPt: 'Grand cru',
    termJa: 'グラン・クリュ',
    termZh: '特级园',
    category: 'law',
    definition:
      '프랑스에서 최고 등급 포도원/지역. 부르고뉴는 특정 climat 명명, 보르도 메도크는 1855 classement, 샹파뉴는 마을·포도원 등급.',
    definitionEn:
      'Top vineyard/area classification in France. Burgundy: named climats; Bordeaux Médoc: 1855 classification; Champagne: village and vineyard grades.',
  },
  {
    slug: 'reserva',
    term: '레세르바 / Reserva / Riserva',
    termEn: 'Reserva / Riserva',
    termFr: 'Reserva / Riserva',
    termIt: 'Riserva',
    termEs: 'Reserva',
    termDe: 'Reserva / Riserva',
    termPt: 'Reserva',
    termJa: 'レセルバ / リゼルヴァ',
    termZh: '陈酿',
    category: 'law',
    definition:
      '스페인: 레드 최소 3년(오크+병 1년 이상), 화이트 2년. 이탈리아: DOC/DOCG별 최소 숙성 기간. 포르투갈 등에서도 사용.',
    definitionEn:
      'Spain: red min. 3 years (1+ in oak and bottle), white 2 years. Italy: minimum ageing per DOC/DOCG. Also used in Portugal, etc.',
  },
  // --- Other ---
  {
    slug: 'sat',
    term: 'SAT(Systematic Approach to Tasting)',
    termEn: 'Systematic Approach to Tasting (SAT)',
    termFr: 'SAT (Approche systématique de la dégustation)',
    termIt: 'SAT (Approccio sistematico alla degustazione)',
    termEs: 'SAT (Enfoque sistemático de cata)',
    termDe: 'SAT (Systematische Verkostung)',
    termPt: 'SAT (Abordagem sistemática à prova)',
    termJa: 'SAT（系統的試飲法）',
    termZh: 'SAT系统品鉴法',
    category: 'other',
    definition:
      'WSET의 체계적 시음 프레임워크. Appearance(clarity, intensity, colour), Nose(condition, intensity, development, characteristics), Palate(sweetness, acidity, tannin, alcohol, body, finish), Conclusions(quality, readiness).',
    definitionEn:
      'WSET\'s systematic tasting framework: Appearance (clarity, intensity, colour), Nose (condition, intensity, development, characteristics), Palate (sweetness, acidity, tannin, alcohol, body, finish), Conclusions (quality, readiness).',
  },
  {
    slug: 'varietal',
    term: '품종(Varietal)',
    termEn: 'Varietal',
    termFr: 'Cépage',
    termIt: 'Vitigno',
    termEs: 'Variedad',
    termDe: 'Rebsorte',
    termPt: 'Castas',
    termJa: '品種',
    termZh: '品种',
    category: 'other',
    definition:
      '와인을 만드는 포도 품종. Vitis vinifera가 대부분. 단일 품종 와인(varietal wine)은 일정 비율 이상 해당 품종 사용 시 라벨에 표기.',
    definitionEn:
      'Grape variety used to make wine. Mostly Vitis vinifera. Varietal wine is labelled when a minimum proportion of that variety is used.',
  },
]

type GlossarySeed = {
  slug: string
  termKo: string
  termEn: string
  category: GlossaryCategory
  levels: GlossaryLevelTag[]
  definitionKo?: string
  definitionEn?: string
}

function buildDefinitionKo(seed: GlossarySeed): string {
  if (seed.definitionKo) return seed.definitionKo
  switch (seed.category) {
    case 'aroma':
      return `${seed.termKo}는(은) 와인에서 자주 쓰이는 향/풍미 표현입니다. 1차(포도/발효), 2차(양조/숙성), 3차(병 숙성) 중 어디에서 기원했는지 함께 고려해 평가합니다.`
    case 'structure':
      return `${seed.termKo}는(은) 와인 구조(structure)를 설명하는 핵심 용어입니다. WSET SAT에서는 강도/수준과 균형을 함께 보고 품질 판단에 활용합니다.`
    case 'winemaking':
      return `${seed.termKo}는(은) 와인 양조/숙성 과정에서 쓰이는 용어입니다. 와인의 향, 질감, 안정성, 스타일에 영향을 줄 수 있습니다.`
    case 'viticulture':
      return `${seed.termKo}는(은) 포도 재배(기후, 토양, 수세, 병해 관리 등)와 관련된 용어입니다. 포도 성숙도와 수확 시기, 품질에 영향을 줍니다.`
    case 'service':
      return `${seed.termKo}는(은) 서비스/서빙(온도, 글라스, 디캔팅 등)와 관련된 용어입니다. 적절한 서비스는 향·질감·밸런스 인지에 큰 차이를 만듭니다.`
    case 'faults':
      return `${seed.termKo}는(은) 와인에서 결함 또는 결함으로 이어질 수 있는 현상을 설명하는 용어입니다. 원인(미생물, 산소, 오염 등)과 강도에 따라 결함 여부가 결정됩니다.`
    case 'law':
      return `${seed.termKo}는(은) 원산지/법규/라벨링과 관련된 용어입니다. 국가·지역별 규정이 다르므로 해당 지역의 정의를 함께 확인하는 것이 좋습니다.`
    case 'other':
    default:
      return `${seed.termKo}는(은) 와인 이해에 자주 등장하는 용어입니다.`
  }
}

function buildDefinitionEn(seed: GlossarySeed): string {
  if (seed.definitionEn) return seed.definitionEn
  switch (seed.category) {
    case 'aroma':
      return `${seed.termEn} is a common aroma/flavour descriptor in wine. Consider whether it is primary (grape/fermentation), secondary (winemaking/maturation), or tertiary (bottle age).`
    case 'structure':
      return `${seed.termEn} is a key structural term. In WSET SAT it is assessed by level/intensity and balance and used in quality assessment.`
    case 'winemaking':
      return `${seed.termEn} is a winemaking/maturation term that can influence aroma, texture, stability and overall style.`
    case 'viticulture':
      return `${seed.termEn} relates to viticulture (climate, soils, vine growth, disease management). It can affect ripeness, harvest decisions and quality.`
    case 'service':
      return `${seed.termEn} is a service/serving term (temperature, glassware, decanting, etc.). Proper service can materially change perception of aroma, texture and balance.`
    case 'faults':
      return `${seed.termEn} describes a wine fault or a condition that can become a fault. Whether it is a fault depends on cause (microbial, oxygen, contamination) and intensity.`
    case 'law':
      return `${seed.termEn} is a legal/labelling/appellation term. Definitions vary by country and region, so check the relevant regulations.`
    case 'other':
    default:
      return `${seed.termEn} is a commonly used wine term.`
  }
}

function seedToTerm(seed: GlossarySeed): GlossaryTerm {
  return {
    slug: seed.slug,
    term: seed.termKo,
    termEn: seed.termEn,
    category: seed.category,
    levels: seed.levels,
    definition: buildDefinitionKo(seed),
    definitionEn: buildDefinitionEn(seed),
  }
}

const generatedSeeds: GlossarySeed[] = [
  // Aroma descriptors (WSET SAT)
  { slug: 'aroma-blackcurrant', termKo: '향: 블랙커런트', termEn: 'Aroma: Blackcurrant', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-black-cherry', termKo: '향: 블랙체리', termEn: 'Aroma: Black cherry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-red-cherry', termKo: '향: 체리', termEn: 'Aroma: Cherry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-raspberry', termKo: '향: 라즈베리', termEn: 'Aroma: Raspberry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-strawberry', termKo: '향: 딸기', termEn: 'Aroma: Strawberry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-plum', termKo: '향: 자두', termEn: 'Aroma: Plum', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-blackberry', termKo: '향: 블랙베리', termEn: 'Aroma: Blackberry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-blueberry', termKo: '향: 블루베리', termEn: 'Aroma: Blueberry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-cranberry', termKo: '향: 크랜베리', termEn: 'Aroma: Cranberry', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-pomegranate', termKo: '향: 석류', termEn: 'Aroma: Pomegranate', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-violet', termKo: '향: 바이올렛', termEn: 'Aroma: Violet', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-rose', termKo: '향: 장미', termEn: 'Aroma: Rose', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-orange-blossom', termKo: '향: 오렌지 블라썸', termEn: 'Aroma: Orange blossom', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-lemon', termKo: '향: 레몬', termEn: 'Aroma: Lemon', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-lime', termKo: '향: 라임', termEn: 'Aroma: Lime', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-grapefruit', termKo: '향: 자몽', termEn: 'Aroma: Grapefruit', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-green-apple', termKo: '향: 그린 애플', termEn: 'Aroma: Green apple', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-pear', termKo: '향: 배', termEn: 'Aroma: Pear', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-peach', termKo: '향: 복숭아', termEn: 'Aroma: Peach', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-apricot', termKo: '향: 살구', termEn: 'Aroma: Apricot', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-melon', termKo: '향: 멜론', termEn: 'Aroma: Melon', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-pineapple', termKo: '향: 파인애플', termEn: 'Aroma: Pineapple', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-mango', termKo: '향: 망고', termEn: 'Aroma: Mango', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-passion-fruit', termKo: '향: 패션프루트', termEn: 'Aroma: Passion fruit', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-lychee', termKo: '향: 라이치', termEn: 'Aroma: Lychee', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-banana', termKo: '향: 바나나', termEn: 'Aroma: Banana', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-herbaceous', termKo: '향: 허브(풋내)', termEn: 'Aroma: Herbaceous', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-bell-pepper', termKo: '향: 피망', termEn: 'Aroma: Bell pepper', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-black-pepper', termKo: '향: 블랙 페퍼', termEn: 'Aroma: Black pepper', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-white-pepper', termKo: '향: 화이트 페퍼', termEn: 'Aroma: White pepper', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-clove', termKo: '향: 정향(클로브)', termEn: 'Aroma: Clove', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-cinnamon', termKo: '향: 시나몬', termEn: 'Aroma: Cinnamon', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-vanilla', termKo: '향: 바닐라', termEn: 'Aroma: Vanilla', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-toast', termKo: '향: 토스트', termEn: 'Aroma: Toast', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-smoke', termKo: '향: 스모크', termEn: 'Aroma: Smoke', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-cedar', termKo: '향: 시더(삼나무)', termEn: 'Aroma: Cedar', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-coconut', termKo: '향: 코코넛', termEn: 'Aroma: Coconut', category: 'aroma', levels: ['wset3'] },
  { slug: 'aroma-brioche', termKo: '향: 브리오슈', termEn: 'Aroma: Brioche', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-biscuit', termKo: '향: 비스킷', termEn: 'Aroma: Biscuit', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-butter', termKo: '향: 버터', termEn: 'Aroma: Butter', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-cream', termKo: '향: 크림', termEn: 'Aroma: Cream', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-nutty', termKo: '향: 넛티', termEn: 'Aroma: Nutty', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-honey', termKo: '향: 꿀', termEn: 'Aroma: Honey', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-petrol', termKo: '향: 석유(페트롤)', termEn: 'Aroma: Petrol', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-leather', termKo: '향: 가죽', termEn: 'Aroma: Leather', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-mushroom', termKo: '향: 버섯', termEn: 'Aroma: Mushroom', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-forest-floor', termKo: '향: 숲 바닥(언더브러시)', termEn: 'Aroma: Forest floor', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-tobacco', termKo: '향: 담배', termEn: 'Aroma: Tobacco', category: 'aroma', levels: ['wset3', 'diploma'] },
  { slug: 'aroma-dried-fig', termKo: '향: 말린 무화과', termEn: 'Aroma: Dried fig', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-raisin', termKo: '향: 건포도', termEn: 'Aroma: Raisin', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-caramel', termKo: '향: 카라멜', termEn: 'Aroma: Caramel', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-coffee', termKo: '향: 커피', termEn: 'Aroma: Coffee', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-cocoa', termKo: '향: 코코아', termEn: 'Aroma: Cocoa', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-green-almond', termKo: '향: 그린 아몬드', termEn: 'Aroma: Green almond', category: 'aroma', levels: ['diploma'] },
  { slug: 'aroma-saline', termKo: '향: 소금기(살린)', termEn: 'Aroma: Saline', category: 'aroma', levels: ['wset3', 'diploma'] },

  // Winemaking
  { slug: 'stainless-steel', termKo: '스테인리스 발효/숙성', termEn: 'Stainless steel fermentation/ageing', category: 'winemaking', levels: ['wset3'] },
  { slug: 'concrete-egg', termKo: '콘크리트 에그', termEn: 'Concrete egg', category: 'winemaking', levels: ['diploma'] },
  { slug: 'whole-bunch', termKo: '송이째 발효(홀 번치)', termEn: 'Whole-bunch fermentation', category: 'winemaking', levels: ['diploma'] },
  { slug: 'cold-soak', termKo: '콜드 소크(저온 침용)', termEn: 'Cold soak (pre-fermentation maceration)', category: 'winemaking', levels: ['wset3', 'diploma'] },
  { slug: 'punch-down', termKo: '펀치다운(Pigeage)', termEn: 'Punch-down (pigeage)', category: 'winemaking', levels: ['wset3'] },
  { slug: 'pump-over', termKo: '펌프오버(Remontage)', termEn: 'Pump-over (remontage)', category: 'winemaking', levels: ['wset3'] },
  { slug: 'delestage', termKo: '델레스따주(Délestage)', termEn: 'Délestage (rack-and-return)', category: 'winemaking', levels: ['diploma'] },
  { slug: 'skin-contact', termKo: '스킨 컨택(화이트 침용)', termEn: 'Skin contact (white maceration)', category: 'winemaking', levels: ['wset3'] },
  { slug: 'press-wine', termKo: '프레스 와인', termEn: 'Press wine', category: 'winemaking', levels: ['diploma'] },
  { slug: 'free-run', termKo: '프리런 주스', termEn: 'Free-run juice', category: 'winemaking', levels: ['wset3', 'diploma'] },
  { slug: 'micro-oxygenation', termKo: '마이크로 옥시제네이션', termEn: 'Micro-oxygenation', category: 'winemaking', levels: ['diploma'] },
  { slug: 'sterile-filtration', termKo: '멸균 여과', termEn: 'Sterile filtration', category: 'winemaking', levels: ['diploma'] },
  { slug: 'rs-management', termKo: '잔당 관리', termEn: 'Residual sugar management', category: 'winemaking', levels: ['wset3'] },
  { slug: 'acidification', termKo: '산 첨가(산도 보정)', termEn: 'Acidification', category: 'winemaking', levels: ['diploma'] },
  { slug: 'deacidification', termKo: '제산(산도 감소)', termEn: 'Deacidification', category: 'winemaking', levels: ['diploma'] },
  { slug: 'chaptalization', termKo: '샤프탈리자시옹(당 첨가)', termEn: 'Chaptalization', category: 'winemaking', levels: ['wset3', 'diploma'] },
  { slug: 'reverse-osmosis', termKo: '역삼투(RO)', termEn: 'Reverse osmosis (RO)', category: 'winemaking', levels: ['diploma'] },
  { slug: 'botling-line', termKo: '병입 라인', termEn: 'Bottling line', category: 'winemaking', levels: ['wset3'] },
  { slug: 'sulfur-dioxide', termKo: '이산화황(SO₂)', termEn: 'Sulfur dioxide (SO₂)', category: 'winemaking', levels: ['wset3', 'diploma'] },
  { slug: 'sur-lie', termKo: '쉬르 리(Sur lie)', termEn: 'Sur lie', category: 'winemaking', levels: ['wset3', 'diploma'] },
  { slug: 'batonnage', termKo: '바토나주(리스 교반)', termEn: 'Bâtonnage (lees stirring)', category: 'winemaking', levels: ['wset3', 'diploma'] },

  // Viticulture
  { slug: 'budburst', termKo: '발아(Budburst)', termEn: 'Budburst', category: 'viticulture', levels: ['wset3'] },
  { slug: 'flowering', termKo: '개화(Flowering)', termEn: 'Flowering', category: 'viticulture', levels: ['wset3'] },
  { slug: 'fruit-set', termKo: '착과(Fruit set)', termEn: 'Fruit set', category: 'viticulture', levels: ['wset3'] },
  { slug: 'ripening', termKo: '성숙(Ripening)', termEn: 'Ripening', category: 'viticulture', levels: ['wset3'] },
  { slug: 'harvest', termKo: '수확(Harvest)', termEn: 'Harvest', category: 'viticulture', levels: ['wset3'] },
  { slug: 'green-harvest', termKo: '그린 하베스트(적과)', termEn: 'Green harvest', category: 'viticulture', levels: ['diploma'] },
  { slug: 'irrigation', termKo: '관개(Irrigation)', termEn: 'Irrigation', category: 'viticulture', levels: ['wset3'] },
  { slug: 'dry-farming', termKo: '드라이 파밍(무관개)', termEn: 'Dry farming', category: 'viticulture', levels: ['diploma'] },
  { slug: 'vine-density', termKo: '식재 밀도(Vine density)', termEn: 'Vine density', category: 'viticulture', levels: ['wset3', 'diploma'] },
  { slug: 'yield', termKo: '수확량(Yield)', termEn: 'Yield', category: 'viticulture', levels: ['wset3'] },
  { slug: 'pruning', termKo: '전정(Pruning)', termEn: 'Pruning', category: 'viticulture', levels: ['wset3'] },
  { slug: 'spur-pruning', termKo: '단초 전정(Spur pruning)', termEn: 'Spur pruning', category: 'viticulture', levels: ['wset3', 'diploma'] },
  { slug: 'cane-pruning', termKo: '장초 전정(Cane pruning)', termEn: 'Cane pruning', category: 'viticulture', levels: ['wset3', 'diploma'] },
  { slug: 'training-system', termKo: '유인 시스템(Training)', termEn: 'Training system', category: 'viticulture', levels: ['wset3', 'diploma'] },
  { slug: 'trellising', termKo: '트렐리싱(Trellising)', termEn: 'Trellising', category: 'viticulture', levels: ['wset3', 'diploma'] },
  { slug: 'guyot', termKo: '기요(Guyot)', termEn: 'Guyot', category: 'viticulture', levels: ['diploma'] },
  { slug: 'cordon', termKo: '코르동(Cordon)', termEn: 'Cordon', category: 'viticulture', levels: ['diploma'] },
  { slug: 'gobelet', termKo: '고블레(부쉬바인)', termEn: 'Gobelet (bush vine)', category: 'viticulture', levels: ['diploma'] },
  { slug: 'cover-crop', termKo: '커버 크롭', termEn: 'Cover crop', category: 'viticulture', levels: ['diploma'] },
  { slug: 'soil-drainage', termKo: '배수(Drainage)', termEn: 'Drainage', category: 'viticulture', levels: ['wset3'] },
  { slug: 'aspect', termKo: '사면 방향(Aspect)', termEn: 'Aspect', category: 'viticulture', levels: ['wset3'] },
  { slug: 'altitude', termKo: '고도(Altitude)', termEn: 'Altitude', category: 'viticulture', levels: ['wset3'] },

  // Service
  { slug: 'cork', termKo: '코르크(Cork)', termEn: 'Cork', category: 'service', levels: ['wset3'] },
  { slug: 'screwcap', termKo: '스크류캡', termEn: 'Screwcap', category: 'service', levels: ['wset3'] },
  { slug: 'synthetic-closure', termKo: '합성 마개', termEn: 'Synthetic closure', category: 'service', levels: ['wset3'] },
  { slug: 'aeration', termKo: '에어레이션', termEn: 'Aeration', category: 'service', levels: ['wset3'] },
  { slug: 'double-decant', termKo: '더블 디캔팅', termEn: 'Double decanting', category: 'service', levels: ['diploma'] },
  { slug: 'wine-fridge', termKo: '와인 냉장고', termEn: 'Wine fridge', category: 'service', levels: ['wset3'] },
  { slug: 'ice-bucket', termKo: '아이스 버킷', termEn: 'Ice bucket', category: 'service', levels: ['wset3'] },
  { slug: 'corkscrew', termKo: '코르크스크루', termEn: 'Corkscrew', category: 'service', levels: ['wset3'] },
  { slug: 'tasting-note', termKo: '테이스팅 노트', termEn: 'Tasting note', category: 'service', levels: ['wset3'] },

  // Faults
  { slug: 'light-strike', termKo: '라이트 스트라이크(빛 손상)', termEn: 'Light strike', category: 'faults', levels: ['diploma'] },
  { slug: 'maderisation', termKo: '마데이라화(열/산화)', termEn: 'Maderisation', category: 'faults', levels: ['diploma'] },
  { slug: 'heat-damage', termKo: '열 손상(Heat damage)', termEn: 'Heat damage', category: 'faults', levels: ['wset3'] },
  { slug: 'refermentation', termKo: '재발효(병 내)', termEn: 'Refermentation (in bottle)', category: 'faults', levels: ['diploma'] },

  // Law
  { slug: 'doc', termKo: 'DOC', termEn: 'DOC', category: 'law', levels: ['wset3'] },
  { slug: 'dop-igp', termKo: 'DOP/IGP', termEn: 'DOP/IGP', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'igp', termKo: 'IGP/IGT(지리적 표시)', termEn: 'IGP/IGT (geographical indication)', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'ava', termKo: 'AVA(미국 지정 산지)', termEn: 'AVA (American Viticultural Area)', category: 'law', levels: ['wset3'] },
  { slug: 'gi-australia', termKo: 'GI(호주 지리적 표시)', termEn: 'GI (Australian Geographical Indication)', category: 'law', levels: ['wset3'] },
  { slug: 'ripasso', termKo: '리파소(Ripasso)', termEn: 'Ripasso', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'classico', termKo: '클라시코(Classico)', termEn: 'Classico', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'superiore', termKo: '수페리오레(Superiore)', termEn: 'Superiore', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'gran-reserva', termKo: '그랑 레세르바(Gran Reserva)', termEn: 'Gran Reserva', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'crianza', termKo: '크리안사(Crianza)', termEn: 'Crianza', category: 'law', levels: ['wset3', 'diploma'] },
  { slug: 'village-appellation', termKo: '빌라주 아펠라시옹', termEn: 'Village appellation', category: 'law', levels: ['diploma'] },

  // Other
  { slug: 'balance', termKo: '밸런스(Balance)', termEn: 'Balance', category: 'other', levels: ['wset3'] },
  { slug: 'complexity', termKo: '복합성(Complexity)', termEn: 'Complexity', category: 'other', levels: ['wset3'] },
  { slug: 'typicity', termKo: '전형성/타이피시티(Typicity)', termEn: 'Typicity', category: 'other', levels: ['wset3', 'diploma'] },
  { slug: 'ageing-potential', termKo: '숙성 잠재력(Ageing potential)', termEn: 'Ageing potential', category: 'other', levels: ['wset3'] },
  { slug: 'oak-integration', termKo: '오크 통합감(Oak integration)', termEn: 'Oak integration', category: 'other', levels: ['diploma'] },
  { slug: 'tannin-quality', termKo: '타닌의 성질(Tannin quality)', termEn: 'Tannin quality', category: 'other', levels: ['wset3', 'diploma'] },
  { slug: 'acid-tannin-balance', termKo: '산도-타닌 밸런스', termEn: 'Acid–tannin balance', category: 'other', levels: ['diploma'] },
]

function slugifyEn(en: string): string {
  return en
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function pushSeedsFromPairs(opts: {
  prefix: string
  category: GlossaryCategory
  levels: GlossaryLevelTag[]
  pairs: Array<{ ko: string; en: string }>
}) {
  for (const p of opts.pairs) {
    generatedSeeds.push({
      slug: `${opts.prefix}${slugifyEn(p.en)}`,
      termKo: p.ko,
      termEn: p.en,
      category: opts.category,
      levels: opts.levels,
    })
  }
}

// 대량 확장: ko/en 중심(템플릿 정의 자동 생성)
pushSeedsFromPairs({
  prefix: 'aroma-note-',
  category: 'aroma',
  levels: ['wset3'],
  pairs: [
    { ko: '향: 구스베리', en: 'Aroma: Gooseberry' },
    { ko: '향: 레드커런트', en: 'Aroma: Redcurrant' },
    { ko: '향: 블루 플럼', en: 'Aroma: Blue plum' },
    { ko: '향: 사워 체리', en: 'Aroma: Sour cherry' },
    { ko: '향: 라즈베리 잼', en: 'Aroma: Raspberry jam' },
    { ko: '향: 딸기 잼', en: 'Aroma: Strawberry jam' },
    { ko: '향: 블랙베리 잼', en: 'Aroma: Blackberry jam' },
    { ko: '향: 블랙베리 리큐어', en: 'Aroma: Blackberry liqueur' },
    { ko: '향: 블루베리 파이', en: 'Aroma: Blueberry pie' },
    { ko: '향: 블랙커런트 리큐어', en: 'Aroma: Crème de cassis' },
    { ko: '향: 건자두(프룬)', en: 'Aroma: Prune' },
    { ko: '향: 말린 체리', en: 'Aroma: Dried cherry' },
    { ko: '향: 말린 살구', en: 'Aroma: Dried apricot' },
    { ko: '향: 말린 사과', en: 'Aroma: Dried apple' },
    { ko: '향: 오렌지', en: 'Aroma: Orange' },
    { ko: '향: 만다린', en: 'Aroma: Mandarin' },
    { ko: '향: 유자', en: 'Aroma: Yuzu' },
    { ko: '향: 레몬 제스트', en: 'Aroma: Lemon zest' },
    { ko: '향: 라임 제스트', en: 'Aroma: Lime zest' },
    { ko: '향: 오렌지 필', en: 'Aroma: Orange peel' },
    { ko: '향: 화이트 피치', en: 'Aroma: White peach' },
    { ko: '향: 넥타린', en: 'Aroma: Nectarine' },
    { ko: '향: 미라벨(플럼)', en: 'Aroma: Mirabelle plum' },
    { ko: '향: 퀸스(모과)', en: 'Aroma: Quince' },
    { ko: '향: 파인애플 껍질', en: 'Aroma: Pineapple skin' },
    { ko: '향: 바나나 캔디', en: 'Aroma: Banana candy' },
    { ko: '향: 패션프루트 껍질', en: 'Aroma: Passion fruit rind' },
    { ko: '향: 구아바', en: 'Aroma: Guava' },
    { ko: '향: 파파야', en: 'Aroma: Papaya' },
    { ko: '향: 코코넛 크림', en: 'Aroma: Coconut cream' },
    { ko: '향: 자스민', en: 'Aroma: Jasmine' },
    { ko: '향: 라일락', en: 'Aroma: Lilac' },
    { ko: '향: 라벤더', en: 'Aroma: Lavender' },
    { ko: '향: 카모마일', en: 'Aroma: Chamomile' },
    { ko: '향: 아카시아', en: 'Aroma: Acacia' },
    { ko: '향: 꿀벌집(비즈왁스)', en: 'Aroma: Beeswax' },
    { ko: '향: 민트', en: 'Aroma: Mint' },
    { ko: '향: 유칼립투스', en: 'Aroma: Eucalyptus' },
    { ko: '향: 타임', en: 'Aroma: Thyme' },
    { ko: '향: 로즈마리', en: 'Aroma: Rosemary' },
    { ko: '향: 세이지', en: 'Aroma: Sage' },
    { ko: '향: 오레가노', en: 'Aroma: Oregano' },
    { ko: '향: 바질', en: 'Aroma: Basil' },
    { ko: '향: 딜', en: 'Aroma: Dill' },
    { ko: '향: 파슬리', en: 'Aroma: Parsley' },
    { ko: '향: 토마토 잎', en: 'Aroma: Tomato leaf' },
    { ko: '향: 올리브', en: 'Aroma: Olive' },
    { ko: '향: 그린 올리브', en: 'Aroma: Green olive' },
    { ko: '향: 블랙 올리브', en: 'Aroma: Black olive' },
    { ko: '향: 타르', en: 'Aroma: Tar' },
    { ko: '향: 젖은 돌(웻 스톤)', en: 'Aroma: Wet stone' },
    { ko: '향: 초크(분필)', en: 'Aroma: Chalk' },
    { ko: '향: 부싯돌(플린트)', en: 'Aroma: Flint' },
    { ko: '향: 스모키 플린트', en: 'Aroma: Smoky flint' },
    { ko: '향: 요오드', en: 'Aroma: Iodine' },
    { ko: '향: 굴 껍데기', en: 'Aroma: Oyster shell' },
    { ko: '향: 젖은 양모', en: 'Aroma: Wet wool' },
    { ko: '향: 젖은 시멘트', en: 'Aroma: Wet cement' },
    { ko: '향: 버섯 스톡', en: 'Aroma: Mushroom stock' },
    { ko: '향: 트러플', en: 'Aroma: Truffle' },
    { ko: '향: 말린 잎', en: 'Aroma: Dried leaves' },
    { ko: '향: 가을 낙엽', en: 'Aroma: Autumn leaves' },
    { ko: '향: 삼나무 연필심', en: 'Aroma: Cedar pencil' },
    { ko: '향: 새 오크', en: 'Aroma: New oak' },
    { ko: '향: 토스트 오크', en: 'Aroma: Toasted oak' },
    { ko: '향: 숯/차콜', en: 'Aroma: Charcoal' },
    { ko: '향: 베이킹 스파이스', en: 'Aroma: Baking spice' },
    { ko: '향: 아니스', en: 'Aroma: Anise' },
    { ko: '향: 감초', en: 'Aroma: Liquorice' },
    { ko: '향: 월계수', en: 'Aroma: Bay leaf' },
    { ko: '향: 육두구', en: 'Aroma: Nutmeg' },
    { ko: '향: 바닐라빈', en: 'Aroma: Vanilla bean' },
    { ko: '향: 밀크 초콜릿', en: 'Aroma: Milk chocolate' },
    { ko: '향: 다크 초콜릿', en: 'Aroma: Dark chocolate' },
    { ko: '향: 에스프레소', en: 'Aroma: Espresso' },
    { ko: '향: 모카', en: 'Aroma: Mocha' },
    { ko: '향: 토피', en: 'Aroma: Toffee' },
    { ko: '향: 버터스카치', en: 'Aroma: Butterscotch' },
    { ko: '향: 메이플 시럽', en: 'Aroma: Maple syrup' },
    { ko: '향: 프랄린(견과)', en: 'Aroma: Praline' },
    { ko: '향: 구운 헤이즐넛', en: 'Aroma: Toasted hazelnut' },
    { ko: '향: 구운 아몬드', en: 'Aroma: Toasted almond' },
    { ko: '향: 호두', en: 'Aroma: Walnut' },
    { ko: '향: 아몬드', en: 'Aroma: Almond' },
    { ko: '향: 마지팬', en: 'Aroma: Marzipan' },
    { ko: '향: 말린 허브', en: 'Aroma: Dried herbs' },
    { ko: '향: 훈제 베이컨', en: 'Aroma: Smoked bacon' },
    { ko: '향: 훈제 고기', en: 'Aroma: Smoked meat' },
    { ko: '향: 구운 고기', en: 'Aroma: Roasted meat' },
    { ko: '향: 햄', en: 'Aroma: Ham' },
    { ko: '향: 간장', en: 'Aroma: Soy sauce' },
    { ko: '향: 가죽 안장', en: 'Aroma: Saddle leather' },
    { ko: '향: 말린 꽃', en: 'Aroma: Dried flowers' },
    { ko: '향: 병아리콩/완두콩', en: 'Aroma: Pea' },
    { ko: '향: 아스파라거스', en: 'Aroma: Asparagus' },
    { ko: '향: 커민', en: 'Aroma: Cumin' },
    { ko: '향: 코리앤더', en: 'Aroma: Coriander seed' },
    { ko: '향: 진저(생강)', en: 'Aroma: Ginger' },
    { ko: '향: 레몬그라스', en: 'Aroma: Lemongrass' },
    { ko: '향: 사프란', en: 'Aroma: Saffron' },
    { ko: '향: 흙(어시)', en: 'Aroma: Earthy' },
    { ko: '향: 젖은 흙', en: 'Aroma: Wet earth' },
    { ko: '향: 붉은 흙', en: 'Aroma: Red earth' },
    { ko: '향: 토양감', en: 'Aroma: Soil' },
    { ko: '향: 젖은 나무', en: 'Aroma: Damp wood' },
    { ko: '향: 향나무(주니퍼)', en: 'Aroma: Juniper' },
    { ko: '향: 솔잎', en: 'Aroma: Pine needle' },
    { ko: '향: 솔수지', en: 'Aroma: Resin' },
    { ko: '향: 바다 내음', en: 'Aroma: Sea breeze' },
    { ko: '향: 해조류', en: 'Aroma: Seaweed' },
    { ko: '향: 김(노리)', en: 'Aroma: Nori' },
    { ko: '향: 라임 잎', en: 'Aroma: Lime leaf' },
    { ko: '향: 오렌지 마말레이드', en: 'Aroma: Orange marmalade' },
    { ko: '향: 레몬 커드', en: 'Aroma: Lemon curd' },
    { ko: '향: 애플 파이', en: 'Aroma: Apple pie' },
    { ko: '향: 배 콤포트', en: 'Aroma: Pear compote' },
    { ko: '향: 복숭아 통조림', en: 'Aroma: Canned peach' },
    { ko: '향: 살구 잼', en: 'Aroma: Apricot jam' },
    { ko: '향: 말린 파인애플', en: 'Aroma: Dried pineapple' },
    { ko: '향: 구운 토스트', en: 'Aroma: Toasted bread' },
    { ko: '향: 빵 반죽', en: 'Aroma: Bread dough' },
    { ko: '향: 효모', en: 'Aroma: Yeast' },
    { ko: '향: 오트밀', en: 'Aroma: Oatmeal' },
    { ko: '향: 시리얼', en: 'Aroma: Cereal' },
    { ko: '향: 브라우니', en: 'Aroma: Brownie' },
    { ko: '향: 레더 & 스파이스', en: 'Aroma: Leather and spice' },
    { ko: '향: 홍차', en: 'Aroma: Black tea' },
    { ko: '향: 얼그레이', en: 'Aroma: Earl Grey tea' },
    { ko: '향: 카카오닙', en: 'Aroma: Cocoa nibs' },
    { ko: '향: 말린 장미', en: 'Aroma: Dried rose' },
    { ko: '향: 장미잼', en: 'Aroma: Rose jam' },
    { ko: '향: 젖은 종이', en: 'Aroma: Wet paper' },
    { ko: '향: 스모키 미네랄', en: 'Aroma: Smoky mineral' },
  ],
})

pushSeedsFromPairs({
  prefix: 'wm-',
  category: 'winemaking',
  levels: ['wset3'],
  pairs: [
    { ko: '야생 효모 발효', en: 'Wild yeast fermentation' },
    { ko: '선별 효모(접종)', en: 'Inoculated fermentation' },
    { ko: '온도 조절 발효', en: 'Temperature-controlled fermentation' },
    { ko: '스테인리스 탱크', en: 'Stainless steel tank' },
    { ko: '중성 용기(Inert vessel)', en: 'Inert vessel' },
    { ko: '오크 배럴(바리크)', en: 'Oak barrel (barrique)' },
    { ko: '대형 오크(Foudre)', en: 'Foudre (large oak)' },
    { ko: '새 오크', en: 'New oak' },
    { ko: '구 오크', en: 'Used oak' },
    { ko: '토스트 레벨', en: 'Toast level' },
    { ko: '장기 침용(익스텐디드 매서레이션)', en: 'Extended maceration' },
    { ko: '인퓨전(부드러운 침용)', en: 'Infusion (gentle extraction)' },
    { ko: '전체 송이 압착(Whole-bunch pressing)', en: 'Whole-bunch pressing' },
    { ko: '소프트 프레싱', en: 'Soft pressing' },
    { ko: '하드 프레싱', en: 'Hard pressing' },
    { ko: '정제(클래리피케이션)', en: 'Clarification' },
    { ko: '콜드 스태빌라이제이션', en: 'Cold stabilization' },
    { ko: '타르트레이트 안정화', en: 'Tartrate stabilization' },
    { ko: '블렌딩', en: 'Blending' },
    { ko: '어셈블라주(블렌드 구성)', en: 'Assemblage' },
    { ko: '병입 전 SO₂ 조정', en: 'Pre-bottling SO₂ adjustment' },
    { ko: '병입 후 숙성', en: 'Bottle ageing' },
    { ko: '디고르주망(Disgorgement)', en: 'Disgorgement' },
    { ko: '리들링(Riddling)', en: 'Riddling' },
    { ko: '티라주(Tirage)', en: 'Tirage' },
    { ko: '베이스 와인', en: 'Base wine' },
    { ko: '도사주(Dosage)', en: 'Dosage' },
    { ko: '탱크 방식(샤르마)', en: 'Tank method (Charmat)' },
    { ko: '고정화(Fortification)', en: 'Fortification' },
    { ko: '수정(보강주용) 스피릿', en: 'Neutral spirit' },
    { ko: '아마로네(아파시멘토)', en: 'Appassimento' },
    { ko: '리스 오토리시스', en: 'Lees autolysis' },
    { ko: '클로저(마개) 선택', en: 'Closure selection' },
    { ko: '병 세척/살균', en: 'Bottle rinsing/sanitation' },
    { ko: '인라인 여과', en: 'Inline filtration' },
    { ko: '병입 산소 관리', en: 'Oxygen management at bottling' },
    { ko: '무여과(Unfiltered)', en: 'Unfiltered' },
    { ko: '무정제(Unfined)', en: 'Unfined' },
    { ko: '오렌지 와인(스킨컨택 화이트)', en: 'Orange wine' },
    { ko: '탄산 침용(카보닉)', en: 'Carbonic maceration' },
    { ko: '세미 카보닉', en: 'Semi-carbonic maceration' },
    { ko: '로제 사니에(Saignée)', en: 'Saignée' },
    { ko: '직압 로제(Direct press)', en: 'Direct press rosé' },
  ],
})

pushSeedsFromPairs({
  prefix: 'vit-',
  category: 'viticulture',
  levels: ['wset3'],
  pairs: [
    { ko: '개화기 기상', en: 'Weather at flowering' },
    { ko: '결실 저하(쿨뢰르)', en: 'Coulure' },
    { ko: '알 굵기 불균일(밀랑다주)', en: 'Millerandage' },
    { ko: '수세(Vine vigour)', en: 'Vine vigour' },
    { ko: '수분 스트레스', en: 'Water stress' },
    { ko: '일소(日燒)', en: 'Sunburn' },
    { ko: '서리(Frost)', en: 'Frost' },
    { ko: '우박(Hail)', en: 'Hail' },
    { ko: '고온 열파', en: 'Heatwave' },
    { ko: '가뭄(Drought)', en: 'Drought' },
    { ko: '병해(다운y 밀듀)', en: 'Downy mildew' },
    { ko: '병해(파우더리 밀듀)', en: 'Powdery mildew' },
    { ko: '보트리티스(회색곰팡이)', en: 'Botrytis' },
    { ko: '엽면 제거(Leaf removal)', en: 'Leaf removal' },
    { ko: '헤징(Hedging)', en: 'Hedging' },
    { ko: '순 솎기(Shoot thinning)', en: 'Shoot thinning' },
    { ko: '클론 선택', en: 'Clone selection' },
    { ko: '접목(Grafting)', en: 'Grafting' },
    { ko: '토양 pH', en: 'Soil pH' },
    { ko: '석회질 토양', en: 'Limestone soil' },
    { ko: '점토 토양', en: 'Clay soil' },
    { ko: '자갈 토양', en: 'Gravel soil' },
    { ko: '화산 토양', en: 'Volcanic soil' },
    { ko: '사질 토양', en: 'Sandy soil' },
    { ko: '충적 토양', en: 'Alluvial soil' },
    { ko: '미네랄(토양 기인) 논쟁', en: 'Minerality debate' },
    { ko: '해양성 기후', en: 'Maritime climate' },
    { ko: '대륙성 기후', en: 'Continental climate' },
    { ko: '지중해성 기후', en: 'Mediterranean climate' },
    { ko: '고산 기후', en: 'High-altitude climate' },
    { ko: '디아널 레인지(일교차)', en: 'Diurnal range' },
    { ko: '페노릭 성숙', en: 'Phenolic ripeness' },
    { ko: '당도 성숙', en: 'Sugar ripeness' },
    { ko: '산도 성숙', en: 'Acid ripeness' },
    { ko: '병해충 통합관리(IPM)', en: 'Integrated pest management' },
  ],
})

pushSeedsFromPairs({
  prefix: 'srv-',
  category: 'service',
  levels: ['wset3'],
  pairs: [
    { ko: '브리딩(숨쉬게 하기)', en: 'Breathing' },
    { ko: '코르크 상태 점검', en: 'Cork inspection' },
    { ko: '와인 리스트', en: 'Wine list' },
    { ko: '페어링', en: 'Food pairing' },
    { ko: '와인 잔 린스', en: 'Glass rinsing' },
    { ko: '입 헹굼(팔레트 클렌저)', en: 'Palate cleanser' },
    { ko: '테이스팅 온도', en: 'Tasting temperature' },
    { ko: '리서빙(재서빙) 관리', en: 'Re-serving management' },
    { ko: '보존(오픈 후)', en: 'Post-opening preservation' },
    { ko: '진공 스토퍼', en: 'Vacuum stopper' },
    { ko: '가스 보존(아르곤)', en: 'Argon preservation' },
    { ko: '코라빈(Coravin)', en: 'Coravin' },
    { ko: '코스터/드립 링', en: 'Drip ring' },
    { ko: '스피토온(뱉기컵)', en: 'Spittoon' },
    { ko: '테이스팅 순서', en: 'Tasting order' },
    { ko: '블라인드 테이스팅', en: 'Blind tasting' },
    { ko: '디캔터 세척', en: 'Decanter cleaning' },
    { ko: '샴페인 스토퍼', en: 'Sparkling stopper' },
  ],
})

pushSeedsFromPairs({
  prefix: 'law-',
  category: 'law',
  levels: ['wset3'],
  pairs: [
    { ko: '빈티지(Vintage)', en: 'Vintage' },
    { ko: 'NV(논빈티지)', en: 'Non-vintage' },
    { ko: '싱글 빈야드', en: 'Single vineyard' },
    { ko: '필드 블렌드', en: 'Field blend' },
    { ko: '에스테이트 보틀드', en: 'Estate bottled' },
    { ko: '알코올 표기(ABV)', en: 'ABV labelling' },
    { ko: '유기농 인증', en: 'Organic certification' },
    { ko: '비건 라벨', en: 'Vegan labelling' },
    { ko: '산지 표시(원산지)', en: 'Origin labelling' },
    { ko: '품종 표기 규정', en: 'Varietal labelling rules' },
    { ko: '수확량 규정', en: 'Yield regulation' },
    { ko: '숙성 규정', en: 'Ageing regulation' },
    { ko: '병입 지역 규정', en: 'Bottling zone rule' },
    { ko: '샹파뉴(지역명 보호)', en: 'Champagne name protection' },
    { ko: '클라렛(표기 관행)', en: 'Claret usage' },
    { ko: '리저브(Reserve 용례)', en: 'Reserve term usage' },
    { ko: '그랑 크뤼(용례)', en: 'Grand Cru usage' },
    { ko: '프리미에 크뤼', en: 'Premier Cru' },
    { ko: '크뤼 부르주아', en: 'Cru Bourgeois' },
    { ko: 'VDP(독일 생산자 협회)', en: 'VDP (Germany)' },
    { ko: 'DOCa(스페인 최상위)', en: 'DOCa (Spain)' },
    { ko: 'DO(스페인)', en: 'DO (Spain)' },
  ],
})

const generatedGlossaryTerms: GlossaryTerm[] = generatedSeeds.map(seedToTerm)

export const glossaryTerms: GlossaryTerm[] = [...manualGlossaryTerms, ...generatedGlossaryTerms]

function termMatches(term: GlossaryTerm, q: string): boolean {
  const fields = [
    term.term,
    term.termEn,
    term.definition,
    term.definitionEn,
    term.levels?.join(' '),
    term.termFr,
    term.termIt,
    term.termEs,
    term.termDe,
    term.termPt,
    term.termJa,
    term.termZh,
  ]
  return fields.some((v) => typeof v === 'string' && v.toLowerCase().includes(q))
}

export function searchGlossary(keyword: string): GlossaryTerm[] {
  const q = keyword.trim().toLowerCase()
  if (!q) return glossaryTerms
  return glossaryTerms.filter((t) => termMatches(t, q))
}

