# GitHub로 와인 사이트 배포하기 – 처음부터 단계별 가이드

이 문서는 **Git을 처음 쓰는 분**을 위해, GitHub 저장소 만들기부터 인터넷 배포까지 순서대로 설명합니다.

---

## 1. 준비물

- **Git** (로컬에 설치)
- **GitHub 계정** (무료)
- **와인 사이트 프로젝트** (`wine-site` 폴더)

---

## 2. Git 설치 및 확인

### 2-1. Git이 설치되어 있는지 확인

PowerShell 또는 명령 프롬프트를 열고 다음을 입력합니다.

```powershell
git --version
```

`git version 2.x.x` 같은 문구가 나오면 이미 설치된 것입니다.

### 2-2. Git이 없다면 설치

1. [https://git-scm.com/download/win](https://git-scm.com/download/win) 접속
2. **Download for Windows** 클릭 후 설치 파일 실행
3. 설치 시 기본 옵션 그대로 **Next** 진행 (특별히 바꿀 필요 없음)
4. 설치가 끝나면 **PowerShell을 다시 열고** `git --version` 으로 다시 확인

### 2-3. Git 사용자 이름·이메일 설정 (최초 1회)

GitHub에 올릴 때 “누가 커밋했는지” 표시하기 위한 설정입니다.  
**본인 GitHub 이메일**과 **아이디(또는 이름)** 를 넣으면 됩니다.

```powershell
git config --global user.email "본인GitHub이메일@example.com"
git config --global user.name "본인GitHub아이디"
```

예: `git config --global user.name "myusername"`

---

## 3. GitHub 계정 만들기

1. 브라우저에서 [https://github.com](https://github.com) 접속
2. **Sign up** 클릭
3. 이메일, 비밀번호, 사용자 이름 입력 후 계정 생성
4. 이메일 인증이 필요하면 메일에서 링크 클릭

---

## 4. GitHub에 새 저장소(Repository) 만들기

1. GitHub에 로그인한 상태에서 오른쪽 위 **+** → **New repository** 클릭
2. 다음처럼 입력합니다.
   - **Repository name**: `wine-site` (원하는 이름으로 해도 됨, 예: `my-wine-site`)
   - **Description**: (선택) 예: "와인 품종·와이너리 소개 사이트"
   - **Public** 선택
   - **"Add a README file"** 은 **체크하지 않습니다.** (로컬에 이미 코드가 있으므로)
   - **Create repository** 클릭
3. 생성이 끝나면 **빈 저장소** 페이지가 나옵니다.  
   여기 나오는 주소를 복사해 둡니다.
   - HTTPS: `https://github.com/본인아이디/wine-site.git`
   - SSH를 쓰면: `git@github.com:본인아이디/wine-site.git`
   - 처음에는 **HTTPS** 주소를 쓰는 것이 쉽습니다.

---

## 5. 로컬 프로젝트를 Git 저장소로 만들고 GitHub에 올리기

아래 명령은 **PowerShell**을 **wine-site 폴더가 있는 위치**에서 연 다음 실행합니다.

### 5-1. wine-site 폴더로 이동

```powershell
cd "c:\Users\HORO\Desktop\WORK\wine-site"
```

(경로는 본인 컴퓨터의 실제 경로로 바꿉니다.)

### 5-2. Git 저장소 초기화

```powershell
git init
```

`Initialized empty Git repository in ...` 라고 나오면 성공입니다.

### 5-3. 모든 파일 스테이징(추가)

```powershell
git add .
```

`.` 은 “현재 폴더의 변경된 파일 전부”를 의미합니다.  
`.gitignore` 덕분에 `node_modules`, `dist` 등은 자동으로 제외됩니다.

### 5-4. 첫 커밋 만들기

```powershell
git commit -m "첫 커밋: 와인 사이트 초기 버전"
```

`메시지` 부분은 원하는 대로 바꿔도 됩니다.

### 5-5. GitHub 저장소를 원격(remote)으로 연결

아래 `본인아이디/wine-site` 부분을 **본인이 만든 저장소 주소**로 바꿉니다.

```powershell
git remote add origin https://github.com/본인아이디/wine-site.git
```

예: `git remote add origin https://github.com/myusername/wine-site.git`

### 5-6. 기본 브랜치 이름을 main으로 (선택, GitHub 기본값에 맞추기)

```powershell
git branch -M main
```

### 5-7. GitHub에 올리기(Push)

```powershell
git push -u origin main
```

- 처음 push 시 **GitHub 로그인** 창이 뜰 수 있습니다.  
  브라우저에서 로그인하거나, 사용자 이름·비밀번호(또는 Personal Access Token)를 입력합니다.
- **Personal Access Token**을 쓰는 경우:  
  [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) 에서 토큰을 만든 뒤, 비밀번호 대신 토큰을 입력합니다.

에러 없이 끝나면 GitHub 저장소 페이지를 새로고침했을 때 **파일 목록이 보입니다.**  
이제 “GitHub를 사용해서 코드를 올리는” 단계는 완료된 것입니다.

---

## 6. 인터넷에 사이트 배포하기 (Netlify 연동)

코드는 GitHub에만 있는 상태이므로, **Netlify**에 연결하면 “사이트 주소”가 생깁니다.

### 6-1. Netlify 가입 및 사이트 연결

1. [https://www.netlify.com](https://www.netlify.com) 접속 → **Sign up** (또는 Log in)
2. **Sign up with GitHub** 또는 **Sign up with Email** 선택해 가입
3. 로그인 후 **Add new site** → **Import an existing project** 클릭
4. **Deploy with GitHub** 선택
5. GitHub 권한 요청이 나오면 **Authorize Netlify** 등으로 허용
6. **Repository** 목록에서 방금 올린 **wine-site** (또는 지정한 저장소 이름) 선택
7. **Branch to deploy**: `main` 그대로 둡니다.
8. **Build settings** 는 이미 프로젝트에 `netlify.toml` 이 있으므로 Netlify가 자동으로 다음처럼 인식합니다.
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
9. **Deploy site** 클릭

### 6-2. 배포 완료

1. 1~2분 정도 기다리면 **Site is live** 메시지와 함께 사이트 주소가 나옵니다.  
   예: `https://랜덤이름-123.netlify.app`
2. 이 주소로 접속하면 와인 사이트가 보입니다.
3. `/varietals`, `/map` 등 직접 주소를 쳐도 잘 열리도록 이미 SPA 설정이 되어 있습니다.

### 6-3. (선택) 사이트 주소 바꾸기

Netlify 대시보드에서 **Site configuration** → **Domain management** 에서

- **Netlify subdomain** 이름 변경  
  또는
- **Custom domain** 연결  
  을 할 수 있습니다.

---

## 7. 인터넷에 사이트 배포하기 (Vercel 연동)

Netlify 대신 **Vercel**을 쓰고 싶다면 아래 순서로 진행합니다.

### 7-1. Vercel 가입 및 프로젝트 가져오기

1. [https://vercel.com](https://vercel.com) 접속 → **Sign Up** (또는 Log in)
2. **Continue with GitHub** 선택 후 GitHub 권한 허용
3. **Add New** → **Project** 클릭
4. **Import** 목록에서 **wine-site** 저장소 선택 후 **Import** 클릭
5. **Configure Project** 화면에서:
   - **Framework Preset**: Vite (자동 인식될 수 있음)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `dist` (기본값)  
     프로젝트에 `vercel.json` 이 있으면 그대로 두면 됩니다.
6. **Deploy** 클릭

### 7-2. 배포 완료

1. 1~2분 정도 기다리면 **Congratulations** 화면과 함께 사이트 URL이 나옵니다.  
   예: `https://wine-site-xxx.vercel.app`
2. 이 주소로 접속해 사이트가 정상적으로 보이는지 확인합니다.

---

## 8. 이후에 코드를 수정했을 때 (업데이트 배포)

로컬에서 파일을 수정한 뒤 다시 GitHub에 올리면, Netlify/Vercel이 **자동으로 다시 빌드·배포**합니다.

1. **wine-site** 폴더에서 작업한 뒤, 터미널에서:

   ```powershell
   cd "c:\Users\HORO\Desktop\WORK\wine-site"
   git add .
   git commit -m "수정 내용을 짧게 적기"
   git push
   ```

2. Netlify 또는 Vercel 대시보드에서 **자동 배포**가 시작되는지 확인합니다.  
   (보통 1~2분 후 사이트가 갱신됩니다.)

---

## 9. 자주 나오는 문제

### "git은(는) ... 인식할 수 없습니다"

- Git이 설치되지 않았거나, PATH에 없음.  
  [2. Git 설치 및 확인](#2-git-설치-및-확인) 을 다시 진행하고, 터미널을 **새로 연 뒤** `git --version` 을 확인하세요.

### "npm은(는) ... 인식할 수 없습니다"

- Node.js가 설치되지 않았음.  
  [https://nodejs.org](https://nodejs.org) 에서 LTS 버전을 설치한 뒤, 터미널을 다시 열고 `npm run build` 가 되는지 확인하세요.  
  Netlify/Vercel은 **그들 서버**에서 `npm run build` 를 실행하므로, 로컬에 Node가 없어도 배포 자체는 가능합니다. (단, 로컬에서 미리 빌드 테스트를 하려면 Node 설치가 필요합니다.)

### Push 시 "Authentication failed" / "Support for password authentication was removed"

- GitHub는 비밀번호 대신 **Personal Access Token** 사용을 요구합니다.
  1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
  2. **Generate new token** 으로 토큰 생성 (repo 권한 체크)
  3. push 할 때 **비밀번호 입력 칸에 이 토큰**을 붙여넣기

### Netlify/Vercel 빌드가 실패함

- 대시보드의 **Deploy log** 를 열어 에러 메시지를 확인합니다.
- 로컬에서 `npm run build` 가 성공하는지 먼저 확인하세요.  
  로컬에서 성공하면 대부분 Netlify/Vercel에서도 성공합니다.

---

## 10. 요약 체크리스트

- [ ] Git 설치 및 `user.name`, `user.email` 설정
- [ ] GitHub 계정 생성
- [ ] GitHub에 **새 저장소** 생성 (README 추가 안 함)
- [ ] 로컬 `wine-site` 폴더에서 `git init` → `git add .` → `git commit` → `git remote add origin` → `git push -u origin main`
- [ ] Netlify 또는 Vercel에서 **GitHub 저장소 연결** 후 Deploy
- [ ] 발급된 URL로 사이트 접속 확인

이 순서대로 진행하면 GitHub를 사용해 코드를 올리고, Netlify 또는 Vercel로 인터넷에 배포할 수 있습니다.
