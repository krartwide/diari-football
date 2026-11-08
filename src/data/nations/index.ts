import type { Team, TeamCategory } from "@/types/football";
import raw from "@/data/generated/official-teams.json";

export const ALL_OFFICIAL_TEAMS: Team[] = (raw as Team[]).map((t) => ({
  ...t,
  category: t.category ?? "national",
  players: (t.players ?? []).map((p) => ({
    ...p,
    playstyles: p.playstyles ?? [],
  })),
}));

export const TEAM_CATEGORY_LABEL: Record<TeamCategory, string> = {
  national: "국가대표",
  premier_league: "프리미어 리그",
  bundesliga: "분데스리가",
  laliga: "라리가",
  serie_a: "세리에 A",
  ligue_1: "리그 1",
  custom: "커스텀",
};

export const PUBLIC_CATEGORIES: TeamCategory[] = [
  "national",
  "premier_league",
  "bundesliga",
  "laliga",
  "serie_a",
  "ligue_1",
];

export function getOfficialTeam(id: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id || t.fifaCode === id);
}

export function getOfficialByCategory(category: TeamCategory): Team[] {
  return ALL_OFFICIAL_TEAMS.filter((t) => t.category === category);
}
