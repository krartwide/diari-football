#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate src/data/nations/*.ts from embedded roster data."""
from __future__ import annotations
import json, os, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "nations"
OUT.mkdir(parents=True, exist_ok=True)

def ser_player(p: dict) -> str:
    parts = [
        f'name: {json.dumps(p["name"], ensure_ascii=False)}',
        f'nameEn: {json.dumps(p["nameEn"], ensure_ascii=False)}',
        f'number: {p["number"]}',
        f'position: {json.dumps(p["position"])}',
        f'age: {p["age"]}',
        f'club: {json.dumps(p["club"], ensure_ascii=False)}',
        f'tier: {json.dumps(p.get("tier", "solid"))}',
    ]
    if p.get("isCaptain"):
        parts.append("isCaptain: true")
    return "{ " + ", ".join(parts) + " }"

def ser_team(t: dict) -> str:
    players = ",\n    ".join(ser_player(p) for p in t["players"])
    return f"""makeTeam({{
  name: {json.dumps(t["name"], ensure_ascii=False)},
  nameEn: {json.dumps(t["nameEn"], ensure_ascii=False)},
  fifaCode: {json.dumps(t["fifaCode"])},
  iso2: {json.dumps(t["iso2"])},
  confederation: {json.dumps(t["confederation"])},
  fifaRank: {t["fifaRank"]},
  colors: {json.dumps(t["colors"], ensure_ascii=False)},
  stadium: {json.dumps(t["stadium"], ensure_ascii=False)},
  manager: {json.dumps(t["manager"], ensure_ascii=False)},
  tactics: {json.dumps(t["tactics"], ensure_ascii=False)},
  worldCupTitles: {t.get("worldCupTitles", 0)},
  players: [
    {players}
  ],
}})"""

CONF_FILE = {
    "UEFA": "europe",
    "CONMEBOL": "southAmerica",
    "CAF": "africa",
    "AFC": "asia",
    "CONCACAF": "concacaf",
    "OFC": "oceania",
}

EXPORT = {
    "europe": "europeTeams",
    "southAmerica": "southAmericaTeams",
    "africa": "africaTeams",
    "asia": "asiaTeams",
    "concacaf": "concacafTeams",
    "oceania": "oceaniaTeams",
}

def write_all(teams: list[dict]):
    buckets = {k: [] for k in EXPORT}
    for t in teams:
        buckets[CONF_FILE[t["confederation"]]].append(t)
    for file, export in EXPORT.items():
        lst = buckets[file]
        body = "import { makeTeam } from './_helpers';\n\n"
        body += f"export const {export} = [\n" + ",\n".join(ser_team(t) for t in lst) + "\n];\n"
        (OUT / f"{file}.ts").write_text(body, encoding="utf-8")
        print(f"wrote {file}.ts ({len(lst)} teams)")
    index = """import type { Team } from '@/types/football';
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

export function getOfficialTeam(id: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id || t.fifaCode === id);
}
"""
    (OUT / "index.ts").write_text(index, encoding="utf-8")
    print(f"TOTAL {len(teams)} teams")

if __name__ == "__main__":
    data_path = Path(__file__).with_name("nations_data.json")
    teams = json.loads(data_path.read_text(encoding="utf-8"))
    write_all(teams)
