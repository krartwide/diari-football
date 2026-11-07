"use client";

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type { MatchResult, SeriesResult, Team } from "@/types/football";

const TEAMS_KEY = "diari-football-teams-v1";
const MATCHES_KEY = "diari-football-matches-v1";
const SERIES_KEY = "diari-football-series-v1";
const SYNC_CODE_KEY = "diari-football-sync-code";

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
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCustomTeams(): Team[] {
  return read<Team[]>(TEAMS_KEY, []);
}

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

export function getSavedMatches(): MatchResult[] {
  return read<MatchResult[]>(MATCHES_KEY, []);
}

export function saveMatch(match: MatchResult) {
  const matches = getSavedMatches().filter((m) => m.id !== match.id);
  matches.unshift(match);
  write(MATCHES_KEY, matches.slice(0, 200));
  void syncMatchToServer(match);
}

export function getMatchById(id: string): MatchResult | undefined {
  return getSavedMatches().find((m) => m.id === id);
}

export function getSavedSeries(): SeriesResult[] {
  return read<SeriesResult[]>(SERIES_KEY, []);
}

export function saveSeries(series: SeriesResult) {
  const all = getSavedSeries().filter((s) => s.id !== series.id);
  all.unshift(series);
  write(SERIES_KEY, all.slice(0, 100));
  for (const m of series.matches) saveMatch(m);
  void syncSeriesToServer(series);
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
  // Strip bulky team player lists partially? Keep full for accuracy.
  return compressToEncodedURIComponent(JSON.stringify({ t: "match", m: match }));
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

export function getOrCreateSyncCode(): string {
  if (typeof window === "undefined") return "";
  let code = localStorage.getItem(SYNC_CODE_KEY);
  if (!code) {
    code = `DF-${Math.random().toString(36).slice(2, 6)}-${Date.now().toString(36)}`.toUpperCase();
    localStorage.setItem(SYNC_CODE_KEY, code);
  }
  return code;
}

async function syncMatchToServer(match: MatchResult) {
  try {
    const syncCode = getOrCreateSyncCode();
    await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ syncCode, type: "match", payload: match }),
    });
  } catch {
    // offline / no server — local only
  }
}

async function syncSeriesToServer(series: SeriesResult) {
  try {
    const syncCode = getOrCreateSyncCode();
    await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ syncCode, type: "series", payload: series }),
    });
  } catch {
    // ignore
  }
}

export async function pullFromServer(): Promise<number> {
  try {
    const syncCode = getOrCreateSyncCode();
    const res = await fetch(`/api/matches?syncCode=${encodeURIComponent(syncCode)}`);
    if (!res.ok) return 0;
    const data = (await res.json()) as {
      matches?: MatchResult[];
      series?: SeriesResult[];
    };
    let added = 0;
    if (data.matches?.length) {
      const existing = getSavedMatches();
      const ids = new Set(existing.map((m) => m.id));
      const merged = [...existing];
      for (const m of data.matches) {
        if (!ids.has(m.id)) {
          merged.push(m);
          added++;
        }
      }
      write(MATCHES_KEY, merged.slice(0, 200));
    }
    if (data.series?.length) {
      const existing = getSavedSeries();
      const ids = new Set(existing.map((s) => s.id));
      const merged = [...existing];
      for (const s of data.series) {
        if (!ids.has(s.id)) merged.push(s);
      }
      write(SERIES_KEY, merged.slice(0, 100));
    }
    return added;
  } catch {
    return 0;
  }
}
