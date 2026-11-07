const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatKickoffKst(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  // Asia/Seoul
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  const wdEn = get("weekday");
  const map: Record<string, string> = {
    Sun: "일",
    Mon: "월",
    Tue: "화",
    Wed: "수",
    Thu: "목",
    Fri: "금",
    Sat: "토",
  };
  const wd = map[wdEn] ?? DAYS[d.getDay()] ?? "";
  return `${year}년 ${Number(month)}월 ${Number(day)}일 ${wd}요일 ${hour}:${minute} (UTC+9)`;
}

export function shotOnTargetPct(shots: number, sot: number): string {
  if (shots <= 0) return "0%";
  return `${Math.round((sot / shots) * 100)}%`;
}

export function passPct(passes: number, completed: number): string {
  if (passes <= 0) return "0%";
  return `${Math.round((completed / passes) * 100)}%`;
}
