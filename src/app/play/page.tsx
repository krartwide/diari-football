"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PUBLIC_CATEGORIES,
  TEAM_CATEGORY_LABEL,
} from "@/data/nations";
import { MATCH_MODES, simulateSeries } from "@/lib/simulation/series";
import { simulateMatch } from "@/lib/simulation/engine";
import { getAllTeams, saveMatch, saveSeries } from "@/lib/storage";
import { teamAverageOvr } from "@/lib/ovr";
import type { MatchMode, MatchSettings, Team, TeamCategory } from "@/types/football";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type PickerTab = TeamCategory | "custom";

export default function PlayPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [homeId, setHomeId] = useState("");
  const [awayId, setAwayId] = useState("");
  const [mode, setMode] = useState<MatchMode>("single");
  const [homeAdvantage, setHomeAdvantage] = useState(true);
  const [competition, setCompetition] = useState("친선 경기");
  const [stage, setStage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const all = getAllTeams();
    setTeams(all);
    if (all.length >= 2) {
      setHomeId((prev) => prev || all[0]!.id);
      setAwayId((prev) => prev || all[1]!.id);
    }
  }, []);

  useEffect(() => {
    if (teams.length < 2) return;
    if (!teams.some((t) => t.id === homeId)) setHomeId(teams[0]!.id);
    if (!teams.some((t) => t.id === awayId) || awayId === homeId) {
      const other = teams.find((t) => t.id !== homeId) ?? teams[1]!;
      setAwayId(other.id);
    }
  }, [teams, homeId, awayId]);

  const home = teams.find((t) => t.id === homeId);
  const away = teams.find((t) => t.id === awayId);

  const start = () => {
    if (!home || !away || home.id === away.id) return;
    setBusy(true);
    setError(null);
    const settings: MatchSettings = {
      mode,
      homeAdvantage,
      competitionName: competition || "친선 경기",
      stageName: stage || undefined,
    };

    setTimeout(() => {
      try {
        if (mode === "single") {
          const match = simulateMatch(home, away, settings);
          saveMatch(match);
          router.push(`/match/?id=${encodeURIComponent(match.id)}&live=1`);
        } else {
          const series = simulateSeries(home, away, settings);
          saveSeries(series);
          const last = series.matches[series.matches.length - 1]!;
          router.push(
            `/match/?id=${encodeURIComponent(last.id)}&series=${encodeURIComponent(series.id)}&live=1`,
          );
        }
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : "시뮬레이션에 실패했습니다.");
        setBusy(false);
      }
    }, 50);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">
        팀 맞대결
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        항목별로 팀을 고른 뒤, 시리즈 형식과 홈 어드밴티지를 맞추고 시작합니다.
      </p>

      <div className="mt-8 space-y-6 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <TeamPicker
            label="홈 / A팀"
            value={homeId}
            onChange={setHomeId}
            teams={teams}
            excludeId={awayId}
            accent="emerald"
          />
          <TeamPicker
            label="어웨이 / B팀"
            value={awayId}
            onChange={setAwayId}
            teams={teams}
            excludeId={homeId}
            accent="sky"
          />
        </div>

        {home && away && (
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-black/30 p-3 text-center text-sm">
            <div>
              <div className="text-zinc-400">{home.name}</div>
              <div className="text-2xl font-bold text-emerald-400">
                OVR {teamAverageOvr(home.players)}
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-500">
                {TEAM_CATEGORY_LABEL[home.category ?? "national"]}
              </div>
            </div>
            <div>
              <div className="text-zinc-400">{away.name}</div>
              <div className="text-2xl font-bold text-sky-400">
                OVR {teamAverageOvr(away.players)}
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-500">
                {TEAM_CATEGORY_LABEL[away.category ?? "national"]}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>시리즈 형식</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {MATCH_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  mode === m.id
                    ? "border-emerald-500 bg-emerald-950/40"
                    : "border-white/10 bg-black/20 hover:border-white/20"
                }`}
              >
                <div className="text-sm font-semibold text-white">{m.name}</div>
                <div className="mt-1 text-xs text-zinc-400">{m.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-3">
          <div>
            <div className="text-sm font-medium">홈 어드밴티지</div>
            <div className="text-xs text-zinc-400">
              어떤 모드에서도 켤 수 있습니다. 홈 팀 경기력에 가산됩니다.
            </div>
          </div>
          <Switch checked={homeAdvantage} onCheckedChange={setHomeAdvantage} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="comp">대회명</Label>
            <Input
              id="comp"
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
              className="border-white/10 bg-black/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage">스테이지 (선택)</Label>
            <Input
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="예: 4강 1경기"
              className="border-white/10 bg-black/30"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-500"
          size="lg"
          disabled={!home || !away || home.id === away.id || busy}
          onClick={start}
        >
          {busy ? "시뮬레이션 중…" : "경기 시작"}
        </Button>
      </div>
    </div>
  );
}

function TeamPicker({
  label,
  value,
  onChange,
  teams,
  excludeId,
  accent,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  teams: Team[];
  excludeId?: string;
  accent: "emerald" | "sky";
}) {
  const selected = teams.find((t) => t.id === value);
  const [tab, setTab] = useState<PickerTab>(
    () => (selected?.category as PickerTab | undefined) ?? "national",
  );
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!selected) return;
    const next = selected.isOfficial
      ? ((selected.category ?? "national") as PickerTab)
      : "custom";
    setTab(next);
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const tabs = useMemo(() => {
    const items: Array<{ id: PickerTab; label: string; count: number }> = PUBLIC_CATEGORIES.map(
      (id) => ({
        id,
        label: TEAM_CATEGORY_LABEL[id],
        count: teams.filter((t) => (t.category ?? "national") === id).length,
      }),
    );
    const customCount = teams.filter((t) => !t.isOfficial).length;
    if (customCount > 0) {
      items.push({ id: "custom", label: "커스텀", count: customCount });
    }
    return items.filter((t) => t.count > 0);
  }, [teams]);

  const list = useMemo(() => {
    const filtered = teams.filter((t) => {
      if (tab === "custom") {
        if (t.isOfficial) return false;
      } else if ((t.category ?? "national") !== tab) {
        return false;
      }
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        t.name.includes(q) ||
        t.nameEn.toLowerCase().includes(s) ||
        t.fifaCode.toLowerCase().includes(s)
      );
    });
    return [...filtered].sort((a, b) => {
      if (tab === "national") return a.fifaRank - b.fifaRank;
      return teamAverageOvr(b.players) - teamAverageOvr(a.players);
    });
  }, [teams, tab, q]);

  const selectedCls =
    accent === "emerald"
      ? "border-emerald-500 bg-emerald-950/50"
      : "border-sky-500 bg-sky-950/40";
  const activeTabCls =
    accent === "emerald" ? "bg-emerald-700 text-white" : "bg-sky-700 text-white";

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Label className="text-sm text-white">{label}</Label>
          {selected && (
            <div className="mt-1 text-xs text-zinc-400">
              {selected.name} · OVR {teamAverageOvr(selected.players)}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-md px-2 py-1 text-[11px]",
              tab === t.id ? activeTabCls : "bg-white/5 text-zinc-400",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="이 항목에서 검색…"
        className="h-8 border-white/10 bg-black/40 text-sm"
      />

      <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
        {list.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-zinc-500">팀이 없습니다.</p>
        )}
        {list.map((t) => {
          const active = t.id === value;
          const disabled = t.id === excludeId;
          return (
            <button
              key={t.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(t.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-sm transition",
                active
                  ? selectedCls
                  : "border-transparent bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]",
                disabled && "cursor-not-allowed opacity-40",
              )}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
                }}
              >
                {t.fifaCode.slice(0, 3)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-white">{t.name}</span>
                <span className="block truncate text-[11px] text-zinc-500">
                  {t.nameEn}
                  {tab === "national" ? ` · FIFA #${t.fifaRank}` : ""}
                </span>
              </span>
              <span
                className={cn(
                  "shrink-0 text-xs font-bold tabular-nums",
                  accent === "emerald" ? "text-emerald-400" : "text-sky-400",
                )}
              >
                {teamAverageOvr(t.players)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
