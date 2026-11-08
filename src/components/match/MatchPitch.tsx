"use client";

import { useEffect, useMemo, useState } from "react";
import { getFormation } from "@/data/formations";
import type { MatchEvent, MatchResult, PlayerMatchLine, Team } from "@/types/football";
import { cn } from "@/lib/utils";

type Pt = { x: number; y: number }; // 0–100 on horizontal pitch (x: left→right, y: top→bottom)

type Stone = {
  id: string;
  number: number;
  name: string;
  team: "home" | "away";
  color: string;
  accent: string;
  pos: Pt;
  onPitch: boolean;
};

type BallState = {
  pos: Pt;
  airborne: boolean;
  spinning: boolean;
  height: number; // 0–1
};

function formationPoints(team: Team, side: "home" | "away"): Pt[] {
  const formation = getFormation(team.tactics.formation) ?? getFormation("4-3-3")!;
  return formation.slots.map((s) => {
    // formation: y=0 GK near own goal, y=1 attacking
    // pitch: home defends left (x small), away defends right (x large)
    const depth = s.y; // 0..1
    const lane = s.x; // 0..1 left-right of team view
    if (side === "home") {
      return {
        x: 6 + depth * 40, // 6 → 46
        y: 8 + lane * 84,
      };
    }
    return {
      x: 94 - depth * 40, // 94 → 54
      y: 8 + (1 - lane) * 84,
    };
  });
}

function assignStones(
  team: Team,
  lines: PlayerMatchLine[],
  side: "home" | "away",
): Stone[] {
  const pts = formationPoints(team, side);
  const on = lines.filter((l) => l.onPitch && !l.redCard);
  const starters = lines.filter((l) => l.started);
  const ordered = [
    ...starters.filter((l) => l.onPitch),
    ...on.filter((l) => !l.started),
  ].slice(0, 11);

  return ordered.map((l, i) => ({
    id: l.playerId,
    number: l.number,
    name: l.name,
    team: side,
    color: team.colors.primary,
    accent: team.colors.secondary,
    pos: pts[Math.min(i, pts.length - 1)] ?? { x: 50, y: 50 },
    onPitch: true,
  }));
}

function eventBallTarget(
  e: MatchEvent | undefined,
  homeId: string,
  stones: Stone[],
): BallState {
  const center = { x: 50, y: 50 };
  if (!e) return { pos: center, airborne: false, spinning: false, height: 0 };

  const actor = stones.find((s) => s.id === e.playerId);
  const isHome = e.teamId === homeId;

  switch (e.type) {
    case "kickoff":
    case "second_half":
      return { pos: center, airborne: false, spinning: false, height: 0 };
    case "dribble":
      return {
        pos: actor?.pos ?? { x: isHome ? 55 : 45, y: 50 },
        airborne: false,
        spinning: true,
        height: 0,
      };
    case "pass":
    case "possession":
      return {
        pos: actor
          ? { x: actor.pos.x + (isHome ? 3 : -3), y: actor.pos.y }
          : { x: isHome ? 35 : 65, y: 50 },
        airborne: false,
        spinning: false,
        height: 0,
      };
    case "shot":
    case "shot_on_target":
    case "shot_blocked":
    case "penalty_miss":
      return {
        pos: {
          x: isHome ? 88 : 12,
          y: actor?.pos.y ?? 50,
        },
        airborne: true,
        spinning: true,
        height: 0.7,
      };
    case "goal":
    case "penalty_goal":
    case "own_goal":
      return {
        pos: { x: isHome ? 98 : 2, y: 50 },
        airborne: true,
        spinning: true,
        height: 0.45,
      };
    case "save":
      return {
        pos: { x: isHome ? 92 : 8, y: 48 },
        airborne: true,
        spinning: false,
        height: 0.55,
      };
    case "corner":
      return {
        pos: { x: isHome ? 96 : 4, y: e.meta?.side === "left" ? 6 : 94 },
        airborne: false,
        spinning: false,
        height: 0,
      };
    case "clearance":
      return {
        pos: { x: isHome ? 25 : 75, y: 42 },
        airborne: true,
        spinning: true,
        height: 0.85,
      };
    case "free_kick":
    case "throw_in":
      return {
        pos: { x: isHome ? 75 : 25, y: 30 },
        airborne: true,
        spinning: true,
        height: 0.75,
      };
    case "foul":
    case "tackle":
    case "interception":
      return {
        pos: actor?.pos ?? center,
        airborne: false,
        spinning: false,
        height: 0,
      };
    default:
      return {
        pos: actor?.pos ?? { x: isHome ? 40 : 60, y: 50 },
        airborne: false,
        spinning: e.type === "commentary",
        height: 0,
      };
  }
}

function nudgeToward(from: Pt, to: Pt, t: number): Pt {
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
  };
}

function lineupAt(
  lines: PlayerMatchLine[],
  events: MatchEvent[],
  teamId: string,
  upto: number,
): PlayerMatchLine[] {
  const copy = lines.map((l) => ({
    ...l,
    onPitch: l.started,
    substitutedOn: undefined as number | undefined,
    substitutedOff: undefined as number | undefined,
    redCard: false,
    injured: false,
  }));
  const byId = new Map(copy.map((l) => [l.playerId, l]));
  for (const e of events.slice(0, upto)) {
    if (e.teamId !== teamId) continue;
    if (e.type === "substitution" && e.playerId && e.relatedPlayerId) {
      const inn = byId.get(e.playerId);
      const out = byId.get(e.relatedPlayerId);
      if (out) {
        out.onPitch = false;
        out.substitutedOff = e.minute;
      }
      if (inn) {
        inn.onPitch = true;
        inn.substitutedOn = e.minute;
      }
    }
    if ((e.type === "red_card" || e.type === "second_yellow") && e.playerId) {
      const p = byId.get(e.playerId);
      if (p) {
        p.redCard = true;
        p.onPitch = false;
      }
    }
    if (e.type === "injury" && e.playerId) {
      const p = byId.get(e.playerId);
      if (p) {
        p.injured = true;
        p.onPitch = false;
      }
    }
  }
  return copy;
}

export function MatchPitch({
  match,
  eventIndex,
}: {
  match: MatchResult;
  eventIndex: number;
}) {
  const event = match.events[Math.max(0, eventIndex - 1)];
  const homeLines = useMemo(
    () => lineupAt(match.homeLineup, match.events, match.homeTeam.id, eventIndex),
    [match.homeLineup, match.events, match.homeTeam.id, eventIndex],
  );
  const awayLines = useMemo(
    () => lineupAt(match.awayLineup, match.events, match.awayTeam.id, eventIndex),
    [match.awayLineup, match.events, match.awayTeam.id, eventIndex],
  );
  const homeStones = useMemo(
    () => assignStones(match.homeTeam, homeLines, "home"),
    [match.homeTeam, homeLines],
  );
  const awayStones = useMemo(
    () => assignStones(match.awayTeam, awayLines, "away"),
    [match.awayTeam, awayLines],
  );

  // Soft movement offset based on event pressure
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase((p) => p + 1));
    return () => cancelAnimationFrame(id);
  }, [eventIndex]);

  const stones = useMemo(() => {
    const all = [...homeStones, ...awayStones];
    const isHomeAttack = event?.teamId === match.homeTeam.id;
    return all.map((s, i) => {
      const push =
        s.team === "home"
          ? isHomeAttack
            ? 2.2
            : -1.2
          : isHomeAttack
            ? -1.2
            : 2.2;
      const wobble = Math.sin((phase + i * 7) * 0.4) * 0.35;
      return {
        ...s,
        pos: {
          x: Math.max(3, Math.min(97, s.pos.x + push + wobble)),
          y: Math.max(5, Math.min(95, s.pos.y + wobble * 0.6)),
        },
      };
    });
  }, [homeStones, awayStones, event, match.homeTeam.id, phase]);

  const [ball, setBall] = useState<BallState>({
    pos: { x: 50, y: 50 },
    airborne: false,
    spinning: false,
    height: 0,
  });

  useEffect(() => {
    const target = eventBallTarget(event, match.homeTeam.id, stones);
    setBall((prev) => ({
      ...target,
      pos: nudgeToward(prev.pos, target.pos, 0.55),
    }));
    // settle remaining distance
    const t = setTimeout(() => setBall(target), 280);
    return () => clearTimeout(t);
  }, [eventIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const minute = event
    ? `${event.minute}'${event.stoppage ? `+${event.stoppage}` : ""}`
    : "0'";

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>경기장 · 바둑돌 뷰</span>
        <span className="font-mono text-zinc-300">{minute}</span>
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-inner">
        {/* Horizontal pitch: rotate vertical artwork 90deg via CSS drawing */}
        <div
          className="relative aspect-[16/10] w-full"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                #3d6b3a 0 7.14%,
                #4a7c45 7.14% 14.28%
              )
            `,
          }}
        >
          {/* Outer dark border */}
          <div className="absolute inset-0 bg-[#2f5a2c]/40" />

          {/* Pitch lines SVG */}
          <svg
            className="absolute inset-[3%] h-[94%] w-[94%]"
            viewBox="0 0 100 62"
            preserveAspectRatio="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="99"
              height="61"
              fill="none"
              stroke="#e8e4d4"
              strokeWidth="0.35"
            />
            <line x1="50" y1="0.5" x2="50" y2="61.5" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="50" cy="31" r="7.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="50" cy="31" r="0.5" fill="#e8e4d4" />
            {/* Left penalty */}
            <rect x="0.5" y="12" width="14" height="38" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="0.5" y="21" width="5" height="20" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="10" cy="31" r="0.45" fill="#e8e4d4" />
            <path d="M14.5 22.5 A 7 7 0 0 1 14.5 39.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            {/* Right penalty */}
            <rect x="85.5" y="12" width="14" height="38" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="94.5" y="21" width="5" height="20" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="90" cy="31" r="0.45" fill="#e8e4d4" />
            <path d="M85.5 22.5 A 7 7 0 0 0 85.5 39.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            {/* Goals */}
            <rect x="-1.2" y="26" width="1.7" height="10" fill="none" stroke="#e8e4d4" strokeWidth="0.35" />
            <rect x="99.5" y="26" width="1.7" height="10" fill="none" stroke="#e8e4d4" strokeWidth="0.35" />
            {/* Corners */}
            <path d="M0.5 2.5 A 2 2 0 0 1 2.5 0.5" fill="none" stroke="#e8e4d4" strokeWidth="0.25" />
            <path d="M97.5 0.5 A 2 2 0 0 1 99.5 2.5" fill="none" stroke="#e8e4d4" strokeWidth="0.25" />
            <path d="M0.5 59.5 A 2 2 0 0 0 2.5 61.5" fill="none" stroke="#e8e4d4" strokeWidth="0.25" />
            <path d="M97.5 61.5 A 2 2 0 0 0 99.5 59.5" fill="none" stroke="#e8e4d4" strokeWidth="0.25" />
          </svg>

          {/* Team labels */}
          <div className="pointer-events-none absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white">
            {match.homeTeam.name}
          </div>
          <div className="pointer-events-none absolute right-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white">
            {match.awayTeam.name}
          </div>

          {/* Players */}
          {stones.map((s) => (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
              style={{ left: `${s.pos.x}%`, top: `${s.pos.y}%` }}
              title={s.name}
            >
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md sm:h-7 sm:w-7 sm:text-[11px]",
                  "ring-2 ring-black/40",
                )}
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${s.accent}cc, ${s.color} 55%, #0a0a0a)`,
                  color: "#fff",
                  textShadow: "0 1px 1px rgba(0,0,0,.8)",
                }}
              >
                {s.number}
              </div>
            </div>
          ))}

          {/* Ball */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{
              left: `${ball.pos.x}%`,
              top: `${ball.pos.y}%`,
              zIndex: 20,
            }}
          >
            {/* shadow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-black/40 blur-[1px] transition-all duration-500"
              style={{
                width: `${10 + ball.height * 6}px`,
                height: `${4 + ball.height * 2}px`,
                transform: `translate(-50%, ${6 + ball.height * 10}px) scale(${1 + ball.height * 0.15})`,
                opacity: 0.35 + ball.height * 0.35,
              }}
            />
            <div
              className={cn(
                "relative rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#d0d0d0_40%,#222_42%,#f5f5f5_44%,#111_70%)] shadow",
                ball.spinning && "animate-[spin_0.7s_linear_infinite]",
              )}
              style={{
                width: `${12 + ball.height * 8}px`,
                height: `${12 + ball.height * 8}px`,
                transform: `translateY(${-ball.height * 12}px)`,
                boxShadow: ball.airborne
                  ? "0 8px 12px rgba(0,0,0,.35)"
                  : "0 1px 2px rgba(0,0,0,.4)",
              }}
            />
          </div>
        </div>

        {event && (
          <div className="border-t border-white/10 bg-black/50 px-3 py-1.5 text-[11px] text-zinc-300">
            <span className="font-mono text-emerald-400">{minute}</span>{" "}
            {event.text}
          </div>
        )}
      </div>
    </section>
  );
}
