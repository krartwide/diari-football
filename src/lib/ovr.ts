import { clubBaseOvr } from "@/data/ratings/clubs";
import type {
  Player,
  PlayerAttributes,
  PlayerSeasonStats,
  Position,
} from "@/types/football";

function clamp(n: number, min = 1, max = 99): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function per90(value: number, appearances: number): number {
  if (appearances <= 0) return 0;
  return (value / Math.max(appearances, 1)) * 90;
}

function rate(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}

const FWD_POS: Position[] = ["LW", "RW", "CF", "ST"];
const MID_POS: Position[] = ["CDM", "CM", "CAM", "LM", "RM"];

export type PlayerTier = "worldClass" | "star" | "solid" | "fringe" | "youth";

function ageFactor(age: number): number {
  if (age <= 18) return 0.9;
  if (age <= 21) return 0.95;
  if (age <= 24) return 0.99;
  if (age <= 29) return 1;
  if (age <= 32) return 0.97;
  if (age <= 35) return 0.93;
  if (age <= 38) return 0.88;
  return 0.84;
}

function tierOffset(tier: PlayerTier): number {
  switch (tier) {
    case "worldClass":
      return 4;
    case "star":
      return 2;
    case "solid":
      return 0;
    case "fringe":
      return -4;
    case "youth":
      return -7;
  }
}

/** Tiny performance nudge from season lines (±2). Never dominates skill. */
function statsNudge(stats: PlayerSeasonStats, position: Position): number {
  const apps = Math.max(stats.appearances, 1);
  const g90 = per90(stats.goals, apps);
  const a90 = per90(stats.assists, apps);
  let score = 0;
  if (position === "GK") {
    const cs = stats.cleanSheets ?? 0;
    const saves = stats.saves ?? 0;
    const gc = Math.max(stats.goalsConceded ?? 1, 1);
    score = (cs / apps) * 2 + rate(saves, saves + gc) * 0.015 - 1.5;
  } else if (FWD_POS.includes(position)) {
    score = g90 * 0.7 + a90 * 0.4;
  } else if (MID_POS.includes(position)) {
    score = a90 * 0.5 + g90 * 0.3 + (stats.passAccuracy - 78) * 0.03;
  } else {
    score =
      per90(stats.interceptions, apps) * 0.12 +
      per90(stats.tacklesWon, apps) * 0.1 +
      (stats.passAccuracy - 75) * 0.03;
  }
  return Math.max(-2, Math.min(2, score));
}

export interface QualityContext {
  /** @deprecated ignored — skill is club + official rating based */
  fifaRank?: number;
  tier?: PlayerTier;
  variance?: number;
  ovrOverride?: number;
  club?: string;
}

/**
 * Skill target from club level + role tier + age. FIFA rank is NOT used.
 */
export function computeTargetOvr(
  position: Position,
  age: number,
  stats: PlayerSeasonStats,
  ctx: QualityContext = {},
): number {
  if (ctx.ovrOverride != null) return clamp(ctx.ovrOverride, 45, 93);

  const club = ctx.club ?? "";
  const base = clubBaseOvr(club);
  const tier = ctx.tier ?? "solid";
  const target =
    base + tierOffset(tier) + (ctx.variance ?? 0) + statsNudge(stats, position);

  // Bench / fringe at elite clubs still stronger than starters at amateur clubs
  return clamp(target * ageFactor(age), 48, 90);
}

export function computePlayerAttributes(
  stats: PlayerSeasonStats,
  position: Position,
  age: number,
  ctx: QualityContext = {},
): PlayerAttributes {
  const target = computeTargetOvr(position, age, stats, ctx);
  const af = ageFactor(age);
  const drib = stats.dribbleSuccessRate;
  const pass = stats.passAccuracy;

  let pace = target;
  let shooting = target;
  let passing = target;
  let dribbling = target;
  let defending = target;
  let physical = target;
  let goalkeeping: number | undefined;

  if (position === "GK") {
    goalkeeping = target + 2;
    pace = target - 18;
    shooting = target - 28;
    passing = target - 8;
    dribbling = target - 22;
    defending = target - 16;
    physical = target - 2;
  } else if (position === "CB") {
    defending = target + 4;
    physical = target + 3;
    pace = target - 10;
    shooting = target - 18;
    dribbling = target - 10;
    passing = target - 4;
  } else if (position === "LB" || position === "RB") {
    pace = target + 2;
    defending = target + 1;
    passing = target;
    dribbling = target - 2;
    physical = target - 1;
    shooting = target - 12;
  } else if (position === "LWB" || position === "RWB") {
    pace = target + 3;
    dribbling = target + 1;
    passing = target + 1;
    defending = target - 2;
    shooting = target - 8;
    physical = target - 2;
  } else if (position === "CDM") {
    defending = target + 3;
    passing = target + 2;
    physical = target + 2;
    dribbling = target - 3;
    shooting = target - 8;
    pace = target - 4;
  } else if (position === "CM") {
    passing = target + 3;
    dribbling = target + 1;
    defending = target - 1;
    physical = target;
    pace = target - 2;
    shooting = target - 4;
  } else if (position === "CAM") {
    passing = target + 3;
    dribbling = target + 3;
    shooting = target + 1;
    pace = target;
    physical = target - 4;
    defending = target - 12;
  } else if (position === "LM" || position === "RM") {
    pace = target + 3;
    dribbling = target + 2;
    passing = target + 1;
    shooting = target - 2;
    defending = target - 8;
    physical = target - 2;
  } else if (position === "LW" || position === "RW") {
    pace = target + 4;
    dribbling = target + 4;
    shooting = target + 2;
    passing = target - 2;
    physical = target - 4;
    defending = target - 16;
  } else {
    shooting = target + 5;
    pace = target + 1;
    dribbling = target + 1;
    physical = target + 2;
    passing = target - 4;
    defending = target - 20;
  }

  pace += (drib - 60) * 0.03;
  dribbling += (drib - 60) * 0.04;
  passing += (pass - 78) * 0.03;
  shooting += (rate(stats.shotsOnTarget, Math.max(stats.shots, 1)) - 35) * 0.025;

  pace *= af;
  shooting *= af;
  passing *= af;
  dribbling *= af;
  defending *= af;
  physical *= af;
  if (goalkeeping != null) goalkeeping *= af;

  const softCap = target + 7;
  const softFloor = target - 26;

  const attrs: PlayerAttributes = {
    pace: clamp(pace, softFloor, softCap),
    shooting: clamp(shooting, softFloor, softCap),
    passing: clamp(passing, softFloor, softCap),
    dribbling: clamp(dribbling, softFloor, softCap),
    defending: clamp(defending, softFloor, softCap),
    physical: clamp(physical, softFloor, softCap),
  };
  if (goalkeeping != null) {
    attrs.goalkeeping = clamp(goalkeeping, target - 3, Math.min(93, target + 3));
  }
  return attrs;
}

export function computeOvr(attributes: PlayerAttributes, position: Position): number {
  const a = attributes;
  const gk = a.goalkeeping ?? 40;

  let ovr: number;
  if (position === "GK") {
    ovr = gk * 0.55 + a.passing * 0.12 + a.physical * 0.15 + a.defending * 0.08 + a.pace * 0.1;
  } else if (position === "CB") {
    ovr = a.defending * 0.4 + a.physical * 0.25 + a.passing * 0.15 + a.pace * 0.1 + a.dribbling * 0.1;
  } else if (position === "LB" || position === "RB") {
    ovr = a.defending * 0.28 + a.pace * 0.22 + a.passing * 0.18 + a.dribbling * 0.16 + a.physical * 0.16;
  } else if (position === "LWB" || position === "RWB") {
    ovr = a.pace * 0.24 + a.passing * 0.2 + a.dribbling * 0.2 + a.defending * 0.2 + a.physical * 0.16;
  } else if (position === "CDM") {
    ovr = a.defending * 0.3 + a.passing * 0.25 + a.physical * 0.2 + a.dribbling * 0.15 + a.pace * 0.1;
  } else if (position === "CM") {
    ovr = a.passing * 0.3 + a.dribbling * 0.22 + a.defending * 0.18 + a.physical * 0.15 + a.pace * 0.15;
  } else if (position === "CAM") {
    ovr = a.passing * 0.28 + a.dribbling * 0.28 + a.shooting * 0.22 + a.pace * 0.14 + a.physical * 0.08;
  } else if (position === "LM" || position === "RM") {
    ovr = a.pace * 0.26 + a.dribbling * 0.26 + a.passing * 0.22 + a.shooting * 0.14 + a.physical * 0.12;
  } else if (position === "LW" || position === "RW") {
    ovr = a.pace * 0.28 + a.dribbling * 0.28 + a.shooting * 0.24 + a.passing * 0.12 + a.physical * 0.08;
  } else {
    ovr = a.shooting * 0.35 + a.pace * 0.2 + a.dribbling * 0.2 + a.physical * 0.15 + a.passing * 0.1;
  }

  return clamp(ovr, 48, 93);
}

export type PartialPlayer = Omit<Player, "attributes" | "ovr" | "stats"> & {
  stats: PlayerSeasonStats;
  attributes?: Partial<PlayerAttributes>;
  ovr?: number;
};

export function enrichPlayer(
  partial: PartialPlayer,
  ctx: QualityContext = {},
): Player {
  const mergedCtx: QualityContext = {
    ...ctx,
    club: ctx.club ?? partial.club,
    ovrOverride: partial.ovr ?? ctx.ovrOverride,
  };
  const computed = computePlayerAttributes(
    partial.stats,
    partial.position,
    partial.age,
    mergedCtx,
  );
  const attributes: PlayerAttributes = {
    ...computed,
    pace: partial.attributes?.pace ?? computed.pace,
    shooting: partial.attributes?.shooting ?? computed.shooting,
    passing: partial.attributes?.passing ?? computed.passing,
    dribbling: partial.attributes?.dribbling ?? computed.dribbling,
    defending: partial.attributes?.defending ?? computed.defending,
    physical: partial.attributes?.physical ?? computed.physical,
  };
  if (partial.position === "GK") {
    attributes.goalkeeping = partial.attributes?.goalkeeping ?? computed.goalkeeping;
  } else if (partial.attributes?.goalkeeping != null) {
    attributes.goalkeeping = partial.attributes.goalkeeping;
  }

  const fromAttrs = computeOvr(attributes, partial.position);
  const target = computeTargetOvr(
    partial.position,
    partial.age,
    partial.stats,
    mergedCtx,
  );
  const ovr = partial.ovr ?? clamp(fromAttrs * 0.5 + target * 0.5, 48, 93);

  const { attributes: _a, ovr: _o, ...rest } = partial;
  return {
    ...rest,
    attributes,
    ovr,
  };
}

export function teamAverageOvr(players: Player[]): number {
  if (players.length === 0) return 0;
  const sorted = [...players].sort((a, b) => b.ovr - a.ovr);
  const xi = sorted.slice(0, 11);
  return Math.round(xi.reduce((s, p) => s + p.ovr, 0) / xi.length);
}
