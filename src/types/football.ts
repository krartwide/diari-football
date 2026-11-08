import type { PlayStyleId } from "@/data/playstyles";

export type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "CF"
  | "ST";

/** FC 27 detailed outfield attributes (official card facets + sub-stats). */
export interface OutfieldDetailed {
  acceleration: number;
  sprintSpeed: number;
  positioning: number;
  finishing: number;
  shotPower: number;
  longShots: number;
  volleys: number;
  penalties: number;
  vision: number;
  crossing: number;
  fkAccuracy: number;
  shortPassing: number;
  longPassing: number;
  curve: number;
  agility: number;
  balance: number;
  reactions: number;
  ballControl: number;
  dribbling: number;
  composure: number;
  interceptions: number;
  headingAccuracy: number;
  defensiveAwareness: number;
  standingTackle: number;
  slidingTackle: number;
  jumping: number;
  stamina: number;
  strength: number;
  aggression: number;
}

export interface GoalkeeperDetailed {
  diving: number;
  handling: number;
  kicking: number;
  reflexes: number;
  speed: number;
  positioning: number;
}

/** Six card facets + optional detailed breakdown (EA FC 27). */
export interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  /** Average of GK facets when position is GK */
  goalkeeping?: number;
  detailed?: OutfieldDetailed;
  gkDetailed?: GoalkeeperDetailed;
}

export interface PlayerPlayStyle {
  id: PlayStyleId;
  /** true = PlayStyle+ (gold); false = base (silver) */
  plus: boolean;
}

export interface Player {
  id: string;
  name: string;
  nameEn: string;
  number: number;
  position: Position;
  age: number;
  club: string;
  height: number;
  preferredFoot: "L" | "R" | "B";
  attributes: PlayerAttributes;
  ovr: number;
  playstyles: PlayerPlayStyle[];
  isCaptain?: boolean;
  eaId?: number;
  weakFoot?: number;
  skillMoves?: number;
}

export type ManagerPersonality =
  | "공격적"
  | "수비적"
  | "균형"
  | "압박형"
  | "점유율"
  | "카리스마"
  | "냉철"
  | "열정적"
  | "실험적"
  | "수비우선";

export interface Manager {
  name: string;
  nameEn: string;
  nationality: string;
  personality: ManagerPersonality;
  preferredFormation: string;
  since: number;
}

export interface TeamTactics {
  formation: string;
  mentality: "ultra-defensive" | "defensive" | "balanced" | "attacking" | "ultra-attacking";
  pressing: number;
  tempo: number;
  width: number;
  buildUp: "short" | "mixed" | "long";
  defensiveLine: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  accent: string;
  pattern?: "solid" | "stripes" | "hoops" | "checkered" | "gradient";
}

export type Confederation = "UEFA" | "CONMEBOL" | "CAF" | "AFC" | "CONCACAF" | "OFC";

/** Public team browse categories */
export type TeamCategory =
  | "national"
  | "premier_league"
  | "bundesliga"
  | "laliga"
  | "serie_a"
  | "ligue_1"
  | "custom";

export interface Team {
  id: string;
  name: string;
  nameEn: string;
  fifaCode: string;
  visibility: "public" | "private";
  isOfficial: boolean;
  category: TeamCategory;
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
  leagueName?: string;
  eaClubId?: number;
}

export type MatchMode =
  | "single"
  | "two_leg_aggregate"
  | "home_and_away"
  | "best_of_three"
  | "best_of_five"
  | "korean_series";

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
  | "kickoff"
  | "half_time"
  | "second_half"
  | "full_time"
  | "goal"
  | "penalty_goal"
  | "penalty_miss"
  | "own_goal"
  | "shot"
  | "shot_on_target"
  | "shot_blocked"
  | "save"
  | "foul"
  | "yellow_card"
  | "red_card"
  | "second_yellow"
  | "offside"
  | "corner"
  | "substitution"
  | "injury"
  | "commentary"
  | "dribble"
  | "interception"
  | "pass"
  | "possession"
  | "tackle"
  | "clearance"
  | "throw_in"
  | "free_kick";

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
  status: "completed" | "in_progress";
}
