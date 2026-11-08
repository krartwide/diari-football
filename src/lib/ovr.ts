import { playstyleMultiplier } from "@/data/playstyles";
import type { Player, PlayerAttributes, Position } from "@/types/football";

function clamp(n: number, min = 1, max = 99): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

/** Team OVR = average of best 11. */
export function teamAverageOvr(players: Player[]): number {
  if (!players.length) return 0;
  const top = [...players].sort((a, b) => b.ovr - a.ovr).slice(0, 11);
  return Math.round(top.reduce((s, p) => s + p.ovr, 0) / top.length);
}

/** Soft in-sim effective facets after PlayStyle / PlayStyle+ bumps. */
export function effectiveAttributes(player: Player): PlayerAttributes {
  const a = player.attributes;
  const styles = player.playstyles ?? [];
  return {
    pace: clamp(a.pace * playstyleMultiplier(styles, "pace")),
    shooting: clamp(a.shooting * playstyleMultiplier(styles, "shooting")),
    passing: clamp(a.passing * playstyleMultiplier(styles, "passing")),
    dribbling: clamp(a.dribbling * playstyleMultiplier(styles, "dribbling")),
    defending: clamp(a.defending * playstyleMultiplier(styles, "defending")),
    physical: clamp(a.physical * playstyleMultiplier(styles, "physical")),
    goalkeeping:
      a.goalkeeping != null
        ? clamp(a.goalkeeping * playstyleMultiplier(styles, "goalkeeping"))
        : undefined,
    detailed: a.detailed,
    gkDetailed: a.gkDetailed,
  };
}

export function positionGroup(pos: Position): "gk" | "def" | "mid" | "fwd" {
  if (pos === "GK") return "gk";
  if (["CB", "LB", "RB", "LWB", "RWB"].includes(pos)) return "def";
  if (["CDM", "CM", "CAM", "LM", "RM"].includes(pos)) return "mid";
  return "fwd";
}

/** Build attributes from six facets (custom team editor). */
export function attributesFromFacets(
  facets: Pick<PlayerAttributes, "pace" | "shooting" | "passing" | "dribbling" | "defending" | "physical">,
  position: Position,
  gk?: number,
): PlayerAttributes {
  const f = {
    pace: clamp(facets.pace),
    shooting: clamp(facets.shooting),
    passing: clamp(facets.passing),
    dribbling: clamp(facets.dribbling),
    defending: clamp(facets.defending),
    physical: clamp(facets.physical),
  };
  const detailed = {
    acceleration: f.pace,
    sprintSpeed: f.pace,
    positioning: f.shooting,
    finishing: f.shooting,
    shotPower: f.shooting,
    longShots: clamp(f.shooting - 2),
    volleys: clamp(f.shooting - 3),
    penalties: clamp(f.shooting - 2),
    vision: f.passing,
    crossing: clamp(f.passing - 2),
    fkAccuracy: clamp(f.passing - 4),
    shortPassing: f.passing,
    longPassing: clamp(f.passing - 2),
    curve: clamp(f.passing - 1),
    agility: f.dribbling,
    balance: clamp(f.dribbling - 2),
    reactions: f.dribbling,
    ballControl: f.dribbling,
    dribbling: f.dribbling,
    composure: clamp(f.dribbling - 1),
    interceptions: f.defending,
    headingAccuracy: clamp((f.defending + f.physical) / 2),
    defensiveAwareness: f.defending,
    standingTackle: f.defending,
    slidingTackle: clamp(f.defending - 2),
    jumping: clamp(f.physical + 2),
    stamina: f.physical,
    strength: f.physical,
    aggression: clamp(f.physical - 4),
  };
  const out: PlayerAttributes = { ...f, detailed };
  if (position === "GK") {
    const g = clamp(gk ?? Math.round((f.defending + f.physical + f.passing) / 3));
    out.goalkeeping = g;
    out.gkDetailed = {
      diving: g,
      handling: clamp(g - 1),
      kicking: clamp(f.passing),
      reflexes: clamp(g + 1),
      speed: f.pace,
      positioning: g,
    };
  }
  return out;
}

export function estimateOvrFromAttributes(
  attrs: PlayerAttributes,
  position: Position,
): number {
  const weights: Record<string, Partial<Record<"pace" | "shooting" | "passing" | "dribbling" | "defending" | "physical", number>>> = {
    fwd: { pace: 0.2, shooting: 0.3, passing: 0.1, dribbling: 0.25, defending: 0.05, physical: 0.1 },
    mid: { pace: 0.12, shooting: 0.15, passing: 0.28, dribbling: 0.22, defending: 0.13, physical: 0.1 },
    def: { pace: 0.12, shooting: 0.05, passing: 0.12, dribbling: 0.1, defending: 0.4, physical: 0.21 },
    gk: { pace: 0.1, shooting: 0.05, passing: 0.15, dribbling: 0.1, defending: 0.2, physical: 0.15 },
  };
  const g = positionGroup(position);
  const w = weights[g]!;
  let sum = 0;
  let tw = 0;
  (Object.keys(w) as Array<"pace" | "shooting" | "passing" | "dribbling" | "defending" | "physical">).forEach((k) => {
    const weight = w[k] ?? 0;
    sum += attrs[k] * weight;
    tw += weight;
  });
  if (position === "GK" && attrs.goalkeeping != null) {
    return clamp(attrs.goalkeeping * 0.7 + (sum / tw) * 0.3);
  }
  return clamp(sum / tw);
}

/** @deprecated compatibility shim during editor migration */
export type PartialPlayer = Partial<Player> & {
  name: string;
  nameEn: string;
  number: number;
  position: Position;
  age: number;
  club: string;
  attributes?: PlayerAttributes;
  ovr?: number;
};

export function enrichPlayer(
  partial: PartialPlayer,
  _ctx?: { tier?: string; variance?: number; club?: string },
): Player {
  const attrs =
    partial.attributes ??
    attributesFromFacets(
      {
        pace: 70,
        shooting: 70,
        passing: 70,
        dribbling: 70,
        defending: 70,
        physical: 70,
      },
      partial.position,
    );
  const ovr = partial.ovr ?? estimateOvrFromAttributes(attrs, partial.position);
  return {
    id: partial.id ?? `p-${partial.number}-${partial.nameEn}`,
    name: partial.name,
    nameEn: partial.nameEn,
    number: partial.number,
    position: partial.position,
    age: partial.age,
    club: partial.club,
    height: partial.height ?? 180,
    preferredFoot: partial.preferredFoot ?? "R",
    attributes: attrs,
    ovr,
    playstyles: partial.playstyles ?? [],
    isCaptain: partial.isCaptain,
    eaId: partial.eaId,
    weakFoot: partial.weakFoot,
    skillMoves: partial.skillMoves,
  };
}
