"""Build full ~23-man squads from known cores + realistic depth fillers from real capped pools."""
from __future__ import annotations

from _emit import pl, team

# Depth pools: real players who have been capped / called up recently per nation code.
# Used only to fill to ~23 when core list is short — never invented names.


def fill_squad(code: str, core: list[dict], depth: list[dict], target: int = 23) -> list[dict]:
    seen = {(p["nameEn"], p["number"]) for p in core}
    seen_names = {p["nameEn"] for p in core}
    out = list(core)
    for p in depth:
        if len(out) >= target:
            break
        if p["nameEn"] in seen_names:
            continue
        # avoid number clash
        nums = {x["number"] for x in out}
        if p["number"] in nums:
            n = p["number"]
            while n in nums:
                n += 1
            p = {**p, "number": n}
        out.append(p)
        seen_names.add(p["nameEn"])
    return out


def T(name, name_en, code, iso2, confed, rank, c1, c2, c3, stadium,
      mgr_ko, mgr_en, mgr_nat, personality, formation, since, players,
      **kwargs):
    return team(
        name, name_en, code, iso2, confed, rank, c1, c2, c3, stadium,
        mgr_ko, mgr_en, mgr_nat, personality, formation, since, players,
        **kwargs,
    )


def P(name, name_en, number, position, age, club, tier="solid", captain=False):
    return pl(name, name_en, number, position, age, club, tier=tier, captain=captain)
