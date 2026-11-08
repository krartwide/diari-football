import {
  enrichPlayer,
  nationStrength,
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
  /** Quality tier. Defaults from squad order + nation rank. */
  tier?: PlayerTier;
  /** Optional hard OVR override for well-known stars (45–94). */
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

function defaultTier(fifaRank: number, idx: number, age: number): PlayerTier {
  if (age <= 19 && idx > 14) return "youth";
  // worldClass only via explicit STAR_OVR / RawPlayer.tier — never by list order alone
  if (idx < 2 && fifaRank <= 20) return "star";
  if (idx < 1 && fifaRank <= 40) return "star";
  if (idx < 11) return "solid";
  if (idx < 18) return "fringe";
  return age <= 21 ? "youth" : "fringe";
}

/**
 * Season stats scaled by nation strength so weak nations don't post PL-star lines.
 */
function buildStats(
  position: Position,
  tier: PlayerTier,
  seed: number,
  fifaRank: number,
  overrides?: Partial<PlayerSeasonStats>,
): PlayerSeasonStats {
  const ns = nationStrength(fifaRank);
  const appsBase = tier === "worldClass" || tier === "star" ? 30 : tier === "solid" ? 24 : 16;
  const appearances = overrides?.appearances ?? seeded(seed + 1, appsBase - 4, appsBase + 5);

  const isGk = position === "GK";
  const isDef = ["CB", "LB", "RB", "LWB", "RWB"].includes(position);
  const isMid = ["CDM", "CM", "CAM", "LM", "RM"].includes(position);
  const isFwd = ["LW", "RW", "CF", "ST"].includes(position);

  const tierMult =
    tier === "worldClass" ? 1.25 : tier === "star" ? 1.1 : tier === "solid" ? 1 : tier === "youth" ? 0.55 : 0.7;
  const level = ns * tierMult;

  let goals = 0;
  let assists = 0;
  if (isFwd) {
    goals = Math.round(seeded(seed + 2, 4, 14) * level);
    assists = Math.round(seeded(seed + 3, 2, 8) * level);
  } else if (isMid) {
    goals = Math.round(seeded(seed + 2, 1, 6) * level);
    assists = Math.round(seeded(seed + 3, 2, 9) * level);
  } else if (isDef) {
    goals = Math.round(seeded(seed + 2, 0, 2) * level);
    assists = Math.round(seeded(seed + 3, 0, 4) * level);
  }

  const passBase = 68 + ns * 16 + (tier === "worldClass" || tier === "star" ? 3 : 0);
  const dribBase = 48 + ns * 18 + (tier === "worldClass" || tier === "star" ? 4 : 0);

  const stats: PlayerSeasonStats = {
    appearances,
    goals: overrides?.goals ?? (isGk ? 0 : goals),
    assists: overrides?.assists ?? (isGk ? 0 : assists),
    yellowCards: overrides?.yellowCards ?? seeded(seed + 4, 1, 6),
    redCards: overrides?.redCards ?? (seed % 19 === 0 ? 1 : 0),
    fouls: overrides?.fouls ?? seeded(seed + 5, 10, 38),
    interceptions:
      overrides?.interceptions ??
      seeded(seed + 6, isDef ? 25 : isMid ? 18 : 6, Math.round((isDef ? 70 : isMid ? 50 : 20) * ns)),
    dribbleSuccessRate:
      overrides?.dribbleSuccessRate ?? seeded(seed + 7, Math.round(dribBase - 6), Math.round(dribBase + 8)),
    shotsOnTarget:
      overrides?.shotsOnTarget ??
      (isGk ? 0 : seeded(seed + 8, isFwd ? 12 : 4, Math.round((isFwd ? 45 : 18) * level))),
    shots:
      overrides?.shots ??
      (isGk ? 0 : seeded(seed + 9, isFwd ? 28 : 10, Math.round((isFwd ? 90 : 40) * level))),
    passAccuracy:
      overrides?.passAccuracy ?? seeded(seed + 10, Math.round(passBase - 5), Math.round(passBase + 6)),
    tacklesWon:
      overrides?.tacklesWon ??
      seeded(
        seed + 11,
        isDef || position === "CDM" ? 18 : 8,
        Math.round((isDef || position === "CDM" ? 65 : 30) * ns),
      ),
  };

  if (isGk) {
    const cs =
      overrides?.cleanSheets ??
      seeded(seed + 12, Math.round(4 * ns), Math.round((tier === "worldClass" || tier === "star" ? 14 : 9) * ns));
    const saves = overrides?.saves ?? seeded(seed + 13, 55, Math.round(100 + ns * 30));
    const goalsConceded =
      overrides?.goalsConceded ?? seeded(seed + 14, Math.round(18 + (1 - ns) * 25), Math.round(28 + (1 - ns) * 30));
    stats.cleanSheets = cs;
    stats.saves = saves;
    stats.goalsConceded = goalsConceded;
    stats.dribbleSuccessRate = overrides?.dribbleSuccessRate ?? seeded(seed + 7, 35, 50);
    stats.passAccuracy = overrides?.passAccuracy ?? seeded(seed + 10, Math.round(65 + ns * 15), Math.round(78 + ns * 10));
  }

  return { ...stats, ...overrides };
}

/** Well-known ceiling OVRs (EA FC / real-world band). Key = lowercase nameEn. */
const STAR_OVR: Record<string, number> = {
  "kylian mbappé": 91,
  "kylian mbappe": 91,
  "lionel messi": 88,
  "erling haaland": 91,
  "vinícius júnior": 89,
  "vinicius junior": 89,
  "rodri": 89,
  "jude bellingham": 90,
  "lamine yamal": 86,
  "harry kane": 89,
  "kevin de bruyne": 88,
  "mohamed salah": 88,
  "robert lewandowski": 88,
  "pedri": 87,
  "bukayo saka": 87,
  "phil foden": 87,
  "bruno fernandes": 87,
  "declan rice": 86,
  "virgil van dijk": 88,
  "thibaut courtois": 89,
  "alisson": 89,
  "emiliano martínez": 87,
  "emiliano martinez": 87,
  "antoine griezmann": 86,
  "ousmane dembélé": 86,
  "ousmane dembele": 86,
  "rafael leão": 86,
  "rafael leao": 86,
  "khvicha kvaratskhelia": 86,
  "florian wirtz": 87,
  "jamal musiala": 87,
  "lautaro martínez": 87,
  "lautaro martinez": 87,
  "julian alvarez": 85,
  "julián álvarez": 85,
  "son heung-min": 86,
  "heung-min son": 86,
  "kim min-jae": 84,
  "lee kang-in": 82,
};

export function makePlayers(fifaCode: string, raw: RawPlayer[], fifaRank: number): Player[] {
  return raw.map((p, idx) => {
    const seed = hashStr(`${fifaCode}-${p.nameEn}-${p.number}`);
    const known = STAR_OVR[p.nameEn.toLowerCase()];
    const tier: PlayerTier =
      p.tier ??
      (known != null && known >= 88
        ? "worldClass"
        : known != null && known >= 84
          ? "star"
          : defaultTier(fifaRank, idx, p.age));
    const stats = buildStats(p.position, tier, seed, fifaRank, p.stats);
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
      ovr: p.ovr ?? known,
    };
    return enrichPlayer(partial, { fifaRank, tier, variance });
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
