"use client";

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { ALL_OFFICIAL_TEAMS } from "@/data/nations";
import type { MatchResult, SeriesResult, Team } from "@/types/football";

const TEAMS_KEY = "diari-football-teams-v1";
const MATCHES_KEY = "diari-football-matches-v1";
const SERIES_KEY = "diari-football-series-v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded — drop oldest matches and retry once
    if (key === MATCHES_KEY && Array.isArray(value)) {
      const trimmed = (value as MatchResult[]).slice(0, 50);
      try {
        localStorage.setItem(key, JSON.stringify(trimmed));
      } catch {
        /* ignore */
      }
    }
  }
}

export function getCustomTeams(): Team[] {
  return read<Team[]>(TEAMS_KEY, []);
}

/** Saved overrides for official teams + pure custom teams. */
export function saveCustomTeam(team: Team) {
  const teams = getCustomTeams().filter((t) => t.id !== team.id);
  teams.unshift(team);
  write(TEAMS_KEY, teams);
}

export function deleteCustomTeam(id: string) {
  write(
    TEAMS_KEY,
    getCustomTeams().filter((t) => t.id !== id),
  );
}

export function isOfficialOverride(id: string): boolean {
  return getCustomTeams().some((t) => t.id === id && t.isOfficial);
}

/** Reset an edited official team back to stock data. */
export function resetOfficialTeam(id: string) {
  if (!id.startsWith("official-")) return;
  deleteCustomTeam(id);
}

/**
 * Official roster with local edits applied (same id replaces stock team).
 * Custom-only teams are listed first.
 */
export function getAllTeams(): Team[] {
  const saved = getCustomTeams();
  const byId = new Map(saved.map((t) => [t.id, t]));
  const official = ALL_OFFICIAL_TEAMS.map((t) => byId.get(t.id) ?? t);
  const customOnly = saved.filter(
    (t) =>
      !t.isOfficial &&
      !t.id.startsWith("official-") &&
      !t.id.startsWith("club-"),
  );
  return [...customOnly, ...official];
}

export function getTeamById(id: string): Team | undefined {
  const saved = getCustomTeams().find((t) => t.id === id);
  if (saved) return saved;
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id);
}

export function getSavedMatches(): MatchResult[] {
  return read<MatchResult[]>(MATCHES_KEY, []);
}

export function saveMatch(match: MatchResult) {
  const matches = getSavedMatches().filter((m) => m.id !== match.id);
  matches.unshift(match);
  write(MATCHES_KEY, matches.slice(0, 200));
}

export function getMatchById(id: string): MatchResult | undefined {
  return getSavedMatches().find((m) => m.id === id);
}

export function deleteMatch(id: string) {
  write(
    MATCHES_KEY,
    getSavedMatches().filter((m) => m.id !== id),
  );
  // Drop series that only referenced this match, or strip the match from series
  const series = getSavedSeries()
    .map((s) => ({
      ...s,
      matches: s.matches.filter((m) => m.id !== id),
    }))
    .filter((s) => s.matches.length > 0)
    .map((s) => ({
      ...s,
      homeAggregate: s.matches.reduce((n, m) => n + m.homeScore, 0),
      awayAggregate: s.matches.reduce((n, m) => n + m.awayScore, 0),
    }));
  write(SERIES_KEY, series);
}

export function deleteSeries(id: string) {
  const target = getSavedSeries().find((s) => s.id === id);
  write(
    SERIES_KEY,
    getSavedSeries().filter((s) => s.id !== id),
  );
  if (target) {
    const remove = new Set(target.matches.map((m) => m.id));
    write(
      MATCHES_KEY,
      getSavedMatches().filter((m) => !remove.has(m.id)),
    );
  }
}

export function getSavedSeries(): SeriesResult[] {
  return read<SeriesResult[]>(SERIES_KEY, []);
}

export function saveSeries(series: SeriesResult) {
  const all = getSavedSeries().filter((s) => s.id !== series.id);
  all.unshift(series);
  write(SERIES_KEY, all.slice(0, 100));
  for (const m of series.matches) saveMatch(m);
}

export function exportBackupCode(): string {
  const payload = {
    v: 1,
    teams: getCustomTeams(),
    matches: getSavedMatches(),
    series: getSavedSeries(),
    at: new Date().toISOString(),
  };
  return compressToEncodedURIComponent(JSON.stringify(payload));
}

export function importBackupCode(code: string): { ok: boolean; error?: string } {
  try {
    const json = decompressFromEncodedURIComponent(code.trim());
    if (!json) return { ok: false, error: "코드를 해석할 수 없습니다." };
    const data = JSON.parse(json) as {
      teams?: Team[];
      matches?: MatchResult[];
      series?: SeriesResult[];
    };
    if (data.teams) write(TEAMS_KEY, data.teams);
    if (data.matches) write(MATCHES_KEY, data.matches);
    if (data.series) write(SERIES_KEY, data.series);
    return { ok: true };
  } catch {
    return { ok: false, error: "잘못된 백업 코드입니다." };
  }
}

export function matchShareCode(match: MatchResult): string {
  return compressToEncodedURIComponent(JSON.stringify({ t: "match", m: match }));
}

export function seriesShareCode(series: SeriesResult): string {
  return compressToEncodedURIComponent(JSON.stringify({ t: "series", s: series }));
}

export function decodeShareCode(code: string): MatchResult | SeriesResult | null {
  try {
    const json = decompressFromEncodedURIComponent(code);
    if (!json) return null;
    const data = JSON.parse(json) as { t: string; m?: MatchResult; s?: SeriesResult };
    if (data.t === "match" && data.m) return data.m;
    if (data.t === "series" && data.s) return data.s;
    return null;
  } catch {
    return null;
  }
}

function publicBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
}

/** Share URL for static GitHub Pages — payload rides in the hash. */
export function buildShareUrl(code: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${publicBasePath()}/share/#${code}`;
}
