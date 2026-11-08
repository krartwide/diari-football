# Diari Football

**라이브:** https://krartwide.github.io/diari-football/

[Diari](https://krartwide.github.io/diari/) 스타일의 **정적** 축구 시뮬레이션 웹앱입니다.  
서버 없이 GitHub Pages에 올리며, 경기는 브라우저에 저장됩니다.

## 기능

- **공개 팀 분류:** 국가대표 · 프리미어 리그 · 분데스리가 · 라리가 · 세리에 A · 리그 1
- 공식 팀 편집 가능 (기기 localStorage, 원본 복구 지원)
- **EA Sports FC 27** 공식 능력치(세부 스탯 포함) + **플레이스타일 / 플레이스타일+**
- 5대 리그 1부 클럽 스쿼드 포함 (EA 레이팅 DB 기준)
- 단판 / 2판 합산 / 홈앤어웨이 / 다전제 + 홈 어드밴티지
- 라이브 중계, 골·파울·오프사이드 이벤트 그래픽
- **로컬 저장 + 백업 코드 + 공유 링크(해시)** 로 폰·PC 간 이동

## 데이터

선수 OVR·능력치·플레이스타일은 EA 공개 레이팅(FC 27) 스냅샷을 기반으로 생성합니다.

```bash
# CSV를 /tmp/fc27/players.csv 에 둔 뒤
python3 scripts/generate-fc27-teams.py
```

## 로컬 실행

```bash
npm install
npm run dev
```

`http://127.0.0.1:3456` 에서 확인합니다.

```bash
npm run build
npm start
```

## GitHub Pages

```bash
NEXT_PUBLIC_BASE_PATH=/diari-football npm run build
# out/ 을 gh-pages 브랜치로 배포
```

## 스택

Next.js(static export) · TypeScript · Tailwind · shadcn/ui
