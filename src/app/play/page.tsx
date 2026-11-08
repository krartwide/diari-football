"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MATCH_MODES, simulateSeries } from "@/lib/simulation/series";
import { simulateMatch } from "@/lib/simulation/engine";
import { getAllTeams, saveMatch, saveSeries } from "@/lib/storage";
import { teamAverageOvr } from "@/lib/ovr";
import type { MatchMode, MatchSettings, Team } from "@/types/football";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

  const [error, setError] = useState<string | null>(null);

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

    // defer so UI can show busy
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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">
        팀 맞대결
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        단판부터 한국시리즈형 다전제까지 고르고, 홈 어드밴티지를 맞춘 뒤 시작합니다.
      </p>

      <div className="mt-8 space-y-6 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <TeamPicker
            label="홈 / A팀"
            value={homeId}
            onChange={setHomeId}
            teams={teams}
          />
          <TeamPicker
            label="어웨이 / B팀"
            value={awayId}
            onChange={setAwayId}
            teams={teams}
          />
        </div>

        {home && away && (
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-black/30 p-3 text-center text-sm">
            <div>
              <div className="text-zinc-400">{home.name}</div>
              <div className="text-2xl font-bold text-emerald-400">
                OVR {teamAverageOvr(home.players)}
              </div>
            </div>
            <div>
              <div className="text-zinc-400">{away.name}</div>
              <div className="text-2xl font-bold text-sky-400">
                OVR {teamAverageOvr(away.players)}
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  teams: Team[];
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-white/10 bg-black/30 px-2 text-sm text-white"
      >
        <option value="" disabled>
          팀 선택
        </option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name} ({t.fifaCode}) · #{t.fifaRank}
          </option>
        ))}
      </select>
    </div>
  );
}
