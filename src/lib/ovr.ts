import type {
  Player,
  PlayerAttributes,
  PlayerSeasonStats,
  Position,
} from '@/types/football';

function clamp(n: number, min = 1, max = 99): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function per90(value: number, appearances: number): number {
  if (appearances <= 0) return 0;
  return (value / appearances) * 90;
}

function rate(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}

const DEF_POS: Position[] = ['CB', 'LB', 'RB', 'LWB', 'RWB'];
const MID_POS: Position[] = ['CDM', 'CM', 'CAM', 'LM', 'RM'];
const FWD_POS: Position[] = ['LW', 'RW', 'CF', 'ST'];

function ageFactor(age: number): number {
  if (age <= 23) return 0.96;
  if (age <= 28) return 1.0;
  if (age <= 32) return 0.98;
  if (age <= 35) return 0.94;
  return 0.9;
}

/**
 * Derive 0-99 attributes from season-like stats + position + age.
 */
export function computePlayerAttributes(
  stats: PlayerSeasonStats,
  position: Position,
  age: number,
): PlayerAttributes {
  const apps = Math.max(stats.appearances, 1);
  const af = ageFactor(age);

  const goalRate = per90(stats.goals, apps);
  const assistRate = per90(stats.assists, apps);
  const intRate = per90(stats.interceptions, apps);
  const tackleRate = per90(stats.tacklesWon, apps);
  const foulRate = per90(stats.fouls, apps);
  const sotRate = rate(stats.shotsOnTarget, Math.max(stats.shots, 1));
  const pass = stats.passAccuracy;
  const drib = stats.dribbleSuccessRate;

  let pace = 62 + drib * 0.18 + (FWD_POS.includes(position) ? 8 : DEF_POS.includes(position) ? 2 : 4);
  let shooting = 50 + goalRate * 12 + sotRate * 0.18 + (FWD_POS.includes(position) ? 10 : 0);
  let passing = 52 + pass * 0.28 + assistRate * 8;
  let dribbling = 52 + drib * 0.3 + assistRate * 4;
  let defending = 48 + intRate * 6 + tackleRate * 5 - foulRate * 0.8;
  let physical = 58 + tackleRate * 2.5 + foulRate * 1.2 + apps * 0.15;
  let goalkeeping: number | undefined;

  if (position === 'GK') {
    const cs = stats.cleanSheets ?? 0;
    const saves = stats.saves ?? 0;
    const gc = stats.goalsConceded ?? Math.max(apps - cs, 0);
    const saveRate = rate(saves, saves + gc);
    goalkeeping = 58 + (cs / apps) * 22 + saveRate * 0.22 + pass * 0.08;
    defending = 28 + intRate * 2;
    shooting = 22 + pass * 0.1;
    dribbling = 30 + pass * 0.15;
    pace = 48 + af * 8;
    physical = 62 + (cs / apps) * 10;
    passing = 50 + pass * 0.25;
  } else if (DEF_POS.includes(position)) {
    defending += 14;
    physical += 8;
    shooting -= 8;
    if (position === 'CB') {
      pace -= 6;
      defending += 4;
      physical += 4;
    } else {
      pace += 6;
      dribbling += 4;
      passing += 2;
    }
  } else if (position === 'CDM') {
    defending += 10;
    passing += 6;
    physical += 6;
    shooting -= 4;
  } else if (position === 'CM') {
    passing += 8;
    dribbling += 4;
    defending += 2;
  } else if (position === 'CAM') {
    passing += 8;
    dribbling += 8;
    shooting += 6;
    defending -= 6;
  } else if (position === 'LM' || position === 'RM') {
    pace += 8;
    dribbling += 6;
    passing += 4;
    defending -= 2;
  } else if (FWD_POS.includes(position)) {
    shooting += 12;
    pace += 6;
    dribbling += 6;
    defending -= 12;
    if (position === 'ST' || position === 'CF') {
      shooting += 4;
      physical += 4;
    } else {
      pace += 4;
      dribbling += 4;
    }
  }

  // Blend contribution rates into overall quality signal
  const contribution =
    goalRate * 3 +
    assistRate * 2.5 +
    intRate * 1.2 +
    tackleRate * 1.1 +
    pass * 0.05 +
    drib * 0.04;

  const qualityBoost = Math.min(12, contribution * 0.35);

  pace = (pace + qualityBoost * 0.3) * af;
  shooting = (shooting + qualityBoost * 0.5) * af;
  passing = (passing + qualityBoost * 0.4) * af;
  dribbling = (dribbling + qualityBoost * 0.45) * af;
  defending = (defending + qualityBoost * 0.35) * af;
  physical = (physical + qualityBoost * 0.25) * af;
  if (goalkeeping != null) goalkeeping = goalkeeping * af;

  const attrs: PlayerAttributes = {
    pace: clamp(pace),
    shooting: clamp(shooting),
    passing: clamp(passing),
    dribbling: clamp(dribbling),
    defending: clamp(defending),
    physical: clamp(physical),
  };
  if (goalkeeping != null) attrs.goalkeeping = clamp(goalkeeping);
  return attrs;
}

/**
 * Position-weighted overall rating 0-99.
 */
export function computeOvr(attributes: PlayerAttributes, position: Position): number {
  const a = attributes;
  const gk = a.goalkeeping ?? 40;

  let ovr: number;
  if (position === 'GK') {
    ovr = gk * 0.55 + a.passing * 0.12 + a.physical * 0.15 + a.defending * 0.08 + a.pace * 0.1;
  } else if (position === 'CB') {
    ovr = a.defending * 0.4 + a.physical * 0.25 + a.passing * 0.15 + a.pace * 0.1 + a.dribbling * 0.1;
  } else if (position === 'LB' || position === 'RB') {
    ovr = a.defending * 0.28 + a.pace * 0.22 + a.passing * 0.18 + a.dribbling * 0.16 + a.physical * 0.16;
  } else if (position === 'LWB' || position === 'RWB') {
    ovr = a.pace * 0.24 + a.passing * 0.2 + a.dribbling * 0.2 + a.defending * 0.2 + a.physical * 0.16;
  } else if (position === 'CDM') {
    ovr = a.defending * 0.3 + a.passing * 0.25 + a.physical * 0.2 + a.dribbling * 0.15 + a.pace * 0.1;
  } else if (position === 'CM') {
    ovr = a.passing * 0.3 + a.dribbling * 0.22 + a.defending * 0.18 + a.physical * 0.15 + a.pace * 0.15;
  } else if (position === 'CAM') {
    ovr = a.passing * 0.28 + a.dribbling * 0.28 + a.shooting * 0.22 + a.pace * 0.14 + a.physical * 0.08;
  } else if (position === 'LM' || position === 'RM') {
    ovr = a.pace * 0.26 + a.dribbling * 0.26 + a.passing * 0.22 + a.shooting * 0.14 + a.physical * 0.12;
  } else if (position === 'LW' || position === 'RW') {
    ovr = a.pace * 0.28 + a.dribbling * 0.28 + a.shooting * 0.24 + a.passing * 0.12 + a.physical * 0.08;
  } else {
    // CF / ST
    ovr = a.shooting * 0.35 + a.pace * 0.2 + a.dribbling * 0.2 + a.physical * 0.15 + a.passing * 0.1;
  }

  return clamp(ovr);
}

export type PartialPlayer = Omit<Player, 'attributes' | 'ovr' | 'stats'> & {
  stats: PlayerSeasonStats;
  attributes?: Partial<PlayerAttributes>;
  ovr?: number;
};

/**
 * Fill attributes + ovr from stats/position/age. Explicit overrides win.
 */
export function enrichPlayer(partial: PartialPlayer): Player {
  const computed = computePlayerAttributes(partial.stats, partial.position, partial.age);
  const attributes: PlayerAttributes = {
    ...computed,
    ...partial.attributes,
    pace: partial.attributes?.pace ?? computed.pace,
    shooting: partial.attributes?.shooting ?? computed.shooting,
    passing: partial.attributes?.passing ?? computed.passing,
    dribbling: partial.attributes?.dribbling ?? computed.dribbling,
    defending: partial.attributes?.defending ?? computed.defending,
    physical: partial.attributes?.physical ?? computed.physical,
  };
  if (partial.position === 'GK') {
    attributes.goalkeeping = partial.attributes?.goalkeeping ?? computed.goalkeeping;
  } else if (partial.attributes?.goalkeeping != null) {
    attributes.goalkeeping = partial.attributes.goalkeeping;
  }

  const ovr = partial.ovr ?? computeOvr(attributes, partial.position);

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
