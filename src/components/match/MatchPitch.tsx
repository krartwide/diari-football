"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getFormation } from "@/data/formations";
import { isMajorEvent } from "@/lib/match-events";
import type { MatchEvent, MatchResult, PlayerMatchLine, Team } from "@/types/football";
import { cn } from "@/lib/utils";

type Pt = { x: number; y: number };

type Stone = {
  id: string;
  number: number;
  name: string;
  team: "home" | "away";
  color: string;
  accent: string;
  base: Pt;
  role: string;
};

type BallState = {
  pos: Pt;
  airborne: boolean;
  spinning: boolean;
  height: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function dist(a: Pt, b: Pt) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function formationBase(team: Team, side: "home" | "away", role: string, indexInRole: number, roleCount: number): Pt {
  const formation = getFormation(team.tactics.formation) ?? getFormation("4-3-3")!;
  const slots = formation.slots.filter((s) => s.position === role);
  const slot = slots[Math.min(indexInRole, Math.max(0, slots.length - 1))] ?? formation.slots[0]!;
  // If multiple same role without enough slots, spread by index
  const laneJitter = roleCount > 1 && slots.length <= 1 ? (indexInRole + 1) / (roleCount + 1) : slot.x;
  const depth = slot.y;
  if (side === "home") {
    return { x: 7 + depth * 38, y: 10 + laneJitter * 80 };
  }
  return { x: 93 - depth * 38, y: 10 + (1 - laneJitter) * 80 };
}

function assignStones(team: Team, lines: PlayerMatchLine[], side: "home" | "away"): Stone[] {
  const on = lines.filter((l) => l.onPitch && !l.redCard).slice(0, 11);
  const roleCounts = new Map<string, number>();
  const roleIndex = new Map<string, number>();
  for (const l of on) roleCounts.set(l.position, (roleCounts.get(l.position) ?? 0) + 1);

  return on.map((l) => {
    const idx = roleIndex.get(l.position) ?? 0;
    roleIndex.set(l.position, idx + 1);
    const base = formationBase(team, side, l.position, idx, roleCounts.get(l.position) ?? 1);
    return {
      id: l.playerId,
      number: l.number,
      name: l.name,
      team: side,
      color: team.colors.primary,
      accent: team.colors.secondary,
      base,
      role: l.position,
    };
  });
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

/** Target positions for each stone given the current event + ball. */
function computeTargets(
  stones: Stone[],
  event: MatchEvent | undefined,
  homeId: string,
  ball: Pt,
  t: number,
): Map<string, Pt> {
  const out = new Map<string, Pt>();
  const isHomeAttack = !event || event.teamId === homeId;
  const actorId = event?.playerId;
  const assistId = event?.assistId;

  for (const s of stones) {
    const attacking = (s.team === "home") === isHomeAttack;
    const h = hashId(s.id);
    const breathX = Math.sin(t * 0.0011 + h) * 0.9;
    const breathY = Math.cos(t * 0.0009 + h * 0.3) * 0.7;

    let x = s.base.x;
    let y = s.base.y;

    // Team shape shift with possession
    if (s.role !== "GK") {
      x += attacking ? (s.team === "home" ? 6 : -6) : s.team === "home" ? -3 : 3;
    }

    // GK shadows ball on their line
    if (s.role === "GK") {
      y = lerp(s.base.y, clamp(ball.y, 28, 72), 0.45);
      x = s.team === "home" ? 5 : 95;
    }

    // Ball carrier / actor runs with/to the ball
    if (actorId && s.id === actorId) {
      if (event && ["dribble", "possession", "pass"].includes(event.type)) {
        x = lerp(s.base.x, ball.x + (s.team === "home" ? -2 : 2), 0.85);
        y = lerp(s.base.y, ball.y, 0.85);
      } else if (event && ["shot", "shot_on_target", "goal", "penalty_goal", "penalty_miss"].includes(event.type)) {
        const boxX = s.team === "home" ? 82 : 18;
        x = lerp(s.base.x, boxX, 0.7);
        y = lerp(s.base.y, clamp(ball.y, 30, 70), 0.6);
      } else {
        x = lerp(s.base.x, ball.x, 0.5);
        y = lerp(s.base.y, ball.y, 0.5);
      }
    }

    // Assister supports
    if (assistId && s.id === assistId) {
      x = lerp(s.base.x, ball.x + (s.team === "home" ? -8 : 8), 0.55);
      y = lerp(s.base.y, ball.y + ((h % 2) * 2 - 1) * 8, 0.5);
    }

    // Nearby teammates offer passing lanes / press
    const dBall = dist(s.base, ball);
    if (s.role !== "GK" && s.id !== actorId) {
      if (attacking && dBall < 35) {
        // support run toward ball-side channel
        const sideOff = ((h % 5) - 2) * 3.5;
        x = lerp(x, ball.x + (s.team === "home" ? -5 : 5), 0.25);
        y = lerp(y, clamp(ball.y + sideOff, 8, 92), 0.3);
      } else if (!attacking && dBall < 40) {
        // defensive press / mark
        x = lerp(x, ball.x + (s.team === "home" ? -4 : 4), 0.35);
        y = lerp(y, clamp(ball.y + ((h % 3) - 1) * 4, 10, 90), 0.4);
      }
    }

    // Forwards make runs on attack events
    if (
      attacking &&
      ["ST", "CF", "LW", "RW"].includes(s.role) &&
      event &&
      ["pass", "dribble", "shot", "goal", "penalty_goal", "corner"].includes(event.type)
    ) {
      x += s.team === "home" ? 4 : -4;
    }

    out.set(s.id, {
      x: clamp(x + breathX, 3, 97),
      y: clamp(y + breathY, 5, 95),
    });
  }
  return out;
}

function ballPlan(
  e: MatchEvent | undefined,
  homeId: string,
  stones: Stone[],
  prev: Pt,
): { keyframes: Array<BallState & { wait: number }> } {
  const center = { x: 50, y: 50 };
  if (!e) {
    return { keyframes: [{ pos: center, airborne: false, spinning: false, height: 0, wait: 0 }] };
  }
  const isHome = e.teamId === homeId;
  const actor = stones.find((s) => s.id === e.playerId);
  const goalX = isHome ? 98.5 : 1.5;
  const boxX = isHome ? 86 : 14;

  const atActor = actor?.base ?? { x: isHome ? 55 : 45, y: 50 };

  switch (e.type) {
    case "kickoff":
    case "second_half":
      return {
        keyframes: [
          { pos: center, airborne: false, spinning: false, height: 0, wait: 0 },
          { pos: { x: center.x + (isHome ? 4 : -4), y: center.y }, airborne: false, spinning: true, height: 0, wait: 400 },
        ],
      };
    case "goal":
    case "penalty_goal":
    case "own_goal": {
      const g = e.graphic?.goal;
      const start = actor
        ? { x: lerp(actor.base.x, boxX, 0.55), y: actor.base.y }
        : g
          ? { x: isHome ? g.shotFrom.x * 0.9 : 100 - g.shotFrom.x * 0.9, y: g.shotFrom.y }
          : { x: boxX, y: 50 };
      const entryY = g ? clamp(g.goalEntry.x, 32, 68) : 50;
      const isHeader = g?.bodyPart === "head";
      return {
        keyframes: [
          { pos: start, airborne: isHeader, spinning: true, height: isHeader ? 0.55 : 0.15, wait: 0 },
          {
            pos: { x: lerp(start.x, goalX, 0.55), y: lerp(start.y, entryY, 0.5) },
            airborne: true,
            spinning: true,
            height: isHeader ? 0.85 : 0.65,
            wait: 380,
          },
          {
            pos: { x: goalX, y: entryY },
            airborne: true,
            spinning: true,
            height: isHeader ? 0.7 : 0.4,
            wait: 520,
          },
          {
            pos: { x: goalX, y: entryY },
            airborne: false,
            spinning: false,
            height: 0.05,
            wait: 350,
          },
        ],
      };
    }
    case "shot":
    case "shot_on_target":
    case "penalty_miss": {
      const start = actor ? { x: lerp(actor.base.x, boxX, 0.4), y: actor.base.y } : prev;
      return {
        keyframes: [
          { pos: start, airborne: false, spinning: true, height: 0.1, wait: 0 },
          {
            pos: { x: lerp(start.x, goalX, 0.7), y: lerp(start.y, 50, 0.4) },
            airborne: true,
            spinning: true,
            height: 0.7,
            wait: 450,
          },
        ],
      };
    }
    case "save":
      return {
        keyframes: [
          {
            pos: { x: isHome ? 93 : 7, y: 48 },
            airborne: true,
            spinning: false,
            height: 0.55,
            wait: 0,
          },
          {
            pos: { x: isHome ? 88 : 12, y: 40 },
            airborne: false,
            spinning: false,
            height: 0,
            wait: 400,
          },
        ],
      };
    case "dribble":
      return {
        keyframes: [
          {
            pos: { x: atActor.x + (isHome ? 5 : -5), y: atActor.y + 2 },
            airborne: false,
            spinning: true,
            height: 0,
            wait: 0,
          },
          {
            pos: { x: atActor.x + (isHome ? 10 : -10), y: atActor.y - 1 },
            airborne: false,
            spinning: true,
            height: 0,
            wait: 500,
          },
        ],
      };
    case "pass":
    case "possession":
      return {
        keyframes: [
          {
            pos: { x: atActor.x + (isHome ? 2 : -2), y: atActor.y },
            airborne: false,
            spinning: false,
            height: 0,
            wait: 0,
          },
        ],
      };
    case "clearance":
    case "corner":
    case "free_kick":
      return {
        keyframes: [
          {
            pos: atActor,
            airborne: true,
            spinning: true,
            height: 0.8,
            wait: 0,
          },
          {
            pos: { x: isHome ? 60 : 40, y: 30 + (hashId(e.id) % 40) },
            airborne: true,
            spinning: true,
            height: 0.5,
            wait: 420,
          },
        ],
      };
    default:
      return {
        keyframes: [
          {
            pos: actor ? { x: actor.base.x, y: actor.base.y } : prev,
            airborne: false,
            spinning: false,
            height: 0,
            wait: 0,
          },
        ],
      };
  }
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
  const stones = useMemo(() => {
    return [
      ...assignStones(match.homeTeam, homeLines, "home"),
      ...assignStones(match.awayTeam, awayLines, "away"),
    ];
  }, [match.homeTeam, match.awayTeam, homeLines, awayLines]);

  const [ball, setBall] = useState<BallState>({
    pos: { x: 50, y: 50 },
    airborne: false,
    spinning: false,
    height: 0,
  });
  const [stonePos, setStonePos] = useState<Map<string, Pt>>(() => new Map());
  const ballRef = useRef(ball);
  ballRef.current = ball;
  const animRef = useRef(0);

  // Ball keyframe animation per event
  useEffect(() => {
    const plan = ballPlan(event, match.homeTeam.id, stones, ballRef.current.pos);
    let cancelled = false;
    let i = 0;

    const run = () => {
      if (cancelled || i >= plan.keyframes.length) return;
      const frame = plan.keyframes[i]!;
      setBall({
        pos: frame.pos,
        airborne: frame.airborne,
        spinning: frame.spinning,
        height: frame.height,
      });
      i += 1;
      if (i < plan.keyframes.length) {
        const next = plan.keyframes[i]!;
        window.setTimeout(run, Math.max(120, next.wait || 350));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [eventIndex, match.homeTeam.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Continuous player movement toward computed targets
  useEffect(() => {
    let alive = true;
    const start = performance.now();
    const tick = (now: number) => {
      if (!alive) return;
      animRef.current = now;
      const targets = computeTargets(
        stones,
        event,
        match.homeTeam.id,
        ballRef.current.pos,
        now - start + eventIndex * 1000,
      );
      setStonePos((prev) => {
        const next = new Map<string, Pt>();
        for (const s of stones) {
          const target = targets.get(s.id) ?? s.base;
          const cur = prev.get(s.id) ?? s.base;
          // Major events: move more decisively; filler: gentler
          const speed = event && isMajorEvent(event.type) ? 0.18 : 0.1;
          next.set(s.id, lerpPt(cur, target, speed));
        }
        return next;
      });
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(id);
    };
  }, [stones, event, match.homeTeam.id, eventIndex]);

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
          <div className="absolute inset-0 bg-[#2f5a2c]/40" />

          <svg
            className="absolute inset-[3%] h-[94%] w-[94%]"
            viewBox="0 0 100 62"
            preserveAspectRatio="none"
          >
            <rect x="0.5" y="0.5" width="99" height="61" fill="none" stroke="#e8e4d4" strokeWidth="0.35" />
            <line x1="50" y1="0.5" x2="50" y2="61.5" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="50" cy="31" r="7.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="50" cy="31" r="0.5" fill="#e8e4d4" />
            <rect x="0.5" y="12" width="14" height="38" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="0.5" y="21" width="5" height="20" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="10" cy="31" r="0.45" fill="#e8e4d4" />
            <path d="M14.5 22.5 A 7 7 0 0 1 14.5 39.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="85.5" y="12" width="14" height="38" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="94.5" y="21" width="5" height="20" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <circle cx="90" cy="31" r="0.45" fill="#e8e4d4" />
            <path d="M85.5 22.5 A 7 7 0 0 0 85.5 39.5" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="-1.2" y="26" width="1.7" height="10" fill="none" stroke="#e8e4d4" strokeWidth="0.35" />
            <rect x="99.5" y="26" width="1.7" height="10" fill="none" stroke="#e8e4d4" strokeWidth="0.35" />
          </svg>

          <div className="pointer-events-none absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white">
            {match.homeTeam.name}
          </div>
          <div className="pointer-events-none absolute right-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white">
            {match.awayTeam.name}
          </div>

          {stones.map((s) => {
            const p = stonePos.get(s.id) ?? s.base;
            return (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transition: "left 0.35s linear, top 0.35s linear",
                }}
                title={`${s.number}. ${s.name}`}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md sm:h-7 sm:w-7 sm:text-[11px]",
                    "ring-2 ring-black/40",
                    event?.playerId === s.id && "ring-amber-300 scale-110",
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
            );
          })}

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{
              left: `${ball.pos.x}%`,
              top: `${ball.pos.y}%`,
              zIndex: 20,
              transition: "left 0.45s ease-out, top 0.45s ease-out",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-black/40 blur-[1px] transition-all duration-300"
              style={{
                width: `${10 + ball.height * 6}px`,
                height: `${4 + ball.height * 2}px`,
                transform: `translate(-50%, ${6 + ball.height * 10}px)`,
                opacity: 0.35 + ball.height * 0.35,
              }}
            />
            <div
              className={cn(
                "relative rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#d0d0d0_40%,#222_42%,#f5f5f5_44%,#111_70%)]",
                ball.spinning && "animate-[spin_0.65s_linear_infinite]",
              )}
              style={{
                width: `${12 + ball.height * 8}px`,
                height: `${12 + ball.height * 8}px`,
                transform: `translateY(${-ball.height * 14}px)`,
                boxShadow: ball.airborne
                  ? "0 10px 14px rgba(0,0,0,.4)"
                  : "0 1px 2px rgba(0,0,0,.4)",
              }}
            />
          </div>
        </div>

        {event && (
          <div className="border-t border-white/10 bg-black/50 px-3 py-1.5 text-[11px] text-zinc-300">
            <span className="font-mono text-emerald-400">{minute}</span> {event.text}
          </div>
        )}
      </div>
    </section>
  );
}
