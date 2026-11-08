"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayerCardDetail, PlayStyleBadges } from "@/components/player-attributes";
import { TEAM_CATEGORY_LABEL } from "@/data/nations";
import {
  getTeamById,
  isOfficialOverride,
  resetOfficialTeam,
} from "@/lib/storage";
import { teamAverageOvr } from "@/lib/ovr";
import type { Team } from "@/types/football";
import { Badge } from "@/components/ui/badge";

export default function TeamDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
          불러오는 중…
        </div>
      }
    >
      <TeamDetailInner />
    </Suspense>
  );
}

function TeamDetailInner() {
  const search = useSearchParams();
  const id = search.get("id") ?? "";
  const [team, setTeam] = useState<Team | undefined>();
  const [edited, setEdited] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const t = getTeamById(id);
    setTeam(t);
    setEdited(isOfficialOverride(id));
    if (t?.players[0]) setSelectedId(t.players[0].id);
  }, [id]);

  if (!team) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-zinc-400">팀을 찾을 수 없습니다.</p>
        <Link href="/teams/" className="mt-4 inline-block text-emerald-400">
          목록으로
        </Link>
      </div>
    );
  }

  const ovr = teamAverageOvr(team.players);
  const sorted = [...team.players].sort((a, b) => b.ovr - a.ovr);
  const selected = sorted.find((p) => p.id === selectedId) ?? sorted[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: `linear-gradient(135deg, ${team.colors.primary}cc, ${team.colors.secondary}99 50%, #0b0d10)`,
        }}
      >
        <div className="flex flex-wrap items-end gap-4">
          {team.crestUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={team.crestUrl} alt="" className="h-20 w-28 object-contain drop-shadow-lg" />
          )}
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
              {team.name}
            </h1>
            <p className="text-sm text-white/70">
              {team.nameEn} · {TEAM_CATEGORY_LABEL[team.category ?? "national"]}
              {team.category === "national" ? ` · FIFA #${team.fifaRank}` : ""}
            </p>
          </div>
          <div className="ml-auto rounded-lg bg-black/50 px-4 py-2 text-center">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400">Team OVR</div>
            <div className="text-3xl font-bold text-emerald-400">{ovr}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <InfoCard
          title="감독"
          body={`${team.manager.name} (${team.manager.nameEn})`}
          sub={`성격: ${team.manager.personality} · 취임 ${team.manager.since}`}
        />
        <InfoCard
          title="전술"
          body={team.tactics.formation}
          sub={`성향 ${team.tactics.mentality} · 압박 ${team.tactics.pressing}/10`}
        />
        <InfoCard title="홈구장" body={team.stadium} sub={team.leagueName ?? team.confederation} />
        <InfoCard
          title="구성"
          body={`선수 ${team.players.length}명`}
          sub="EA FC 27 공식 능력치 · 플레이스타일"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <h2 className="text-lg font-semibold">선수 명단</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[2.5rem_1fr_3rem_3rem] gap-2 border-b border-white/10 bg-white/5 px-3 py-2 text-[11px] text-zinc-500">
              <span>#</span>
              <span>이름</span>
              <span>포지션</span>
              <span className="text-right">OVR</span>
            </div>
            {sorted.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`grid w-full grid-cols-[2.5rem_1fr_3rem_3rem] gap-2 border-b border-white/5 px-3 py-2.5 text-left text-sm last:border-0 ${
                  selected?.id === p.id ? "bg-emerald-950/40" : "hover:bg-white/5"
                }`}
              >
                <span className="text-zinc-500">{p.number}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    {p.name}
                    {p.isCaptain && (
                      <Badge className="h-4 bg-amber-400 px-1 text-[9px] text-black">C</Badge>
                    )}
                  </div>
                  <div className="mt-0.5">
                    <PlayStyleBadges styles={p.playstyles?.slice(0, 3) ?? []} />
                  </div>
                </div>
                <span className="text-zinc-400">{p.position}</span>
                <span className="text-right font-bold text-emerald-400">{p.ovr}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">능력치</h2>
          {selected && <PlayerCardDetail player={selected} />}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href={`/teams/new/?edit=${encodeURIComponent(team.id)}`}
          className="text-sky-400 hover:underline"
        >
          팀 편집
        </Link>
        {team.isOfficial && edited && (
          <button
            type="button"
            className="text-amber-400 hover:underline"
            onClick={() => {
              resetOfficialTeam(team.id);
              setTeam(getTeamById(team.id));
              setEdited(false);
            }}
          >
            공식 데이터로 되돌리기
          </button>
        )}
        <Link href="/play/" className="text-emerald-400 hover:underline">
          이 팀으로 경기하기 →
        </Link>
        <Link href="/teams/" className="text-zinc-400 hover:underline">
          ← 목록
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ title, body, sub }: { title: string; body: string; sub: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#14181f] p-4">
      <div className="text-[11px] uppercase tracking-wider text-zinc-500">{title}</div>
      <div className="mt-1 font-semibold text-white">{body}</div>
      <div className="mt-0.5 text-xs text-zinc-400">{sub}</div>
    </div>
  );
}
