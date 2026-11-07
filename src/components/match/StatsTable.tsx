"use client";

import { passPct, shotOnTargetPct } from "@/lib/format";
import type { MatchResult } from "@/types/football";

export function StatsTable({ match }: { match: MatchResult }) {
  const h = match.homeStats;
  const a = match.awayStats;

  const rows: { label: string; left: string; right: string; emphasize?: "left" | "right" | "none" }[] = [
    {
      label: "점수",
      left: String(match.homeScore),
      right: String(match.awayScore),
      emphasize:
        match.homeScore > match.awayScore
          ? "left"
          : match.awayScore > match.homeScore
            ? "right"
            : "none",
    },
    {
      label: "점유율",
      left: `${h.possession}%`,
      right: `${a.possession}%`,
    },
    {
      label: "슈팅",
      left: String(h.shots),
      right: String(a.shots),
    },
    {
      label: "유효슈팅",
      left: `${h.shotsOnTarget} (${shotOnTargetPct(h.shots, h.shotsOnTarget)})`,
      right: `${a.shotsOnTarget} (${shotOnTargetPct(a.shots, a.shotsOnTarget)})`,
    },
    {
      label: "코너킥",
      left: String(h.corners),
      right: String(a.corners),
    },
    {
      label: "패스 수",
      left: String(h.passes),
      right: String(a.passes),
    },
    {
      label: "패스 성공 수",
      left: `${h.passesCompleted} (${passPct(h.passes, h.passesCompleted)})`,
      right: `${a.passesCompleted} (${passPct(a.passes, a.passesCompleted)})`,
    },
    {
      label: "파울",
      left: String(h.fouls),
      right: String(a.fouls),
    },
    {
      label: "경고",
      left: String(h.yellowCards),
      right: String(a.yellowCards),
    },
    {
      label: "퇴장",
      left: String(h.redCards),
      right: String(a.redCards),
    },
    {
      label: "오프사이드",
      left: String(h.offsides),
      right: String(a.offsides),
    },
  ];

  return (
    <section className="overflow-hidden rounded-lg bg-[#1a1d22] text-white">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-white/10 px-3 py-3">
        <CrestBanner team={match.homeTeam} align="left" />
        <div className="px-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="text-[10px] font-bold tracking-widest text-zinc-500">STATS</div>
        </div>
        <CrestBanner team={match.awayTeam} align="right" />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 py-2 text-center text-sm font-semibold">
        <div className="flex items-center justify-center gap-2">
          {match.homeTeam.crestUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={match.homeTeam.crestUrl} alt="" className="h-4 w-6" />
          )}
          {match.homeTeam.name}
        </div>
        <div className="flex items-center justify-center gap-2">
          {match.awayTeam.crestUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={match.awayTeam.crestUrl} alt="" className="h-4 w-6" />
          )}
          {match.awayTeam.name}
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2.5 text-sm"
          >
            <div
              className={`text-right font-semibold ${
                row.emphasize === "left" ? "text-emerald-400" : "text-zinc-200"
              }`}
            >
              {row.left}
            </div>
            <div className="min-w-[5.5rem] px-3 text-center text-xs text-zinc-400 sm:min-w-[7rem]">
              {row.label}
              {row.label === "점유율" && h.contestedPossession > 0 && (
                <div className="text-[10px] text-zinc-600">
                  경합 {h.contestedPossession}%
                </div>
              )}
            </div>
            <div
              className={`text-left font-semibold ${
                row.emphasize === "right" ? "text-emerald-400" : "text-zinc-200"
              }`}
            >
              {row.right}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CrestBanner({
  team,
  align,
}: {
  team: MatchResult["homeTeam"];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex h-16 items-center justify-center rounded-md ${align === "left" ? "" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${team.colors.primary}, ${team.colors.secondary})`,
      }}
    >
      {team.crestUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={team.crestUrl} alt={team.name} className="h-10 w-14 object-contain" />
      ) : (
        <span className="font-bold tracking-widest">{team.fifaCode}</span>
      )}
    </div>
  );
}
