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

const DEF_POS: Position[] = ["CB", "LB", "RB", "LWB", "RWB"];
const MID_POS: Position[] = ["CDM", "CM", "CAM", "LM", "RM"];
const FWD_POS: Position[] = ["LW", "RW", "CF", "ST"];

export type PlayerTier = "worldClass" | "star" | "solid" | "fringe" | "youth";

/**
 * Nation ceiling from FIFA ranking — top XIs roughly:
 * #1–5 ≈ 86–88, #20 ≈ 80, #50 ≈ 74, #100 ≈ 66, #150 ≈ 60
 */
export function nationStrength(fifaRank: number): number {
  const r = Math.max(1, fifaRank);
  if (r <= 5) return 1;
  if (r <= 10) return 0.96;
  if (r <= 20) return 0.9;
  if (r <= 35) return 0.84;
  if (r <= 50) return 0.78;
  if (r <= 70) return 0.72;
  if (r <= 90) return 0.66;
  if (r <= 110) return 0.6;
  if (r <= 140) return 0.54;
  return 0.48;
}

export function nationBaseOvr(fifaRank: number): number {
  // Typical squad solid-player OVR for that nation (XI avg usually a bit higher with stars)
  // #1 ≈ 80, #20 ≈ 74, #50 ≈ 68, #100 ≈ 62, #150 ≈ 58
  return 48 + nationStrength(fifaRank) * 32;
}

function ageFactor(age: number): number {
  if (age <= 18) return 0.9;
  if (age <= 21) return 0.95;
  if (age <= 24) return 0.99;
  if (age <= 29) return 1;
  if (age <= 32) return 0.97;
  if (age <= 35) return 0.93;
  return 0.88;
}

function tierOffset(tier: PlayerTier): number {
  switch (tier) {
    case "worldClass":
      return 6;
    case "star":
      return 3;
    case "solid":
      return 0;
    case "fringe":
      return -6;
    case "youth":
      return -9;
  }
}

/**
 * Soft performance nudge from season stats (±3). Never the main driver.
 */
function statsNudge(stats: PlayerSeasonStats, position: Position): number {
  const apps = Math.max(stats.appearances, 1);
  const g90 = per90(stats.goals, apps);
  const a90 = per90(stats.assists, apps);
  const int90 = per90(stats.interceptions, apps);
  const t90 = per90(stats.tacklesWon, apps);
  const sot = rate(stats.shotsOnTarget, Math.max(stats.shots, 1));

  let score = 0;
  if (position === "GK") {
    const cs = stats.cleanSheets ?? 0;
    const saves = stats.saves ?? 0;
    const gc = Math.max(stats.goalsConceded ?? 1, 1);
    score = (cs / apps) * 4 + rate(saves, saves + gc) * 0.02 - 2;
  } else if (FWD_POS.includes(position)) {
    score = g90 * 1.2 + a90 * 0.8 + (sot - 35) * 0.03;
  } else if (MID_POS.includes(position)) {
    score = a90 * 0.9 + g90 * 0.5 + (stats.passAccuracy - 78) * 0.05 + int90 * 0.15;
  } else {
    score = int90 * 0.25 + t90 * 0.2 + (stats.passAccuracy - 75) * 0.04 - per90(stats.fouls, apps) * 0.1;
  }
  return Math.max(-3, Math.min(3, score));
}

export interface QualityContext {
  fifaRank?: number;
  tier?: PlayerTier;
  /** Extra seeded variance already applied outside, -3..3 */
  variance?: number;
  /** Hard target when a known-player OVR override is set */
  ovrOverride?: number;
}

/**
 * Target OVR before attribute spread. FIFA-like band, rank-aware.
 */
export function computeTargetOvr(
  position: Position,
  age: number,
  stats: PlayerSeasonStats,
  ctx: QualityContext = {},
): number {
  if (ctx.ovrOverride != null) return clamp(ctx.ovrOverride, 45, 93);
  const rank = ctx.fifaRank ?? 50;
  const tier = ctx.tier ?? "solid";
  const base = nationBaseOvr(rank);
  const target =
    base +
    tierOffset(tier) +
    (ctx.variance ?? 0) +
    statsNudge(stats, position);
  return clamp(target * ageFactor(age), 45, 92);
}

/**
 * Build attributes around a target OVR with position-appropriate profiles.
 */
export function computePlayerAttributes(
  stats: PlayerSeasonStats,
  position: Position,
  age: number,
  ctx: QualityContext = {},
): PlayerAttributes {
  const target = computeTargetOvr(position, age, stats, ctx);
  const af = ageFactor(age);

  // Secondary: tiny flavor from rates (already mostly in target)
  const apps = Math.max(stats.appearances, 1);
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
    // CF / ST
    shooting = target + 5;
    pace = target + 1;
    dribbling = target + 1;
    physical = target + 2;
    passing = target - 4;
    defending = target - 20;
  }

  // Mild flavor from success rates without blowing the ceiling
  pace += (drib - 60) * 0.04;
  dribbling += (drib - 60) * 0.05;
  passing += (pass - 78) * 0.04;
  shooting += (rate(stats.shotsOnTarget, Math.max(stats.shots, 1)) - 35) * 0.03;

  pace *= af;
  shooting *= af;
  passing *= af;
  dribbling *= af;
  defending *= af;
  physical *= af;
  if (goalkeeping != null) goalkeeping *= af;

  // Keep attributes near target so OVR stays honest
  const softCap = target + 8;
  const softFloor = target - 28;

  const attrs: PlayerAttributes = {
    pace: clamp(pace, softFloor, softCap),
    shooting: clamp(shooting, softFloor, softCap),
    passing: clamp(passing, softFloor, softCap),
    dribbling: clamp(dribbling, softFloor, softCap),
    defending: clamp(defending, softFloor, softCap),
    physical: clamp(physical, softFloor, softCap),
  };
  if (goalkeeping != null) {
    attrs.goalkeeping = clamp(goalkeeping, target - 4, Math.min(94, target + 4));
  }
  return attrs;
}

/**
 * Position-weighted overall from attributes.
 */
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

  return clamp(ovr, 45, 93);
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
  const ovr =
    partial.ovr ??
    clamp(fromAttrs * 0.55 + target * 0.45, 45, 93);

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
