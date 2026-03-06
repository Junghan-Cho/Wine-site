## Vinhub 쇼룸 웹사이트 가이드라인

이 문서는 Vinhub 웹 쇼룸 프로젝트를 개발/유지보수할 때 Cursor 에이전트와 사람이 같이 참고하는 **전체 설계 요약**입니다.

---

### 1. 제품 컨셉 & 역할

- **포지셔닝**: AI Vision × WSET SAT 기반 **데이터 드리븐 와인 쇼룸**.
- **목적**:
  - 와인 품종/스타일/지역/용어 검색으로 **오가닉 트래픽 확보**.
  - 구조화된 콘텐츠와 미니 테이스팅 폼으로 **테이스팅 기록 욕구 자극**.
  - 핵심 유틸리티인 **VinLog 앱으로의 전환(Conversion)** 및 생태계 **락인(Lock-in)** 진입로.
- **역할 분리**:
  - **Vinhub 웹**: 쇼룸 + 교육 + 검색 + VinLog 퍼널 입구.
  - **VinLog 앱**: 실제 테이스팅 노트 작성·저장·추천을 담당하는 핵심 유틸리티 (별도 모바일/백엔드).

---

### 2. 기술 스택 & 구조

- **프레임워크**: Next.js 16 (App Router, TypeScript).
  - 라우팅은 **반드시 `app/` 디렉토리 기준**으로 작업한다.
  - 기존 `src/pages/**` 는 과거 Vite/SPA 시대의 유산으로, 새 기능은 `app/` 에만 추가.
- **언어/도구**:
  - TypeScript
  - Tailwind CSS **v3.4.x** (v4 아님) – `tailwindcss` + `postcss` + `autoprefixer`
  - 빌드/런:
    - 개발: `npm run dev`
    - 빌드: `npm run build`
    - 시작: `npm start`

#### 2.1 디렉토리 구조 요약

- `app/`
  - `layout.tsx`: 전역 레이아웃, 헤더/푸터, VinLog CTA, `app/globals.css` 로 스타일링.
  - `page.tsx`: 메인 랜딩 (AI Vision × WSET SAT 쇼룸).
  - `grapes/` + `[slug]/page.tsx`: 품종 리스트/상세.
  - `styles/` + `[slug]/page.tsx`: 상황/스타일 기반 추천.
  - `glossary/page.tsx`: 용어집.
  - `search/page.tsx`: 통합 검색.
  - `ai-vision/page.tsx`: AI 비전 쇼룸.
  - `tasting-education/page.tsx`: WSET SAT 테이스팅 교육.
  - `vinlog/page.tsx`: VinLog 앱 랜딩.
- `data/`
  - `grapes.ts`, `regions.ts`, `wineries.ts`, `wines.ts`, `glossary.ts`, `styles.ts`:
    - 정적 TS 데이터로 도메인 엔티티를 정의.
- `lib/`
  - `sat-schema.ts`: WSET SAT 타입 모델 (`SatTastingNote`, `Appearance`, `Nose`, `Palate`, `Conclusion` 등).
  - `ai-vision.ts`: `AiVisionResult` 타입, 예시 결과.
  - `analytics.ts`: 추후 `dataLayer` 이벤트 전송용 헬퍼.
- `postcss.config.mjs`
  - Tailwind v3 방식:
    ```js
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    ```

---

### 3. UX / 도메인 설계 핵심

#### 3.1 메인 랜딩(`/`)

- 히어로:
  - 카피: “당신의 테이스팅을 데이터를 남기는 와인 쇼룸” (표현은 약간 변경 가능하나 의미 유지).
  - Sub: AI Vision × WSET SAT → VinLog Funnel 메시지.
  - CTA:
    - Primary: `VinLog로 테이스팅 기록하기` (`/vinlog`).
    - Secondary: `WSET SAT 구조 살펴보기` (`/tasting-education`).
- 오른쪽 카드:
  - SAT 기반 테이스팅 노트 예시 (Appearance/Nose/Structure/Conclusion).

#### 3.2 품종/스타일/교육/AI/VinLog

- **품종(`grapes`)**
  - 리스트: 품종 카드(색, 산도, 타닌, 바디, 향 그룹).
  - 상세: 구조 바(산도/타닌/바디), 향 그룹 칩, 대표 산지/페어링, Mini Tasting Note 티저 폼 + VinLog CTA.
- **스타일(`styles`)**
  - 상황(예: 기름진 한우/삼겹살) → 추천 품종/지역 목록, 품종 상세로 연결.
- **테이스팅 교육(`tasting-education`)**
  - SAT 4단계(Appearance/Nose/Palate/Conclusion) 설명 + 왜 구조화가 중요한지.
  - VinLog SAT 작성 CTA.
- **AI Vision(`ai-vision`)**
  - 입력(병/라벨/색) → 피처 추출 → 후보 와인 매칭 → SAT 구조 제안 플로우.
  - 실제 모델 호출 대신 `AiVisionResult` 예시로 UX만 쇼케이스.
- **VinLog 랜딩(`vinlog`)**
  - Capture → Structure → Leverage 3단계 흐름.
  - 실제 스토어 배지는 나중에 실제 링크로 교체 전제.

---

### 4. 개발 컨벤션

- **라우팅**
  - 새 페이지는 반드시 `app/` 아래에 만들고, `page.tsx` 를 default export 로 제공.
  - 동적 경로는 `[slug]/page.tsx` 패턴 사용.
- **타입/데이터**
  - WSET 관련 구조는 항상 `lib/sat-schema.ts` 의 타입을 기준으로 사용.
  - 도메인 데이터(품종/와인/지역 등)는 `data/*.ts` 에 정의하고, 컴포넌트는 이 데이터에서만 읽는다.
- **스타일**
  - Tailwind Utility 우선.
  - 디자인 토큰(색/폰트/spacing 등)은 `tailwind.config.ts` 에서 확장.
- **버전**
  - Tailwind는 v3.4.x를 기준으로 사용한다.
    - v4로 업그레이드하려면 Turbopack + `@tailwindcss/node` + lightningcss 의 호환성을 먼저 검토한 뒤 진행.

---

### 5. 앞으로의 확장 방향(메모)

- 실제 AI 비전 모델/백엔드 연동:
  - `/api/vision` 라우트 추가, `lib/ai-vision.ts` 타입을 기준으로 request/response 스펙 설계.
- 데이터 소스 고도화:
  - 현재 정적 TS 데이터(`data/*`)를 CMS 또는 DB로 이전 (예: Sanity, Contentful, Supabase 등).
- 다국어:
  - 한국어/영어 지원 필요 시, Next i18n + 별도 텍스트 리소스 관리.
- 분석:
  - `lib/analytics.ts` 기반으로 `view_content`, `click_vinlog_cta`, `submit_mini_tasting` 등 이벤트 정의 후 GA4/Amplitude 연동.

