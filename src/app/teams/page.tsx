"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ALL_OFFICIAL_TEAMS,
  PUBLIC_CATEGORIES,
  TEAM_CATEGORY_LABEL,
} from "@/data/nations";
import { getAllTeams, getCustomTeams } from "@/lib/storage";
import { teamAverageOvr } from "@/lib/ovr";
import type { Team, TeamCategory } from "@/types/football";
import { Input } from "@/components/ui/input";

type Tab = TeamCategory | "all_custom";

export default function TeamsPage() {
  const [teamsAll, setTeamsAll] = useState<Team[]>([]);
  const [customCount, setCustomCount] = useState(0);
  const [editedIds, setEditedIds] = useState<Set<string>>(new Set());
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("national");

  useEffect(() => {
    setTeamsAll(getAllTeams());
    const saved = getCustomTeams();
    setCustomCount(saved.filter((t) => !t.isOfficial).length);
    setEditedIds(new Set(saved.filter((t) => t.isOfficial).map((t) => t.id)));
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of PUBLIC_CATEGORIES) {
      c[cat] = teamsAll.filter((t) => (t.category ?? "national") === cat).length;
    }
    c.all_custom = teamsAll.filter((t) => !t.isOfficial).length;
    return c;
  }, [teamsAll]);

  const teams = useMemo(() => {
    return teamsAll.filter((t) => {
      if (tab === "all_custom") {
        if (t.isOfficial) return false;
      } else if ((t.category ?? "national") !== tab) {
        return false;
      }
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        t.name.includes(q) ||
        t.nameEn.toLowerCase().includes(s) ||
        t.fifaCode.toLowerCase().includes(s) ||
        (t.leagueName?.toLowerCase().includes(s) ?? false)
      );
    });
  }, [teamsAll, q, tab]);

  const tabs: Array<{ id: Tab; label: string }> = [
    ...PUBLIC_CATEGORIES.map((id) => ({
      id,
      label: TEAM_CATEGORY_LABEL[id],
    })),
    { id: "all_custom", label: "커스텀" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">팀</h1>
          <p className="mt-1 text-sm text-zinc-400">
            공개 팀 {ALL_OFFICIAL_TEAMS.length}개 · 커스텀 {customCount}개 · EA FC 27 공식 능력치·플레이스타일
          </p>
        </div>
        <Link
          href="/teams/new/"
          className="inline-flex h-9 items-center rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-500"
        >
          새 팀 만들기
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-md px-2.5 py-1.5 text-xs ${
              tab === t.id ? "bg-emerald-700 text-white" : "bg-white/5 text-zinc-400"
            }`}
          >
            {t.label}
            <span className="ml-1 opacity-70">{counts[t.id] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="팀 검색…"
          className="border-white/10 bg-[#14181f]"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/teams/view/?id=${encodeURIComponent(t.id)}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#14181f] transition hover:border-emerald-500/40"
          >
            <div
              className="flex h-20 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
              }}
            >
              {t.crestUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.crestUrl} alt="" className="h-12 w-16 object-contain drop-shadow" />
              ) : (
                <span className="text-xl font-black text-white/90">{t.fifaCode}</span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-white group-hover:text-emerald-300">
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {t.nameEn}
                    {t.category === "national" ? ` · FIFA #${t.fifaRank}` : t.leagueName ? ` · ${t.leagueName}` : ""}
                    {t.isOfficial && editedIds.has(t.id) && " · 편집됨"}
                    {!t.isOfficial && " · 커스텀"}
                    {t.visibility === "private" && " · 비공개"}
                  </div>
                </div>
                <div className="rounded bg-black/40 px-2 py-1 text-sm font-bold text-emerald-400">
                  {teamAverageOvr(t.players)}
                </div>
              </div>
              <div className="mt-2 text-[11px] text-zinc-500">
                {t.manager.name} · {t.tactics.formation} · 선수 {t.players.length}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
