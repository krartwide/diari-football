import { nanoid } from "nanoid";
import type {
  MatchMode,
  MatchResult,
  MatchSettings,
  SeriesResult,
  Team,
} from "@/types/football";
import { simulateMatch } from "./engine";

export const MATCH_MODES: {
  id: MatchMode;
  name: string;
  description: string;
  legs: number;
  winType: "single" | "aggregate" | "series_wins";
  winsNeeded?: number;
}[] = [
  {
    id: "single",
    name: "단판 승부",
    description: "한 경기로 승패를 가립니다.",
    legs: 1,
    winType: "single",
  },
  {
    id: "two_leg_aggregate",
    name: "2판 합산 점수",
    description: "홈&어웨이 2경기 총 득점으로 승자를 가립니다.",
    legs: 2,
    winType: "aggregate",
  },
  {
    id: "home_and_away",
    name: "홈 앤 어웨이",
    description: "서로 홈을 한 번씩 치른 뒤 합산합니다.",
    legs: 2,
    winType: "aggregate",
  },
  {
    id: "best_of_three",
    name: "3판 2선승",
    description: "먼저 2승을 거둔 팀이 승리합니다.",
    legs: 3,
    winType: "series_wins",
    winsNeeded: 2,
  },
  {
    id: "best_of_five",
    name: "5판 3선승",
    description: "먼저 3승을 거둔 팀이 승리합니다.",
    legs: 5,
    winType: "series_wins",
    winsNeeded: 3,
  },
  {
    id: "korean_series",
    name: "한국시리즈형 7전 4선승",
    description: "최대 7경기, 먼저 4승하면 종료합니다.",
    legs: 7,
    winType: "series_wins",
    winsNeeded: 4,
  },
];

function swapHome(settings: MatchSettings, leg: number, mode: MatchMode): boolean {
  if (!settings.homeAdvantage) return false;
  if (mode === "single") return true;
  // odd legs: original home, even: swapped
  return leg % 2 === 1;
}

export function simulateSeries(
  teamA: Team,
  teamB: Team,
  settings: MatchSettings,
): SeriesResult {
  const modeMeta = MATCH_MODES.find((m) => m.id === settings.mode) ?? MATCH_MODES[0]!;
  const matches: MatchResult[] = [];
  let homeWins = 0;
  let awayWins = 0;
  let homeAgg = 0;
  let awayAgg = 0;
  const seriesId = nanoid(12);

  for (let leg = 1; leg <= modeMeta.legs; leg++) {
    const aIsHome = swapHome(settings, leg, settings.mode);
    const home = aIsHome ? teamA : teamB;
    const away = aIsHome ? teamB : teamA;

    const legSettings: MatchSettings = {
      ...settings,
      stageName: settings.stageName
        ? `${settings.stageName} ${leg}경기`
        : `${modeMeta.name} ${leg}/${modeMeta.legs}`,
      homeAdvantage: settings.homeAdvantage,
    };

    const result = simulateMatch(home, away, legSettings, Date.now() + leg * 997);
    result.seriesId = seriesId;
    result.legIndex = leg;
    matches.push(result);

    // Aggregate from teamA perspective
    if (aIsHome) {
      homeAgg += result.homeScore;
      awayAgg += result.awayScore;
      if (result.homeScore > result.awayScore) homeWins++;
      else if (result.awayScore > result.homeScore) awayWins++;
    } else {
      homeAgg += result.awayScore;
      awayAgg += result.homeScore;
      if (result.awayScore > result.homeScore) homeWins++;
      else if (result.homeScore > result.awayScore) awayWins++;
    }

    if (modeMeta.winType === "series_wins" && modeMeta.winsNeeded) {
      if (homeWins >= modeMeta.winsNeeded || awayWins >= modeMeta.winsNeeded) break;
    }
  }

  let winnerTeamId: string | undefined;
  if (modeMeta.winType === "series_wins") {
    if (homeWins > awayWins) winnerTeamId = teamA.id;
    else if (awayWins > homeWins) winnerTeamId = teamB.id;
  } else if (modeMeta.winType === "aggregate" || modeMeta.winType === "single") {
    if (homeAgg > awayAgg) winnerTeamId = teamA.id;
    else if (awayAgg > homeAgg) winnerTeamId = teamB.id;
  }

  return {
    id: seriesId,
    createdAt: new Date().toISOString(),
    settings,
    homeTeamId: teamA.id,
    awayTeamId: teamB.id,
    homeTeamName: teamA.name,
    awayTeamName: teamB.name,
    matches,
    homeAggregate: homeAgg,
    awayAggregate: awayAgg,
    winnerTeamId,
    status: "completed",
  };
}
