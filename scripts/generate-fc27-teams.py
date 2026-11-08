#!/usr/bin/env python3
"""Build official teams JSON from EA FC 27 ratings CSV (EA ratings API snapshot)."""

from __future__ import annotations

import csv
import json
import math
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = Path("/tmp/fc27/players.csv")
NT_META_PATH = Path("/tmp/fc27/nt-meta.json")
OUT_PATH = ROOT / "src/data/generated/official-teams.json"

LEAGUES = {
    "Premier League": {
        "category": "premier_league",
        "confederation": "UEFA",
        "nameKo": "프리미어 리그",
        "code": "EPL",
    },
    "Bundesliga": {
        "category": "bundesliga",
        "confederation": "UEFA",
        "nameKo": "분데스리가",
        "code": "BUN",
    },
    "LALIGA EA SPORTS": {
        "category": "laliga",
        "confederation": "UEFA",
        "nameKo": "라리가",
        "code": "LAL",
    },
    "Serie A Enilive": {
        "category": "serie_a",
        "confederation": "UEFA",
        "nameKo": "세리에 A",
        "code": "SEA",
    },
    "Ligue 1 McDonald's": {
        "category": "ligue_1",
        "confederation": "UEFA",
        "nameKo": "리그 1",
        "code": "FL1",
    },
}

CLUB_KO = {
    "Arsenal": "아스널",
    "Aston Villa": "애스턴 빌라",
    "Chelsea": "첼시",
    "Everton": "에버턴",
    "Liverpool": "리버풀",
    "Manchester City": "맨체스터 시티",
    "Man Utd": "맨체스터 유나이티드",
    "Newcastle Utd": "뉴캐슬 유나이티드",
    "Nott'm Forest": "노팅엄 포레스트",
    "Spurs": "토트넘 홋스퍼",
    "Fulham": "풀럼",
    "Crystal Palace": "크리스털 팰리스",
    "Brighton": "브라이턴",
    "Brentford": "브렌트퍼드",
    "AFC Bournemouth": "본머스",
    "Leeds United": "리즈 유나이티드",
    "Sunderland": "선덜랜드",
    "Coventry City": "코번트리 시티",
    "Hull City": "헐 시티",
    "Ipswich": "입스위치 타운",
    "FC Bayern München": "바이에른 뮌헨",
    "Borussia Dortmund": "도르트문트",
    "Leverkusen": "레버쿠젠",
    "RB Leipzig": "RB 라이프치히",
    "Frankfurt": "프랑크푸르트",
    "VfB Stuttgart": "슈투트가르트",
    "M'gladbach": "뫼헨글라트바흐",
    "VfL Wolfsburg": "볼프스부르크",
    "SC Freiburg": "프라이부르크",
    "SV Werder Bremen": "베르더 브레멘",
    "1. FSV Mainz 05": "마인츠",
    "Union Berlin": "우니온 베를린",
    "TSG Hoffenheim": "호펜하임",
    "FC Augsburg": "아우크스부르크",
    "1. FC Köln": "쾰른",
    "Hamburger SV": "함부르크",
    "FC Schalke 04": "샬케 04",
    "SV Elversberg": "엘버스베르크",
    "SC Paderborn 07": "파더보른",
    "Real Madrid": "레알 마드리드",
    "FC Barcelona": "바르셀로나",
    "Atlético de Madrid": "아틀레티코 마드리드",
    "Athletic Club": "아틀레틱 빌바오",
    "Real Sociedad": "레알 소시에다드",
    "Real Betis": "레알 베티스",
    "Villarreal CF": "비야레알",
    "Valencia CF": "발렌시아",
    "Sevilla FC": "세비야",
    "Celta": "셀타",
    "RCD Espanyol": "에스파뇰",
    "Getafe CF": "헤타페",
    "CA Osasuna": "오사수나",
    "Rayo Vallecano": "라요 바예카노",
    "D. Alavés": "알라베스",
    "R. Racing Club": "라싱 산탄데르",
    "Elche CF": "엘체",
    "Levante UD": "레반테",
    "Málaga CF": "말라가",
    "RC Deportivo": "데포르티보",
    "Juventus": "유벤투스",
    "SSC Napoli": "나폴리",
    "AS Roma": "로마",
    "Milano FC": "인터 밀란",
    "Lombardia FC": "AC 밀란",
    "SS Lazio": "라치오",
    "Fiorentina": "피오렌티나",
    "Bergamo Calcio": "아탈란타",
    "Bologna": "볼로냐",
    "Torino": "토리노",
    "Udinese": "우디네세",
    "Genoa": "제노아",
    "Cagliari": "칼리아리",
    "Como": "코모",
    "Lecce": "레체",
    "Sassuolo": "사수올로",
    "Monza": "몬차",
    "Parma": "파르마",
    "Venezia": "베네치아",
    "Frosinone": "프로시노네",
    "Paris SG": "파리 생제르맹",
    "OM": "올랭피크 마르세유",
    "OL": "올랭피크 리옹",
    "AS Monaco": "모나코",
    "LOSC Lille": "릴",
    "OGC Nice": "니스",
    "Stade Rennais FC": "렌",
    "RC Lens": "랑스",
    "Strasbourg": "스트라스부르",
    "Toulouse FC": "툴루즈",
    "Stade Brestois 29": "브레스트",
    "FC Lorient": "로리앙",
    "Angers SCO": "앙제",
    "Havre AC": "르아브르",
    "AJ Auxerre": "오세르",
    "Paris FC": "파리 FC",
    "ESTAC Troyes": "트루아",
    "Le Mans FC": "르망",
}

CLUB_COLORS = {
    "Arsenal": ("#EF0107", "#FFFFFF", "#063672"),
    "Chelsea": ("#034694", "#FFFFFF", "#DBA111"),
    "Liverpool": ("#C8102E", "#FFFFFF", "#00B2A9"),
    "Manchester City": ("#6CABDD", "#FFFFFF", "#1C2C5B"),
    "Man Utd": ("#DA291C", "#FBE122", "#000000"),
    "Spurs": ("#132257", "#FFFFFF", "#FFFFFF"),
    "Real Madrid": ("#FFFFFF", "#00529F", "#EEBB00"),
    "FC Barcelona": ("#A50044", "#004D98", "#FFED02"),
    "Atlético de Madrid": ("#CB3524", "#FFFFFF", "#1E2B5E"),
    "FC Bayern München": ("#DC052D", "#FFFFFF", "#0066B2"),
    "Borussia Dortmund": ("#FDE100", "#000000", "#FFFFFF"),
    "Juventus": ("#000000", "#FFFFFF", "#FFD700"),
    "SSC Napoli": ("#12A0D7", "#FFFFFF", "#003366"),
    "Paris SG": ("#004170", "#DA291C", "#FFFFFF"),
    "Milano FC": ("#010E80", "#000000", "#FFFFFF"),
    "Lombardia FC": ("#FB090B", "#000000", "#FFFFFF"),
}

PLAYSTYLE_EA = {
    "gamechanger": "Gamechanger",
    "acrobatic": "Acrobatic",
    "chip shot": "Chip Shot",
    "dead ball": "Dead Ball",
    "finesse shot": "Finesse Shot",
    "low driven shot": "Low Driven Shot",
    "precision header": "Precision Header",
    "power shot": "Power Shot",
    "incisive pass": "Incisive Pass",
    "inventive": "Inventive",
    "long ball pass": "Long Ball Pass",
    "pinged pass": "Pinged Pass",
    "tiki taka": "Tiki Taka",
    "whipped pass": "Whipped Pass",
    "first touch": "First Touch",
    "press proven": "Press Proven",
    "rapid": "Rapid",
    "technical": "Technical",
    "trickster": "Trickster",
    "aerial fortress": "Aerial Fortress",
    "anticipate": "Anticipate",
    "block": "Block",
    "intercept": "Intercept",
    "jockey": "Jockey",
    "slide tackle": "Slide Tackle",
    "bruiser": "Bruiser",
    "enforcer": "Enforcer",
    "long throw": "Long Throw",
    "quick step": "Quick Step",
    "relentless": "Relentless",
    "rush out": "Rush Out",
    "1v1 close down": "Rush Out",
    "cross claimer": "Cross Claimer",
    "deflector": "Deflector",
    "far reach": "Far Reach",
    "far throw": "Far Throw",
    "footwork": "Footwork",
}

EA_TO_ID = {v.lower(): k for k, v in {
    "gamechanger": "gamechanger",
    "acrobatic": "acrobatic",
    "chip_shot": "chip_shot",
    "dead_ball": "dead_ball",
    "finesse_shot": "finesse_shot",
    "low_driven_shot": "low_driven_shot",
    "precision_header": "precision_header",
    "power_shot": "power_shot",
    "incisive_pass": "incisive_pass",
    "inventive": "inventive",
    "long_ball_pass": "long_ball_pass",
    "pinged_pass": "pinged_pass",
    "tiki_taka": "tiki_taka",
    "whipped_pass": "whipped_pass",
    "first_touch": "first_touch",
    "press_proven": "press_proven",
    "rapid": "rapid",
    "technical": "technical",
    "trickster": "trickster",
    "aerial_fortress": "aerial_fortress",
    "anticipate": "anticipate",
    "block": "block",
    "intercept": "intercept",
    "jockey": "jockey",
    "slide_tackle": "slide_tackle",
    "bruiser": "bruiser",
    "enforcer": "enforcer",
    "long_throw": "long_throw",
    "quick_step": "quick_step",
    "relentless": "relentless",
    "rush_out": "rush_out",
    "cross_claimer": "cross_claimer",
    "deflector": "deflector",
    "far_reach": "far_reach",
    "far_throw": "far_throw",
    "footwork": "footwork",
}.items()}

# map EA label -> id
LABEL_TO_ID = {
    "Gamechanger": "gamechanger",
    "Acrobatic": "acrobatic",
    "Chip Shot": "chip_shot",
    "Dead Ball": "dead_ball",
    "Finesse Shot": "finesse_shot",
    "Low Driven Shot": "low_driven_shot",
    "Precision Header": "precision_header",
    "Power Shot": "power_shot",
    "Incisive Pass": "incisive_pass",
    "Inventive": "inventive",
    "Long Ball Pass": "long_ball_pass",
    "Pinged Pass": "pinged_pass",
    "Tiki Taka": "tiki_taka",
    "Whipped Pass": "whipped_pass",
    "First Touch": "first_touch",
    "Press Proven": "press_proven",
    "Rapid": "rapid",
    "Technical": "technical",
    "Trickster": "trickster",
    "Aerial Fortress": "aerial_fortress",
    "Anticipate": "anticipate",
    "Block": "block",
    "Intercept": "intercept",
    "Jockey": "jockey",
    "Slide Tackle": "slide_tackle",
    "Bruiser": "bruiser",
    "Enforcer": "enforcer",
    "Long Throw": "long_throw",
    "Quick Step": "quick_step",
    "Relentless": "relentless",
    "Rush Out": "rush_out",
    "1v1 Close Down": "rush_out",
    "Cross Claimer": "cross_claimer",
    "Deflector": "deflector",
    "Far Reach": "far_reach",
    "Far Throw": "far_throw",
    "Footwork": "footwork",
}

NAT_ALIASES = {
    "Korea Republic": "South Korea",
    "United States": "United States",
    "USA": "United States",
    "Turkey": "Türkiye",
    "Türkiye": "Türkiye",
    "Czech Republic": "Czechia",
    "Czechia": "Czechia",
    "China PR": "China",
    "Congo DR": "DR Congo",
    "Côte d'Ivoire": "Ivory Coast",
    "Ivory Coast": "Ivory Coast",
    "Republic of Ireland": "Ireland",
    "Holland": "Netherlands",
    "Netherlands": "Netherlands",
    "Cape Verde Islands": "Cape Verde",
    "Cabo Verde": "Cape Verde",
    "Bosnia and Herzegovina": "Bosnia and Herzegovina",
    "North Macedonia": "North Macedonia",
    "Hong Kong": "Hong Kong",
    "Trinidad and Tobago": "Trinidad and Tobago",
    "Korea DPR": "North Korea",
}


def ni(v, default=50):
    try:
        if v is None or v == "":
            return default
        return int(float(v))
    except Exception:
        return default


def age_from_birth(birth: str) -> int:
    # 1998-12-20 or 12/20/1998 0:00
    birth = (birth or "").strip()
    if not birth:
        return 25
    for fmt in ("%Y-%m-%d", "%m/%d/%Y %H:%M", "%m/%d/%Y"):
        try:
            dt = datetime.strptime(birth.split(".")[0], fmt)
            today = datetime(2026, 9, 1)
            return max(16, min(45, today.year - dt.year - ((today.month, today.day) < (dt.month, dt.day))))
        except Exception:
            continue
    return 25


def slug(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:48] or "x"


def parse_playstyles(raw: str):
    out = []
    seen = set()
    for part in (raw or "").split(","):
        label = part.strip()
        if not label:
            continue
        plus = label.endswith("+")
        if plus:
            label = label[:-1].strip()
        pid = LABEL_TO_ID.get(label)
        if not pid:
            continue
        key = f"{pid}:{plus}"
        if key in seen:
            continue
        seen.add(key)
        out.append({"id": pid, "plus": plus})
    return out


def foot(v: str) -> str:
    v = (v or "").lower()
    if "left" in v:
        return "L"
    if "right" in v:
        return "R"
    return "R"


def display_name(row: dict) -> str:
    cn = (row.get("common_name") or "").strip()
    if cn:
        return cn
    return f"{row.get('first_name','').strip()} {row.get('last_name','').strip()}".strip()


def position(row: dict) -> str:
    p = (row.get("position") or "CM").upper()
    allowed = {
        "GK", "CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "CF", "ST",
    }
    return p if p in allowed else "CM"


def squad_numbers(players: list[dict]) -> None:
    used = set()
    for i, p in enumerate(players):
        n = 1 if p["position"] == "GK" else (i + 1)
        while n in used or n < 1:
            n += 1
        if n > 99:
            n = 99 - (i % 30)
            while n in used:
                n -= 1
        used.add(n)
        p["number"] = n


def row_to_player(row: dict, team_code: str, idx: int) -> dict:
    name = display_name(row)
    ovr = ni(row["overall_rating"], 60)
    pos = position(row)
    is_gk = pos == "GK"
    pac = ni(row["pace"])
    sho = ni(row["shooting"])
    pas = ni(row["passing"])
    dri = ni(row["dribbling"])
    deff = ni(row["defending"])
    phy = ni(row["physicality"])
    detailed = {
        "acceleration": ni(row["movement_acceleration"], pac),
        "sprintSpeed": ni(row["movement_sprint_speed"], pac),
        "positioning": ni(row["mentality_positioning"], sho),
        "finishing": ni(row["attacking_finishing"], sho),
        "shotPower": ni(row["power_shot_power"], sho),
        "longShots": ni(row["power_long_shots"], sho),
        "volleys": ni(row["attacking_volleys"], sho),
        "penalties": ni(row["mentality_penalties"], sho),
        "vision": ni(row["mentality_vision"], pas),
        "crossing": ni(row["attacking_crossing"], pas),
        "fkAccuracy": ni(row["skill_fk_accuracy"], pas),
        "shortPassing": ni(row["attacking_short_passing"], pas),
        "longPassing": ni(row["skill_long_passing"], pas),
        "curve": ni(row["skill_curve"], pas),
        "agility": ni(row["movement_agility"], dri),
        "balance": ni(row["movement_balance"], dri),
        "reactions": ni(row["movement_reactions"], dri),
        "ballControl": ni(row["skill_ball_control"], dri),
        "dribbling": ni(row["skill_dribbling"], dri),
        "composure": ni(row["mentality_composure"], dri),
        "interceptions": ni(row["mentality_interceptions"], deff),
        "headingAccuracy": ni(row["attacking_heading_accuracy"], deff),
        "defensiveAwareness": ni(row["defending_awareness"], deff),
        "standingTackle": ni(row["defending_standing_tackle"], deff),
        "slidingTackle": ni(row["defending_sliding_tackle"], deff),
        "jumping": ni(row["power_jumping"], phy),
        "stamina": ni(row["power_stamina"], phy),
        "strength": ni(row["power_strength"], phy),
        "aggression": ni(row["mentality_aggression"], phy),
    }
    gk_detailed = {
        "diving": ni(row["goalkeeping_diving"]),
        "handling": ni(row["goalkeeping_handling"]),
        "kicking": ni(row["goalkeeping_kicking"]),
        "reflexes": ni(row["goalkeeping_reflexes"]),
        "speed": pac,
        "positioning": ni(row["goalkeeping_positioning"]),
    }
    gk_avg = round(
        (
            gk_detailed["diving"]
            + gk_detailed["handling"]
            + gk_detailed["kicking"]
            + gk_detailed["reflexes"]
            + gk_detailed["positioning"]
        )
        / 5
    )
    attrs = {
        "pace": pac,
        "shooting": sho,
        "passing": pas,
        "dribbling": dri,
        "defending": deff,
        "physical": phy,
        "detailed": detailed,
    }
    if is_gk:
        attrs["goalkeeping"] = gk_avg
        attrs["gkDetailed"] = gk_detailed

    return {
        "id": f"{team_code.lower()}-{row['player_id']}",
        "name": name,
        "nameEn": name,
        "number": idx + 1,
        "position": pos,
        "age": age_from_birth(row.get("birthdate", "")),
        "club": row.get("club") or "",
        "height": ni(row.get("height_cm"), 180),
        "preferredFoot": foot(row.get("preferred_foot", "")),
        "attributes": attrs,
        "ovr": ovr,
        "playstyles": parse_playstyles(row.get("playstyles", "")),
        "eaId": ni(row["player_id"], 0),
        "weakFoot": ni(row.get("weak_foot"), 3),
        "skillMoves": ni(row.get("skill_moves"), 3),
    }


def pick_squad(rows: list[dict], n: int = 23) -> list[dict]:
    rows = sorted(rows, key=lambda r: -ni(r["overall_rating"]))
    gks = [r for r in rows if position(r) == "GK"]
    outfield = [r for r in rows if position(r) != "GK"]
    squad = []
    squad.extend(gks[:3])
    need = n - len(squad)
    squad.extend(outfield[: max(need, 0)])
    # ensure at least 1 GK
    if not any(position(r) == "GK" for r in squad) and gks:
        squad = [gks[0]] + squad[: n - 1]
    return squad[:n]


def default_manager(name: str) -> dict:
    return {
        "name": f"{name} 감독",
        "nameEn": f"{name} Manager",
        "nationality": name,
        "personality": "균형",
        "preferredFormation": "4-3-3",
        "since": 2024,
    }


def default_tactics() -> dict:
    return {
        "formation": "4-3-3",
        "mentality": "balanced",
        "pressing": 5,
        "tempo": 5,
        "width": 5,
        "buildUp": "mixed",
        "defensiveLine": 5,
    }


def club_colors(club: str) -> dict:
    if club in CLUB_COLORS:
        p, s, a = CLUB_COLORS[club]
        return {"primary": p, "secondary": s, "accent": a, "pattern": "solid"}
    # deterministic pastel from name
    h = sum(ord(c) for c in club) * 2654435761 % 360
    return {
        "primary": f"hsl({h} 55% 35%)",
        "secondary": "#f5f5f5",
        "accent": f"hsl({(h+40)%360} 60% 45%)",
        "pattern": "solid",
    }


def build_club_team(league: str, club: str, rows: list[dict], rank: int) -> dict:
    info = LEAGUES[league]
    squad_rows = pick_squad(rows, 25)
    code = f"{info['code']}{slug(club)[:8].upper()}"
    players = [row_to_player(r, slug(club), i) for i, r in enumerate(squad_rows)]
    squad_numbers(players)
    if players:
        players[0]["isCaptain"] = False
        # captain = highest ovr outfield else first
        cap = max((p for p in players if p["position"] != "GK"), key=lambda p: p["ovr"], default=players[0])
        for p in players:
            p["isCaptain"] = p["id"] == cap["id"]
    name_en = club
    name_ko = CLUB_KO.get(club, club)
    avg = round(sum(p["ovr"] for p in players) / max(len(players), 1))
    return {
        "id": f"club-{slug(club)}",
        "name": name_ko,
        "nameEn": name_en,
        "fifaCode": code[:6],
        "visibility": "public",
        "isOfficial": True,
        "category": info["category"],
        "confederation": info["confederation"],
        "fifaRank": rank,
        "colors": club_colors(club),
        "crestUrl": None,
        "stadium": f"{name_en} Stadium",
        "manager": default_manager(name_en),
        "tactics": default_tactics(),
        "players": players,
        "leagueName": league,
    }


def build_national_team(meta: dict, rows: list[dict]) -> dict:
    squad_rows = pick_squad(rows, 23)
    players = [row_to_player(r, meta["fifaCode"], i) for i, r in enumerate(squad_rows)]
    # keep club from CSV (club of player)
    squad_numbers(players)
    if players:
        cap = max(players, key=lambda p: p["ovr"])
        for p in players:
            p["isCaptain"] = p["id"] == cap["id"]
    return {
        "id": meta["id"],
        "name": meta["name"],
        "nameEn": meta["nameEn"],
        "fifaCode": meta["fifaCode"],
        "visibility": "public",
        "isOfficial": True,
        "category": "national",
        "confederation": meta["confederation"],
        "fifaRank": meta["fifaRank"],
        "colors": meta["colors"],
        "crestUrl": meta.get("crestUrl"),
        "stadium": meta["stadium"],
        "manager": meta["manager"],
        "tactics": meta["tactics"],
        "players": players,
        "worldCupTitles": meta.get("worldCupTitles"),
        "leagueName": "International",
    }


def main():
    if not CSV_PATH.exists():
        raise SystemExit(f"Missing {CSV_PATH}")
    meta_list = json.loads(NT_META_PATH.read_text())
    by_name = {m["nameEn"]: m for m in meta_list}
    # extra name aliases into meta
    for ea, target in NAT_ALIASES.items():
        if target in by_name:
            by_name[ea] = by_name[target]

    rows = [
        r
        for r in csv.DictReader(CSV_PATH.open(encoding="utf-8"))
        if r.get("gender") == "Men's Football"
    ]

    teams = []

    # National teams
    by_nat = defaultdict(list)
    for r in rows:
        by_nat[r["nationality"]].append(r)

    matched = 0
    for nat, plist in by_nat.items():
        meta = by_name.get(nat) or by_name.get(NAT_ALIASES.get(nat, ""))
        if not meta:
            # fuzzy: ignore
            continue
        teams.append(build_national_team(meta, plist))
        matched += 1
    print(f"National teams: {matched}")

    # Club teams for big 5
    for league in LEAGUES:
        by_club = defaultdict(list)
        for r in rows:
            if r["league"] == league:
                by_club[r["club"]].append(r)
        # rank clubs by avg top-11 ovr
        scored = []
        for club, plist in by_club.items():
            top = sorted(plist, key=lambda x: -ni(x["overall_rating"]))[:11]
            avg = sum(ni(x["overall_rating"]) for x in top) / max(len(top), 1)
            scored.append((avg, club, plist))
        scored.sort(reverse=True)
        for i, (avg, club, plist) in enumerate(scored, start=1):
            teams.append(build_club_team(league, club, plist, i))
        print(f"{league}: {len(scored)} clubs")

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(teams, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {len(teams)} teams -> {OUT_PATH} ({OUT_PATH.stat().st_size/1e6:.2f} MB)")


if __name__ == "__main__":
    main()
