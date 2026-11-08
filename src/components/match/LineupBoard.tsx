"use client";

import { useMemo, type ReactNode } from "react";
import { getFormation } from "@/data/formations";
import type {
  MatchEvent,
  MatchResult,
  PlayerMatchLine,
  Position,
  Team,
} from "@/types/football";

type SlotNode = {
  position: Position;
  starter: PlayerMatchLine;
  chain: PlayerMatchLine[]; // starter then successive subs into this slot
};

function minuteLabel(m: number, stoppage?: number) {
  return stoppage ? `${m}+${stoppage}'` : `${m}'`;
}

function playerMarks(
  line: PlayerMatchLine,
  events: MatchEvent[],
): Array<{ key: string; node: ReactNode }> {
  const marks: Array<{ key: string; node: ReactNode }> = [];
  const mine = events.filter(
    (e) => e.playerId === line.playerId || e.assistId === line.playerId || e.relatedPlayerId === line.playerId,
  );

  for (const e of mine) {
    if ((e.type === "goal" || e.type === "penalty_goal") && e.playerId === line.playerId) {
      marks.push({
        key: `g-${e.id}`,
        node: (
          <span className="inline-flex items-center gap-0.5 text-[11px] text-zinc-200" title="골">
            ⚽ {minuteLabel(e.minute, e.stoppage)}
          </span>
        ),
      });
    }
    if (e.assistId === line.playerId && (e.type === "goal" || e.type === "penalty_goal")) {
      marks.push({
        key: `a-${e.id}`,
        node: (
          <span className="inline-flex items-center gap-0.5 text-[11px] text-zinc-300" title="어시스트">
            👟 {minuteLabel(e.minute, e.stoppage)}
          </span>
        ),
      });
    }
    if (e.type === "yellow_card" && e.playerId === line.playerId) {
      marks.push({
        key: `y-${e.id}`,
        node: (
          <span className="inline-flex items-center gap-0.5 text-[11px]" title="경고">
            <span className="inline-block h-2.5 w-1.5 rounded-[1px] bg-yellow-400" />
            {minuteLabel(e.minute, e.stoppage)}
          </span>
        ),
      });
    }
    if (
      (e.type === "red_card" || e.type === "second_yellow") &&
      e.playerId === line.playerId
    ) {
      marks.push({
        key: `r-${e.id}`,
        node: (
          <span className="inline-flex items-center gap-0.5 text-[11px]" title="퇴장">
            <span className="inline-block h-2.5 w-1.5 rounded-[1px] bg-red-500" />
            {minuteLabel(e.minute, e.stoppage)}
          </span>
        ),
      });
    }
    if (e.type === "injury" && e.playerId === line.playerId) {
      marks.push({
        key: `i-${e.id}`,
        node: (
          <span className="text-[11px] text-red-400" title="부상">
            ✚ {minuteLabel(e.minute, e.stoppage)}
          </span>
        ),
      });
    }
  }

  if (line.substitutedOff !== undefined) {
    marks.push({
      key: `out-${line.playerId}`,
      node: (
        <span className="text-[11px] font-medium text-red-400">
          ▼ {line.substitutedOff}&apos;
        </span>
      ),
    });
  }
  if (line.substitutedOn !== undefined) {
    marks.push({
      key: `in-${line.playerId}`,
      node: (
        <span className="text-[11px] font-medium text-emerald-400">
          ▲ {line.substitutedOn}&apos;
        </span>
      ),
    });
  }

  return marks;
}

function buildSlots(team: Team, lines: PlayerMatchLine[]): SlotNode[][] {
  const formation = getFormation(team.tactics.formation) ?? getFormation("4-3-3")!;
  const starters = lines.filter((l) => l.started);
  const used = new Set<string>();
  const slots: SlotNode[] = [];

  for (const slot of formation.slots) {
    let best =
      starters.find((l) => !used.has(l.playerId) && l.position === slot.position) ??
      starters.find((l) => !used.has(l.playerId));
    if (!best) continue;
    used.add(best.playerId);

    const chain: PlayerMatchLine[] = [best];
    let current = best;
    // Follow substitution chain into this slot
    while (current.substitutedOff !== undefined) {
      const next = lines.find(
        (s) =>
          s.substitutedOn !== undefined &&
          Math.abs((s.substitutedOn ?? 0) - (current.substitutedOff ?? 0)) <= 1 &&
          !chain.some((c) => c.playerId === s.playerId),
      );
      if (!next) break;
      chain.push(next);
      current = next;
    }

    slots.push({ position: slot.position, starter: best, chain });
  }

  // Group into rows by formation y bands
  const withY = slots.map((s, i) => ({
    ...s,
    y: formation.slots[i]?.y ?? 0.5,
    x: formation.slots[i]?.x ?? 0.5,
  }));
  const sorted = [...withY].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: typeof sorted[] = [];
  for (const s of sorted) {
    const last = rows[rows.length - 1];
    if (!last || Math.abs(last[0]!.y - s.y) > 0.12) {
      rows.push([s]);
    } else {
      last.push(s);
      last.sort((a, b) => a.x - b.x);
    }
  }
  return rows.map((row) =>
    row.map(({ position, starter, chain }) => ({ position, starter, chain })),
  );
}

function SlotCell({
  slot,
  events,
}: {
  slot: SlotNode;
  events: MatchEvent[];
}) {
  return (
    <div className="min-w-0 flex-1 border border-white/10 bg-[#1a1d22]/40 px-1.5 py-1.5">
      <div className="mb-1 text-center text-[10px] font-semibold tracking-wide text-zinc-500">
        {slot.position}
      </div>
      <div className="space-y-1">
        {slot.chain.map((line) => {
          const marks = playerMarks(line, events);
          return (
            <div key={line.playerId} className="text-[12px] leading-snug">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-zinc-500">{line.number}.</span>
                <span className="truncate font-medium text-zinc-100">{line.name}</span>
                {line.isCaptain && (
                  <span className="rounded-[2px] bg-amber-400 px-1 text-[9px] font-bold text-black">
                    C
                  </span>
                )}
                {marks.map((m) => (
                  <span key={m.key}>{m.node}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamHalf({
  team,
  lines,
  events,
  side,
}: {
  team: Team;
  lines: PlayerMatchLine[];
  events: MatchEvent[];
  side: "home" | "away";
}) {
  const rows = useMemo(() => buildSlots(team, lines), [team, lines]);
  const displayRows = side === "away" ? [...rows].reverse() : rows;
  const bar = (
    <div
      className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm font-semibold text-white"
      style={{ background: team.colors.primary }}
    >
      {team.crestUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={team.crestUrl} alt="" className="h-4 w-6 object-cover" />
      )}
      <div>
        <div>
          {team.name} 선발 명단 {team.tactics.formation}
        </div>
        <div className="text-[11px] font-normal text-white/75">
          감독: {team.manager.name}
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg bg-[#15181d]">
      {side === "home" && bar}
      <div className="space-y-0 border-x border-white/10">
        {displayRows.map((row, ri) => (
          <div
            key={ri}
            className="flex border-b border-white/10 last:border-b-0"
          >
            {row.map((slot) => (
              <SlotCell
                key={`${slot.starter.playerId}-${slot.position}`}
                slot={slot}
                events={events}
              />
            ))}
          </div>
        ))}
      </div>
      {side === "away" && bar}
    </div>
  );
}

export function LineupBoard({ match }: { match: MatchResult }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-100">전술 · 선발 명단</h2>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <TeamHalf
          team={match.homeTeam}
          lines={match.homeLineup}
          events={match.events}
          side="home"
        />
        <div className="h-px bg-white/20" />
        <TeamHalf
          team={match.awayTeam}
          lines={match.awayLineup}
          events={match.events}
          side="away"
        />
      </div>
    </section>
  );
}
