## Vinhub 쇼룸 웹사이트 가이드라인

이 문서는 Vinhub 웹 쇼룸 프로젝트를 개발/유지보수할 때 Cursor 에이전트와 사람이 같이 참고하는 **전체 설계 요약**입니다.

---

### 1. 제품 컨셉 & 역할

- **포지셔닝**: 예전 Vite 시절의 **지도/품종/와이너리 중심 Vinhub UI**를 계승한, 세계 유명 와인 아틀라스 스타일의 **전략적 쇼룸**.
- **목적**:
  - 와인 품종/스타일/지역/용어 검색 + 지도 탐색으로 **오가닉 트래픽 확보**.
  - 세계 유명 와인/와이너리/품종 정보를 구조화해 **학습·레퍼런스 허브** 역할 수행.
  - 간단한 맛/바디 선택 → 와인 추천 플로우로 **실질적인 선택 도움**.
  - 핵심 유틸리티인 **VinLog 앱으로의 전환(Conversion)** 및 생태계 **락인(Lock-in)** 진입로.
- **역할 분리**:
  - **Vinhub 웹**: 지도/품종/와이너리/와인 쇼룸 + 간단 추천 + 검색 + VinLog 소개.
  - **VinLog 앱**: 라벨 인식, SAT 구조화, 교육 기능, 테이스팅 노트 기록·추천을 담당하는 핵심 유틸리티.

---

### 2. 기술 스택 & 구조

- **프레임워크**: Next.js 16 (App Router, TypeScript).
  - 라우팅은 **반드시 `app/` 디렉토리 기준**으로 작업한다.
  - 기존 `src/pages/**`, `src/App.tsx` 등은 과거 Vite/SPA 레거시로, **Next 빌드에서는 제외** (`tsconfig.json` exclude: `src`). 새 기능은 `app/` 에만 추가.
- **언어/도구**:
  - TypeScript
  - Tailwind CSS **v4** – `@tailwindcss/postcss` 플러그인 사용.
  - 빌드/런:
    - 개발: `npm run dev`
    - 빌드: `npm run build`
    - 시작: `npm start` (반드시 `npm run build` 후 실행)

#### 2.1 디렉토리 구조 요약

- `app/`
  - `layout.tsx`: 전역 레이아웃, 헤더/푸터, 심플한 Nav, 작은 VinLog 링크, `app/globals.css` 로 스타일링.
  - `page.tsx`: 메인 랜딩 (클래식 Vinhub 홈 – 지도/품종/추천 티저).
  - `varietals/page.tsx` + `varietals/[slug]/page.tsx`: 품종 리스트/상세.
  - `map/page.tsx`: 지도/리스트 기반 와이너리 탐색(현재는 리스트, 추후 지도/글로브 추가 예정).
  - `wineries/[slug]/page.tsx`: 와이너리 상세.
  - `wines/[slug]/page.tsx`: 와인 상세/테크니컬 시트.
  - `recommend/page.tsx`: 바디 기반 간단 추천(Varietal/Wine 서브셋 제안).
  - `glossary/page.tsx`: 용어집.
  - `search/page.tsx`: 통합 검색(추가 구현 예정).
  - `vinlog/page.tsx`: VinLog 앱 랜딩 (AI Vision/SAT 교육 기능은 앱 기능으로 설명만).
- **제거된 라우트**: `/ai-vision`, `/tasting-education`, `/grapes`, `/styles` (명세상 웹에서 제거 또는 `/varietals`·`/recommend` 로 통합).
- `data/` (및 `src/data/` 참조)
  - **정식 데이터 소스는 `data/*`** 이다. (App Router 및 `lib/search/*` 는 `@/data/*`만 사용)
  - `src/data/*`는 레거시(참고/이전용)로 남아있을 수 있으나, 신규 기능/수정은 `data/*`에 반영한다.
  - 주요 파일:
    - `data/varietals.ts` – `Varietal[]` (WSET L3 기준 60~80개 목표, 현재 확장됨)
    - `data/wineries.ts` – `Winery[]`
    - `data/wines.ts` – `Wine[]`
    - `data/glossary.ts` – `GlossaryTerm[]` + 검색 유틸
- `lib/`
  - `sat-schema.ts`: WSET SAT 타입 모델.
  - `analytics.ts`: 추후 `dataLayer` 이벤트 전송용 헬퍼.
- `postcss.config.mjs`
  - Tailwind v4 방식: `plugins: { '@tailwindcss/postcss': {} }`
- `app/globals.css`
  - `@import "tailwindcss";` + `@config "../tailwind.config.ts";`

---

### 3. UX / 도메인 설계 핵심

#### 3.1 메인 랜딩(`/`)

- 히어로:
  - 카피 예시(영문): “Explore great wines by place, grape and producers.”
  - Sub: 세계 유명 산지/품종/와이너리 쇼룸 → 간단 추천 → VinLog 로깅 플로우.
  - CTA:
    - Primary: `Open wine map` (`/map`).
    - Secondary: `Browse varietals` (`/varietals`), `Find a wine by taste` (`/recommend`).
- 오른쪽 카드:
  - 대표 산지/품종/스타일 태그(보르도, 부르고뉴, Champagne, Tuscany 등)를 보여주는 Atlas 티저.

#### 3.2 품종/지도/추천/VinLog

- **품종(`varietals`)**
  - 리스트: 타입 필터(레드/화이트/로제/스파클링/기타) + 카드 그리드.
  - 상세: 이미지, 한/영 이름, 대표 산지, 페어링, 관련 품종, 대표 와인 리스트.
- **지도(`map`)**
  - 필터: 지역, 타입, 시음 가능, 샵 여부, 검색어.
  - 현재는 리스트 기반 UX만 있고, 추후 Leaflet/Globe 기반 지도/글로브를 위에 얹는 형태로 확장.
- **추천(`recommend`)**
  - 간단한 **바디(라이트/미디엄/풀)** 선호 입력 → 해당 바디의 품종/와인 서브셋 추천.
  - 데이터는 `data/varietals.ts` 의 `body` 필드와 `data/wines.ts` 의 `varietalSlugs` 를 활용.
- **VinLog 랜딩(`vinlog`)**
  - 라벨 인식, SAT 구조화, 교육 기능은 **앱 기능**으로만 설명.
  - 웹에서는 간단한 기능 설명과 스크린샷/스토어 링크 정도만 제공.

---

### 4. 개발 컨벤션

- **라우팅**
  - 새 페이지는 반드시 `app/` 아래에 만들고, `page.tsx` 를 default export 로 제공.
  - 동적 경로는 `[slug]/page.tsx` 패턴 사용.
- **타입/데이터**
  - WSET 관련 구조는 항상 `lib/sat-schema.ts` 의 타입을 기준으로 사용.
  - 도메인 데이터는 `data/*.ts` 에 정의하고, App Router 페이지/`lib/search/*` 는 이 데이터에서만 읽는다.
- **스타일**
  - Tailwind Utility 우선.
  - 디자인 토큰(색/폰트/spacing 등)은 `tailwind.config.ts` 에서 확장.
- **버전**
  - Tailwind는 v4 + `@tailwindcss/postcss` 조합을 사용 중이다.
  - `app/globals.css` 에서 `@import "tailwindcss";` + `@config "../tailwind.config.ts";` 패턴을 유지한다.

---

### 5. 언어 & i18n 전략(요약)

- **지원 언어 계획**:
  - 기본: 영어(en).
  - 추가: 한국어(ko), 프랑스어(fr), 이탈리아어(it), 스페인어(es), 독일어(de), 포르투갈어(pt), 일본어(ja).
- **표기 규칙**:
  - 와인 고유명/지명: 원어가 있으면 **원어 표기 우선**, 없으면 영어.
  - UI 텍스트: 영어 모드 영어만, 한국어 모드 한글+영어 병기, 기타 언어는 해당 언어 중심 + 필요 시 영어 보조.
- **구현 방향**: Next i18n + `locales/*` 또는 `i18n/*` 리소스 파일로 확장 예정.

---

### 6. 앞으로의 확장 방향(메모)

- 세계 유명 와인·와이너리 데이터 확장(`data/wines.ts`, `data/wineries.ts`, `data/regions.ts`).
- WSET L3+ 용어집 및 Diploma 용어 추가(`data/glossary.ts`).
- 다국어(i18n) 지원: en 기본, ko/fr/it/es/de/pt/ja 추가 및 병기 규칙 적용.
- 지도/글로브: Leaflet, globe.gl 등으로 `app/map` 확장.
- 통합 검색: `app/search` 에 품종/지역/와인/용어 통합 검색 구현.
- SEO: 페이지별 메타, 와인/제품 JSON-LD 등 `lib/seo.ts` 분리 및 적용.
- 분석: `lib/analytics.ts` 기반으로 `view_content`, `click_vinlog_cta` 등 이벤트 정의 후 GA4/Amplitude 연동.

---

### 7. 운영 체크리스트(빌드/배포/스모크 테스트)

- **로컬 개발**
  - `npm run dev`
  - 주요 라우트 확인: `/`, `/search`, `/glossary`, `/varietals`, `/wineries/[slug]`, `/wines/[slug]`, `/map`, `/recommend`
- **프로덕션 빌드**
  - `npm run build` (필수)
- **Vercel 스모크 테스트**
  - 배포 후 **`https://vinhub.vercel.app`**(팀에서 연결한 Vercel 프로젝트 `vinhub`의 프로덕션)에서 확인
  - 미들웨어가 언어 접두사를 쓰므로, 브라우저에서 보통 **`/en/...`** 형태로 리다이렉트된 URL을 기준으로 확인하면 됨(예: `/en/map`, `/en/varietals`, `/en/varietals/cabernet-sauvignon`, `/en/search?q=riesling`)
  - **`/sitemap.xml`**: 본문이 커서 일부 HTTP 클라이언트는 실패할 수 있음. 운영 확인은 `curl -sI https://vinhub.vercel.app/sitemap.xml` 로 **200 / Content-Type: application/xml** 정도만 보면 됨
  - `/glossary`는 기본이 “전문용어만 보기”이며 토글로 전체(향 디스크립터 포함) 전환 가능

#### 7.1 기록: 예전 배포 URL·프로젝트명 (참고만)

- 과거 스모크/문서에 **`wine-site-two.vercel.app`** 등이 등장했으나, 이는 **다른 Vercel 프로젝트**에 붙은 주소일 수 있음. GitHub `main` 푸시만으로 자동 갱신되지 않을 수 있으니 **현재는 `vinhub.vercel.app`을 기준 URL**로 본다.
- 팀 Vercel에 **`wine-site`** 같은 이름의 별도 프로젝트가 남아 있을 수 있음(기록). 실제 쇼룸 Next 배포는 **`vinhub`** 프로젝트에 맞춘다.
