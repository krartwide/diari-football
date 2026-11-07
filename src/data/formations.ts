import type { Position } from '@/types/football';

/** Pitch slot: 0 = leftmost, higher = further right within a line */
export interface FormationSlot {
  id: string;
  position: Position;
  /** 0–1 vertical (0 = GK line, 1 = furthest forward) */
  y: number;
  /** 0–1 horizontal (0 = left wing, 1 = right wing) */
  x: number;
}

export interface Formation {
  id: string;
  name: string;
  slots: FormationSlot[];
}

export const FORMATIONS: Record<string, Formation> = {
  '4-3-3': {
    id: '4-3-3',
    name: '4-3-3',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lb', position: 'LB', y: 0.28, x: 0.12 },
      { id: 'lcb', position: 'CB', y: 0.25, x: 0.35 },
      { id: 'rcb', position: 'CB', y: 0.25, x: 0.65 },
      { id: 'rb', position: 'RB', y: 0.28, x: 0.88 },
      { id: 'lcm', position: 'CM', y: 0.48, x: 0.28 },
      { id: 'cdm', position: 'CDM', y: 0.45, x: 0.5 },
      { id: 'rcm', position: 'CM', y: 0.48, x: 0.72 },
      { id: 'lw', position: 'LW', y: 0.72, x: 0.15 },
      { id: 'st', position: 'ST', y: 0.82, x: 0.5 },
      { id: 'rw', position: 'RW', y: 0.72, x: 0.85 },
    ],
  },
  '4-2-3-1': {
    id: '4-2-3-1',
    name: '4-2-3-1',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lb', position: 'LB', y: 0.28, x: 0.12 },
      { id: 'lcb', position: 'CB', y: 0.25, x: 0.35 },
      { id: 'rcb', position: 'CB', y: 0.25, x: 0.65 },
      { id: 'rb', position: 'RB', y: 0.28, x: 0.88 },
      { id: 'lcdm', position: 'CDM', y: 0.42, x: 0.35 },
      { id: 'rcdm', position: 'CDM', y: 0.42, x: 0.65 },
      { id: 'lam', position: 'LM', y: 0.62, x: 0.15 },
      { id: 'cam', position: 'CAM', y: 0.65, x: 0.5 },
      { id: 'ram', position: 'RM', y: 0.62, x: 0.85 },
      { id: 'st', position: 'ST', y: 0.85, x: 0.5 },
    ],
  },
  '4-4-2': {
    id: '4-4-2',
    name: '4-4-2',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lb', position: 'LB', y: 0.28, x: 0.12 },
      { id: 'lcb', position: 'CB', y: 0.25, x: 0.35 },
      { id: 'rcb', position: 'CB', y: 0.25, x: 0.65 },
      { id: 'rb', position: 'RB', y: 0.28, x: 0.88 },
      { id: 'lm', position: 'LM', y: 0.52, x: 0.12 },
      { id: 'lcm', position: 'CM', y: 0.5, x: 0.35 },
      { id: 'rcm', position: 'CM', y: 0.5, x: 0.65 },
      { id: 'rm', position: 'RM', y: 0.52, x: 0.88 },
      { id: 'lst', position: 'ST', y: 0.8, x: 0.38 },
      { id: 'rst', position: 'ST', y: 0.8, x: 0.62 },
    ],
  },
  '3-5-2': {
    id: '3-5-2',
    name: '3-5-2',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lcb', position: 'CB', y: 0.26, x: 0.25 },
      { id: 'cb', position: 'CB', y: 0.24, x: 0.5 },
      { id: 'rcb', position: 'CB', y: 0.26, x: 0.75 },
      { id: 'lwb', position: 'LWB', y: 0.48, x: 0.08 },
      { id: 'lcm', position: 'CM', y: 0.48, x: 0.32 },
      { id: 'cdm', position: 'CDM', y: 0.42, x: 0.5 },
      { id: 'rcm', position: 'CM', y: 0.48, x: 0.68 },
      { id: 'rwb', position: 'RWB', y: 0.48, x: 0.92 },
      { id: 'lst', position: 'ST', y: 0.8, x: 0.38 },
      { id: 'rst', position: 'CF', y: 0.8, x: 0.62 },
    ],
  },
  '3-4-2-1': {
    id: '3-4-2-1',
    name: '3-4-2-1',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lcb', position: 'CB', y: 0.26, x: 0.25 },
      { id: 'cb', position: 'CB', y: 0.24, x: 0.5 },
      { id: 'rcb', position: 'CB', y: 0.26, x: 0.75 },
      { id: 'lm', position: 'LM', y: 0.48, x: 0.1 },
      { id: 'lcm', position: 'CM', y: 0.45, x: 0.35 },
      { id: 'rcm', position: 'CM', y: 0.45, x: 0.65 },
      { id: 'rm', position: 'RM', y: 0.48, x: 0.9 },
      { id: 'lam', position: 'CAM', y: 0.68, x: 0.32 },
      { id: 'ram', position: 'CAM', y: 0.68, x: 0.68 },
      { id: 'st', position: 'ST', y: 0.86, x: 0.5 },
    ],
  },
  '4-1-4-1': {
    id: '4-1-4-1',
    name: '4-1-4-1',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lb', position: 'LB', y: 0.28, x: 0.12 },
      { id: 'lcb', position: 'CB', y: 0.25, x: 0.35 },
      { id: 'rcb', position: 'CB', y: 0.25, x: 0.65 },
      { id: 'rb', position: 'RB', y: 0.28, x: 0.88 },
      { id: 'cdm', position: 'CDM', y: 0.4, x: 0.5 },
      { id: 'lm', position: 'LM', y: 0.58, x: 0.12 },
      { id: 'lcm', position: 'CM', y: 0.55, x: 0.35 },
      { id: 'rcm', position: 'CM', y: 0.55, x: 0.65 },
      { id: 'rm', position: 'RM', y: 0.58, x: 0.88 },
      { id: 'st', position: 'ST', y: 0.84, x: 0.5 },
    ],
  },
  '5-3-2': {
    id: '5-3-2',
    name: '5-3-2',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lwb', position: 'LWB', y: 0.35, x: 0.08 },
      { id: 'lcb', position: 'CB', y: 0.26, x: 0.28 },
      { id: 'cb', position: 'CB', y: 0.24, x: 0.5 },
      { id: 'rcb', position: 'CB', y: 0.26, x: 0.72 },
      { id: 'rwb', position: 'RWB', y: 0.35, x: 0.92 },
      { id: 'lcm', position: 'CM', y: 0.52, x: 0.28 },
      { id: 'cdm', position: 'CDM', y: 0.48, x: 0.5 },
      { id: 'rcm', position: 'CM', y: 0.52, x: 0.72 },
      { id: 'lst', position: 'ST', y: 0.8, x: 0.38 },
      { id: 'rst', position: 'ST', y: 0.8, x: 0.62 },
    ],
  },
  '4-1-2-3': {
    id: '4-1-2-3',
    name: '4-1-2-3',
    slots: [
      { id: 'gk', position: 'GK', y: 0.05, x: 0.5 },
      { id: 'lb', position: 'LB', y: 0.28, x: 0.12 },
      { id: 'lcb', position: 'CB', y: 0.25, x: 0.35 },
      { id: 'rcb', position: 'CB', y: 0.25, x: 0.65 },
      { id: 'rb', position: 'RB', y: 0.28, x: 0.88 },
      { id: 'cdm', position: 'CDM', y: 0.42, x: 0.5 },
      { id: 'lcm', position: 'CM', y: 0.55, x: 0.35 },
      { id: 'rcm', position: 'CM', y: 0.55, x: 0.65 },
      { id: 'lw', position: 'LW', y: 0.75, x: 0.15 },
      { id: 'st', position: 'ST', y: 0.85, x: 0.5 },
      { id: 'rw', position: 'RW', y: 0.75, x: 0.85 },
    ],
  },
};

export const FORMATION_LIST = Object.values(FORMATIONS);

export function getFormation(id: string): Formation | undefined {
  return FORMATIONS[id];
}

/** How well a player's natural position fits a formation slot (0–1+). */
export function positionFit(playerPos: Position, slotPos: Position): number {
  if (playerPos === slotPos) return 1.15;
  const groups: Position[][] = [
    ['GK'],
    ['CB'],
    ['LB', 'LWB', 'LM', 'LW'],
    ['RB', 'RWB', 'RM', 'RW'],
    ['CDM', 'CM', 'CAM'],
    ['LM', 'RM', 'LW', 'RW'],
    ['ST', 'CF', 'CAM', 'LW', 'RW'],
  ];
  for (const g of groups) {
    if (g.includes(playerPos) && g.includes(slotPos)) return 0.85;
  }
  if (playerPos === 'GK' || slotPos === 'GK') return 0.05;
  return 0.45;
}
