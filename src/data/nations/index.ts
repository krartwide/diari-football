import type { Team } from "@/types/football";

/** Populated by region modules; starts empty until nation files are generated. */
export const ALL_OFFICIAL_TEAMS: Team[] = [];

export function getOfficialTeam(id: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id || t.fifaCode === id);
}
