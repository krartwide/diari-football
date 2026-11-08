"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MatchEvent, MatchResult } from "@/types/football";
import { EventVisualizer } from "@/components/event/EventVisualizer";
import { Button } from "@/components/ui/button";
import { isMajorEvent } from "@/lib/match-events";
import { cn } from "@/lib/utils";

export function EventFeed({
  match,
  visibleCount,
  defaultMode = "all",
}: {
  match: MatchResult;
  visibleCount?: number;
  defaultMode?: "all" | "events";
}) {
  const [selected, setSelected] = useState<MatchEvent | null>(null);
  const [mode, setMode] = useState<"all" | "events">(defaultMode);
  const bottomRef = useRef<HTMLDivElement>(null);

  const events = useMemo(() => {
    const list =
      visibleCount === undefined ? match.events : match.events.slice(0, visibleCount);
    if (mode === "events") return list.filter((e) => isMajorEvent(e.type));
    return list;
  }, [match.events, visibleCount, mode]);

  useEffect(() => {
    if (visibleCount === undefined) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleCount, mode]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">경기 진행 로그</h2>
          <p className="text-xs text-zinc-500">
            {mode === "all"
              ? `전체 ${events.length}개 기록`
              : `주요 이벤트 ${events.length}개`}
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-black/30 p-1">
          <button
            type="button"
            onClick={() => setMode("all")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              mode === "all" ? "bg-emerald-700 text-white" : "text-zinc-400",
            )}
          >
            전체 로그
          </button>
          <button
            type="button"
            onClick={() => setMode("events")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs",
              mode === "events" ? "bg-emerald-700 text-white" : "text-zinc-400",
            )}
          >
            이벤트만
          </button>
        </div>
      </div>

      <div className="max-h-[28rem] space-y-1 overflow-y-auto rounded-lg bg-[#1a1d22] p-3">
        {events.map((e) => {
          const major = isMajorEvent(e.type);
          return (
            <div
              key={e.id}
              className={cn(
                "flex flex-col gap-1 border-b border-white/5 py-2 last:border-0 sm:flex-row sm:items-start sm:justify-between",
                !major && "opacity-75",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                  <span className="font-mono text-zinc-300">
                    {e.minute}&apos;
                    {e.stoppage ? `+${e.stoppage}` : ""}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 uppercase tracking-wide",
                      major ? "bg-emerald-950/60 text-emerald-300" : "bg-white/5",
                    )}
                  >
                    {labelType(e.type)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-200">{e.text}</p>
              </div>
              {major && (
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
        <div ref={bottomRef} />
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
    shot_on_target: "유효슈팅",
    shot_blocked: "블록",
    save: "선방",
    commentary: "중계",
    dribble: "드리블",
    interception: "인터셉트",
    pass: "패스",
    possession: "점유",
    tackle: "태클",
    clearance: "클리어",
    throw_in: "스로인",
    free_kick: "프리킥",
    penalty_miss: "PK실축",
    own_goal: "자책골",
  };
  return map[t] ?? t;
}
