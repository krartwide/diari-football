"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { PLAYSTYLE_DEFS } from "@/data/playstyles";
import { FORMATION_LIST } from "@/data/formations";
import {
  attributesFromFacets,
  estimateOvrFromAttributes,
  teamAverageOvr,
} from "@/lib/ovr";
import { getTeamById, saveCustomTeam } from "@/lib/storage";
import type {
  ManagerPersonality,
  Player,
  PlayerAttributes,
  PlayerPlayStyle,
  Position,
  Team,
  TeamColors,
  TeamTactics,
} from "@/types/football";
import { Button } from "@/components/ui/button";
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
import { AttributeGrid, PlayStyleBadges } from "@/components/player-attributes";

const POSITIONS: Position[] = [
  "GK", "CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "CF", "ST",
];

const PERSONALITIES: ManagerPersonality[] = [
  "공격적", "수비적", "균형", "압박형", "점유율", "카리스마", "냉철", "열정적", "실험적", "수비우선",
];

const MENTALITIES: TeamTactics["mentality"][] = [
  "ultra-defensive", "defensive", "balanced", "attacking", "ultra-attacking",
];

const MENTALITY_LABEL: Record<TeamTactics["mentality"], string> = {
  "ultra-defensive": "극수비",
  defensive: "수비적",
  balanced: "균형",
  attacking: "공격적",
  "ultra-attacking": "극공격",
};

type DraftPlayer = {
  key: string;
  name: string;
  position: Position;
  number: number;
  age: number;
  club: string;
  height: number;
  preferredFoot: "L" | "R" | "B";
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  goalkeeping: number;
  playstyles: PlayerPlayStyle[];
  isCaptain?: boolean;
  eaId?: number;
  /** Preserve EA detailed breakdown when facets unchanged */
  savedAttributes?: PlayerAttributes;
  savedOvr?: number;
};

function emptyDraft(partial?: Partial<DraftPlayer>): DraftPlayer {
  return {
    key: nanoid(8),
    name: "",
    position: "CM",
    number: 10,
    age: 24,
    club: "",
    height: 180,
    preferredFoot: "R",
    pace: 70,
    shooting: 70,
    passing: 70,
    dribbling: 70,
    defending: 70,
    physical: 70,
    goalkeeping: 70,
    playstyles: [],
    ...partial,
  };
}

function playerToDraft(p: Player): DraftPlayer {
  return {
    key: p.id,
    name: p.name,
    position: p.position,
    number: p.number,
    age: p.age,
    club: p.club,
    height: p.height,
    preferredFoot: p.preferredFoot,
    pace: p.attributes.pace,
    shooting: p.attributes.shooting,
    passing: p.attributes.passing,
    dribbling: p.attributes.dribbling,
    defending: p.attributes.defending,
    physical: p.attributes.physical,
    goalkeeping: p.attributes.goalkeeping ?? 70,
    playstyles: p.playstyles ?? [],
    isCaptain: p.isCaptain,
    eaId: p.eaId,
    savedAttributes: p.attributes,
    savedOvr: p.ovr,
  };
}

function draftToPlayer(d: DraftPlayer): Player {
  const saved = d.savedAttributes;
  const facetsMatch =
    saved &&
    saved.pace === d.pace &&
    saved.shooting === d.shooting &&
    saved.passing === d.passing &&
    saved.dribbling === d.dribbling &&
    saved.defending === d.defending &&
    saved.physical === d.physical &&
    (d.position !== "GK" || (saved.goalkeeping ?? 70) === d.goalkeeping);

  const attrs = facetsMatch
    ? saved
    : attributesFromFacets(
        {
          pace: d.pace,
          shooting: d.shooting,
          passing: d.passing,
          dribbling: d.dribbling,
          defending: d.defending,
          physical: d.physical,
        },
        d.position,
        d.goalkeeping,
      );
  return {
    id: d.key || `p-${d.number}-${nanoid(6)}`,
    name: d.name.trim() || `선수 ${d.number}`,
    nameEn: d.name.trim() || `Player ${d.number}`,
    number: d.number,
    position: d.position,
    age: d.age,
    club: d.club,
    height: d.height,
    preferredFoot: d.preferredFoot,
    attributes: attrs,
    ovr: facetsMatch && d.savedOvr != null ? d.savedOvr : estimateOvrFromAttributes(attrs, d.position),
    playstyles: d.playstyles,
    isCaptain: d.isCaptain,
    eaId: d.eaId,
  };
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
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [teamId, setTeamId] = useState(() => `custom-${nanoid(10)}`);
  const [baseTeam, setBaseTeam] = useState<Team | null>(null);
  const [ready, setReady] = useState(!editId);

  useEffect(() => {
    if (!editId) {
      setReady(true);
      return;
    }
    const existing = getTeamById(editId);
    if (!existing) {
      setReady(true);
      return;
    }
    setBaseTeam(existing);
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
    const drafts = existing.players.map(playerToDraft);
    setPlayers(drafts);
    setActiveKey(drafts[0]?.key ?? null);
    setReady(true);
  }, [editId]);

  const enriched = useMemo(() => players.map(draftToPlayer), [players]);
  const teamOvr = teamAverageOvr(enriched);
  const editingOfficial = Boolean(baseTeam?.isOfficial || teamId.startsWith("official-") || teamId.startsWith("club-"));
  const active = players.find((p) => p.key === activeKey) ?? players[0];
  const activePlayer = active ? draftToPlayer(active) : null;

  const updatePlayer = (key: string, patch: Partial<DraftPlayer>) => {
    setPlayers((list) => list.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  };

  const toggleStyle = (key: string, id: PlayerPlayStyle["id"], plus: boolean) => {
    setPlayers((list) =>
      list.map((p) => {
        if (p.key !== key) return p;
        const exists = p.playstyles.find((s) => s.id === id && s.plus === plus);
        if (exists) {
          return { ...p, playstyles: p.playstyles.filter((s) => !(s.id === id && s.plus === plus)) };
        }
        // replace same id other tier
        const filtered = p.playstyles.filter((s) => s.id !== id);
        return { ...p, playstyles: [...filtered, { id, plus }] };
      }),
    );
  };

  const save = () => {
    if (!name.trim()) return;
    const code = name.trim().replace(/\s+/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
    const team: Team = {
      id: teamId,
      name: name.trim(),
      nameEn: editingOfficial && baseTeam ? baseTeam.nameEn : name.trim(),
      fifaCode: editingOfficial && baseTeam ? baseTeam.fifaCode : code,
      visibility: editingOfficial ? "public" : visibility,
      isOfficial: editingOfficial,
      category: editingOfficial && baseTeam ? baseTeam.category : "custom",
      confederation: editingOfficial && baseTeam ? baseTeam.confederation : "AFC",
      fifaRank: editingOfficial && baseTeam ? baseTeam.fifaRank : 999,
      colors: { primary, secondary, accent, pattern },
      photoUrl: photoUrl.trim() || undefined,
      crestUrl: baseTeam?.crestUrl,
      stadium:
        editingOfficial && baseTeam ? baseTeam.stadium : `${name.trim()} 홈구장`,
      manager: {
        name: managerName.trim() || "미정",
        nameEn:
          editingOfficial && baseTeam
            ? baseTeam.manager.nameEn
            : managerName.trim() || "TBD",
        nationality:
          editingOfficial && baseTeam ? baseTeam.manager.nationality : "한국",
        personality,
        preferredFormation: formation,
        since:
          editingOfficial && baseTeam
            ? baseTeam.manager.since
            : new Date().getFullYear(),
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
      leagueName: baseTeam?.leagueName,
      worldCupTitles: baseTeam?.worldCupTitles,
    };
    saveCustomTeam(team);
    router.push(`/teams/view/?id=${encodeURIComponent(team.id)}`);
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
        불러오는 중…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">
        {editingOfficial ? "공식 팀 편집" : editId ? "팀 편집" : "커스텀 팀 만들기"}
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        시즌 기록 대신 EA FC 27 스타일 능력치(페이스~피지컬)와 플레이스타일(일반/+)을 편집합니다.
        팀 OVR 미리보기: <span className="text-emerald-400 font-semibold">{teamOvr}</span>
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
              />
            </div>
            {!editingOfficial && (
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
            )}
            <div className="space-y-2">
              <Label htmlFor="photo">사진 URL (선택)</Label>
              <Input
                id="photo"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="border-white/10 bg-black/30"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-emerald-400">감독 · 전술 · 색상</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>감독 이름</Label>
              <Input
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="border-white/10 bg-black/30"
              />
            </div>
            <div className="space-y-2">
              <Label>성격</Label>
              <Select value={personality} onValueChange={(v) => setPersonality(v as ManagerPersonality)}>
                <SelectTrigger className="border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALITIES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>포메이션</Label>
              <Select
                value={formation}
                onValueChange={(v) => {
                  if (v) setFormation(v);
                }}
              >
                <SelectTrigger className="border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMATION_LIST.map((f) => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>성향</Label>
              <Select value={mentality} onValueChange={(v) => setMentality(v as TeamTactics["mentality"])}>
                <SelectTrigger className="border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MENTALITIES.map((m) => (
                    <SelectItem key={m} value={m}>{MENTALITY_LABEL[m]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(
              [
                ["압박", pressing, setPressing],
                ["템포", tempo, setTempo],
                ["폭", width, setWidth],
                ["수비라인", defensiveLine, setDefensiveLine],
              ] as const
            ).map(([label, val, setVal]) => (
              <div key={label} className="space-y-2">
                <Label>
                  {label}: {val}
                </Label>
                <Slider
                  value={[val]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(v) => {
                    const n = Array.isArray(v) ? v[0] : v;
                    setVal(typeof n === "number" ? n : 5);
                  }}
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label>빌드업</Label>
              <Select value={buildUp} onValueChange={(v) => setBuildUp(v as TeamTactics["buildUp"])}>
                <SelectTrigger className="border-white/10 bg-black/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">짧은 패스</SelectItem>
                  <SelectItem value="mixed">혼합</SelectItem>
                  <SelectItem value="long">롱볼</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <label className="flex-1 text-xs text-zinc-400">
                주색
                <input type="color" value={primary.startsWith("#") ? primary : "#1a5c3a"} onChange={(e) => setPrimary(e.target.value)} className="mt-1 h-9 w-full" />
              </label>
              <label className="flex-1 text-xs text-zinc-400">
                보조
                <input type="color" value={secondary.startsWith("#") ? secondary : "#ffffff"} onChange={(e) => setSecondary(e.target.value)} className="mt-1 h-9 w-full" />
              </label>
              <label className="flex-1 text-xs text-zinc-400">
                강조
                <input type="color" value={accent.startsWith("#") ? accent : "#c9a227"} onChange={(e) => setAccent(e.target.value)} className="mt-1 h-9 w-full" />
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-emerald-400">선수 · FC 27 능력치</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const d = emptyDraft({ number: players.length + 1 });
                setPlayers((p) => [...p, d]);
                setActiveKey(d.key);
              }}
            >
              선수 추가
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {players.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveKey(p.key)}
                className={cn(
                  "rounded-md border px-2 py-1 text-xs",
                  active?.key === p.key
                    ? "border-emerald-500 bg-emerald-950/50 text-white"
                    : "border-white/10 text-zinc-400",
                )}
              >
                #{p.number} {p.name || p.position}
              </button>
            ))}
          </div>

          {active && (
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1 sm:col-span-2">
                  <Label>이름</Label>
                  <Input
                    value={active.name}
                    onChange={(e) => updatePlayer(active.key, { name: e.target.value })}
                    className="border-white/10 bg-black/30"
                  />
                </div>
                <div className="space-y-1">
                  <Label>포지션</Label>
                  <Select
                    value={active.position}
                    onValueChange={(v) => updatePlayer(active.key, { position: v as Position })}
                  >
                    <SelectTrigger className="border-white/10 bg-black/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map((pos) => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>등번호</Label>
                  <Input
                    type="number"
                    value={active.number}
                    onChange={(e) => updatePlayer(active.key, { number: Number(e.target.value) || 1 })}
                    className="border-white/10 bg-black/30"
                  />
                </div>
                <div className="space-y-1">
                  <Label>나이</Label>
                  <Input
                    type="number"
                    value={active.age}
                    onChange={(e) => updatePlayer(active.key, { age: Number(e.target.value) || 20 })}
                    className="border-white/10 bg-black/30"
                  />
                </div>
                <div className="space-y-1">
                  <Label>클럽</Label>
                  <Input
                    value={active.club}
                    onChange={(e) => updatePlayer(active.key, { club: e.target.value })}
                    className="border-white/10 bg-black/30"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["페이스", "pace"],
                    ["슈팅", "shooting"],
                    ["패스", "passing"],
                    ["드리블", "dribbling"],
                    ["수비", "defending"],
                    ["피지컬", "physical"],
                  ] as const
                ).map(([label, key]) => (
                  <div key={key} className="space-y-1">
                    <Label>
                      {label}: {active[key]}
                    </Label>
                    <Slider
                      value={[active[key]]}
                      min={40}
                      max={99}
                      step={1}
                      onValueChange={(v) => {
                        const n = Array.isArray(v) ? v[0] : v;
                        updatePlayer(active.key, { [key]: typeof n === "number" ? n : 70 });
                      }}
                    />
                  </div>
                ))}
                {active.position === "GK" && (
                  <div className="space-y-1 sm:col-span-2">
                    <Label>골키핑: {active.goalkeeping}</Label>
                    <Slider
                      value={[active.goalkeeping]}
                      min={40}
                      max={99}
                      step={1}
                      onValueChange={(v) => {
                        const n = Array.isArray(v) ? v[0] : v;
                        updatePlayer(active.key, {
                          goalkeeping: typeof n === "number" ? n : 70,
                        });
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label className="mb-2 block">플레이스타일 (은색=일반, 금색=+)</Label>
                <div className="mb-2">
                  <PlayStyleBadges styles={active.playstyles} />
                </div>
                <div className="grid max-h-48 gap-1 overflow-y-auto sm:grid-cols-2">
                  {PLAYSTYLE_DEFS.map((def) => {
                    const cur = active.playstyles.find((s) => s.id === def.id);
                    return (
                      <div key={def.id} className="flex items-center gap-1 text-xs">
                        <span className="flex-1 truncate text-zinc-300">{def.nameKo}</span>
                        <button
                          type="button"
                          className={cn(
                            "rounded border px-1.5 py-0.5",
                            cur && !cur.plus
                              ? "border-zinc-300 bg-zinc-500/30"
                              : "border-white/10",
                          )}
                          onClick={() => toggleStyle(active.key, def.id, false)}
                        >
                          일반
                        </button>
                        <button
                          type="button"
                          className={cn(
                            "rounded border px-1.5 py-0.5",
                            cur?.plus ? "border-amber-400 bg-amber-500/20 text-amber-200" : "border-white/10",
                          )}
                          onClick={() => toggleStyle(active.key, def.id, true)}
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {activePlayer && (
                <AttributeGrid
                  attrs={activePlayer.attributes}
                  isGk={active.position === "GK"}
                />
              )}

              {players.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-400"
                  onClick={() => {
                    setPlayers((list) => list.filter((p) => p.key !== active.key));
                    setActiveKey(null);
                  }}
                >
                  이 선수 삭제
                </Button>
              )}
            </div>
          )}
        </section>

        <div className="flex gap-3">
          <Button type="button" onClick={save} className="bg-emerald-600 hover:bg-emerald-500">
            저장
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}
