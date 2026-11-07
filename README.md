# Diari Football

축구 경기 시뮬레이션 웹앱입니다. 공식 국가대표·커스텀 팀을 구성하고, 전술과 감독 성격을 반영한 단판·다전제 경기를 돌린 뒤 스코어보드·라인업·통계·이벤트 로그를 남깁니다. 경기 기록은 브라우저 localStorage에 저장되며, 선택적으로 Postgres API로 동기화할 수 있습니다.

## 실행

```bash
npm install
npm run dev
```

개발 서버는 **http://localhost:3456** 에서 열립니다.

프로덕션 빌드(마이그레이션 포함):

```bash
npm run build
npm start
```

`DATABASE_URL`이 있으면 `scripts/migrate.mjs`가 `migrations/` SQL을 적용합니다. 없으면 마이그레이션은 건너뜁니다.

## 주요 경로

| 경로 | 설명 |
|------|------|
| `/` | 홈 |
| `/teams` | 팀 목록 · 검색 · 연맹 필터 |
| `/teams/new` | 커스텀 팀 빌더 |
| `/play` | 맞대결 · 시리즈 설정 |
| `/match/[id]` | 경기지 (`?live=1` 라이브 재생) |
| `/history` | 저장 기록 · 백업 · 서버 동기화 |
| `/share/[code]` | 공유 코드로 경기 열기 |

## GitHub Pages 참고

이 앱은 Next.js App Router와 API 라우트(`/api/matches`)·Postgres를 사용합니다. **GitHub Pages는 정적 호스팅만 지원**하므로 그대로는 배포하기 어렵습니다. 정적 export만 필요한 경우 `output: "export"`와 API 제거가 필요하고, DB·동기화 기능은 Vercel·자체 서버 등 Node 호스팅을 권장합니다. 클라이언트만으로도 팀 생성·시뮬레이션·localStorage 기록·공유 코드는 동작합니다.

## 스택

- Next.js 16 · React 19 · Tailwind CSS 4
- Framer Motion · lz-string 공유 코드
- Postgres (`pg` / `DATABASE_URL`) 선택적 동기화
