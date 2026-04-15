# Vinhub Showroom

Next.js(App Router) 기반 **와인 아틀라스 쇼룸**: 품종, 지도/와이너리, 와인 상세, 용어집, 검색, 맛 기반 추천, VinLog 안내.

## 실행 방법 (현재)

1. 프로젝트 루트로 이동 (본인 경로에 맞게 수정):
   ```bash
   cd C:\Users\HORO\Desktop\WORK\Vinhub
   ```
2. 의존성 설치:
   ```bash
   npm install
   ```
3. 개발 서버:
   ```bash
   npm run dev
   ```
4. 브라우저에서 **http://localhost:3000** (Next 기본 포트).

## 빌드

```bash
npm run build
```

프로덕션 실행은 `npm run build` 후 `npm start`.

## 문서

- **`docs.md`** — 개발/운영 가이드라인
- **`VINHUB_SHOWROOM_SPEC.md`** — 제품·IA 명세(클래식 UI 기준)
- **`DEPLOY-GITHUB.md`** — GitHub·Vercel 배포(상단에 **현재 Vinhub** 요약, 하단은 과거 원문 보관)

## 배포 (Vercel)

- **현재 팀 기준 프로덕션 URL**: **`https://vinhub.vercel.app`** (Vercel 프로젝트 `vinhub`).
- 예전에 쓰던 **`wine-site-two.vercel.app`** 등은 **다른 프로젝트**일 수 있어, 이 레포와 자동 동기화되지 않을 수 있다.
- **브랜드 도메인**(예: `vinhub.com`): Vercel 프로젝트 → **Settings → Domains** 에서 추가 후 DNS 설정.

---

## (기록) 예전 README — Vite/SPA `wine-site` 시절

아래는 **과거 Vite + `src/pages` SPA** 를 전제로 하던 안내를 기록만 남긴 것이다. 현재 레포는 Next이므로 그대로 따르지 않는다.

- 로컬 경로 예시: `cd c:\work\wine-site`
- 개발 포트 예시: `http://localhost:5173`
- 빌드 산출: **`dist`** 폴더, Netlify/Vercel에서 SPA용 **`vercel.json` / `netlify.toml` 의 `/*` → `index.html`** 리라이트 전제
- 라우트 예시: `/varietals/:slug`, `/wineries/:slug` 등 **클라이언트 라우터** 경로

---

## 줄바꿈(EOL) 정책

- **기본 줄바꿈**: 이 저장소의 텍스트/소스 파일은 **LF (`\n`)** 를 기준으로 합니다.
- **Git 설정**:
  - 저장소 로컬 설정에서 `core.autocrlf=input`, `core.eol=lf` 로 맞춰져 있습니다.
  - `.gitattributes` 에서 `*.ts`, `*.tsx`, `*.js`, `*.jsx`, `*.json`, `*.css`, `*.scss`, `*.html`, `*.md` 등을 `eol=lf` 로 강제합니다.
- **에디터(Cursor/VSCode)**:
  - `settings.json` 에서 `files.eol` 을 `"\n"` 으로 설정해 저장 시 LF 로 고정합니다.
  - 만약 다른 에디터를 사용할 경우에도, 가능한 한 LF 를 기본 줄바꿈으로 설정해 주세요.
