/** EA Sports FC 27 PlayStyles (official). `plus` = PlayStyle+. */

export type PlayStyleId =
  | "gamechanger"
  | "acrobatic"
  | "chip_shot"
  | "dead_ball"
  | "finesse_shot"
  | "low_driven_shot"
  | "precision_header"
  | "power_shot"
  | "incisive_pass"
  | "inventive"
  | "long_ball_pass"
  | "pinged_pass"
  | "tiki_taka"
  | "whipped_pass"
  | "first_touch"
  | "press_proven"
  | "rapid"
  | "technical"
  | "trickster"
  | "aerial_fortress"
  | "anticipate"
  | "block"
  | "intercept"
  | "jockey"
  | "slide_tackle"
  | "bruiser"
  | "enforcer"
  | "long_throw"
  | "quick_step"
  | "relentless"
  | "rush_out"
  | "cross_claimer"
  | "deflector"
  | "far_reach"
  | "far_throw"
  | "footwork";

export type PlayStyleCategory =
  | "finishing"
  | "passing"
  | "ball_control"
  | "defending"
  | "physical"
  | "goalkeeper";

export interface PlayStyleDef {
  id: PlayStyleId;
  nameKo: string;
  nameEn: string;
  category: PlayStyleCategory;
  /** EA CSV / API label without trailing + */
  eaLabel: string;
  /** Soft match-sim bonus key → multiplier applied when style is active */
  simBoost?: Partial<Record<"shooting" | "passing" | "dribbling" | "defending" | "pace" | "physical" | "goalkeeping", number>>;
}

export const PLAYSTYLE_DEFS: PlayStyleDef[] = [
  { id: "gamechanger", nameKo: "게임 체인저", nameEn: "Gamechanger", category: "finishing", eaLabel: "Gamechanger", simBoost: { shooting: 1.04 } },
  { id: "acrobatic", nameKo: "아크로바틱", nameEn: "Acrobatic", category: "finishing", eaLabel: "Acrobatic", simBoost: { shooting: 1.03 } },
  { id: "chip_shot", nameKo: "칩 슛", nameEn: "Chip Shot", category: "finishing", eaLabel: "Chip Shot", simBoost: { shooting: 1.03 } },
  { id: "dead_ball", nameKo: "데드볼", nameEn: "Dead Ball", category: "finishing", eaLabel: "Dead Ball", simBoost: { shooting: 1.03, passing: 1.02 } },
  { id: "finesse_shot", nameKo: "감아차기", nameEn: "Finesse Shot", category: "finishing", eaLabel: "Finesse Shot", simBoost: { shooting: 1.05 } },
  { id: "low_driven_shot", nameKo: "낮은 드리븐 슛", nameEn: "Low Driven Shot", category: "finishing", eaLabel: "Low Driven Shot", simBoost: { shooting: 1.04 } },
  { id: "precision_header", nameKo: "프리시전 헤딩", nameEn: "Precision Header", category: "finishing", eaLabel: "Precision Header", simBoost: { shooting: 1.04 } },
  { id: "power_shot", nameKo: "파워 슛", nameEn: "Power Shot", category: "finishing", eaLabel: "Power Shot", simBoost: { shooting: 1.04 } },
  { id: "incisive_pass", nameKo: "예리한 패스", nameEn: "Incisive Pass", category: "passing", eaLabel: "Incisive Pass", simBoost: { passing: 1.05 } },
  { id: "inventive", nameKo: "인벤티브", nameEn: "Inventive", category: "passing", eaLabel: "Inventive", simBoost: { passing: 1.03 } },
  { id: "long_ball_pass", nameKo: "긴 패스", nameEn: "Long Ball Pass", category: "passing", eaLabel: "Long Ball Pass", simBoost: { passing: 1.04 } },
  { id: "pinged_pass", nameKo: "핑 패스", nameEn: "Pinged Pass", category: "passing", eaLabel: "Pinged Pass", simBoost: { passing: 1.03 } },
  { id: "tiki_taka", nameKo: "티키타카", nameEn: "Tiki Taka", category: "passing", eaLabel: "Tiki Taka", simBoost: { passing: 1.04 } },
  { id: "whipped_pass", nameKo: "휩 패스", nameEn: "Whipped Pass", category: "passing", eaLabel: "Whipped Pass", simBoost: { passing: 1.04 } },
  { id: "first_touch", nameKo: "퍼스트 터치", nameEn: "First Touch", category: "ball_control", eaLabel: "First Touch", simBoost: { dribbling: 1.03 } },
  { id: "press_proven", nameKo: "압박 검증", nameEn: "Press Proven", category: "ball_control", eaLabel: "Press Proven", simBoost: { dribbling: 1.03, physical: 1.02 } },
  { id: "rapid", nameKo: "래피드", nameEn: "Rapid", category: "ball_control", eaLabel: "Rapid", simBoost: { pace: 1.04, dribbling: 1.03 } },
  { id: "technical", nameKo: "테크니컬", nameEn: "Technical", category: "ball_control", eaLabel: "Technical", simBoost: { dribbling: 1.05 } },
  { id: "trickster", nameKo: "트릭스터", nameEn: "Trickster", category: "ball_control", eaLabel: "Trickster", simBoost: { dribbling: 1.04 } },
  { id: "aerial_fortress", nameKo: "공중 요새", nameEn: "Aerial Fortress", category: "defending", eaLabel: "Aerial Fortress", simBoost: { defending: 1.04, physical: 1.03 } },
  { id: "anticipate", nameKo: "예상", nameEn: "Anticipate", category: "defending", eaLabel: "Anticipate", simBoost: { defending: 1.05 } },
  { id: "block", nameKo: "블로킹", nameEn: "Block", category: "defending", eaLabel: "Block", simBoost: { defending: 1.03 } },
  { id: "intercept", nameKo: "가로채기", nameEn: "Intercept", category: "defending", eaLabel: "Intercept", simBoost: { defending: 1.04 } },
  { id: "jockey", nameKo: "견제", nameEn: "Jockey", category: "defending", eaLabel: "Jockey", simBoost: { defending: 1.03 } },
  { id: "slide_tackle", nameKo: "슬라이딩 태클", nameEn: "Slide Tackle", category: "defending", eaLabel: "Slide Tackle", simBoost: { defending: 1.03 } },
  { id: "bruiser", nameKo: "브루저", nameEn: "Bruiser", category: "physical", eaLabel: "Bruiser", simBoost: { physical: 1.05 } },
  { id: "enforcer", nameKo: "인포서", nameEn: "Enforcer", category: "physical", eaLabel: "Enforcer", simBoost: { physical: 1.04, dribbling: 1.02 } },
  { id: "long_throw", nameKo: "긴 스로우", nameEn: "Long Throw", category: "physical", eaLabel: "Long Throw", simBoost: { physical: 1.01 } },
  { id: "quick_step", nameKo: "퀵 스텝", nameEn: "Quick Step", category: "physical", eaLabel: "Quick Step", simBoost: { pace: 1.05 } },
  { id: "relentless", nameKo: "끈기와 인내", nameEn: "Relentless", category: "physical", eaLabel: "Relentless", simBoost: { physical: 1.04 } },
  { id: "rush_out", nameKo: "러시 아웃", nameEn: "Rush Out", category: "goalkeeper", eaLabel: "Rush Out", simBoost: { goalkeeping: 1.04 } },
  { id: "cross_claimer", nameKo: "크로스 클레이머", nameEn: "Cross Claimer", category: "goalkeeper", eaLabel: "Cross Claimer", simBoost: { goalkeeping: 1.03 } },
  { id: "deflector", nameKo: "디플렉터", nameEn: "Deflector", category: "goalkeeper", eaLabel: "Deflector", simBoost: { goalkeeping: 1.03 } },
  { id: "far_reach", nameKo: "넓은 수비 범위", nameEn: "Far Reach", category: "goalkeeper", eaLabel: "Far Reach", simBoost: { goalkeeping: 1.04 } },
  { id: "far_throw", nameKo: "긴 스로우", nameEn: "Far Throw", category: "goalkeeper", eaLabel: "Far Throw", simBoost: { goalkeeping: 1.01 } },
  { id: "footwork", nameKo: "발놀림", nameEn: "Footwork", category: "goalkeeper", eaLabel: "Footwork", simBoost: { goalkeeping: 1.03 } },
];

const BY_EA = new Map(PLAYSTYLE_DEFS.map((d) => [d.eaLabel.toLowerCase(), d]));
const BY_ID = new Map(PLAYSTYLE_DEFS.map((d) => [d.id, d]));

export function getPlayStyleDef(id: PlayStyleId): PlayStyleDef | undefined {
  return BY_ID.get(id);
}

/** Parse EA CSV playstyles field ("Finesse Shot, Quick Step+") */
export function parseEaPlaystyles(raw: string): Array<{ id: PlayStyleId; plus: boolean }> {
  if (!raw?.trim()) return [];
  const out: Array<{ id: PlayStyleId; plus: boolean }> = [];
  const seen = new Set<string>();
  for (const part of raw.split(",")) {
    let label = part.trim();
    if (!label) continue;
    const plus = label.endsWith("+");
    if (plus) label = label.slice(0, -1).trim();
    // EA sometimes uses "1v1 Close Down" historically; CSV uses Rush Out
    if (label.toLowerCase() === "1v1 close down") label = "Rush Out";
    const def = BY_EA.get(label.toLowerCase());
    if (!def) continue;
    const key = `${def.id}:${plus}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ id: def.id, plus });
  }
  return out;
}

/** Effective attribute multiplier from playstyles (base ~+2%, plus ~+5% stacked soft). */
export function playstyleMultiplier(
  styles: Array<{ id: PlayStyleId; plus: boolean }>,
  key: "shooting" | "passing" | "dribbling" | "defending" | "pace" | "physical" | "goalkeeping",
): number {
  let m = 1;
  for (const s of styles) {
    const def = BY_ID.get(s.id);
    const boost = def?.simBoost?.[key];
    if (!boost) continue;
    const extra = boost - 1;
    m += s.plus ? extra * 1.6 : extra * 0.7;
  }
  return m;
}
