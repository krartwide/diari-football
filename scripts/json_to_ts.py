#!/usr/bin/env python3
import json, os, sys

OUT = "/workspace/src/data/nations"

def esc(s):
    return str(s).replace("\\", "\\\\").replace("'", "\\'")

def to_ts(obj):
    if isinstance(obj, dict):
        return "{ " + ", ".join(f"{k}: {to_ts(v)}" for k, v in obj.items()) + " }"
    if isinstance(obj, list):
        return "[" + ", ".join(to_ts(x) for x in obj) + "]"
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if isinstance(obj, (int, float)):
        return str(obj)
    if obj is None:
        return "undefined"
    return "'" + esc(obj) + "'"

def ser_player(pl):
    extras = []
    if pl.get("tier"):
        extras.append(f"tier: '{pl['tier']}'")
    if pl.get("isCaptain"):
        extras.append("isCaptain: true")
    if pl.get("height"):
        extras.append(f"height: {pl['height']}")
    if pl.get("preferredFoot"):
        extras.append(f"preferredFoot: '{pl['preferredFoot']}'")
    if pl.get("stats"):
        extras.append(f"stats: {to_ts(pl['stats'])}")
    extra = f", {{ {', '.join(extras)} }}" if extras else ""
    return f"      p('{esc(pl['name'])}', '{esc(pl['nameEn'])}', {pl['number']}, '{pl['position']}', {pl['age']}, '{esc(pl['club'])}'{extra})"

def ser_team(t):
    players = ",\n".join(ser_player(pl) for pl in t["players"])
    wc = f",\n    worldCupTitles: {t['worldCupTitles']}" if t.get("worldCupTitles") is not None else ""
    return f"""  makeTeam({{
    name: '{esc(t['name'])}',
    nameEn: '{esc(t['nameEn'])}',
    fifaCode: '{t['fifaCode']}',
    iso2: '{t['iso2']}',
    confederation: '{t['confederation']}',
    fifaRank: {t['fifaRank']},
    colors: {to_ts(t['colors'])},
    stadium: '{esc(t['stadium'])}',
    manager: {to_ts(t['manager'])},
    tactics: {to_ts(t['tactics'])},
    players: [
{players}
    ]{wc},
  }})"""

HEADER = """import type {{ Team }} from '@/types/football';
import {{ makeTeam, type RawPlayer }} from './_helpers';

function p(
  name: string,
  nameEn: string,
  number: number,
  position: RawPlayer['position'],
  age: number,
  club: string,
  extra: Partial<RawPlayer> = {{}},
): RawPlayer {{
  return {{ name, nameEn, number, position, age, club, ...extra }};
}}

export const {export_name}: Team[] = [
"""

def convert(json_path, ts_name, export_name):
    with open(json_path, encoding="utf-8") as f:
        teams = json.load(f)
    body = ",\n".join(ser_team(t) for t in teams)
    content = HEADER.format(export_name=export_name) + body + ",\n];\n"
    out = os.path.join(OUT, ts_name)
    with open(out, "w", encoding="utf-8") as f:
        f.write(content)
    pc = sum(len(t["players"]) for t in teams)
    print(f"{ts_name}: {len(teams)} teams, {pc} players")
    return teams

if __name__ == "__main__":
    convert(sys.argv[1], sys.argv[2], sys.argv[3])
