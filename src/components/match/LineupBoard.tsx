"use client";

import type { MatchResult, PlayerMatchLine, Team } from "@/types/football";

function PlayerRow({ line }: { line: PlayerMatchLine }) {
  if (!line.started && !line.substitutedOn) return null;
  const show =
    line.started || line.substitutedOn !== undefined || line.goals > 0;
  if (!show && !line.onPitch) return null;

  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-white/5 py-2 text-sm">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        {line.position}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-500">{line.number}.</span>
          <span className="font-medium text-zinc-100">{line.name}</span>
          {line.isCaptain && (
            <span className="rounded-[2px] bg-amber-400 px-1 text-[10px] font-bold text-black">
              C
            </span>
          )}
          {line.injured && (
            <span title="부상" className="text-red-400">
              ✚
            </span>
          )}
          {line.yellowCards > 0 && !line.redCard && (
            <span className="inline-block h-3 w-2 rounded-[1px] bg-yellow-400" title="경고" />
          )}
          {line.redCard && (
            <span className="inline-block h-3 w-2 rounded-[1px] bg-red-500" title="퇴장" />
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap gap-2 text-[11px] text-zinc-400">
          {line.goals > 0 && (
            <span>
              ⚽ {Array.from({ length: line.goals }).map((_, i) => (
                <span key={i}>골 </span>
              ))}
            </span>
          )}
          {line.assists > 0 && <span>🅰️ 어시스트 ×{line.assists}</span>}
          {line.substitutedOff !== undefined && (
            <span className="text-red-400">▼ {line.substitutedOff}&apos;</span>
          )}
          {line.substitutedOn !== undefined && (
            <span className="text-emerald-400">▲ {line.substitutedOn}&apos;</span>
          )}
        </div>
        {/* show players who came on replacing this one */}
      </div>
    </div>
  );
}

function TeamLineup({
  team,
  lines,
  headerColor,
}: {
  team: Team;
  lines: PlayerMatchLine[];
  headerColor: string;
}) {
  const starters = lines.filter((l) => l.started);
  const subs = lines.filter((l) => l.substitutedOn !== undefined);

  // Order roughly by pitch role
  const order = ["GK", "RB", "CB", "LB", "RWB", "LWB", "CDM", "CM", "CAM", "RM", "LM", "RW", "LW", "CF", "ST"];
  const sorted = [...starters].sort(
    (a, b) => order.indexOf(a.position) - order.indexOf(b.position),
  );

  return (
    <div className="overflow-hidden rounded-lg bg-[#22262c]">
      <div
        className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm font-semibold text-white"
        style={{ background: headerColor }}
      >
        {team.crestUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={team.crestUrl} alt="" className="h-4 w-6 object-cover" />
        )}
        <span>
          {team.name} 선발 명단 {team.tactics.formation}
        </span>
      </div>
      <div className="px-3 py-2 text-xs text-zinc-400">
        감독: {team.manager.name}
      </div>
      <div className="px-3 pb-2">
        {sorted.map((l) => (
          <div key={l.playerId}>
            <PlayerRow line={l} />
            {subs
              .filter((s) => {
                // find sub that replaced this player around same minute
                return (
                  l.substitutedOff !== undefined &&
                  s.substitutedOn !== undefined &&
                  Math.abs(s.substitutedOn - l.substitutedOff) <= 1
                );
              })
              .map((s) => (
                <div
                  key={s.playerId}
                  className="mb-1 ml-10 flex items-center gap-2 text-[11px] text-emerald-400"
                >
                  <span>▲ {s.substitutedOn}&apos;</span>
                  <span className="text-zinc-300">
                    {s.number}. {s.name}
                  </span>
                  {s.goals > 0 && <span>⚽</span>}
                  {s.yellowCards > 0 && (
                    <span className="inline-block h-2.5 w-1.5 bg-yellow-400" />
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineupBoard({ match }: { match: MatchResult }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">라인업 & 경기 기록</h2>
      <TeamLineup
        team={match.homeTeam}
        lines={match.homeLineup}
        headerColor={match.homeTeam.colors.primary}
      />
      <TeamLineup
        team={match.awayTeam}
        lines={match.awayLineup}
        headerColor={match.awayTeam.colors.primary}
      />
    </section>
  );
}
