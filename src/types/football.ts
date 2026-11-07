export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'CF' | 'ST';

export interface PlayerSeasonStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  fouls: number;
  interceptions: number;
  dribbleSuccessRate: number; // 0-100
  shotsOnTarget: number;
  shots: number;
  passAccuracy: number; // 0-100
  tacklesWon: number;
  cleanSheets?: number; // GK
  saves?: number; // GK
  goalsConceded?: number; // GK
}

export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  goalkeeping?: number;
}

export interface Player {
  id: string;
  name: string; // Korean transliteration preferred for display
  nameEn: string;
  number: number;
  position: Position;
  age: number;
  club: string;
  height: number;
  preferredFoot: 'L' | 'R' | 'B';
  stats: PlayerSeasonStats;
  attributes: PlayerAttributes;
  ovr: number;
  isCaptain?: boolean;
}

export type ManagerPersonality =
  | '공격적'
  | '수비적'
  | '균형'
  | '압박형'
  | '점유율'
  | '카리스마'
  | '냉철'
  | '열정적'
  | '실험적'
  | '수비우선';

export interface Manager {
  name: string;
  nameEn: string;
  nationality: string;
  personality: ManagerPersonality;
  preferredFormation: string;
  since: number;
}

export interface TeamTactics {
  formation: string; // e.g. '4-3-3'
  mentality: 'ultra-defensive' | 'defensive' | 'balanced' | 'attacking' | 'ultra-attacking';
  pressing: number; // 1-10
  tempo: number; // 1-10
  width: number; // 1-10
  buildUp: 'short' | 'mixed' | 'long';
  defensiveLine: number; // 1-10
}

export interface TeamColors {
  primary: string;
  secondary: string;
  accent: string;
  pattern?: 'solid' | 'stripes' | 'hoops' | 'checkered' | 'gradient';
}

export type Confederation = 'UEFA' | 'CONMEBOL' | 'CAF' | 'AFC' | 'CONCACAF' | 'OFC';

export interface Team {
  id: string;
  name: string; // Korean
  nameEn: string;
  fifaCode: string;
  visibility: 'public' | 'private';
  isOfficial: boolean;
  confederation: Confederation;
  fifaRank: number;
  colors: TeamColors;
  crestUrl?: string;
  photoUrl?: string;
  stadium: string;
  manager: Manager;
  tactics: TeamTactics;
  players: Player[];
  worldCupTitles?: number;
}

export type MatchMode =
  | 'single'
  | 'two_leg_aggregate'
  | 'home_and_away'
  | 'best_of_three'
  | 'best_of_five'
  | 'korean_series';

export interface MatchSettings {
  mode: MatchMode;
  homeAdvantage: boolean;
  competitionName: string;
  stageName?: string;
  kickoffIso?: string;
  venueOverride?: string;
  referee?: string;
  attendance?: number;
}

export interface TeamMatchStats {
  goals: number;
  possession: number;
  contestedPossession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  passes: number;
  passesCompleted: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  offsides: number;
  tackles: number;
  interceptions: number;
  saves: number;
}

export interface PlayerMatchLine {
  playerId: string;
  name: string;
  number: number;
  position: Position;
  started: boolean;
  onPitch: boolean;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCard: boolean;
  fouls: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passesCompleted: number;
  tackles: number;
  interceptions: number;
  injured: boolean;
  rating: number;
  isCaptain?: boolean;
  substitutedOn?: number;
  substitutedOff?: number;
}

export type MatchEventType =
  | 'kickoff'
  | 'half_time'
  | 'second_half'
  | 'full_time'
  | 'goal'
  | 'penalty_goal'
  | 'penalty_miss'
  | 'own_goal'
  | 'shot'
  | 'shot_on_target'
  | 'shot_blocked'
  | 'save'
  | 'foul'
  | 'yellow_card'
  | 'red_card'
  | 'second_yellow'
  | 'offside'
  | 'corner'
  | 'substitution'
  | 'injury'
  | 'commentary'
  | 'dribble'
  | 'interception';

export interface EventGraphic {
  goal?: {
    shotFrom: { x: number; y: number };
    trajectory: { x: number; y: number }[];
    goalEntry: { x: number; y: number };
    bodyPart: string;
    shotType: string;
  };
  foul?: {
    location: { x: number; y: number };
    foulerAction: string;
    severity: string;
    victimDirection: number;
  };
  offside?: {
    attacker: { x: number; y: number };
    ball: { x: number; y: number };
    defensiveLineY: number;
    offsideDistance: number;
  };
  generic?: {
    location: { x: number; y: number };
    label: string;
  };
}

export interface MatchEvent {
  id: string;
  minute: number;
  stoppage?: number;
  period: 1 | 2;
  type: MatchEventType;
  teamId: string;
  playerId?: string;
  playerName?: string;
  assistId?: string;
  assistName?: string;
  relatedPlayerId?: string;
  relatedPlayerName?: string;
  text: string;
  scoreAfter?: [number, number];
  graphic?: EventGraphic;
  meta?: Record<string, unknown>;
}

export interface MatchResult {
  id: string;
  createdAt: string;
  settings: MatchSettings;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homeStats: TeamMatchStats;
  awayStats: TeamMatchStats;
  homeLineup: PlayerMatchLine[];
  awayLineup: PlayerMatchLine[];
  events: MatchEvent[];
  playerOfTheMatch?: { playerId: string; teamId: string; name: string };
  seed: number;
  seriesId?: string;
  legIndex?: number;
}

export interface SeriesResult {
  id: string;
  createdAt: string;
  settings: MatchSettings;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  matches: MatchResult[];
  homeAggregate: number;
  awayAggregate: number;
  winnerTeamId?: string;
  status: 'completed' | 'in_progress';
}
