"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ALL_OFFICIAL_TEAMS } from "@/data/nations";
import { getCustomTeams } from "@/lib/storage";
import { teamAverageOvr } from "@/lib/ovr";
import type { Confederation, Team } from "@/types/football";
import { Input } from "@/components/ui/input";
const CONF: Array<Confederation | "ALL"> = [
  "ALL",
  "UEFA",
  "CONMEBOL",
  "CAF",
  "AFC",
  "CONCACAF",
  "OFC",
];

export default function TeamsPage() {
  const [custom, setCustom] = useState<Team[]>([]);
  const [q, setQ] = useState("");
  const [conf, setConf] = useState<(typeof CONF)[number]>("ALL");

  useEffect(() => {
    setCustom(getCustomTeams());
  }, []);

  const teams = useMemo(() => {
    const all = [...custom, ...ALL_OFFICIAL_TEAMS];
    return all.filter((t) => {
      if (conf !== "ALL" && t.confederation !== conf) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        t.name.includes(q) ||
        t.nameEn.toLowerCase().includes(s) ||
        t.fifaCode.toLowerCase().includes(s)
      );
    });
  }, [custom, q, conf]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">팀</h1>
          <p className="mt-1 text-sm text-zinc-400">
            공식 국가대표 {ALL_OFFICIAL_TEAMS.length}개 + 나의 팀 {custom.length}개
          </p>
        </div>
        <Link
          href="/teams/new"
          className="inline-flex h-9 items-center rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-500"
        >
          새 팀 만들기
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="팀 검색…"
          className="border-white/10 bg-[#14181f]"
        />
        <div className="flex flex-wrap gap-1">
          {CONF.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConf(c)}
              className={`rounded-md px-2.5 py-1.5 text-xs ${
                conf === c ? "bg-emerald-700 text-white" : "bg-white/5 text-zinc-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/teams/${t.id}`}
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
                    {t.nameEn} · FIFA #{t.fifaRank}
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
