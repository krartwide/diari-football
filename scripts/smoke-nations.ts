import { ALL_OFFICIAL_TEAMS } from '../src/data/nations';

console.log('teams', ALL_OFFICIAL_TEAMS.length);
console.log('players', ALL_OFFICIAL_TEAMS.reduce((n, t) => n + t.players.length, 0));
console.log('unique codes', new Set(ALL_OFFICIAL_TEAMS.map((t) => t.fifaCode)).size);

const req = ['ESP', 'ARG', 'FRA', 'ENG', 'POR', 'BRA', 'MAR', 'KOR', 'JPN', 'USA', 'KAZ', 'NZL'];
for (const c of req) {
  const t = ALL_OFFICIAL_TEAMS.find((x) => x.fifaCode === c)!;
  const ovrs = t.players.map((p) => p.ovr);
  console.log(
    c,
    t.name,
    t.manager.nameEn,
    `n=${t.players.length}`,
    `ovr ${Math.min(...ovrs)}-${Math.max(...ovrs)}`,
    t.crestUrl,
  );
}

const short = ALL_OFFICIAL_TEAMS.filter((t) => t.players.length < 20).map((t) => t.name);
console.log('short', short);
