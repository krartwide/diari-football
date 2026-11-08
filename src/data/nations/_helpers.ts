import { clubBand, clubBaseOvr } from "@/data/ratings/clubs";
import { lookupEaOvr } from "@/data/ratings/eaFc27";
import {
  enrichPlayer,
  type PartialPlayer,
  type PlayerTier,
} from "@/lib/ovr";
import type {
  Manager,
  Player,
  PlayerSeasonStats,
  Position,
  Team,
  TeamColors,
  TeamTactics,
} from "@/types/football";

export type RawPlayer = {
  name: string;
  nameEn: string;
  number: number;
  position: Position;
  age: number;
  club: string;
  height?: number;
  preferredFoot?: "L" | "R" | "B";
  isCaptain?: boolean;
  tier?: PlayerTier;
  /** Hard OVR override (use EA / official when known). */
  ovr?: number;
  stats?: Partial<PlayerSeasonStats>;
};

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seeded(n: number, min: number, max: number): number {
  const x = (n % 10000) / 10000;
  return Math.round(min + x * (max - min));
}

function defaultHeight(position: Position, seed: number): number {
  if (position === "GK") return seeded(seed, 188, 198);
  if (position === "CB") return seeded(seed, 185, 195);
  if (position === "ST" || position === "CF") return seeded(seed, 178, 192);
  return seeded(seed, 170, 188);
}

function defaultTier(club: string, idx: number, age: number, ea?: number): PlayerTier {
  if (ea != null) {
    if (ea >= 88) return "worldClass";
    if (ea >= 84) return "star";
    if (ea >= 78) return "solid";
    if (ea >= 70) return "fringe";
    return age <= 21 ? "youth" : "fringe";
  }
  if (age <= 19 && idx > 14) return "youth";
  const band = clubBand(club);
  if (band === "elite" && idx < 3) return "star";
  if ((band === "elite" || band === "top") && idx < 11) return "solid";
  if (band === "strong" && idx < 11) return "solid";
  if (idx < 11) return band === "amateur" || band === "lower" ? "solid" : "solid";
  if (idx < 18) return "fringe";
  return age <= 21 ? "youth" : "fringe";
}

/**
 * Season stats scaled by club quality (skill proxy), not FIFA ranking.
 */
function buildStats(
  position: Position,
  tier: PlayerTier,
  seed: number,
  club: string,
  overrides?: Partial<PlayerSeasonStats>,
): PlayerSeasonStats {
  const base = clubBaseOvr(club);
  const level = Math.max(0.45, Math.min(1.05, (base - 50) / 40));
  const appsBase = tier === "worldClass" || tier === "star" ? 30 : tier === "solid" ? 24 : 16;
  const appearances = overrides?.appearances ?? seeded(seed + 1, appsBase - 4, appsBase + 5);

  const isGk = position === "GK";
  const isDef = ["CB", "LB", "RB", "LWB", "RWB"].includes(position);
  const isMid = ["CDM", "CM", "CAM", "LM", "RM"].includes(position);
  const isFwd = ["LW", "RW", "CF", "ST"].includes(position);

  const tierMult =
    tier === "worldClass" ? 1.2 : tier === "star" ? 1.08 : tier === "solid" ? 1 : tier === "youth" ? 0.55 : 0.72;
  const scale = level * tierMult;

  let goals = 0;
  let assists = 0;
  if (isFwd) {
    goals = Math.round(seeded(seed + 2, 3, 12) * scale);
    assists = Math.round(seeded(seed + 3, 2, 7) * scale);
  } else if (isMid) {
    goals = Math.round(seeded(seed + 2, 1, 5) * scale);
    assists = Math.round(seeded(seed + 3, 2, 8) * scale);
  } else if (isDef) {
    goals = Math.round(seeded(seed + 2, 0, 2) * scale);
    assists = Math.round(seeded(seed + 3, 0, 4) * scale);
  }

  const passBase = 66 + level * 18 + (tier === "worldClass" || tier === "star" ? 2 : 0);
  const dribBase = 46 + level * 20 + (tier === "worldClass" || tier === "star" ? 3 : 0);

  const stats: PlayerSeasonStats = {
    appearances,
    goals: overrides?.goals ?? (isGk ? 0 : goals),
    assists: overrides?.assists ?? (isGk ? 0 : assists),
    yellowCards: overrides?.yellowCards ?? seeded(seed + 4, 1, 6),
    redCards: overrides?.redCards ?? (seed % 19 === 0 ? 1 : 0),
    fouls: overrides?.fouls ?? seeded(seed + 5, 10, 36),
    interceptions:
      overrides?.interceptions ??
      seeded(seed + 6, isDef ? 22 : isMid ? 16 : 5, Math.round((isDef ? 65 : isMid ? 48 : 18) * level)),
    dribbleSuccessRate:
      overrides?.dribbleSuccessRate ?? seeded(seed + 7, Math.round(dribBase - 6), Math.round(dribBase + 8)),
    shotsOnTarget:
      overrides?.shotsOnTarget ??
      (isGk ? 0 : seeded(seed + 8, isFwd ? 10 : 3, Math.round((isFwd ? 40 : 16) * scale))),
    shots:
      overrides?.shots ??
      (isGk ? 0 : seeded(seed + 9, isFwd ? 24 : 8, Math.round((isFwd ? 80 : 35) * scale))),
    passAccuracy:
      overrides?.passAccuracy ?? seeded(seed + 10, Math.round(passBase - 5), Math.round(passBase + 6)),
    tacklesWon:
      overrides?.tacklesWon ??
      seeded(
        seed + 11,
        isDef || position === "CDM" ? 16 : 7,
        Math.round((isDef || position === "CDM" ? 60 : 28) * level),
      ),
  };

  if (isGk) {
    stats.cleanSheets =
      overrides?.cleanSheets ??
      seeded(seed + 12, Math.round(3 * level), Math.round((tier === "worldClass" || tier === "star" ? 13 : 8) * level));
    stats.saves = overrides?.saves ?? seeded(seed + 13, 50, Math.round(95 + level * 35));
    stats.goalsConceded =
      overrides?.goalsConceded ??
      seeded(seed + 14, Math.round(16 + (1 - level) * 22), Math.round(26 + (1 - level) * 28));
    stats.dribbleSuccessRate = overrides?.dribbleSuccessRate ?? seeded(seed + 7, 35, 50);
    stats.passAccuracy =
      overrides?.passAccuracy ?? seeded(seed + 10, Math.round(64 + level * 14), Math.round(76 + level * 10));
  }

  return { ...stats, ...overrides };
}

export function makePlayers(fifaCode: string, raw: RawPlayer[], _fifaRank?: number): Player[] {
  return raw.map((p, idx) => {
    const seed = hashStr(`${fifaCode}-${p.nameEn}-${p.number}`);
    const ea = lookupEaOvr(p.nameEn);
    const knownOvr = p.ovr ?? ea;
    const tier = p.tier ?? defaultTier(p.club, idx, p.age, ea);
    const stats = buildStats(p.position, tier, seed, p.club, p.stats);
    const variance = seeded(seed + 99, -2, 2);
    const partial: PartialPlayer = {
      id: `${fifaCode.toLowerCase()}-${p.number}-${p.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: p.name,
      nameEn: p.nameEn,
      number: p.number,
      position: p.position,
      age: p.age,
      club: p.club,
      height: p.height ?? defaultHeight(p.position, seed),
      preferredFoot: p.preferredFoot ?? (seed % 5 === 0 ? "L" : seed % 11 === 0 ? "B" : "R"),
      stats,
      isCaptain: p.isCaptain,
      ovr: knownOvr,
    };
    return enrichPlayer(partial, { tier, variance, club: p.club });
  });
}

export type TeamInput = {
  name: string;
  nameEn: string;
  fifaCode: string;
  iso2: string;
  confederation: Team["confederation"];
  fifaRank: number;
  colors: TeamColors;
  stadium: string;
  manager: Manager;
  tactics: TeamTactics;
  players: RawPlayer[];
  worldCupTitles?: number;
};

export function makeTeam(input: TeamInput): Team {
  return {
    id: `official-${input.fifaCode}`,
    name: input.name,
    nameEn: input.nameEn,
    fifaCode: input.fifaCode,
    visibility: "public",
    isOfficial: true,
    confederation: input.confederation,
    fifaRank: input.fifaRank,
    colors: input.colors,
    crestUrl: `https://flagcdn.com/w160/${input.iso2.toLowerCase()}.png`,
    stadium: input.stadium,
    manager: input.manager,
    tactics: input.tactics,
    players: makePlayers(input.fifaCode, input.players, input.fifaRank),
    worldCupTitles: input.worldCupTitles,
  };
}
