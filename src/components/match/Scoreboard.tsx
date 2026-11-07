"use client";

import type { MatchResult } from "@/types/football";
import { formatKickoffKst } from "@/lib/format";

export function Scoreboard({ match }: { match: MatchResult }) {
  const homeGoals = match.events.filter(
    (e) =>
      (e.type === "goal" || e.type === "penalty_goal" || e.type === "own_goal") &&
      e.teamId === match.homeTeam.id,
  );
  const awayGoals = match.events.filter(
    (e) =>
      (e.type === "goal" || e.type === "penalty_goal" || e.type === "own_goal") &&
      e.teamId === match.awayTeam.id,
  );

  const formatGoal = (e: (typeof homeGoals)[0]) => {
    const pk = e.type === "penalty_goal" ? " (PK)" : "";
    const assist = e.assistName ? ` (A. ${e.assistName})` : "";
    return `${e.minute}'${pk} ${e.playerName}${assist}`;
  };

  return (
    <section className="overflow-hidden rounded-lg bg-[#1a1d22] text-white shadow-xl">
      <div className="flex flex-col items-center gap-1 px-4 pt-5 text-center text-[11px] text-zinc-400 sm:text-xs">
        <div className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-zinc-500">
          DIARI FOOTBALL
        </div>
        <p className="font-medium text-zinc-200">
          {match.settings.competitionName}
          {match.settings.stageName ? ` ${match.settings.stageName}` : ""}
        </p>
        <p>{formatKickoffKst(match.settings.kickoffIso)}</p>
        <p>{match.settings.venueOverride}</p>
        <p>주심: {match.settings.referee}</p>
        <p>관중: {match.settings.attendance?.toLocaleString("ko-KR")}명</p>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-0 px-2 sm:px-4">
        <TeamCrest team={match.homeTeam} />
        <div className="flex items-center justify-center px-3">
          <div className="rounded-md bg-[#2a2e35] px-4 py-3 text-3xl font-bold tracking-wider sm:text-5xl">
            {match.homeScore}{" "}
            <span className="text-zinc-500">:</span> {match.awayScore}
          </div>
        </div>
        <TeamCrest team={match.awayTeam} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 px-4 text-sm font-semibold">
        <div className="flex items-center justify-center gap-2">
          {match.homeTeam.crestUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={match.homeTeam.crestUrl} alt="" className="h-5 w-7 object-cover" />
          )}
          {match.homeTeam.name}
        </div>
        <div className="flex items-center justify-center gap-2">
          {match.awayTeam.crestUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={match.awayTeam.crestUrl} alt="" className="h-5 w-7 object-cover" />
          )}
          {match.awayTeam.name}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] gap-2 px-4 pb-4 text-[11px] text-zinc-300 sm:text-xs">
        <div className="space-y-1 text-right">
          {homeGoals.length === 0 ? (
            <span className="text-zinc-600">-</span>
          ) : (
            homeGoals.map((g) => <div key={g.id}>{formatGoal(g)}</div>)
          )}
        </div>
        <div className="flex items-start justify-center pt-0.5 text-base">⚽</div>
        <div className="space-y-1 text-left">
          {awayGoals.length === 0 ? (
            <span className="text-zinc-600">-</span>
          ) : (
            awayGoals.map((g) => <div key={g.id}>{formatGoal(g)}</div>)
          )}
        </div>
      </div>

      {match.playerOfTheMatch && (
        <div className="flex items-center justify-center gap-2 bg-black/60 px-4 py-2.5 text-xs sm:text-sm">
          <span className="text-zinc-400">Player of the Match:</span>
          <span className="font-semibold text-emerald-400">
            {match.playerOfTheMatch.name}
          </span>
        </div>
      )}
    </section>
  );
}

function TeamCrest({
  team,
}: {
  team: MatchResult["homeTeam"];
}) {
  return (
    <div
      className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-md"
      style={{
        background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 55%, ${team.colors.accent} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            team.colors.pattern === "stripes"
              ? `repeating-linear-gradient(90deg, transparent, transparent 8px, ${team.colors.secondary}55 8px, ${team.colors.secondary}55 16px)`
              : team.colors.pattern === "hoops"
                ? `repeating-linear-gradient(0deg, transparent, transparent 10px, ${team.colors.secondary}44 10px, ${team.colors.secondary}44 20px)`
                : undefined,
        }}
      />
      {team.crestUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={team.crestUrl}
          alt={team.name}
          className="relative z-10 h-16 w-24 object-contain drop-shadow-lg sm:h-20 sm:w-28"
        />
      ) : (
        <span className="relative z-10 text-2xl font-black tracking-widest text-white/90">
          {team.fifaCode}
        </span>
      )}
      {!!team.worldCupTitles && team.worldCupTitles > 0 && (
        <div className="absolute top-2 flex gap-0.5">
          {Array.from({ length: Math.min(team.worldCupTitles, 5) }).map((_, i) => (
            <span key={i} className="text-[10px] text-yellow-300">
              ★
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
