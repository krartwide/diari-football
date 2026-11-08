"use client";

import { getPlayStyleDef } from "@/data/playstyles";
import type { Player, PlayerAttributes } from "@/types/football";
import { cn } from "@/lib/utils";

function barColor(v: number): string {
  if (v >= 80) return "bg-emerald-400";
  if (v >= 70) return "bg-lime-400";
  if (v >= 60) return "bg-amber-400";
  if (v >= 45) return "bg-orange-500";
  return "bg-red-500";
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-baseline justify-between gap-2 text-[12px]">
        <span className="text-zinc-200">{label}</span>
        <span className="font-semibold tabular-nums text-white">{value}</span>
      </div>
      <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full transition-all", barColor(value))}
          style={{ width: `${Math.max(2, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function FacetBlock({
  title,
  overall,
  rows,
}: {
  title: string;
  overall: number;
  rows: Array<{ label: string; value: number }>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
        <h4 className="text-sm font-bold tracking-wide text-white">{title}</h4>
        <span className="text-base font-bold tabular-nums text-white">{overall}</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <StatRow key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
    </div>
  );
}

export function AttributeGrid({ attrs, isGk }: { attrs: PlayerAttributes; isGk?: boolean }) {
  const d = attrs.detailed;
  const gk = attrs.gkDetailed;

  if (isGk && gk) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FacetBlock
          title="골키핑"
          overall={attrs.goalkeeping ?? attrs.defending}
          rows={[
            { label: "다이빙", value: gk.diving },
            { label: "핸들링", value: gk.handling },
            { label: "킥킹", value: gk.kicking },
            { label: "리플렉스", value: gk.reflexes },
            { label: "스피드", value: gk.speed },
            { label: "포지셔닝", value: gk.positioning },
          ]}
        />
        <FacetBlock
          title="페이스"
          overall={attrs.pace}
          rows={[
            { label: "가속력", value: d?.acceleration ?? attrs.pace },
            { label: "전력 질주 속도", value: d?.sprintSpeed ?? attrs.pace },
          ]}
        />
        <FacetBlock
          title="피지컬"
          overall={attrs.physical}
          rows={[
            { label: "점프", value: d?.jumping ?? attrs.physical },
            { label: "스태미나", value: d?.stamina ?? attrs.physical },
            { label: "몸싸움", value: d?.strength ?? attrs.physical },
            { label: "적극성", value: d?.aggression ?? attrs.physical },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <FacetBlock
        title="페이스"
        overall={attrs.pace}
        rows={[
          { label: "가속력", value: d?.acceleration ?? attrs.pace },
          { label: "전력 질주 속도", value: d?.sprintSpeed ?? attrs.pace },
        ]}
      />
      <FacetBlock
        title="슈팅"
        overall={attrs.shooting}
        rows={[
          { label: "포지셔닝", value: d?.positioning ?? attrs.shooting },
          { label: "골 결정력", value: d?.finishing ?? attrs.shooting },
          { label: "슛 파워", value: d?.shotPower ?? attrs.shooting },
          { label: "중거리 슛", value: d?.longShots ?? attrs.shooting },
          { label: "발리슛", value: d?.volleys ?? attrs.shooting },
          { label: "페널티킥", value: d?.penalties ?? attrs.shooting },
        ]}
      />
      <FacetBlock
        title="패스"
        overall={attrs.passing}
        rows={[
          { label: "시야", value: d?.vision ?? attrs.passing },
          { label: "크로스", value: d?.crossing ?? attrs.passing },
          { label: "프리킥 정확도", value: d?.fkAccuracy ?? attrs.passing },
          { label: "짧은 패스", value: d?.shortPassing ?? attrs.passing },
          { label: "긴 패스", value: d?.longPassing ?? attrs.passing },
          { label: "커브", value: d?.curve ?? attrs.passing },
        ]}
      />
      <FacetBlock
        title="드리블"
        overall={attrs.dribbling}
        rows={[
          { label: "민첩성", value: d?.agility ?? attrs.dribbling },
          { label: "밸런스", value: d?.balance ?? attrs.dribbling },
          { label: "반응 속도", value: d?.reactions ?? attrs.dribbling },
          { label: "볼 컨트롤", value: d?.ballControl ?? attrs.dribbling },
          { label: "드리블", value: d?.dribbling ?? attrs.dribbling },
          { label: "평정심", value: d?.composure ?? attrs.dribbling },
        ]}
      />
      <FacetBlock
        title="수비"
        overall={attrs.defending}
        rows={[
          { label: "가로채기", value: d?.interceptions ?? attrs.defending },
          { label: "헤딩 정확도", value: d?.headingAccuracy ?? attrs.defending },
          { label: "수비 이해도", value: d?.defensiveAwareness ?? attrs.defending },
          { label: "스탠딩 태클", value: d?.standingTackle ?? attrs.defending },
          { label: "슬라이딩 태클", value: d?.slidingTackle ?? attrs.defending },
        ]}
      />
      <FacetBlock
        title="피지컬"
        overall={attrs.physical}
        rows={[
          { label: "점프", value: d?.jumping ?? attrs.physical },
          { label: "스태미나", value: d?.stamina ?? attrs.physical },
          { label: "몸싸움", value: d?.strength ?? attrs.physical },
          { label: "적극성", value: d?.aggression ?? attrs.physical },
        ]}
      />
    </div>
  );
}

export function PlayStyleBadges({
  styles,
}: {
  styles: Player["playstyles"];
}) {
  if (!styles?.length) {
    return <p className="text-xs text-zinc-500">플레이스타일 없음</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {styles.map((s) => {
        const def = getPlayStyleDef(s.id);
        const label = def?.nameKo ?? s.id;
        return (
          <span
            key={`${s.id}-${s.plus}`}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[11px] font-medium",
              s.plus
                ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                : "border-zinc-400/40 bg-zinc-400/10 text-zinc-200",
            )}
            title={def?.nameEn}
          >
            {label}
            {s.plus ? "+" : ""}
          </span>
        );
      })}
    </div>
  );
}

export function PlayerCardDetail({ player }: { player: Player }) {
  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#14181f] p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-lg font-semibold text-white">
            {player.name}{" "}
            <span className="text-sm font-normal text-zinc-400">
              #{player.number} · {player.position}
            </span>
          </div>
          <div className="text-xs text-zinc-500">
            {player.club} · {player.age}세 · {player.height}cm ·{" "}
            {player.preferredFoot === "L" ? "왼발" : player.preferredFoot === "B" ? "양발" : "오른발"}
          </div>
        </div>
        <div className="rounded-lg bg-black/40 px-3 py-1 text-center">
          <div className="text-[10px] uppercase text-zinc-500">OVR</div>
          <div className="text-2xl font-bold text-emerald-400">{player.ovr}</div>
        </div>
      </div>
      <div>
        <div className="mb-2 text-[11px] uppercase tracking-wider text-zinc-500">
          플레이스타일
        </div>
        <PlayStyleBadges styles={player.playstyles} />
      </div>
      <AttributeGrid attrs={player.attributes} isGk={player.position === "GK"} />
    </div>
  );
}
