# 와인 사이트

품종별 소개, 스타일/추천, 와이너리 지도(Leaflet), 와인 테크니컬 시트, 용어집, 검색 포함.

## 실행 방법

1. 터미널에서 프로젝트 폴더로 이동:
   ```bash
   cd c:\work\wine-site
   ```
2. 의존성 설치:
   ```bash
   npm install
   ```
3. 개발 서버 실행:
   ```bash
   npm run dev
   ```
4. 브라우저에서 표시되는 주소(예: http://localhost:5173)로 접속.

## 빌드

```bash
npm run build
```

`dist` 폴더에 결과물이 생성됩니다.

## 구조

- `/` – 메인(랜딩)
- `/varietals` – 품종 목록 (필터)
- `/varietals/:slug` – 품종 상세
- `/recommend` – 스타일/상황별 추천 선택
- `/recommend/:type/:slug` – 추천 결과 (품종 카드)
- `/map` – 와이너리 지도 (Leaflet 지도 + 목록)
- `/wineries/:slug` – 와이너리 상세
- `/wines/:slug` – 와인 상세 (테크니컬 시트)
- `/glossary` – 용어집 (검색 가능)
- `/search` – 통합 검색 (품종·와이너리·와인, `?q=검색어`)

와이어프레임·흐름은 `c:\work\와인-사이트-흐름-와이어프레임.md` 참고.

---

**GitHub로 처음부터 배포하는 방법**은 **[DEPLOY-GITHUB.md](./DEPLOY-GITHUB.md)** 에 단계별로 정리해 두었습니다. (Git 설치 → GitHub 저장소 만들기 → Push → Netlify/Vercel 연동)

---

## 배포 전 확인

인터넷에 올리기 전에 아래를 확인하세요.

1. **로컬 빌드**: 터미널에서 `npm run build` 가 에러 없이 끝나는지 확인.
2. **SPA 라우팅**: 이미 `netlify.toml`(Netlify), `vercel.json`(Vercel)에 `/*` → `index.html` 리다이렉트가 설정되어 있어, `/varietals`, `/map` 등 직접 URL 접속 시에도 동작함.
3. **도메인**: Netlify/Vercel 기본 URL(예: `xxx.netlify.app`, `xxx.vercel.app`)으로 배포하면 별도 설정 없이 사용 가능. 커스텀 도메인은 각 서비스 대시보드에서 연결.

---

## 배포 (Netlify / Vercel)

### Netlify

1. [netlify.com](https://www.netlify.com) 로그인 후 **Add new site → Import an existing project**.
2. 저장소 연결(GitHub/GitLab 등) 또는 **Deploy manually** 선택 후 `dist` 폴더 드래그.
3. **Deploy manually** 인 경우: 로컬에서 `npm run build` 실행 후 `dist` 폴더를 [app.netlify.com/drop](https://app.netlify.com/drop) 에 드래그.
4. Git 연결 시: Build command `npm run build`, Publish directory `dist` (netlify.toml 에 이미 설정됨).

### Vercel

1. [vercel.com](https://vercel.com) 로그인 후 **Add New → Project**.
2. 저장소 연결 후 **Import**. Vercel 이 `vercel.json` 기준으로 빌드·배포.
3. 또는 Vercel CLI: `npx vercel` 실행 후 안내에 따라 배포.

### 공통

- **SPA 라우팅**: `/varietals`, `/map` 등 직접 접속 시에도 동작하도록 Netlify/Vercel 에서 `/*` → `index.html` 리다이렉트가 설정되어 있음.
- **빌드 실패 시**: 터미널에서 `npm run build` 가 성공하는지 먼저 확인.
