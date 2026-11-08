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

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function formationBase(
  team: Team,
  side: "home" | "away",
  role: string,
  indexInRole: number,
  roleCount: number,
): Pt {
  const formation = getFormation(team.tactics.formation) ?? getFormation("4-3-3")!;
  const slots = formation.slots.filter((s) => s.position === role);
  const slot =
    slots[Math.min(indexInRole, Math.max(0, slots.length - 1))] ?? formation.slots[0]!;
  const laneJitter =
    roleCount > 1 && slots.length <= 1 ? (indexInRole + 1) / (roleCount + 1) : slot.x;
  const depth = slot.y;
  if (side === "home") {
    return { x: 8 + depth * 36, y: 12 + laneJitter * 76 };
  }
  return { x: 92 - depth * 36, y: 12 + (1 - laneJitter) * 76 };
}

function assignStones(team: Team, lines: PlayerMatchLine[], side: "home" | "away"): Stone[] {
  const on = lines.filter((l) => l.onPitch && !l.redCard).slice(0, 11);
  const roleCounts = new Map<string, number>();
  const roleIndex = new Map<string, number>();
  for (const l of on) roleCounts.set(l.position, (roleCounts.get(l.position) ?? 0) + 1);

  return on.map((l) => {
    const idx = roleIndex.get(l.position) ?? 0;
    roleIndex.set(l.position, idx + 1);
    return {
      id: l.playerId,
      number: l.number,
      name: l.name,
      team: side,
      color: team.colors.primary,
      accent: team.colors.secondary,
      base: formationBase(team, side, l.position, idx, roleCounts.get(l.position) ?? 1),
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

/**
 * Big, readable movement targets — percentages of the pitch so shifts are obvious.
 */
function targetsForEvent(
  stones: Stone[],
  event: MatchEvent | undefined,
  homeId: string,
  ball: Pt,
  tick: number,
): Map<string, Pt> {
  const map = new Map<string, Pt>();
  const isHomeBall = !event || event.teamId === homeId;
  const actorId = event?.playerId;
  const assistId = event?.assistId;
  const major = event ? isMajorEvent(event.type) : false;

  // Ball focus zone pulls the whole pitch
  const focusX = ball.x;
  const focusY = ball.y;

  for (const s of stones) {
    const h = hashId(s.id + String(event?.id ?? ""));
    const phase = tick * 0.002 + h * 0.01;
    const roamX = Math.sin(phase) * (major ? 2.5 : 3.5);
    const roamY = Math.cos(phase * 1.3) * (major ? 2.2 : 3.2);

    const attacking = (s.team === "home") === isHomeBall;
    const dir = s.team === "home" ? 1 : -1;

    let x = s.base.x;
    let y = s.base.y;

    // 1) Whole team shifts with possession — large push
    if (s.role === "GK") {
      x = s.team === "home" ? 4.5 : 95.5;
      y = lerp(s.base.y, clamp(focusY, 22, 78), 0.65);
    } else if (["CB", "LB", "RB", "LWB", "RWB"].includes(s.role)) {
      x = s.base.x + dir * (attacking ? 10 : -6);
      y = lerp(s.base.y, clamp(focusY + ((h % 5) - 2) * 5, 10, 90), attacking ? 0.25 : 0.45);
    } else if (["CDM", "CM", "CAM"].includes(s.role)) {
      x = s.base.x + dir * (attacking ? 14 : -5);
      y = lerp(s.base.y, clamp(focusY + ((h % 7) - 3) * 4, 8, 92), 0.4);
    } else if (["LM", "RM", "LW", "RW"].includes(s.role)) {
      x = s.base.x + dir * (attacking ? 16 : -4);
      y = lerp(s.base.y, clamp(focusY + (s.role.startsWith("L") || s.role === "LW" ? -12 : 12), 8, 92), 0.35);
    } else {
      // ST / CF
      x = s.base.x + dir * (attacking ? 18 : -3);
      y = lerp(s.base.y, clamp(focusY + ((h % 3) - 1) * 8, 18, 82), 0.35);
    }

    // 2) Compress toward the ball (everyone except far GK)
    if (s.role !== "GK") {
      const pull = attacking ? 0.28 : 0.42;
      x = lerp(x, focusX + dir * -6, pull);
      y = lerp(y, focusY, pull * 0.7);
    }

    // 3) Event actor — sprint to / with the ball
    if (actorId && s.id === actorId) {
      if (event && ["dribble", "possession", "pass", "tackle", "interception"].includes(event.type)) {
        x = focusX + dir * -3;
        y = focusY;
      } else if (
        event &&
        ["shot", "shot_on_target", "goal", "penalty_goal", "penalty_miss", "shot_blocked"].includes(
          event.type,
        )
      ) {
        x = s.team === "home" ? 84 : 16;
        y = clamp(focusY, 28, 72);
      } else if (event && ["corner", "free_kick"].includes(event.type)) {
        x = focusX;
        y = focusY;
      } else {
        x = lerp(s.base.x, focusX, 0.75);
        y = lerp(s.base.y, focusY, 0.75);
      }
    }

    // 4) Assister / support runner
    if (assistId && s.id === assistId) {
      x = focusX + dir * -10;
      y = clamp(focusY + ((h % 2) * 2 - 1) * 14, 12, 88);
    }

    // 5) Closest defenders mark hard
    if (!attacking && s.role !== "GK" && s.id !== actorId) {
      const dx = s.base.x - focusX;
      const dy = s.base.y - focusY;
      const d = Math.hypot(dx, dy);
      if (d < 45) {
        x = lerp(x, focusX + dir * -5, 0.55);
        y = lerp(y, focusY + ((h % 3) - 1) * 6, 0.55);
      }
    }

    // 6) Forwards make diagonal runs on attack
    if (
      attacking &&
      ["ST", "CF", "LW", "RW"].includes(s.role) &&
      event &&
      ["pass", "dribble", "shot", "goal", "penalty_goal", "corner", "cross"].includes(event.type)
    ) {
      x += dir * 8;
      y += ((h % 2) * 2 - 1) * 6;
    }

    map.set(s.id, {
      x: clamp(x + roamX, 2.5, 97.5),
      y: clamp(y + roamY, 5, 95),
    });
  }
  return map;
}

function ballPlan(
  e: MatchEvent | undefined,
  homeId: string,
  stones: Stone[],
  prev: Pt,
): Array<BallState & { wait: number }> {
  const center = { x: 50, y: 50 };
  if (!e) return [{ pos: center, airborne: false, spinning: false, height: 0, wait: 0 }];

  const isHome = e.teamId === homeId;
  const actor = stones.find((s) => s.id === e.playerId);
  const goalX = isHome ? 98.5 : 1.5;
  const boxX = isHome ? 86 : 14;
  const at = actor?.base ?? { x: isHome ? 55 : 45, y: 50 };

  switch (e.type) {
    case "kickoff":
    case "second_half":
      return [
        { pos: center, airborne: false, spinning: false, height: 0, wait: 0 },
        {
          pos: { x: center.x + (isHome ? 6 : -6), y: center.y + 2 },
          airborne: false,
          spinning: true,
          height: 0,
          wait: 500,
        },
      ];
    case "goal":
    case "penalty_goal":
    case "own_goal": {
      const g = e.graphic?.goal;
      const start = {
        x: actor ? lerp(actor.base.x, boxX, 0.6) : boxX,
        y: actor?.base.y ?? 50,
      };
      const entryY = g ? clamp(g.goalEntry.x, 34, 66) : 50;
      const header = g?.bodyPart === "head";
      return [
        { pos: start, airborne: header, spinning: true, height: header ? 0.55 : 0.2, wait: 0 },
        {
          pos: { x: lerp(start.x, goalX, 0.55), y: lerp(start.y, entryY, 0.5) },
          airborne: true,
          spinning: true,
          height: header ? 0.9 : 0.7,
          wait: 420,
        },
        { pos: { x: goalX, y: entryY }, airborne: true, spinning: true, height: 0.55, wait: 520 },
        { pos: { x: goalX, y: entryY }, airborne: false, spinning: false, height: 0.05, wait: 280 },
      ];
    }
    case "shot":
    case "shot_on_target":
    case "penalty_miss":
    case "shot_blocked":
      return [
        {
          pos: { x: lerp(at.x, boxX, 0.45), y: at.y },
          airborne: false,
          spinning: true,
          height: 0.15,
          wait: 0,
        },
        {
          pos: { x: lerp(boxX, goalX, 0.55), y: lerp(at.y, 50, 0.4) },
          airborne: true,
          spinning: true,
          height: 0.75,
          wait: 480,
        },
      ];
    case "save":
      return [
        { pos: { x: isHome ? 93 : 7, y: 48 }, airborne: true, spinning: false, height: 0.6, wait: 0 },
        { pos: { x: isHome ? 86 : 14, y: 38 }, airborne: false, spinning: false, height: 0, wait: 400 },
      ];
    case "dribble":
      return [
        {
          pos: { x: at.x + (isHome ? 4 : -4), y: at.y },
          airborne: false,
          spinning: true,
          height: 0,
          wait: 0,
        },
        {
          pos: { x: at.x + (isHome ? 12 : -12), y: at.y + ((hashId(e.id) % 5) - 2) * 3 },
          airborne: false,
          spinning: true,
          height: 0,
          wait: 550,
        },
      ];
    case "pass":
    case "possession":
      return [
        {
          pos: { x: at.x + (isHome ? 3 : -3), y: at.y },
          airborne: false,
          spinning: true,
          height: 0,
          wait: 0,
        },
        {
          pos: {
            x: at.x + (isHome ? 14 : -14),
            y: clamp(at.y + ((hashId(e.id) % 7) - 3) * 5, 15, 85),
          },
          airborne: false,
          spinning: false,
          height: 0,
          wait: 400,
        },
      ];
    case "clearance":
    case "corner":
    case "free_kick":
      return [
        { pos: at, airborne: true, spinning: true, height: 0.85, wait: 0 },
        {
          pos: { x: isHome ? 58 : 42, y: 25 + (hashId(e.id) % 50) },
          airborne: true,
          spinning: true,
          height: 0.45,
          wait: 450,
        },
      ];
    default:
      return [
        {
          pos: actor ? { x: actor.base.x + (isHome ? 4 : -4), y: actor.base.y } : prev,
          airborne: false,
          spinning: false,
          height: 0,
          wait: 0,
        },
      ];
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
  const stones = useMemo(
    () => [
      ...assignStones(match.homeTeam, homeLines, "home"),
      ...assignStones(match.awayTeam, awayLines, "away"),
    ],
    [match.homeTeam, match.awayTeam, homeLines, awayLines],
  );

  const [ball, setBall] = useState<BallState>({
    pos: { x: 50, y: 50 },
    airborne: false,
    spinning: false,
    height: 0,
  });
  const [stonePos, setStonePos] = useState<Record<string, Pt>>({});
  const [tick, setTick] = useState(0);
  const ballRef = useRef(ball);
  ballRef.current = ball;
  const stoneRef = useRef(stonePos);
  stoneRef.current = stonePos;

  // Ball keyframes
  useEffect(() => {
    const frames = ballPlan(event, match.homeTeam.id, stones, ballRef.current.pos);
    let cancelled = false;
    let i = 0;
    const run = () => {
      if (cancelled || i >= frames.length) return;
      const frame = frames[i]!;
      setBall({
        pos: frame.pos,
        airborne: frame.airborne,
        spinning: frame.spinning,
        height: frame.height,
      });
      i += 1;
      if (i < frames.length) {
        window.setTimeout(run, Math.max(140, frames[i]!.wait || 350));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [eventIndex, match.homeTeam.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // When event changes, snap stones toward bold new targets immediately
  useEffect(() => {
    const targets = targetsForEvent(
      stones,
      event,
      match.homeTeam.id,
      ballRef.current.pos,
      eventIndex * 900,
    );
    setStonePos((prev) => {
      const next: Record<string, Pt> = { ...prev };
      for (const s of stones) {
        const t = targets.get(s.id) ?? s.base;
        const cur = prev[s.id] ?? s.base;
        // Jump most of the way so motion is obvious even on short filler beats
        next[s.id] = {
          x: lerp(cur.x, t.x, 0.72),
          y: lerp(cur.y, t.y, 0.72),
        };
      }
      return next;
    });
  }, [eventIndex, stones, event, match.homeTeam.id]);

  // Continuous chase + idle roam
  useEffect(() => {
    let alive = true;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTick((t) => t + 1);
      const targets = targetsForEvent(
        stones,
        event,
        match.homeTeam.id,
        ballRef.current.pos,
        now,
      );
      setStonePos((prev) => {
        const next: Record<string, Pt> = {};
        const follow = event && isMajorEvent(event.type) ? 3.8 : 2.6; // % per second factor
        for (const s of stones) {
          const t = targets.get(s.id) ?? s.base;
          const cur = prev[s.id] ?? s.base;
          const k = 1 - Math.exp(-follow * dt * 60 * 0.016);
          next[s.id] = {
            x: lerp(cur.x, t.x, clamp(k * 8, 0.08, 0.35)),
            y: lerp(cur.y, t.y, clamp(k * 8, 0.08, 0.35)),
          };
        }
        return next;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [stones, event, match.homeTeam.id, eventIndex]);

  const minute = event
    ? `${event.minute}'${event.stoppage ? `+${event.stoppage}` : ""}`
    : "0'";
  const moveMs = event && isMajorEvent(event.type) ? 700 : 280;

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
            <rect x="85.5" y="12" width="14" height="38" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
            <rect x="94.5" y="21" width="5" height="20" fill="none" stroke="#e8e4d4" strokeWidth="0.3" />
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
            const p = stonePos[s.id] ?? s.base;
            const active = event?.playerId === s.id;
            return (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transition: `left ${moveMs}ms ease-out, top ${moveMs}ms ease-out`,
                  zIndex: active ? 15 : 5,
                }}
                title={`${s.number}. ${s.name}`}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md sm:h-7 sm:w-7 sm:text-[11px]",
                    "ring-2 ring-black/50",
                    active && "scale-125 ring-amber-300",
                  )}
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${s.accent}cc, ${s.color} 55%, #0a0a0a)`,
                    color: "#fff",
                    textShadow: "0 1px 1px rgba(0,0,0,.8)",
                    transform: active ? undefined : `translateY(${Math.sin(tick * 0.08 + hashId(s.id)) * 1}px)`,
                  }}
                >
                  {s.number}
                </div>
              </div>
            );
          })}

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
            style={{
              left: `${ball.pos.x}%`,
              top: `${ball.pos.y}%`,
              zIndex: 20,
              transition: "left 0.4s ease-out, top 0.4s ease-out",
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
