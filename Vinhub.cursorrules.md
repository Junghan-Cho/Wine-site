# Project Context: VinHub (Web Platform)
- Tech Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase, Shadcn/ui.
- Goal: High-performance wine data management & community platform.

# Coding Rules
1. **Server Components First:** 기본적으로 서버 컴포넌트(RSC)를 사용한다. `use client`는 상호작용이 필수적인 말단 컴포넌트에만 제한적으로 사용한다.
2. **Data Fetching:** Supabase 호출 시 `utils/supabase/server.ts`를 통해 서버 사이드에서 데이터를 가져오며, 워터폴(Waterfall) 현상을 방지하기 위해 `Promise.all`을 적극 활용한다.
3. **UI/UX:** Shadcn/ui 컴포넌트를 기본으로 하되, 커스텀 스타일은 `tailwind.config.ts`의 테마 변수를 따른다. 모바일 반응형 디자인을 최우선으로 고려한다(Mobile First).
4. **Validation:** 모든 폼 데이터 입력은 `Zod`를 사용하여 스키마 검증을 수행한다.
5. **Language:** 주석과 커밋 메시지는 한국어로 작성한다. 전문 용어(예: Terroir, Tannin)는 영어 원문을 병기한다.

# Critical Constraints (CIA Mode)
- 절대로 민감한 API Key를 클라이언트 사이드 코드에 노출하지 말 것.
- 와인 데이터 리스트 렌더링 시 반드시 Pagination 또는 Infinite Scroll을 구현하여 메모리 누수를 방지할 것.