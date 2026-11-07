#!/usr/bin/env python3
"""Generate static national-team modules from current Wikipedia squad records."""

from __future__ import annotations

import datetime as dt
import html
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "nations"
CACHE_FILE = Path("/tmp/football-sim-nation-cache.json")
TODAY = dt.date(2026, 11, 7)
USER_AGENT = "football-sim-national-data/1.0 (static data generator)"

# Rank order follows the requested November 2025-era list.
TEAM_DATA = """
스페인|Spain|ESP|es|UEFA
아르헨티나|Argentina|ARG|ar|CONMEBOL
프랑스|France|FRA|fr|UEFA
잉글랜드|England|ENG|gb-eng|UEFA
포르투갈|Portugal|POR|pt|UEFA
브라질|Brazil|BRA|br|CONMEBOL
모로코|Morocco|MAR|ma|CAF
벨기에|Belgium|BEL|be|UEFA
네덜란드|Netherlands|NED|nl|UEFA
멕시코|Mexico|MEX|mx|CONCACAF
콜롬비아|Colombia|COL|co|CONMEBOL
스위스|Switzerland|SUI|ch|UEFA
독일|Germany|GER|de|UEFA
크로아티아|Croatia|CRO|hr|UEFA
이탈리아|Italy|ITA|it|UEFA
미국|United States|USA|us|CONCACAF
일본|Japan|JPN|jp|AFC
세네갈|Senegal|SEN|sn|CAF
노르웨이|Norway|NOR|no|UEFA
우루과이|Uruguay|URU|uy|CONMEBOL
덴마크|Denmark|DEN|dk|UEFA
오스트리아|Austria|AUT|at|UEFA
이란|Iran|IRN|ir|AFC
에콰도르|Ecuador|ECU|ec|CONMEBOL
이집트|Egypt|EGY|eg|CAF
호주|Australia|AUS|au|AFC
캐나다|Canada|CAN|ca|CONCACAF
알제리|Algeria|ALG|dz|CAF
코트디부아르|Ivory Coast|CIV|ci|CAF
나이지리아|Nigeria|NGA|ng|CAF
튀르키예|Turkey|TUR|tr|UEFA
대한민국|South Korea|KOR|kr|AFC
파라과이|Paraguay|PAR|py|CONMEBOL
스웨덴|Sweden|SWE|se|UEFA
러시아|Russia|RUS|ru|UEFA
우크라이나|Ukraine|UKR|ua|UEFA
폴란드|Poland|POL|pl|UEFA
헝가리|Hungary|HUN|hu|UEFA
웨일스|Wales|WAL|gb-wls|UEFA
콩고민주공화국|DR Congo|COD|cd|CAF
그리스|Greece|GRE|gr|UEFA
카메룬|Cameroon|CMR|cm|CAF
스코틀랜드|Scotland|SCO|gb-sct|UEFA
세르비아|Serbia|SRB|rs|UEFA
슬로바키아|Slovakia|SVK|sk|UEFA
파나마|Panama|PAN|pa|CONCACAF
말리|Mali|MLI|ml|CAF
남아프리카공화국|South Africa|RSA|za|CAF
베네수엘라|Venezuela|VEN|ve|CONMEBOL
칠레|Chile|CHI|cl|CONMEBOL
체코|Czechia|CZE|cz|UEFA
슬로베니아|Slovenia|SVN|si|UEFA
페루|Peru|PER|pe|CONMEBOL
코스타리카|Costa Rica|CRC|cr|CONCACAF
사우디아라비아|Saudi Arabia|KSA|sa|AFC
아일랜드|Republic of Ireland|IRL|ie|UEFA
보스니아 헤르체고비나|Bosnia and Herzegovina|BIH|ba|UEFA
루마니아|Romania|ROU|ro|UEFA
우즈베키스탄|Uzbekistan|UZB|uz|AFC
카타르|Qatar|QAT|qa|AFC
튀니지|Tunisia|TUN|tn|CAF
부르키나파소|Burkina Faso|BFA|bf|CAF
이라크|Iraq|IRQ|iq|AFC
북아일랜드|Northern Ireland|NIR|gb-nir|UEFA
아랍에미리트|United Arab Emirates|UAE|ae|AFC
알바니아|Albania|ALB|al|UEFA
온두라스|Honduras|HON|hn|CONCACAF
카보베르데|Cape Verde|CPV|cv|CAF
자메이카|Jamaica|JAM|jm|CONCACAF
가나|Ghana|GHA|gh|CAF
북마케도니아|North Macedonia|MKD|mk|UEFA
요르단|Jordan|JOR|jo|AFC
아이슬란드|Iceland|ISL|is|UEFA
조지아|Georgia|GEO|ge|UEFA
핀란드|Finland|FIN|fi|UEFA
코소보|Kosovo|KVX|xk|UEFA
이스라엘|Israel|ISR|il|UEFA
볼리비아|Bolivia|BOL|bo|CONMEBOL
몬테네그로|Montenegro|MNE|me|UEFA
퀴라소|Curaçao|CUW|cw|CONCACAF
오만|Oman|OMA|om|AFC
기니|Guinea|GUI|gn|CAF
앙골라|Angola|ANG|ao|CAF
아이티|Haiti|HAI|ht|CONCACAF
가봉|Gabon|GAB|ga|CAF
시리아|Syria|SYR|sy|AFC
우간다|Uganda|UGA|ug|CAF
뉴질랜드|New Zealand|NZL|nz|OFC
베냉|Benin|BEN|bj|CAF
불가리아|Bulgaria|BUL|bg|UEFA
잠비아|Zambia|ZAM|zm|CAF
팔레스타인|Palestine|PLE|ps|AFC
태국|Thailand|THA|th|AFC
벨라루스|Belarus|BLR|by|UEFA
과테말라|Guatemala|GUA|gt|CONCACAF
중국|China|CHN|cn|AFC
바레인|Bahrain|BHR|bh|AFC
모잠비크|Mozambique|MOZ|mz|CAF
베트남|Vietnam|VIE|vn|AFC
타지키스탄|Tajikistan|TJK|tj|AFC
룩셈부르크|Luxembourg|LUX|lu|UEFA
엘살바도르|El Salvador|SLV|sv|CONCACAF
적도 기니|Equatorial Guinea|EQG|gq|CAF
키르기스스탄|Kyrgyzstan|KGZ|kg|AFC
트리니다드 토바고|Trinidad and Tobago|TRI|tt|CONCACAF
마다가스카르|Madagascar|MAD|mg|CAF
코모로|Comoros|COM|km|CAF
아르메니아|Armenia|ARM|am|UEFA
감비아|Gambia|GAM|gm|CAF
모리타니|Mauritania|MTN|mr|CAF
니제르|Niger|NIG|ne|CAF
레바논|Lebanon|LBN|lb|AFC
리비아|Libya|LBY|ly|CAF
케냐|Kenya|KEN|ke|CAF
탄자니아|Tanzania|TAN|tz|CAF
인도네시아|Indonesia|IDN|id|AFC
카자흐스탄|Kazakhstan|KAZ|kz|UEFA
수단|Sudan|SDN|sd|CAF
르완다|Rwanda|RWA|rw|CAF
토고|Togo|TOG|tg|CAF
북한|North Korea|PRK|kp|AFC
에스토니아|Estonia|EST|ee|UEFA
나미비아|Namibia|NAM|na|CAF
기니비사우|Guinea-Bissau|GNB|gw|CAF
키프로스|Cyprus|CYP|cy|UEFA
페로 제도|Faroe Islands|FRO|fo|UEFA
아제르바이잔|Azerbaijan|AZE|az|UEFA
수리남|Suriname|SUR|sr|CONCACAF
""".strip()

PAGE_NAMES = {
    "United States": "United States men's national soccer team",
    "Australia": "Australia men's national soccer team",
    "Canada": "Canada men's national soccer team",
    "Sweden": "Sweden men's national football team",
    "New Zealand": "New Zealand men's national football team",
    "Czechia": "Czech Republic national football team",
    "China": "China national football team",
}

MANAGER_OVERRIDES = {
    "ESP": ("Luis de la Fuente", "루이스 데 라 푸엔테", "Spain", 2022, "4-3-3"),
    "ARG": ("Lionel Scaloni", "리오넬 스칼로니", "Argentina", 2018, "4-3-3"),
    "FRA": ("Didier Deschamps", "디디에 데샹", "France", 2012, "4-2-3-1"),
    "ENG": ("Thomas Tuchel", "토마스 투헬", "Germany", 2025, "4-2-3-1"),
    "POR": ("Roberto Martínez", "로베르토 마르티네스", "Spain", 2023, "4-3-3"),
    "BRA": ("Carlo Ancelotti", "카를로 안첼로티", "Italy", 2025, "4-3-3"),
    "GER": ("Julian Nagelsmann", "율리안 나겔스만", "Germany", 2023, "4-2-3-1"),
    "KOR": ("Hong Myung-bo", "홍명보", "South Korea", 2024, "4-2-3-1"),
    "JPN": ("Hajime Moriyasu", "모리야스 하지메", "Japan", 2018, "4-2-3-1"),
    "USA": ("Mauricio Pochettino", "마우리시오 포체티노", "Argentina", 2024, "4-2-3-1"),
    "URU": ("Marcelo Bielsa", "마르셀로 비엘사", "Argentina", 2023, "4-3-3"),
}

WORLD_TITLES = {
    "BRA": 5, "GER": 4, "ITA": 4, "ARG": 3, "FRA": 2, "URU": 2,
    "ENG": 1, "ESP": 1,
}

DEFAULT_COLORS = {
    "UEFA": ("#D71920", "#FFFFFF", "#123A70"),
    "CONMEBOL": ("#F4D03F", "#1B4F9C", "#FFFFFF"),
    "CAF": ("#138A36", "#FFFFFF", "#D9232E"),
    "AFC": ("#D71920", "#FFFFFF", "#13294B"),
    "CONCACAF": ("#123A70", "#FFFFFF", "#D71920"),
    "OFC": ("#FFFFFF", "#101820", "#C0C0C0"),
}

PATTERNS = {
    "ARG": "stripes", "CRO": "checkered", "PAR": "stripes", "PER": "gradient",
    "NGA": "gradient", "MEX": "gradient", "USA": "stripes",
}

REGION_FILES = {
    "UEFA": ("europe.ts", "europeTeams"),
    "CONMEBOL": ("southAmerica.ts", "southAmericaTeams"),
    "CAF": ("africa.ts", "africaTeams"),
    "AFC": ("asia.ts", "asiaTeams"),
    "CONCACAF": ("concacaf.ts", "concacafTeams"),
    "OFC": ("oceania.ts", "oceaniaTeams"),
}


def request_text(url: str, retries: int = 4) -> str:
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=30) as response:
                return response.read().decode("utf-8")
        except (urllib.error.URLError, TimeoutError):
            if attempt == retries - 1:
                raise
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError("unreachable")


def wiki_text(page: str) -> str:
    query = urllib.parse.urlencode({
        "action": "parse", "page": page, "prop": "wikitext",
        "format": "json", "redirects": "1",
    })
    payload = json.loads(request_text(f"https://en.wikipedia.org/w/api.php?{query}"))
    if "error" in payload:
        raise RuntimeError(f"{page}: {payload['error'].get('info', 'Wikipedia error')}")
    return payload["parse"]["wikitext"]["*"]


def split_params(template_line: str) -> dict[str, str]:
    start = template_line.find("|")
    inner = template_line[start + 1:]
    if inner.endswith("}}"):
        inner = inner[:-2]
    parts: list[str] = []
    current: list[str] = []
    curly = square = 0
    i = 0
    while i < len(inner):
        pair = inner[i:i + 2]
        if pair == "{{":
            curly += 1
            current.extend(pair)
            i += 2
            continue
        if pair == "}}" and curly:
            curly -= 1
            current.extend(pair)
            i += 2
            continue
        if pair == "[[":
            square += 1
            current.extend(pair)
            i += 2
            continue
        if pair == "]]" and square:
            square -= 1
            current.extend(pair)
            i += 2
            continue
        if inner[i] == "|" and not curly and not square:
            parts.append("".join(current))
            current = []
        else:
            current.append(inner[i])
        i += 1
    parts.append("".join(current))
    result: dict[str, str] = {}
    for part in parts:
        if "=" in part:
            key, value = part.split("=", 1)
            result[key.strip().lower()] = value.strip()
    return result


def clean_wiki(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<ref\b[^>]*>.*?</ref>|<ref\b[^>]*/>", "", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", "", value)
    previous = None
    while previous != value:
        previous = value
        value = re.sub(r"\[\[(?:[^\]|]+\|)?([^\]]+)\]\]", r"\1", value)

        def template_repl(match: re.Match[str]) -> str:
            body = match.group(1)
            bits = [bit.strip() for bit in body.split("|")]
            kind = bits[0].lower()
            if kind in {"sortname", "sort", "nowrap"}:
                return " ".join(bit for bit in bits[1:3] if bit and "=" not in bit)
            if kind in {"ill", "interlanguage link"} and len(bits) > 1:
                return bits[1]
            return ""

        value = re.sub(r"\{\{([^{}]+)\}\}", template_repl, value)
    value = value.replace("'''", "").replace("''", "")
    value = re.sub(r"\s+", " ", value).strip(" ,")
    return value


def field(wikitext: str, key: str) -> str:
    match = re.search(rf"^\|\s*{re.escape(key)}\s*=\s*(.+)$", wikitext, flags=re.I | re.M)
    return clean_wiki(match.group(1)) if match else ""


def raw_field(wikitext: str, key: str) -> str:
    match = re.search(rf"^\|\s*{re.escape(key)}\s*=\s*(.+)$", wikitext, flags=re.I | re.M)
    return match.group(1).strip() if match else ""


def parse_hex(value: str, fallback: str) -> str:
    cleaned = re.sub(r"[^0-9A-Fa-f]", "", value)
    return f"#{cleaned[:6].upper()}" if len(cleaned) >= 6 else fallback


def parse_dob(value: str) -> tuple[int, int, int] | None:
    match = re.search(
        r"\{\{(?:birth date and age|birth date)[^|}]*\|(?:df=(?:y|yes)\|)?"
        r"(\d{4})\|(\d{1,2})\|(\d{1,2})",
        value,
        flags=re.I,
    )
    if not match:
        return None
    return tuple(int(v) for v in match.groups())  # type: ignore[return-value]


def age_on(dob: tuple[int, int, int] | None) -> int:
    if not dob:
        return 25
    born = dt.date(*dob)
    return TODAY.year - born.year - ((TODAY.month, TODAY.day) < (born.month, born.day))


def normalize_name(name: str) -> str:
    text = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", text)


def parse_player_lines(text: str) -> list[dict[str, object]]:
    players: list[dict[str, object]] = []
    seen: set[str] = set()
    for line in text.splitlines():
        if not re.match(r"^\{\{\s*nat fs [gr] player\s*\|", line, flags=re.I):
            continue
        params = split_params(line)
        name = clean_wiki(params.get("name", ""))
        pos = params.get("pos", "").upper()
        if not name or pos not in {"GK", "DF", "MF", "FW"}:
            continue
        key = normalize_name(name)
        if key in seen:
            continue
        seen.add(key)
        try:
            caps = int(re.sub(r"\D", "", params.get("caps", "0")) or "0")
        except ValueError:
            caps = 0
        players.append({
            "nameEn": name,
            "group": pos,
            "age": age_on(parse_dob(params.get("age", ""))),
            "club": clean_wiki(params.get("club", "")) or "Unattached",
            "caps": caps,
        })
    return players


def squad_pool(wikitext: str) -> tuple[list[dict[str, object]], list[dict[str, object]]]:
    current_match = re.search(r"={2,4}\s*current squad\s*={2,4}", wikitext, flags=re.I)
    if current_match:
        tail = wikitext[current_match.end():]
        recent_match = re.search(r"={2,4}\s*recent call-?ups?\s*={2,4}", tail, flags=re.I)
        current_text = tail[:recent_match.start()] if recent_match else tail
        current = parse_player_lines(current_text)
        recent = parse_player_lines(tail[recent_match.end():] if recent_match else "")
        if current:
            return current, recent
    all_players = parse_player_lines(wikitext)
    return all_players[:26], all_players[26:]


def select_squad(
    current: list[dict[str, object]],
    recent: list[dict[str, object]],
    captain: str,
) -> tuple[list[dict[str, object]], str]:
    pool = current + recent
    deduped: list[dict[str, object]] = []
    seen: set[str] = set()
    for player in pool:
        key = normalize_name(str(player["nameEn"]))
        if key not in seen:
            seen.add(key)
            deduped.append(player)
    keep: list[dict[str, object]] = []
    goalkeepers = [p for p in deduped if p["group"] == "GK"]
    keep.extend(goalkeepers[:3])
    for player in deduped:
        if len(keep) >= 23:
            break
        if player not in keep and player["group"] != "GK":
            keep.append(player)
    # Ensure the listed captain is present when available in the current/recent pool.
    captain_key = normalize_name(captain)
    captain_player = next(
        (p for p in deduped if normalize_name(str(p["nameEn"])) == captain_key),
        None,
    )
    if captain_player and captain_player not in keep:
        same_group = [
            (idx, p) for idx, p in enumerate(keep)
            if p["group"] == captain_player["group"] and idx >= 3
        ]
        replace_at = same_group[-1][0] if same_group else len(keep) - 1
        keep[replace_at] = captain_player
    if len(goalkeepers) < 3 or len(keep) < 23:
        raise RuntimeError(
            f"only {len(keep)} players / {len(goalkeepers)} goalkeepers available"
        )
    if not any(normalize_name(str(p["nameEn"])) == captain_key for p in keep):
        captain = str(max(keep, key=lambda p: int(p["caps"]))["nameEn"])
    return keep[:23], captain


def translate_names(names: list[str]) -> list[str]:
    if not names:
        return []
    query = urllib.parse.urlencode({
        "client": "gtx", "sl": "en", "tl": "ko", "dt": "t", "q": "\n".join(names),
    })
    try:
        payload = json.loads(request_text(
            f"https://translate.googleapis.com/translate_a/single?{query}"
        ))
        translated = "".join(chunk[0] for chunk in payload[0]).strip().splitlines()
        if len(translated) == len(names):
            return [item.strip() for item in translated]
    except (ValueError, KeyError, IndexError, urllib.error.URLError):
        pass
    return names


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def position_for(group: str, index: int) -> str:
    positions = {
        "GK": ["GK"],
        "DF": ["CB", "LB", "RB", "CB", "LWB", "RWB"],
        "MF": ["CM", "CDM", "CAM", "CM", "RM", "LM"],
        "FW": ["ST", "LW", "RW", "CF", "ST"],
    }
    choices = positions[group]
    return choices[index % len(choices)]


def render_team(team: dict[str, object]) -> str:
    players: list[dict[str, object]] = team["players"]  # type: ignore[assignment]
    group_counts: defaultdict[str, int] = defaultdict(int)
    used_numbers: set[int] = set()
    gk_numbers = [1, 12, 23, 25, 26]
    outfield_number = 2
    rows: list[str] = []
    captain_key = normalize_name(str(team["captain"]))
    for player in players:
        group = str(player["group"])
        idx = group_counts[group]
        group_counts[group] += 1
        if group == "GK":
            number = gk_numbers[idx]
        else:
            while outfield_number in used_numbers or outfield_number in gk_numbers:
                outfield_number += 1
            number = outfield_number
            outfield_number += 1
        used_numbers.add(number)
        caps = int(player["caps"])
        tier = "star" if caps >= 45 else "solid" if caps >= 8 else "fringe"
        is_captain = normalize_name(str(player["nameEn"])) == captain_key
        cells = [
            ts_string(str(player["name"])),
            ts_string(str(player["nameEn"])),
            ts_string(position_for(group, idx)),
            str(int(player["age"])),
            ts_string(str(player["club"])),
            ts_string(tier),
            "true" if is_captain else "false",
            str(number),
        ]
        rows.append(f"      [{', '.join(cells)}],")
    manager = team["manager"]
    colors = team["colors"]
    pattern = f", pattern: {ts_string(str(team['pattern']))}" if team.get("pattern") else ""
    title = f"\n    worldCupTitles: {team['titles']}," if team.get("titles") else ""
    return f"""  makeTeam({{
    name: {ts_string(str(team['name']))},
    nameEn: {ts_string(str(team['nameEn']))},
    fifaCode: {ts_string(str(team['code']))},
    iso2: {ts_string(str(team['iso2']))},
    confederation: {ts_string(str(team['confed']))},
    fifaRank: {team['rank']},
    colors: {{ primary: {ts_string(colors[0])}, secondary: {ts_string(colors[1])}, accent: {ts_string(colors[2])}{pattern} }},
    stadium: {ts_string(str(team['stadium']))},
    manager: {{
      name: {ts_string(manager['name'])},
      nameEn: {ts_string(manager['nameEn'])},
      nationality: {ts_string(manager['nationality'])},
      personality: {ts_string(manager['personality'])},
      preferredFormation: {ts_string(manager['formation'])},
      since: {manager['since']},
    }},
    tactics: {{
      formation: {ts_string(manager['formation'])},
      mentality: "balanced",
      pressing: {manager['pressing']},
      tempo: {manager['tempo']},
      width: 6,
      buildUp: "mixed",
      defensiveLine: {manager['line']},
    }},{title}
    players: roster([
{chr(10).join(rows)}
    ]),
  }}),"""


HEADER = """import type { Position } from '@/types/football';
import { makeTeam } from './_helpers';

type RosterRow = [
  name: string,
  nameEn: string,
  position: Position,
  age: number,
  club: string,
  tier: 'star' | 'solid' | 'fringe',
  isCaptain: boolean,
  number: number,
];

function roster(rows: RosterRow[]) {
  return rows.map(([name, nameEn, position, age, club, tier, isCaptain, number]) => ({
    name,
    nameEn,
    position,
    age,
    club,
    tier,
    isCaptain: isCaptain || undefined,
    number,
  }));
}

"""


def build_team(record: tuple[str, str, str, str, str], rank: int) -> dict[str, object]:
    name, name_en, code, iso2, confed = record
    page = PAGE_NAMES.get(name_en, f"{name_en} national football team")
    text = wiki_text(page)
    current, recent = squad_pool(text)
    captain = field(text, "Captain")
    squad, captain = select_squad(current, recent, captain)

    coach_en = field(text, "Coach") or "National Team Head Coach"
    if code in MANAGER_OVERRIDES:
        coach_en, coach_ko, nationality, since, formation = MANAGER_OVERRIDES[code]
    else:
        coach_ko = translate_names([coach_en])[0]
        nationality = name_en
        since = 2024
        formation = "4-2-3-1" if confed in {"UEFA", "AFC"} else "4-3-3"

    translated = translate_names([str(p["nameEn"]) for p in squad])
    for player, korean in zip(squad, translated):
        player["name"] = korean

    defaults = DEFAULT_COLORS[confed]
    colors = (
        parse_hex(raw_field(text, "body1"), defaults[0]),
        parse_hex(raw_field(text, "body2"), defaults[1]),
        parse_hex(raw_field(text, "shorts1"), defaults[2]),
    )
    stadium = field(text, "Home Stadium")
    if not stadium or stadium.lower() in {"various", "various stadiums"}:
        stadium = f"{name_en} National Stadium"
    personality = "압박형" if rank <= 25 else "균형" if rank <= 75 else "수비적"
    return {
        "name": name,
        "nameEn": name_en,
        "code": code,
        "iso2": iso2,
        "confed": confed,
        "rank": rank,
        "colors": colors,
        "stadium": stadium,
        "captain": captain,
        "manager": {
            "name": coach_ko,
            "nameEn": coach_en,
            "nationality": nationality,
            "personality": personality,
            "formation": formation,
            "since": since,
            "pressing": 8 if rank <= 20 else 6 if rank <= 70 else 5,
            "tempo": 8 if rank <= 20 else 6,
            "line": 7 if rank <= 20 else 5,
        },
        "pattern": PATTERNS.get(code),
        "titles": WORLD_TITLES.get(code),
        "players": squad,
    }


def main() -> int:
    records = [tuple(line.split("|")) for line in TEAM_DATA.splitlines()]
    print(f"Generating {len(records)} teams", flush=True)
    cache: dict[str, dict[str, object]] = {}
    if CACHE_FILE.exists():
        cache = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    teams: list[dict[str, object]] = []
    failures: list[str] = []
    for rank, record in enumerate(records, 1):
        try:
            code = record[2]
            team = cache.get(code)
            if team is None:
                team = build_team(record, rank)  # type: ignore[arg-type]
                cache[code] = team
                CACHE_FILE.write_text(
                    json.dumps(cache, ensure_ascii=False),
                    encoding="utf-8",
                )
            teams.append(team)
            print(f"[{rank:03}/{len(records)}] {record[1]}: 23 players", flush=True)
        except Exception as exc:
            failures.append(f"{record[1]}: {exc}")
            print(f"[{rank:03}/{len(records)}] FAILED {record[1]}: {exc}", flush=True)

    if failures:
        print("\nGeneration failures:", file=sys.stderr)
        print("\n".join(failures), file=sys.stderr)
        return 1

    grouped: defaultdict[str, list[dict[str, object]]] = defaultdict(list)
    for team in teams:
        grouped[str(team["confed"])].append(team)
    for confed, (filename, export_name) in REGION_FILES.items():
        body = HEADER + f"export const {export_name} = [\n"
        body += "\n".join(render_team(team) for team in grouped[confed])
        body += "\n];\n"
        (OUT / filename).write_text(body, encoding="utf-8")
    print(f"Wrote {len(teams)} teams / {len(teams) * 23} players", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
