import { enrichPlayer, type PartialPlayer } from '@/lib/ovr';
import type {
  Manager,
  Player,
  PlayerSeasonStats,
  Position,
  Team,
  TeamColors,
  TeamTactics,
} from '@/types/football';

export type RawPlayer = {
  name: string;
  nameEn: string;
  number: number;
  position: Position;
  age: number;
  club: string;
  height?: number;
  preferredFoot?: 'L' | 'R' | 'B';
  isCaptain?: boolean;
  /** Optional quality tier to seed realistic season stats: star|solid|fringe */
  tier?: 'star' | 'solid' | 'fringe';
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
  if (position === 'GK') return seeded(seed, 188, 198);
  if (position === 'CB') return seeded(seed, 185, 195);
  if (position === 'ST' || position === 'CF') return seeded(seed, 178, 192);
  return seeded(seed, 170, 188);
}

function buildStats(
  position: Position,
  tier: 'star' | 'solid' | 'fringe',
  seed: number,
  overrides?: Partial<PlayerSeasonStats>,
): PlayerSeasonStats {
  const appsBase = tier === 'star' ? 32 : tier === 'solid' ? 26 : 18;
  const appearances = overrides?.appearances ?? seeded(seed + 1, appsBase - 4, appsBase + 6);

  const isGk = position === 'GK';
  const isDef = ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position);
  const isMid = ['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(position);
  const isFwd = ['LW', 'RW', 'CF', 'ST'].includes(position);

  const goalMult = tier === 'star' ? 1.35 : tier === 'solid' ? 1 : 0.65;
  let goals = 0;
  let assists = 0;
  if (isFwd) {
    goals = Math.round(seeded(seed + 2, 8, 22) * goalMult);
    assists = Math.round(seeded(seed + 3, 3, 12) * goalMult);
  } else if (isMid) {
    goals = Math.round(seeded(seed + 2, 2, 10) * goalMult);
    assists = Math.round(seeded(seed + 3, 3, 14) * goalMult);
  } else if (isDef) {
    goals = Math.round(seeded(seed + 2, 0, 4) * goalMult);
    assists = Math.round(seeded(seed + 3, 1, 7) * goalMult);
  }

  const passBase = tier === 'star' ? 86 : tier === 'solid' ? 80 : 74;
  const dribBase = tier === 'star' ? 72 : tier === 'solid' ? 62 : 52;

  const stats: PlayerSeasonStats = {
    appearances,
    goals: overrides?.goals ?? (isGk ? 0 : goals),
    assists: overrides?.assists ?? (isGk ? 0 : assists),
    yellowCards: overrides?.yellowCards ?? seeded(seed + 4, 1, 7),
    redCards: overrides?.redCards ?? (seed % 17 === 0 ? 1 : 0),
    fouls: overrides?.fouls ?? seeded(seed + 5, 12, 45),
    interceptions: overrides?.interceptions ?? seeded(seed + 6, isDef ? 35 : isMid ? 25 : 8, isDef ? 90 : isMid ? 65 : 25),
    dribbleSuccessRate: overrides?.dribbleSuccessRate ?? seeded(seed + 7, dribBase - 8, dribBase + 12),
    shotsOnTarget: overrides?.shotsOnTarget ?? (isGk ? 0 : seeded(seed + 8, isFwd ? 25 : 8, isFwd ? 70 : 30)),
    shots: overrides?.shots ?? (isGk ? 0 : seeded(seed + 9, isFwd ? 50 : 15, isFwd ? 130 : 55)),
    passAccuracy: overrides?.passAccuracy ?? seeded(seed + 10, passBase - 6, passBase + 8),
    tacklesWon: overrides?.tacklesWon ?? seeded(seed + 11, isDef || position === 'CDM' ? 30 : 10, isDef || position === 'CDM' ? 85 : 40),
  };

  if (isGk) {
    const cs = overrides?.cleanSheets ?? seeded(seed + 12, tier === 'star' ? 12 : 6, tier === 'star' ? 18 : 12);
    const saves = overrides?.saves ?? seeded(seed + 13, 70, tier === 'star' ? 140 : 110);
    const goalsConceded = overrides?.goalsConceded ?? seeded(seed + 14, 18, tier === 'star' ? 28 : 40);
    stats.cleanSheets = cs;
    stats.saves = saves;
    stats.goalsConceded = goalsConceded;
    stats.dribbleSuccessRate = overrides?.dribbleSuccessRate ?? seeded(seed + 7, 40, 55);
    stats.passAccuracy = overrides?.passAccuracy ?? seeded(seed + 10, 72, 88);
  }

  return { ...stats, ...overrides };
}

export function makePlayers(fifaCode: string, raw: RawPlayer[]): Player[] {
  return raw.map((p, idx) => {
    const seed = hashStr(`${fifaCode}-${p.nameEn}-${p.number}`);
    const tier = p.tier ?? (idx < 3 ? 'star' : idx < 16 ? 'solid' : 'fringe');
    const stats = buildStats(p.position, tier, seed, p.stats);
    const partial: PartialPlayer = {
      id: `${fifaCode.toLowerCase()}-${p.number}-${p.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: p.name,
      nameEn: p.nameEn,
      number: p.number,
      position: p.position,
      age: p.age,
      club: p.club,
      height: p.height ?? defaultHeight(p.position, seed),
      preferredFoot: p.preferredFoot ?? (seed % 5 === 0 ? 'L' : seed % 11 === 0 ? 'B' : 'R'),
      stats,
      isCaptain: p.isCaptain,
    };
    return enrichPlayer(partial);
  });
}

export type TeamInput = {
  name: string;
  nameEn: string;
  fifaCode: string;
  iso2: string;
  confederation: Team['confederation'];
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
    visibility: 'public',
    isOfficial: true,
    confederation: input.confederation,
    fifaRank: input.fifaRank,
    colors: input.colors,
    crestUrl: `https://flagcdn.com/w160/${input.iso2.toLowerCase()}.png`,
    stadium: input.stadium,
    manager: input.manager,
    tactics: input.tactics,
    players: makePlayers(input.fifaCode, input.players),
    worldCupTitles: input.worldCupTitles,
  };
}
