"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { FORMATION_LIST } from "@/data/formations";
import { enrichPlayer, teamAverageOvr } from "@/lib/ovr";
import { getCustomTeams, saveCustomTeam } from "@/lib/storage";
import type {
  ManagerPersonality,
  Player,
  PlayerSeasonStats,
  Position,
  Team,
  TeamColors,
  TeamTactics,
} from "@/types/football";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const POSITIONS: Position[] = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "RM",
  "LW",
  "RW",
  "CF",
  "ST",
];

const PERSONALITIES: ManagerPersonality[] = [
  "공격적",
  "수비적",
  "균형",
  "압박형",
  "점유율",
  "카리스마",
  "냉철",
  "열정적",
  "실험적",
  "수비우선",
];

const MENTALITIES: TeamTactics["mentality"][] = [
  "ultra-defensive",
  "defensive",
  "balanced",
  "attacking",
  "ultra-attacking",
];

const MENTALITY_LABEL: Record<TeamTactics["mentality"], string> = {
  "ultra-defensive": "극수비",
  defensive: "수비적",
  balanced: "균형",
  attacking: "공격적",
  "ultra-attacking": "극공격",
};

const PATTERNS: NonNullable<TeamColors["pattern"]>[] = [
  "solid",
  "stripes",
  "hoops",
  "checkered",
  "gradient",
];

type DraftPlayer = {
  key: string;
  name: string;
  position: Position;
  number: number;
  age: number;
  club: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  fouls: number;
  interceptions: number;
  dribbleSuccessRate: number;
  shots: number;
  shotsOnTarget: number;
  passAccuracy: number;
  tacklesWon: number;
  cleanSheets: number;
  saves: number;
  goalsConceded: number;
};

function emptyDraft(partial?: Partial<DraftPlayer>): DraftPlayer {
  return {
    key: nanoid(8),
    name: "",
    position: "CM",
    number: 10,
    age: 24,
    club: "",
    appearances: 25,
    goals: 0,
    assists: 0,
    yellowCards: 2,
    redCards: 0,
    fouls: 20,
    interceptions: 20,
    dribbleSuccessRate: 60,
    shots: 20,
    shotsOnTarget: 8,
    passAccuracy: 80,
    tacklesWon: 20,
    cleanSheets: 0,
    saves: 0,
    goalsConceded: 0,
    ...partial,
  };
}

function draftToPlayer(d: DraftPlayer): Player {
  const stats: PlayerSeasonStats = {
    appearances: d.appearances,
    goals: d.goals,
    assists: d.assists,
    yellowCards: d.yellowCards,
    redCards: d.redCards,
    fouls: d.fouls,
    interceptions: d.interceptions,
    dribbleSuccessRate: d.dribbleSuccessRate,
    shots: d.shots,
    shotsOnTarget: d.shotsOnTarget,
    passAccuracy: d.passAccuracy,
    tacklesWon: d.tacklesWon,
  };
  if (d.position === "GK") {
    stats.cleanSheets = d.cleanSheets;
    stats.saves = d.saves;
    stats.goalsConceded = d.goalsConceded;
  }
  return enrichPlayer({
    id: `custom-${d.key}`,
    name: d.name.trim() || "무명",
    nameEn: d.name.trim() || "Unknown",
    number: d.number,
    position: d.position,
    age: d.age,
    club: d.club.trim() || "프리에이전트",
    height: d.position === "GK" ? 190 : 180,
    preferredFoot: "R",
    stats,
  });
}

function playerToDraft(p: Player): DraftPlayer {
  return emptyDraft({
    key: p.id.replace(/^custom-/, "") || nanoid(8),
    name: p.name,
    position: p.position,
    number: p.number,
    age: p.age,
    club: p.club,
    appearances: p.stats.appearances,
    goals: p.stats.goals,
    assists: p.stats.assists,
    yellowCards: p.stats.yellowCards,
    redCards: p.stats.redCards,
    fouls: p.stats.fouls,
    interceptions: p.stats.interceptions,
    dribbleSuccessRate: p.stats.dribbleSuccessRate,
    shots: p.stats.shots,
    shotsOnTarget: p.stats.shotsOnTarget,
    passAccuracy: p.stats.passAccuracy,
    tacklesWon: p.stats.tacklesWon,
    cleanSheets: p.stats.cleanSheets ?? 0,
    saves: p.stats.saves ?? 0,
    goalsConceded: p.stats.goalsConceded ?? 0,
  });
}

export default function NewTeamPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
          불러오는 중…
        </div>
      }
    >
      <NewTeamForm />
    </Suspense>
  );
}

function NewTeamForm() {
  const router = useRouter();
  const search = useSearchParams();
  const editId = search.get("edit");

  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [managerName, setManagerName] = useState("");
  const [personality, setPersonality] = useState<ManagerPersonality>("균형");
  const [formation, setFormation] = useState("4-3-3");
  const [mentality, setMentality] = useState<TeamTactics["mentality"]>("balanced");
  const [pressing, setPressing] = useState(5);
  const [tempo, setTempo] = useState(5);
  const [width, setWidth] = useState(5);
  const [defensiveLine, setDefensiveLine] = useState(5);
  const [buildUp, setBuildUp] = useState<TeamTactics["buildUp"]>("mixed");
  const [primary, setPrimary] = useState("#1a5c3a");
  const [secondary, setSecondary] = useState("#ffffff");
  const [accent, setAccent] = useState("#c9a227");
  const [pattern, setPattern] = useState<TeamColors["pattern"]>("solid");
  const [photoUrl, setPhotoUrl] = useState("");
  const [players, setPlayers] = useState<DraftPlayer[]>([
    emptyDraft({ number: 1, position: "GK" }),
  ]);
  const [teamId, setTeamId] = useState(() => `custom-${nanoid(10)}`);
  const [ready, setReady] = useState(!editId);

  useEffect(() => {
    if (!editId) {
      setReady(true);
      return;
    }
    const existing = getCustomTeams().find((t) => t.id === editId);
    if (!existing) {
      setReady(true);
      return;
    }
    setTeamId(existing.id);
    setName(existing.name);
    setVisibility(existing.visibility);
    setManagerName(existing.manager.name);
    setPersonality(existing.manager.personality);
    setFormation(existing.tactics.formation);
    setMentality(existing.tactics.mentality);
    setPressing(existing.tactics.pressing);
    setTempo(existing.tactics.tempo);
    setWidth(existing.tactics.width);
    setDefensiveLine(existing.tactics.defensiveLine);
    setBuildUp(existing.tactics.buildUp);
    setPrimary(existing.colors.primary);
    setSecondary(existing.colors.secondary);
    setAccent(existing.colors.accent);
    setPattern(existing.colors.pattern ?? "solid");
    setPhotoUrl(existing.photoUrl ?? "");
    setPlayers(existing.players.map(playerToDraft));
    setReady(true);
  }, [editId]);

  const enriched = useMemo(() => players.map(draftToPlayer), [players]);
  const teamOvr = teamAverageOvr(enriched);

  const updatePlayer = (key: string, patch: Partial<DraftPlayer>) => {
    setPlayers((list) => list.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  };

  const save = () => {
    if (!name.trim()) return;
    const code = name
      .trim()
      .replace(/\s+/g, "")
      .slice(0, 3)
      .toUpperCase()
      .padEnd(3, "X");
    const team: Team = {
      id: teamId,
      name: name.trim(),
      nameEn: name.trim(),
      fifaCode: code,
      visibility,
      isOfficial: false,
      confederation: "AFC",
      fifaRank: 999,
      colors: { primary, secondary, accent, pattern },
      photoUrl: photoUrl.trim() || undefined,
      stadium: `${name.trim()} 홈구장`,
      manager: {
        name: managerName.trim() || "미정",
        nameEn: managerName.trim() || "TBD",
        nationality: "한국",
        personality,
        preferredFormation: formation,
        since: new Date().getFullYear(),
      },
      tactics: {
        formation,
        mentality,
        pressing,
        tempo,
        width,
        buildUp,
        defensiveLine,
      },
      players: enriched,
    };
    saveCustomTeam(team);
    router.push(`/teams/${team.id}`);
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
        불러오는 중…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">
        {editId ? "팀 편집" : "커스텀 팀 만들기"}
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        공개/비공개 팀을 만들고 시즌 기록으로 OVR를 미리 봅니다.
      </p>

      <div className="mt-6 space-y-8">
        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-emerald-400">기본 정보</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">팀 이름</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-white/10 bg-black/30"
                placeholder="예: 서울 유나이티드"
              />
            </div>
            <div className="space-y-2">
              <Label>공개 범위</Label>
              <div className="flex gap-2">
                {(["private", "public"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVisibility(v)}
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-2 text-sm",
                      visibility === v
                        ? "border-emerald-500 bg-emerald-950/40"
                        : "border-white/10 bg-black/20",
                    )}
                  >
                    {v === "private" ? "비공개" : "공개"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">사진 URL (선택)</Label>
              <Input
                id="photo"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="border-white/10 bg-black/30"
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-emerald-400">감독</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mgr">이름</Label>
              <Input
                id="mgr"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="border-white/10 bg-black/30"
              />
            </div>
            <div className="space-y-2">
              <Label>성격</Label>
              <Select
                value={personality}
                onValueChange={(v) => v && setPersonality(v as ManagerPersonality)}
              >
                <SelectTrigger className="w-full border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-emerald-400">전술</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>포메이션</Label>
              <Select value={formation} onValueChange={(v) => v && setFormation(v)}>
                <SelectTrigger className="w-full border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMATION_LIST.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>멘탈리티</Label>
              <Select
                value={mentality}
                onValueChange={(v) => v && setMentality(v as TeamTactics["mentality"])}
              >
                <SelectTrigger className="w-full border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MENTALITIES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {MENTALITY_LABEL[m]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>빌드업</Label>
              <div className="flex gap-2">
                {(["short", "mixed", "long"] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBuildUp(b)}
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-2 text-sm",
                      buildUp === b
                        ? "border-emerald-500 bg-emerald-950/40"
                        : "border-white/10 bg-black/20",
                    )}
                  >
                    {b === "short" ? "짧은 패스" : b === "mixed" ? "혼합" : "롱볼"}
                  </button>
                ))}
              </div>
            </div>
            <TacticSlider label="압박" value={pressing} onChange={setPressing} />
            <TacticSlider label="템포" value={tempo} onChange={setTempo} />
            <TacticSlider label="폭" value={width} onChange={setWidth} />
            <TacticSlider label="수비라인" value={defensiveLine} onChange={setDefensiveLine} />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-emerald-400">유니폼 색상</h2>
          <div className="grid grid-cols-3 gap-3">
            <ColorField label="주색" value={primary} onChange={setPrimary} />
            <ColorField label="보조" value={secondary} onChange={setSecondary} />
            <ColorField label="액센트" value={accent} onChange={setAccent} />
          </div>
          <div className="space-y-2">
            <Label>패턴</Label>
            <div className="flex flex-wrap gap-2">
              {PATTERNS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPattern(p)}
                  className={cn(
                    "rounded-md border px-2.5 py-1.5 text-xs",
                    pattern === p
                      ? "border-emerald-500 bg-emerald-950/40"
                      : "border-white/10 bg-black/20",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-emerald-400">선수</h2>
              <p className="mt-1 text-xs text-zinc-500">
                라이브 OVR 미리보기 · 팀 평균{" "}
                <span className="font-bold text-emerald-300">{teamOvr}</span>
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-white/15"
              onClick={() =>
                setPlayers((list) => [...list, emptyDraft({ number: list.length + 1 })])
              }
            >
              선수 추가
            </Button>
          </div>

          <div className="space-y-4">
            {players.map((p, idx) => {
              const preview = enriched[idx]!;
              return (
                <div
                  key={p.key}
                  className="rounded-lg border border-white/10 bg-black/25 p-3"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-500">선수 #{idx + 1}</span>
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-sm font-bold text-emerald-300">
                      OVR {preview.ovr}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Field
                      label="이름"
                      value={p.name}
                      onChange={(v) => updatePlayer(p.key, { name: v })}
                    />
                    <div className="space-y-1">
                      <Label className="text-xs text-zinc-500">포지션</Label>
                      <Select
                        value={p.position}
                        onValueChange={(v) =>
                          v && updatePlayer(p.key, { position: v as Position })
                        }
                      >
                        <SelectTrigger className="w-full border-white/10 bg-black/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {POSITIONS.map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {pos}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <NumField
                      label="번호"
                      value={p.number}
                      onChange={(v) => updatePlayer(p.key, { number: v })}
                    />
                    <NumField
                      label="나이"
                      value={p.age}
                      onChange={(v) => updatePlayer(p.key, { age: v })}
                    />
                    <Field
                      label="클럽"
                      value={p.club}
                      onChange={(v) => updatePlayer(p.key, { club: v })}
                    />
                    <NumField
                      label="출전"
                      value={p.appearances}
                      onChange={(v) => updatePlayer(p.key, { appearances: v })}
                    />
                    <NumField
                      label="골"
                      value={p.goals}
                      onChange={(v) => updatePlayer(p.key, { goals: v })}
                    />
                    <NumField
                      label="어시스트"
                      value={p.assists}
                      onChange={(v) => updatePlayer(p.key, { assists: v })}
                    />
                    <NumField
                      label="경고"
                      value={p.yellowCards}
                      onChange={(v) => updatePlayer(p.key, { yellowCards: v })}
                    />
                    <NumField
                      label="퇴장"
                      value={p.redCards}
                      onChange={(v) => updatePlayer(p.key, { redCards: v })}
                    />
                    <NumField
                      label="파울"
                      value={p.fouls}
                      onChange={(v) => updatePlayer(p.key, { fouls: v })}
                    />
                    <NumField
                      label="인터셉트"
                      value={p.interceptions}
                      onChange={(v) => updatePlayer(p.key, { interceptions: v })}
                    />
                    <NumField
                      label="드리블성공%"
                      value={p.dribbleSuccessRate}
                      onChange={(v) => updatePlayer(p.key, { dribbleSuccessRate: v })}
                    />
                    <NumField
                      label="슈팅"
                      value={p.shots}
                      onChange={(v) => updatePlayer(p.key, { shots: v })}
                    />
                    <NumField
                      label="유효슈팅"
                      value={p.shotsOnTarget}
                      onChange={(v) => updatePlayer(p.key, { shotsOnTarget: v })}
                    />
                    <NumField
                      label="패스정확도%"
                      value={p.passAccuracy}
                      onChange={(v) => updatePlayer(p.key, { passAccuracy: v })}
                    />
                    <NumField
                      label="태클성공"
                      value={p.tacklesWon}
                      onChange={(v) => updatePlayer(p.key, { tacklesWon: v })}
                    />
                    {p.position === "GK" && (
                      <>
                        <NumField
                          label="클린시트"
                          value={p.cleanSheets}
                          onChange={(v) => updatePlayer(p.key, { cleanSheets: v })}
                        />
                        <NumField
                          label="선방"
                          value={p.saves}
                          onChange={(v) => updatePlayer(p.key, { saves: v })}
                        />
                        <NumField
                          label="실점"
                          value={p.goalsConceded}
                          onChange={(v) => updatePlayer(p.key, { goalsConceded: v })}
                        />
                      </>
                    )}
                  </div>
                  {players.length > 1 && (
                    <button
                      type="button"
                      className="mt-3 text-xs text-red-400 hover:underline"
                      onClick={() =>
                        setPlayers((list) => list.filter((x) => x.key !== p.key))
                      }
                    >
                      삭제
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button
            className="bg-emerald-600 hover:bg-emerald-500"
            size="lg"
            disabled={!name.trim() || players.length === 0}
            onClick={save}
          >
            저장
          </Button>
          <Link
            href={editId ? `/teams/${editId}` : "/teams"}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/15",
            )}
          >
            취소
          </Link>
        </div>
      </div>
    </div>
  );
}

function TacticSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <Label>{label}</Label>
        <span className="tabular-nums text-zinc-400">{value}/10</span>
      </div>
      <Slider
        min={1}
        max={10}
        step={1}
        value={[value]}
        onValueChange={(v) => {
          const n = Array.isArray(v) ? v[0] : v;
          if (typeof n === "number") onChange(n);
        }}
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded border border-white/10 bg-transparent"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-white/10 bg-black/30 font-mono text-xs"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-zinc-500">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-white/10 bg-black/30"
      />
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-zinc-500">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="border-white/10 bg-black/30"
      />
    </div>
  );
}
