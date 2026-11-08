# Diari Football

**라이브:** https://krartwide.github.io/diari-football/

[Diari](https://krartwide.github.io/diari/) 스타일의 **정적** 축구 시뮬레이션 웹앱입니다.  
서버 없이 GitHub Pages에 올리며, 경기는 브라우저에 저장됩니다.

## 기능

- 공식 국가대표 공개 팀 128개 + 커스텀 공개/비공개 팀
- 시즌 기록 기반 능력치·OVR, 감독·전술·퍼스널 컬러
- 단판 / 2판 합산 / 홈앤어웨이 / 다전제 + 홈 어드밴티지
- 라이브 중계, 골·파울·오프사이드 이벤트 그래픽
- 경기지·라인업·통계
- **로컬 저장 + 백업 코드 + 공유 링크(해시)** 로 폰·PC 간 이동 (서버 불필요)

## 로컬 실행

```bash
npm install
npm run dev
```

`http://127.0.0.1:3456` 에서 확인합니다.

정적 빌드 미리보기:

```bash
npm run build
npm start
```

## GitHub Pages 배포

1. GitHub에 저장소를 만들고 이 코드를 푸시합니다.
2. 저장소 **Settings → Pages → Build and deployment** 에서 Source를 **GitHub Actions** 로 둡니다.
3. `main`(또는 `master`)에 푸시하면 `.github/workflows/pages.yml` 이  
   `https://<user>.github.io/<repo>/` 로 배포합니다.
4. 예: 저장소 이름이 `diari-football` 이면  
   `https://you.github.io/diari-football/`  
   (Diari의 `/diari/` 와 같은 형식입니다.)

로컬에서 base path를 맞춰 빌드하려면:

```bash
NEXT_PUBLIC_BASE_PATH=/diari-football npm run build
```

## 스택

Next.js(static export) · TypeScript · Tailwind · shadcn/ui
