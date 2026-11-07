#!/usr/bin/env python3
"""Generate all nation TypeScript data files from compact roster packs."""
from __future__ import annotations

import importlib.util
import os
import sys

sys.path.insert(0, "/workspace/scripts/rosters")
from _emit import pl, team, write_file  # noqa: E402

OUT_DIR = "/workspace/src/data/nations"


def P(line: str):
    """Parse compact player: name|nameEn|num|POS|age|club|tier|[C]"""
    parts = line.split("|")
    name, name_en, num, pos, age, club, tier = parts[:7]
    captain = len(parts) > 7 and parts[7] == "C"
    return pl(name, name_en, int(num), pos, int(age), club, tier=tier or None, captain=captain)


def squad(*lines: str):
    return [P(x.strip()) for x in lines if x.strip()]


def load_module(path: str):
    spec = importlib.util.spec_from_file_location("mod", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    packs = [
        ("europe_data.py", "europe.ts", "EUROPE_TEAMS"),
        ("south_america_data.py", "southAmerica.ts", "SOUTH_AMERICA_TEAMS"),
        ("africa_data.py", "africa.ts", "AFRICA_TEAMS"),
        ("asia_data.py", "asia.ts", "ASIA_TEAMS"),
        ("concacaf_data.py", "concacaf.ts", "CONCACAF_TEAMS"),
        ("oceania_data.py", "oceania.ts", "OCEANIA_TEAMS"),
    ]
    summary = []
    all_names = []
    total_teams = 0
    total_players = 0
    incomplete = []

    for py, ts, export in packs:
        path = f"/workspace/scripts/rosters/{py}"
        if not os.path.exists(path):
            print(f"MISSING {path}")
            continue
        mod = load_module(path)
        teams = mod.TEAMS
        result = write_file(ts, export, teams)
        summary.append(result)
        all_names.extend(result["names"])
        total_teams += result["teams"]
        total_players += result["players"]
        incomplete.extend(result["incomplete"])

    # index.ts
    index = """import type { Team } from '@/types/football';
import { EUROPE_TEAMS } from './europe';
import { SOUTH_AMERICA_TEAMS } from './southAmerica';
import { AFRICA_TEAMS } from './africa';
import { ASIA_TEAMS } from './asia';
import { CONCACAF_TEAMS } from './concacaf';
import { OCEANIA_TEAMS } from './oceania';

export const ALL_OFFICIAL_TEAMS: Team[] = [
  ...EUROPE_TEAMS,
  ...SOUTH_AMERICA_TEAMS,
  ...AFRICA_TEAMS,
  ...ASIA_TEAMS,
  ...CONCACAF_TEAMS,
  ...OCEANIA_TEAMS,
];

export {
  EUROPE_TEAMS,
  SOUTH_AMERICA_TEAMS,
  AFRICA_TEAMS,
  ASIA_TEAMS,
  CONCACAF_TEAMS,
  OCEANIA_TEAMS,
};

export function getOfficialTeam(fifaCode: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.fifaCode === fifaCode);
}

export function getOfficialTeamByName(name: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.name === name || t.nameEn === name);
}
"""
    with open(os.path.join(OUT_DIR, "index.ts"), "w", encoding="utf-8") as f:
        f.write(index)

    required = [
        "스페인","아르헨티나","프랑스","잉글랜드","포르투갈","브라질","모로코","벨기에","네덜란드","멕시코",
        "콜롬비아","스위스","독일","크로아티아","이탈리아","미국","일본","세네갈","노르웨이","우루과이",
        "덴마크","오스트리아","이란","에콰도르","이집트","호주","캐나다","알제리","코트디부아르","나이지리아",
        "튀르키예","대한민국","파라과이","스웨덴","러시아","우크라이나","폴란드","헝가리","웨일스","콩고민주공화국",
        "그리스","카메룬","스코틀랜드","세르비아","슬로바키아","파나마","말리","남아프리카공화국","베네수엘라","칠레",
        "체코","슬로베니아","페루","코스타리카","사우디아라비아","아일랜드","보스니아 헤르체고비나","루마니아","우즈베키스탄","카타르",
        "튀니지","부르키나파소","이라크","북아일랜드","아랍에미리트","알바니아","온두라스","카보베르데","자메이카","가나",
        "북마케도니아","요르단","아이슬란드","조지아","핀란드","코소보","이스라엘","볼리비아","몬테네그로","퀴라소",
        "오만","기니","앙골라","아이티","가봉","시리아","우간다","뉴질랜드","베냉","불가리아",
        "잠비아","팔레스타인","태국","벨라루스","과테말라","중국","바레인","모잠비크","베트남","타지키스탄",
        "룩셈부르크","엘살바도르","적도 기니","키르기스스탄","트리니다드 토바고","마다가스카르","코모로","아르메니아","감비아","모리타니",
        "니제르","레바논","리비아","케냐","탄자니아","인도네시아","카자흐스탄","수단","르완다","토고",
        "북한","에스토니아","나미비아","기니비사우","키프로스","페로 제도","아제르바이잔","수리남",
    ]
    missing = [n for n in required if n not in all_names]
    print("\n=== SUMMARY ===")
    print(f"Teams: {total_teams}")
    print(f"Players: {total_players}")
    print(f"Missing required: {missing}")
    print(f"Incomplete (<20 players): {incomplete}")
    with open("/tmp/nation-gen-summary.json", "w") as f:
        import json
        json.dump({
            "teams": total_teams,
            "players": total_players,
            "missing": missing,
            "incomplete": incomplete,
            "names": all_names,
        }, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
