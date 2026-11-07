"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Scoreboard } from "@/components/match/Scoreboard";
import { EventFeed } from "@/components/match/EventFeed";
import { LineupBoard } from "@/components/match/LineupBoard";
import { StatsTable } from "@/components/match/StatsTable";
import { decodeShareCode, saveMatch } from "@/lib/storage";
import type { MatchResult, SeriesResult } from "@/types/football";

function isMatch(v: MatchResult | SeriesResult): v is MatchResult {
  return "homeTeam" in v && "events" in v;
}

function isSeries(v: MatchResult | SeriesResult): v is SeriesResult {
  return "matches" in v && "homeTeamName" in v;
}

export default function SharePage() {
  const [data, setData] = useState<MatchResult | SeriesResult | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = window.location.hash.replace(/^#/, "");
    if (!code) {
      setError(true);
      return;
    }
    const decoded = decodeShareCode(code);
    if (!decoded) {
      setError(true);
      return;
    }
    setData(decoded);
    if (isMatch(decoded)) saveMatch(decoded);
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-zinc-400">공유 코드를 해석할 수 없습니다.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-400 hover:underline">
          홈으로
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
        불러오는 중…
      </div>
    );
  }

  if (isSeries(data)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          공유된 시리즈
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-white">
          {data.homeTeamName} vs {data.awayTeamName}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          합산 {data.homeAggregate}:{data.awayAggregate} · {data.matches.length}경기
        </p>
        <ul className="mt-6 space-y-8">
          {data.matches.map((m, i) => (
            <li key={m.id} className="space-y-4">
              <h2 className="text-sm font-semibold text-zinc-300">{i + 1}경기</h2>
              <Scoreboard match={m} />
              <Link
                href={`/match/?id=${encodeURIComponent(m.id)}`}
                className="inline-block text-sm text-emerald-400 hover:underline"
              >
                전체 경기지 보기
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-3 py-4 sm:px-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
        공유된 경기
      </p>
      <Scoreboard match={data} />
      <EventFeed match={data} />
      <LineupBoard match={data} />
      <StatsTable match={data} />
      <Link
        href={`/match/?id=${encodeURIComponent(data.id)}`}
        className="text-sm text-zinc-400 hover:text-white"
      >
        저장된 경기지로 이동 →
      </Link>
    </div>
  );
}
