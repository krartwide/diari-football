"use client";

import type { MatchEvent } from "@/types/football";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FOUL_LABELS: Record<string, string> = {
  trip: "걸기",
  push: "밀기",
  hold: "잡기",
  high_foot: "높이 든 발",
  charge: "과감한 몸싸움",
  handball: "핸드볼",
  dangerous: "위험 플레이",
};

const SHOT_LABELS: Record<string, string> = {
  ground: "땅볼 슈팅",
  curled: "감아차기",
  driven: "강슛",
  chip: "칩샷",
  volley: "발리",
  penalty: "페널티",
};

export function EventVisualizer({
  event,
  open,
  onOpenChange,
}: {
  event: MatchEvent | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-zinc-700 bg-[#14171c] text-white">
        <DialogHeader>
          <DialogTitle className="text-base">
            {event?.minute}&apos; 이벤트 리플레이
          </DialogTitle>
        </DialogHeader>
        {event && <VisualizerBody event={event} />}
      </DialogContent>
    </Dialog>
  );
}

function VisualizerBody({ event }: { event: MatchEvent }) {
  if (event.graphic?.goal) {
    const g = event.graphic.goal;
    const end = g.trajectory[g.trajectory.length - 1] ?? { x: 100, y: g.goalEntry.x };
    return (
      <div className="space-y-3">
        <p className="text-sm text-zinc-300">{event.text}</p>
        <Pitch>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path
              d={`M ${g.trajectory.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={g.shotFrom.x} cy={g.shotFrom.y} r="2.4" fill="#34d399" />
            {/* Ball lands on the goal line */}
            <circle cx={end.x} cy={end.y} r="2.2" fill="#f8fafc" stroke="#f87171" strokeWidth="0.8" />
            <rect x="97.5" y="28" width="2.2" height="44" fill="none" stroke="#e2e8f0" strokeWidth="0.7" />
          </svg>
          <span className="absolute bottom-2 left-2 text-[10px] text-white/70">
            {g.bodyPart === "head" ? "헤딩 위치" : "킥 위치"}
          </span>
          <span className="absolute right-2 top-2 text-[10px] text-white/70">골문</span>
        </Pitch>
        <GoalMouth entry={g.goalEntry} />
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
          <div>슈팅 유형: {SHOT_LABELS[g.shotType] ?? g.shotType}</div>
          <div>
            신체:{" "}
            {g.bodyPart === "right_foot"
              ? "오른발"
              : g.bodyPart === "left_foot"
                ? "왼발"
                : g.bodyPart === "head"
                  ? "헤딩"
                  : "기타"}
          </div>
        </div>
      </div>
    );
  }

  // Fallback for major events without dedicated graphics — still show pitch diagram
  if (
    ["goal", "penalty_goal", "shot", "shot_on_target", "save", "dribble", "substitution"].includes(
      event.type,
    )
  ) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-zinc-300">{event.text}</p>
        <Pitch>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-black">
            {event.playerName ?? "플레이"}
          </div>
        </Pitch>
      </div>
    );
  }

  if (event.graphic?.foul) {
    const f = event.graphic.foul;
    return (
      <div className="space-y-3">
        <p className="text-sm text-zinc-300">{event.text}</p>
        <Pitch>
          <div
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/80"
            style={{ left: `${f.location.y}%`, top: `${100 - f.location.x}%` }}
          />
          <div
            className="absolute text-lg"
            style={{
              left: `${f.location.y}%`,
              top: `${100 - f.location.x}%`,
              transform: `translate(-50%, -120%) rotate(${f.victimDirection}deg)`,
            }}
          >
            ↗
          </div>
        </Pitch>
        <div className="text-xs text-zinc-300">
          파울 유형: {FOUL_LABELS[f.foulerAction] ?? f.foulerAction} / 강도:{" "}
          {f.severity === "soft" ? "약함" : f.severity === "medium" ? "보통" : "강함"}
        </div>
      </div>
    );
  }

  if (event.graphic?.offside) {
    const o = event.graphic.offside;
    return (
      <div className="space-y-3">
        <p className="text-sm text-zinc-300">{event.text}</p>
        <Pitch>
          <div
            className="absolute top-0 h-full w-0.5 bg-red-400"
            style={{ left: `${o.defensiveLineY}%` }}
          />
          <div
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400"
            style={{ left: `${o.attacker.y}%`, top: `${100 - o.attacker.x}%` }}
            title="공격수"
          />
          <div
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ left: `${o.ball.y}%`, top: `${100 - o.ball.x}%` }}
            title="볼"
          />
        </Pitch>
        <div className="text-xs text-zinc-300">
          오프사이드 거리 약 {o.offsideDistance.toFixed(1)}m — 빨간 선이 수비 최종선
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-300">{event.text}</p>
      <Pitch>
        {event.graphic?.generic && (
          <div
            className="absolute rounded bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-semibold text-black"
            style={{
              left: `${event.graphic.generic.location.y}%`,
              top: `${100 - event.graphic.generic.location.x}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {event.graphic.generic.label}
          </div>
        )}
      </Pitch>
    </div>
  );
}

function Pitch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-emerald-900/50 bg-[#1f7a3a]">
      <div className="absolute inset-2 rounded border border-white/30" />
      <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/30" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
      <div className="absolute left-2 top-1/2 h-24 w-10 -translate-y-1/2 border border-white/30" />
      <div className="absolute right-2 top-1/2 h-24 w-10 -translate-y-1/2 border border-white/30" />
      {children}
    </div>
  );
}

function GoalMouth({ entry }: { entry: { x: number; y: number } }) {
  return (
    <div className="relative mx-auto h-28 w-full max-w-xs rounded border-2 border-zinc-400 bg-[#0f1720]">
      <div className="absolute inset-x-0 top-0 h-1 bg-zinc-300" />
      <div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]"
        style={{ left: `${entry.x}%`, top: `${100 - entry.y}%` }}
      />
      <div className="absolute bottom-1 left-0 right-0 text-center text-[10px] text-zinc-500">
        골대 입망 위치
      </div>
    </div>
  );
}
