"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { MatchResult, SeriesResult } from "@/types/football";
import {
  deleteMatch,
  deleteSeries,
  exportBackupCode,
  getSavedMatches,
  getSavedSeries,
  importBackupCode,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatKickoffKst } from "@/lib/format";

export default function HistoryPage() {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [series, setSeries] = useState<SeriesResult[]>([]);
  const [backup, setBackup] = useState("");
  const [msg, setMsg] = useState("");

  const reload = () => {
    setMatches(getSavedMatches());
    setSeries(getSavedSeries());
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">기록</h1>
      <p className="mt-1 text-sm text-zinc-400">
        경기는 이 브라우저에 저장됩니다. 백업 코드로 폰·PC·태블릿 어디에나 옮길 수 있습니다.
        원하지 않는 기록은 삭제할 수 있습니다.
      </p>

      <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-[#14181f] p-4">
        <p className="text-sm text-zinc-300">기기 간 백업</p>
        <p className="text-xs text-zinc-500">
          백업 코드를 복사해 다른 기기에서 붙여넣으면 팀·경기·시리즈가 복원됩니다.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const code = exportBackupCode();
              setBackup(code);
              setMsg("백업 코드를 생성했습니다. 다른 기기에 붙여넣으세요.");
            }}
          >
            백업 코드 내보내기
          </Button>
        </div>
        <Textarea
          value={backup}
          onChange={(e) => setBackup(e.target.value)}
          placeholder="백업 코드 붙여넣기…"
          className="min-h-24 border-white/10 bg-black/30 font-mono text-xs"
        />
        <Button
          size="sm"
          onClick={() => {
            const r = importBackupCode(backup);
            if (r.ok) {
              reload();
              setMsg("백업을 복원했습니다.");
            } else setMsg(r.error ?? "실패");
          }}
        >
          백업 가져오기
        </Button>
        {msg && <p className="text-xs text-emerald-400">{msg}</p>}
      </div>

      <h2 className="mt-8 text-lg font-semibold">시리즈</h2>
      <div className="mt-3 space-y-2">
        {series.length === 0 && <p className="text-sm text-zinc-500">시리즈 기록이 없습니다.</p>}
        {series.map((s) => {
          const lastId = s.matches[s.matches.length - 1]?.id ?? "";
          return (
            <div
              key={s.id}
              className="flex items-stretch gap-2 rounded-lg border border-white/10 bg-[#14181f]"
            >
              <Link
                href={`/match/?id=${encodeURIComponent(lastId)}&series=${encodeURIComponent(s.id)}`}
                className="min-w-0 flex-1 px-3 py-3 hover:bg-white/[0.03]"
              >
                <div className="font-medium text-white">
                  {s.homeTeamName} {s.homeAggregate} - {s.awayAggregate} {s.awayTeamName}
                </div>
                <div className="text-xs text-zinc-500">
                  {s.settings.competitionName} · {s.matches.length}경기 · {s.settings.mode}
                </div>
              </Link>
              <button
                type="button"
                className="shrink-0 px-3 text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300"
                onClick={() => {
                  if (!window.confirm("이 시리즈와 포함된 경기를 삭제할까요?")) return;
                  deleteSeries(s.id);
                  reload();
                  setMsg("시리즈를 삭제했습니다.");
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 text-lg font-semibold">경기</h2>
      <div className="mt-3 space-y-2">
        {matches.length === 0 && <p className="text-sm text-zinc-500">저장된 경기가 없습니다.</p>}
        {matches.map((m) => (
          <div
            key={m.id}
            className="flex items-stretch gap-2 rounded-lg border border-white/10 bg-[#14181f]"
          >
            <Link
              href={`/match/?id=${encodeURIComponent(m.id)}`}
              className="min-w-0 flex-1 px-3 py-3 hover:bg-white/[0.03]"
            >
              <div className="font-medium text-white">
                {m.homeTeam.name} {m.homeScore} - {m.awayScore} {m.awayTeam.name}
              </div>
              <div className="text-xs text-zinc-500">
                {m.settings.competitionName}
                {m.settings.stageName ? ` ${m.settings.stageName}` : ""} ·{" "}
                {formatKickoffKst(m.createdAt)}
              </div>
            </Link>
            <button
              type="button"
              className="shrink-0 px-3 text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300"
              onClick={() => {
                if (!window.confirm("이 경기 기록을 삭제할까요?")) return;
                deleteMatch(m.id);
                reload();
                setMsg("경기를 삭제했습니다.");
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
