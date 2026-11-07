"use client";

import { useMemo, useState } from "react";
import type { MatchEvent, MatchResult } from "@/types/football";
import { EventVisualizer } from "@/components/event/EventVisualizer";
import { Button } from "@/components/ui/button";

const INTERACTIVE = new Set([
  "goal",
  "penalty_goal",
  "own_goal",
  "foul",
  "yellow_card",
  "red_card",
  "second_yellow",
  "offside",
  "shot",
  "shot_on_target",
  "save",
  "injury",
  "penalty_miss",
]);

export function EventFeed({
  match,
  visibleCount,
}: {
  match: MatchResult;
  visibleCount?: number;
}) {
  const [selected, setSelected] = useState<MatchEvent | null>(null);
  const events = useMemo(() => {
    const list = match.events;
    if (visibleCount === undefined) return list;
    return list.slice(0, visibleCount);
  }, [match.events, visibleCount]);

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-100">경기 진행 로그</h2>
      <div className="space-y-2 rounded-lg bg-[#1a1d22] p-3">
        {events.map((e) => {
          const clickable = INTERACTIVE.has(e.type) && !!e.graphic;
          return (
            <div
              key={e.id}
              className="flex flex-col gap-1 border-b border-white/5 py-2 last:border-0 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="font-mono text-zinc-300">
                    {e.minute}&apos;
                    {e.stoppage ? `+${e.stoppage}` : ""}
                  </span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 uppercase tracking-wide">
                    {labelType(e.type)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-200">{e.text}</p>
              </div>
              {clickable && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-1 shrink-0 border-emerald-700/60 text-emerald-400 hover:bg-emerald-950"
                  onClick={() => setSelected(e)}
                >
                  이벤트 보기
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <EventVisualizer
        event={selected}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </section>
  );
}

function labelType(t: string): string {
  const map: Record<string, string> = {
    kickoff: "킥오프",
    half_time: "하프타임",
    second_half: "후반",
    full_time: "종료",
    goal: "골",
    penalty_goal: "PK골",
    foul: "파울",
    yellow_card: "경고",
    red_card: "퇴장",
    second_yellow: "경고누적",
    injury: "부상",
    substitution: "교체",
    corner: "코너",
    offside: "오프사이드",
    shot: "슈팅",
    save: "선방",
    commentary: "중계",
    dribble: "드리블",
    interception: "인터셉트",
  };
  return map[t] ?? t;
}
