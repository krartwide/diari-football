import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, #065f4633, transparent), radial-gradient(ellipse 60% 40% at 100% 0%, #1e3a8a22, transparent), linear-gradient(180deg, #12161c 0%, #0b0d10 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <section className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-5xl flex-col justify-center px-4 py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/90">
          Football Match Simulator
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight text-white sm:text-7xl">
          Diari Football
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          팀을 짜고, 전술과 감독 성격을 고른 뒤, 현실적인 이벤트 로그와 그래픽으로
          경기를 남깁니다. 단판부터 7전 4선승까지 — 모든 경기는 기기에 저장됩니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/play"
            className={cn(buttonVariants(), "bg-emerald-600 hover:bg-emerald-500")}
          >
            경기 시작
          </Link>
          <Link
            href="/teams"
            className={cn(buttonVariants({ variant: "outline" }), "border-zinc-600")}
          >
            공식 국가대표 보기
          </Link>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            {
              t: "팀 & OVR",
              d: "시즌 기록으로 능력치와 최종 OVR를 계산합니다. 공개/비공개 팀을 만들 수 있습니다.",
            },
            {
              t: "리얼 시뮬레이션",
              d: "교체·부상·파울·골·오프사이드가 전술과 선수에 맞춰 진행됩니다.",
            },
            {
              t: "경기지 & 리플레이",
              d: "스코어보드, 라인업, 팀 통계, 이벤트 그래픽까지 한 경기에 담습니다.",
            },
          ].map((x) => (
            <div key={x.t}>
              <h2 className="text-sm font-semibold text-emerald-400">{x.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
