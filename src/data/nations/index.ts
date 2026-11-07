import type { Team } from '@/types/football';
import { europeTeams } from './europe';
import { southAmericaTeams } from './southAmerica';
import { africaTeams } from './africa';
import { asiaTeams } from './asia';
import { concacafTeams } from './concacaf';
import { oceaniaTeams } from './oceania';

export const ALL_OFFICIAL_TEAMS: Team[] = [
  ...europeTeams,
  ...southAmericaTeams,
  ...africaTeams,
  ...asiaTeams,
  ...concacafTeams,
  ...oceaniaTeams,
].sort((a, b) => a.fifaRank - b.fifaRank);

export function getOfficialTeam(id: string) {
  return ALL_OFFICIAL_TEAMS.find(t => t.id === id || t.fifaCode === id);
}
