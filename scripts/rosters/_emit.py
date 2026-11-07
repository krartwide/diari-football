"""Shared helpers to emit TypeScript nation data files."""
from __future__ import annotations

import json
import os
from typing import Any

OUT = "/workspace/src/data/nations"


def esc(s: str) -> str:
    return str(s).replace("\\", "\\\\").serialize() if False else str(s).replace("\\", "\\\\").replace("'", "\\'")


def js_obj(obj: Any) -> str:
    """JSON object with unquoted keys for TS object literals."""
    return json.dumps(obj, ensure_ascii=False).replace('"([^"]+)":', r"\1:")  # noqa - fixed below


def to_ts_obj(obj: Any) -> str:
    if isinstance(obj, dict):
        parts = []
        for k, v in obj.items():
            parts.append(f"{k}: {to_ts_obj(v)}")
        return "{ " + ", ".join(parts) + " }"
    if isinstance(obj, list):
        return "[" + ", ".join(to_ts_obj(x) for x in obj) + "]"
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if isinstance(obj, (int, float)):
        return str(obj)
    if obj is None:
        return "undefined"
    return "'" + esc(str(obj)) + "'"


def serialize_player(pl: dict) -> str:
    extras = []
    for key in ("tier", "preferredFoot"):
        if key in pl and pl[key] is not None:
            extras.append(f"{key}: '{pl[key]}'")
    if pl.get("isCaptain"):
        extras.append("isCaptain: true")
    if pl.get("height"):
        extras.append(f"height: {pl['height']}")
    if pl.get("stats"):
        extras.append(f"stats: {to_ts_obj(pl['stats'])}")
    extra_str = f", {{ {', '.join(extras)} }}" if extras else ""
    return (
        f"      p('{esc(pl['name'])}', '{esc(pl['nameEn'])}', {pl['number']}, "
        f"'{pl['position']}', {pl['age']}, '{esc(pl['club'])}'{extra_str})"
    )


def serialize_team(t: dict) -> str:
    players = ",\n".join(serialize_player(pl) for pl in t["players"])
    wc = f",\n    worldCupTitles: {t['worldCupTitles']}" if t.get("worldCupTitles") is not None else ""
    return f"""  makeTeam({{
    name: '{esc(t["name"])}',
    nameEn: '{esc(t["nameEn"])}',
    fifaCode: '{t["fifaCode"]}',
    iso2: '{t["iso2"]}',
    confederation: '{t["confederation"]}',
    fifaRank: {t["fifaRank"]},
    colors: {to_ts_obj(t["colors"])},
    stadium: '{esc(t["stadium"])}',
    manager: {to_ts_obj(t["manager"])},
    tactics: {to_ts_obj(t["tactics"])},
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


def write_file(filename: str, export_name: str, teams: list[dict]) -> dict:
    os.makedirs(OUT, exist_ok=True)
    body = ",\n".join(serialize_team(t) for t in teams)
    content = HEADER.format(export_name=export_name) + body + ",\n];\n"
    path = os.path.join(OUT, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    players = sum(len(t["players"]) for t in teams)
    print(f"Wrote {filename}: {len(teams)} teams, {players} players")
    incomplete = [t["name"] for t in teams if len(t["players"]) < 20]
    return {
        "file": filename,
        "teams": len(teams),
        "players": players,
        "incomplete": incomplete,
        "names": [t["name"] for t in teams],
    }


def team(
    name: str,
    name_en: str,
    code: str,
    iso2: str,
    confed: str,
    rank: int,
    primary: str,
    secondary: str,
    accent: str,
    stadium: str,
    mgr_name: str,
    mgr_en: str,
    mgr_nat: str,
    personality: str,
    formation: str,
    since: int,
    players: list[dict],
    *,
    pattern: str = "solid",
    mentality: str = "balanced",
    pressing: int = 6,
    tempo: int = 6,
    width: int = 6,
    build_up: str = "mixed",
    defensive_line: int = 6,
    wc: int | None = None,
) -> dict:
    t: dict[str, Any] = {
        "name": name,
        "nameEn": name_en,
        "fifaCode": code,
        "iso2": iso2,
        "confederation": confed,
        "fifaRank": rank,
        "colors": {
            "primary": primary,
            "secondary": secondary,
            "accent": accent,
            "pattern": pattern,
        },
        "stadium": stadium,
        "manager": {
            "name": mgr_name,
            "nameEn": mgr_en,
            "nationality": mgr_nat,
            "personality": personality,
            "preferredFormation": formation,
            "since": since,
        },
        "tactics": {
            "formation": formation,
            "mentality": mentality,
            "pressing": pressing,
            "tempo": tempo,
            "width": width,
            "buildUp": build_up,
            "defensiveLine": defensive_line,
        },
        "players": players,
    }
    if wc is not None:
        t["worldCupTitles"] = wc
    return t


def pl(
    name: str,
    name_en: str,
    number: int,
    position: str,
    age: int,
    club: str,
    *,
    tier: str | None = None,
    captain: bool = False,
    foot: str | None = None,
    height: int | None = None,
) -> dict:
    d: dict[str, Any] = {
        "name": name,
        "nameEn": name_en,
        "number": number,
        "position": position,
        "age": age,
        "club": club,
    }
    if tier:
        d["tier"] = tier
    if captain:
        d["isCaptain"] = True
    if foot:
        d["preferredFoot"] = foot
    if height:
        d["height"] = height
    return d
