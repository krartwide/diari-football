import type { Team } from "@/types/football";
import { europeTeams } from "./europe";
import { southAmericaTeams } from "./southAmerica";
import { africaTeams } from "./africa";
import { asiaTeams } from "./asia";
import { concacafTeams } from "./concacaf";
import { oceaniaTeams } from "./oceania";

const merged = [
  ...europeTeams,
  ...southAmericaTeams,
  ...africaTeams,
  ...asiaTeams,
  ...concacafTeams,
  ...oceaniaTeams,
];

const byId = new Map<string, Team>();
for (const t of merged) {
  if (!byId.has(t.id)) byId.set(t.id, t);
}

export const ALL_OFFICIAL_TEAMS: Team[] = [...byId.values()].sort(
  (a, b) => a.fifaRank - b.fifaRank,
);

export function getOfficialTeam(id: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id || t.fifaCode === id);
}
