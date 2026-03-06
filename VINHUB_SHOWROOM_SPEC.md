## Vinhub 리뉴얼 기획 명세서

### 1. 프로젝트 포지셔닝

- **역할**: AI 비전·SAT 이미지는 유지하되, 전면 UI는 **기존 Vite 기반 Vinhub(지도/품종/와이너리 중심)**를 계승한 **전략적 쇼룸**.
- **목표**:
  - 와인 품종/스타일/지역/용어 검색과 지도/글로브 탐색으로 **오가닉 트래픽 확보**.
  - 세계 유명 와인과 와이너리, 품종 정보를 구조화해 **학습·레퍼런스 허브** 역할 수행.
  - 간단한 맛/상황 선택 → 와인 추천 플로우로 **실질적인 선택 도움**.
  - 핵심 유틸리티인 **VinLog 앱으로의 전환(Conversion)** 및 생태계 **락인(Lock-in)** 진입로.

### 2. 정보 구조(IA) & 주요 흐름 – 클래식 UI 기준

- **메인 랜딩 `/`**
  - 기존 `Home.tsx` 느낌:
    - 상단: 사이트 타이틀/브랜드, 한 줄 설명, 주요 CTA(품종/추천/지도).
    - 중간: 와인 지도/글로브 티저 섹션.
    - 하단: 품종/와이너리/추천 섹션 카드.
- **품종 허브 `/varietals` & 상세 `/varietals/[slug]`**
  - 리스트: 타입 필터(레드/화이트/로제/스파클링/기타) + 카드 그리드.
  - 상세: 이미지, 한국어+영어 이름, 타입, 대표 산지, 페어링, 대표 와인 목록, 관련 품종.
- **지도 `/map`**
  - 필터: 지역, 타입(레드/화이트/로제/스파클링), 시음 가능 여부, 샵 유무, 검색어.
  - 뷰 전환: 리스트 / 지도(Leaflet 기반) / 글로브(Three.js, globe.gl 기반).
  - 리스트 카드: 와이너리 이름(원어+영어/한글 병기), 한 줄 설명, 지역 태그.
- **와이너리 상세 `/wineries/[slug]`**
  - 헤더: 이미지, 이름(원어/다국어 표기), 분류(1급, DOCG 등), 지역 태그, 웹사이트 링크.
  - 본문: 한 줄 설명, 주소, 대표 와인 리스트.
- **와인 상세 `/wines/[slug]`**
  - 헤더: 병 이미지, 이름(원어/병행 표기), 타입, 지역, 생산자 링크.
  - 본문: 한 줄 설명, 테크니컬 시트(알코올, 산도, pH, RS, 배럴/숙성, 블렌드, 보틀링 등) + PDF 링크.
  - 관련 품종, 출처 와이너리 표시.
- **추천 `/recommend`**
  - 스타일 기반: 느낌/구조(가볍고 상큼한, 풀바디·오크, 스위트 등)를 선택해 추천.
  - 상황 기반: 집들이, 데이트, 선물, 한식/양식 등 시나리오별 추천.
  - 블렌드 기반: 사용자 정의 블렌딩 취향 입력 → 추천(기존 `Recommend`/`RecommendBlend` 흐름).
- **통합 검색 `/search`**
  - 한 번의 검색으로 품종/지역/와인/용어 결과를 섹션별로 표시.
- **용어집 `/glossary`**
  - WSET L3+ 수준 용어를 카테고리별로 정리하고 검색 가능하게 제공.
- **VinLog 랜딩 `/vinlog`**
  - 라벨 인식, SAT 구조화, 교육 기능은 **앱 내부 기능**으로 간단히 설명.
  - 웹에서는 스크린샷/기능 요약/스토어 링크 위주.

**제거/축소 라우트**:

- `/ai-vision`, `/tasting-education` 별도 페이지 삭제 (내용은 `/vinlog` 설명에 흡수).

### 3. 기술 스택 & 구조

- **프레임워크**: Next.js 16(App Router, TypeScript).
- **스타일링**: Tailwind CSS 4 + 커스텀 디자인 토큰.
  - 색상: `primary`(딥 버건디/네이비 계열), `accent`(골드), `surface`, `background`.
  - 폰트: 제목 `font-display`(세리프), 본문 `font-body`(산세리프).
- **라우팅 구조**:
  - App Router 루트: `app`
    - `app/layout.tsx` – 공통 레이아웃, 헤더/푸터, 심플한 Nav, 작은 VinLog 링크.
    - `app/page.tsx` – 클래식 Vinhub 홈.
    - `app/varietals/**`, `app/map/page.tsx`, `app/wineries/**`, `app/wines/**`, `app/recommend/**`,
      `app/glossary/page.tsx`, `app/search/page.tsx`, `app/vinlog/page.tsx`.
  - 구 Vite SPA/React Router 코드(`src/pages/**`, `src/components/**`)는 **클래식 UI 참고용 소스**로 유지하되,
    실제 라우팅은 App Router 기준으로만 동작.

### 4. 데이터 모델 설계

- **공통 SAT 스키마** – `lib/sat-schema.ts`
  - `SatAppearance`, `SatNose`, `SatPalate`, `SatConclusion`, `SatTastingNote`.
  - WSET SAT의 구조(시각/향/맛/결론)를 타입 수준에서 통일해, 교육·와인 예시·AI 비전 결과에 공통 사용.
- **도메인 엔티티** – `data/` 디렉터리
  - `data/grapes.ts` – `Grape` (slug, name, color, acidity, tannin, body, aromaGroups, keyRegions, foodPairing, description).
  - `data/regions.ts` – `Region` (slug, name, country, climate, styleSummary, keyGrapes, 대표 와이너리).
  - `data/wineries.ts` – `Winery` (slug, name, regionSlug, story, signatureWines).
  - `data/wines.ts` – `Wine` (slug, name, producerSlug, regionSlug, grapeSlugs, vintage, alcohol, sweetness, tastingNoteExample).
  - `data/glossary.ts` – `GlossaryTerm` (slug, term, category, definition, example, search 유틸).
  - `data/styles.ts` – `StyleContext` (slug, name, occasion, description, recommendedGrapes, recommendedRegions).

초기에는 정적 TS 데이터로 시작하고, 이후 CMS/DB로 이전하더라도 이 타입들을 기준으로 매핑 가능하도록 설계했습니다.

### 5. VinLog 전환 퍼널(축소 버전)

- **헤더/푸터**
  - Nav 우측/푸터에서 작은 링크 수준으로만 `VinLog` 소개 페이지를 노출.
- **VinLog 랜딩**
  - 라벨 인식, SAT 구조화, 교육 기능은 **앱에서 제공**된다는 메시지 위주.
  - 웹에서는 스크린샷/간단 기능 설명/스토어 링크만 제공.
- 웹 페이지 본문에는 과도한 VinLog CTA를 넣지 않고, 필요한 경우에만 링크.

### 6. 분석/SEO/전환 추적

- **이벤트 유틸** – `lib/analytics.ts`
  - `trackViewContent(type, id)` – grape/region/wine/style/glossary 뷰 이벤트.
  - `trackVinlogCta(location)` – hero/footer/content_inline 위치별 VinLog CTA 클릭.
  - 구현은 `window.dataLayer` 기반으로, GA4/Amplitude 등으로의 연동을 나중에 붙일 수 있게 구성.
- **SEO/성능**
  - App Router + 정적 데이터로 대부분 페이지를 SSG.
  - `layout.tsx` 의 `metadata` 를 통해 기본 타이틀/설명 지정.
  - 추후 와인/제품 스키마(JSON-LD) 및 페이지별 메타는 `lib/seo.ts`로 분리 예정.

### 7. 앞으로의 확장 방향(요약)

- 세계 유명 와인·와이너리 데이터 확장(`data/wines.ts`, `data/wineries.ts`, `data/regions.ts`).
- WSET L3+ 용어집 및 Diploma 용어 추가(`data/glossary.ts`).
- 다국어(i18n) 지원: en 기본, ko/fr/it/es/de/pt/ja 추가 및 병기 규칙 적용.
- CMS/DB로의 이전 및 API 설계.
- SEO 튜닝 및 와인/제품 구조화 데이터(JSON-LD) 적용.

## Vinhub 리뉴얼 기획 명세서

### 1. 프로젝트 포지셔닝

- **역할**: AI 비전과 WSET SAT 기반 와인 데이터를 전시하는 **전략적 쇼룸(Showroom)**.
- **목표**:
  - 와인 품종/스타일/지역/용어 검색으로 **오가닉 트래픽 확보**.
  - 구조화된 콘텐츠와 미니 테이스팅 폼으로 **테이스팅 기록 욕구 자극**.
  - 핵심 유틸리티인 **VinLog 앱으로의 전환(Conversion)** 및 생태계 **락인(Lock-in)** 진입로.

### 2. 정보 구조(IA) & 주요 흐름

- **메인 랜딩 `/`**
  - 히어로: *AI Vision × WSET SAT* 메시지, 쇼룸 포지셔닝.
  - SAT 기반 테이스팅 노트를 인포그래픽 카드로 시각화.
  - 섹션: Showroom / AI Vision / VinLog Funnel 3축 소개.
- **품종 허브 `/grapes` & 상세 `/grapes/[slug]`**
  - 리스트: 품종 카드(산도/타닌/바디/향 그룹).
  - 상세: 구조(바 차트), 향 그룹 칩, 대표 산지/페어링.
  - **Mini Tasting Note 티저** + *“VinLog로 옮기기”* CTA.
- **스타일/상황 허브 `/styles` & 상세 `/styles/[slug]`**
  - 상황(예: 기름진 한우/삼겹살) → 추천 품종/지역 카드.
- **테이스팅 교육 `/tasting-education`**
  - SAT 4단계(Appearance / Nose / Palate / Conclusion) 튜토리얼.
  - 구조화된 노트의 의미와 VinLog와의 연결.
- **용어집 `/glossary`**
  - 검색 가능한 와인/구조/양조 용어 정의.
- **통합 검색 `/search`**
  - 한 번의 검색으로 품종/지역/와인/용어 결과를 섹션별로 표시.
- **AI 비전 쇼룸 `/ai-vision`**
  - 이미지 입력 → 텍스트/피처 추출 → 후보 와인 매칭 → SAT 구조 제안 플로우 설명.
  - `AiVisionResult` 예시 데이터를 카드 UI로 시각화.
- **VinLog 랜딩 `/vinlog`**
  - 캡처(Capture) → 구조화(Structure) → 활용(Leverage) 3단계 설명.
  - 실제 앱 스크린샷이 들어갈 자리에 와이어프레임 텍스트.

**메인 퍼널**:
- 검색/SEO → 구조화된 콘텐츠 뷰 → Mini Tasting Note → VinLog 랜딩 → 앱 설치/가입.

### 3. 기술 스택 & 구조

- **프레임워크**: Next.js 16(App Router, TypeScript).
- **스타일링**: Tailwind CSS + 커스텀 디자인 토큰.
  - 색상: `primary`(딥 버건디/네이비 계열), `accent`(골드), `surface`, `background`.
  - 폰트: 제목 `font-display`(세리프), 본문 `font-body`(산세리프).
- **라우팅 구조**:
  - App Router 루트: `src/app`
    - `src/app/layout.tsx` – 공통 레이아웃, 헤더/푸터, VinLog 상시 CTA.
    - `src/app/page.tsx` – 메인 랜딩.
    - `src/app/grapes/...`, `src/app/styles/...`, `src/app/glossary/page.tsx`, `src/app/search/page.tsx`,
      `src/app/ai-vision/page.tsx`, `src/app/tasting-education/page.tsx`, `src/app/vinlog/page.tsx`.
  - 구 Next SPA(Vite + `src/pages/...`)는 점진적 마이그레이션을 위해 남겨져 있으나,
    신규 쇼룸은 **Next App Router 기준**으로 동작.

### 4. 데이터 모델 설계

- **공통 SAT 스키마** – `lib/sat-schema.ts`
  - `SatAppearance`, `SatNose`, `SatPalate`, `SatConclusion`, `SatTastingNote`.
  - WSET SAT의 구조(시각/향/맛/결론)를 타입 수준에서 통일해, 교육·와인 예시·AI 비전 결과에 공통 사용.
- **도메인 엔티티** – `data/` 디렉터리
  - `data/grapes.ts` – `Grape` (slug, name, color, acidity, tannin, body, aromaGroups, keyRegions, foodPairing, description).
  - `data/regions.ts` – `Region` (slug, name, country, climate, styleSummary, keyGrapes, 대표 와이너리).
  - `data/wineries.ts` – `Winery` (slug, name, regionSlug, story, signatureWines).
  - `data/wines.ts` – `Wine` (slug, name, producerSlug, regionSlug, grapeSlugs, vintage, alcohol, sweetness, tastingNoteExample).
  - `data/glossary.ts` – `GlossaryTerm` (slug, term, category, definition, example, search 유틸).
  - `data/styles.ts` – `StyleContext` (slug, name, occasion, description, recommendedGrapes, recommendedRegions).

초기에는 정적 TS 데이터로 시작하고, 이후 CMS/DB로 이전하더라도 이 타입들을 기준으로 매핑 가능하도록 설계했습니다.

### 5. AI 비전 쇼룸 설계

- **타입 정의** – `lib/ai-vision.ts`
  - `AiVisionInputType` (`label` | `bottle` | `color`).
  - `AiVisionResult` (id, inputType, detectedText, detectedLabels, estimatedStyle, confidence, suggestedSat).
  - `exampleVisionResults` – Cabernet 사례 예시 1건.
- **UI** – `src/app/ai-vision/page.tsx`
  - 좌측: 1→5 단계 플로우 텍스트.
  - 우측: 예시 결과 카드(SAT Palate 일부를 구조화해서 표시).
  - 하단: 이후 `/api/vision` 으로 실제 모델과 연동할 계획을 명시.

### 6. VinLog 전환 퍼널 설계

- **항상 노출되는 CTA**
  - `layout.tsx` 헤더/푸터에 `VinLog 앱`, `VinLog로 테이스팅 기록하기` 링크 상시 배치.
- **콘텐츠 내 마이크로 CTA**
  - 품종 상세: Mini Tasting Note 입력 후 *“이 메모를 VinLog로 옮기기”* 링크.
  - 테이스팅 교육: 구조화된 노트의 가치 설명 후 *“VinLog 앱에서 SAT 노트 작성”* 버튼.
  - VinLog 랜딩: 캡처→구조화→활용 3단계 설명과 스토어 링크 자리(향후 실제 배지 교체).

### 7. 분석/SEO/전환 추적

- **이벤트 유틸** – `lib/analytics.ts`
  - `trackViewContent(type, id)` – grape/region/wine/style/glossary 뷰 이벤트.
  - `trackVinlogCta(location)` – hero/footer/content_inline 위치별 VinLog CTA 클릭.
  - 구현은 `window.dataLayer` 기반으로, GA4/Amplitude 등으로의 연동을 나중에 붙일 수 있게 구성.
- **SEO/성능**
  - App Router + 정적 데이터로 대부분 페이지를 SSG.
  - `layout.tsx` 의 `metadata` 를 통해 기본 타이틀/설명 지정.
  - 추후 와인/제품 스키마(JSON-LD) 및 페이지별 메타는 `lib/seo.ts`로 분리 예정.

### 8. 이번 대대적 업데이트에서 한 일 정리

1. **스택 전환**
   - Vite + SPA 라우터 구조 위에 **Next.js(App Router) + TypeScript + Tailwind** 기반 쇼룸 레이어 구축.
2. **레이아웃/디자인 시스템 구축**
   - 다크 테마, 클래스/럭셔리 톤의 헤더/푸터/그리드/카드 컴포넌트 패턴 정의.
3. **WSET SAT 데이터 스키마 정의**
   - `lib/sat-schema.ts` 로 테이스팅 구조를 타입 수준에서 모델링.
4. **도메인 데이터 레이어 구축**
   - 품종/지역/와이너리/와인/용어/스타일 컨텍스트를 `data/*` 로 분리.
5. **핵심 페이지 구현**
   - 홈 랜딩, 품종 리스트/상세, 테이스팅 교육, VinLog 랜딩, 스타일/용어집/검색, AI Vision 쇼룸 구현.
6. **전환/분석 준비**
   - VinLog 전환 동선을 페이지 곳곳에 배치하고, 추적용 이벤트 유틸 추가.

### 9. 앞으로의 확장 방향(요약)

- 실제 AI 비전 모델 및 백엔드와의 연동을 위해 `/api/vision` 스펙 정의 및 서버 구현.
- CMS 도입(Sanity/Contentful 등) 시 현재 `data/*` 타입 구조를 1:1로 이전.
- 다국어(ko/en) 지원을 위한 i18n 구조 추가.
- SEO 튜닝 및 와인/제품 구조화 데이터(JSON-LD) 적용.

