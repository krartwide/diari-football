"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { MatchResult, SeriesResult } from "@/types/football";
import {
  exportBackupCode,
  getOrCreateSyncCode,
  getSavedMatches,
  getSavedSeries,
  importBackupCode,
  pullFromServer,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatKickoffKst } from "@/lib/format";

export default function HistoryPage() {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [series, setSeries] = useState<SeriesResult[]>([]);
  const [syncCode, setSyncCode] = useState("");
  const [backup, setBackup] = useState("");
  const [msg, setMsg] = useState("");

  const reload = () => {
    setMatches(getSavedMatches());
    setSeries(getSavedSeries());
    setSyncCode(getOrCreateSyncCode());
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-white">기록</h1>
      <p className="mt-1 text-sm text-zinc-400">
        경기는 이 브라우저에 저장됩니다. 동기화 코드와 백업으로 다른 기기에서도 이어갈 수 있습니다.
      </p>

      <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-[#14181f] p-4">
        <div className="text-sm">
          <span className="text-zinc-500">동기화 코드</span>
          <div className="mt-1 font-mono text-emerald-400">{syncCode}</div>
          <p className="mt-1 text-xs text-zinc-500">
            같은 코드로 클라우드에 저장된 경기를 불러옵니다. (배포 환경에서 DB 연결 시)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={async () => {
              const n = await pullFromServer();
              reload();
              setMsg(n > 0 ? `${n}개 경기를 불러왔습니다.` : "새 클라우드 기록이 없습니다.");
            }}
          >
            클라우드에서 불러오기
          </Button>
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
        {series.map((s) => (
          <Link
            key={s.id}
            href={`/match/${s.matches[s.matches.length - 1]?.id}?series=${s.id}`}
            className="block rounded-lg border border-white/10 bg-[#14181f] px-3 py-3 hover:border-emerald-500/40"
          >
            <div className="font-medium text-white">
              {s.homeTeamName} {s.homeAggregate} - {s.awayAggregate} {s.awayTeamName}
            </div>
            <div className="text-xs text-zinc-500">
              {s.settings.competitionName} · {s.matches.length}경기 · {s.settings.mode}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold">경기</h2>
      <div className="mt-3 space-y-2">
        {matches.length === 0 && <p className="text-sm text-zinc-500">저장된 경기가 없습니다.</p>}
        {matches.map((m) => (
          <Link
            key={m.id}
            href={`/match/${m.id}`}
            className="block rounded-lg border border-white/10 bg-[#14181f] px-3 py-3 hover:border-emerald-500/40"
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
        ))}
      </div>
    </div>
  );
}
