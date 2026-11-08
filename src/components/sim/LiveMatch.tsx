"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { MatchResult } from "@/types/football";
import { Scoreboard } from "@/components/match/Scoreboard";
import { EventFeed } from "@/components/match/EventFeed";
import { LineupBoard } from "@/components/match/LineupBoard";
import { MatchPitch } from "@/components/match/MatchPitch";
import { StatsTable } from "@/components/match/StatsTable";
import { Button } from "@/components/ui/button";
import { isMajorEvent } from "@/lib/match-events";
import { saveMatch } from "@/lib/storage";

const MAJOR_MS = 1400;
const FILLER_MS = MAJOR_MS / 40; // 40x relative to major events

export function LiveMatch({
  match,
  autoPlay = true,
}: {
  match: MatchResult;
  autoPlay?: boolean;
}) {
  const [idx, setIdx] = useState(autoPlay ? 1 : match.events.length);
  const [playing, setPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(1);
  const [saved, setSaved] = useState(false);

  const done = idx >= match.events.length;

  const liveMatch = useMemo(() => {
    const events = match.events.slice(0, idx);
    const lastScore = [...events].reverse().find((e) => e.scoreAfter);
    return {
      ...match,
      events,
      homeScore: lastScore?.scoreAfter?.[0] ?? 0,
      awayScore: lastScore?.scoreAfter?.[1] ?? 0,
    };
  }, [match, idx]);

  useEffect(() => {
    if (!playing || done) return;
    const current = match.events[idx - 1];
    const major = current ? isMajorEvent(current.type) : false;
    const delay = (major ? MAJOR_MS : FILLER_MS) / speed;
    const t = setTimeout(() => setIdx((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [playing, done, idx, speed, match.events]);

  useEffect(() => {
    if (done && !saved) {
      saveMatch(match);
      setSaved(true);
    }
  }, [done, match, saved]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-3 py-4 sm:px-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setPlaying((p) => !p)}
          disabled={done}
        >
          {playing ? "일시정지" : "재생"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIdx(match.events.length)}>
          결과 바로보기
        </Button>
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          배속:
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              type="button"
              className={`rounded px-2 py-1 ${speed === s ? "bg-emerald-700 text-white" : "bg-zinc-800"}`}
              onClick={() => setSpeed(s)}
            >
              {s}x
            </button>
          ))}
          <span className="ml-1 text-[10px] text-zinc-500">일반 로그는 40배속</span>
        </div>
        {done && (
          <Link
            href={`/match/?id=${encodeURIComponent(match.id)}`}
            className="ml-auto text-sm text-emerald-400 underline-offset-2 hover:underline"
          >
            저장됨 · 경기지 열기
          </Link>
        )}
      </div>

      <Scoreboard match={liveMatch} />
      <MatchPitch match={match} eventIndex={idx} />
      <EventFeed match={match} visibleCount={idx} defaultMode="events" />

      {done && (
        <>
          <LineupBoard match={match} />
          <StatsTable match={match} />
        </>
      )}
    </div>
  );
}
