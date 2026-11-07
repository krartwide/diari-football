"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { LiveMatch } from "@/components/sim/LiveMatch";
import { Scoreboard } from "@/components/match/Scoreboard";
import { EventFeed } from "@/components/match/EventFeed";
import { LineupBoard } from "@/components/match/LineupBoard";
import { StatsTable } from "@/components/match/StatsTable";
import { Button } from "@/components/ui/button";
import {
  decodeShareCode,
  getMatchById,
  matchShareCode,
  saveMatch,
} from "@/lib/storage";
import type { MatchResult, SeriesResult } from "@/types/football";

function isMatchResult(v: MatchResult | SeriesResult): v is MatchResult {
  return "homeTeam" in v && "events" in v;
}

export default function MatchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
          불러오는 중…
        </div>
      }
    >
      <MatchPageInner />
    </Suspense>
  );
}

function MatchPageInner() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const id = decodeURIComponent(params.id ?? "");
  const live = search.get("live") === "1";
  const shareParam = search.get("share");

  const [match, setMatch] = useState<MatchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let found = getMatchById(id);
    if (!found && shareParam) {
      const decoded = decodeShareCode(shareParam);
      if (decoded && isMatchResult(decoded)) {
        found = decoded;
        saveMatch(decoded);
      }
    }
    if (found) {
      setMatch(found);
      setMissing(false);
    } else {
      setMissing(true);
    }
  }, [id, shareParam]);

  const shareUrl = useMemo(() => {
    if (!match || typeof window === "undefined") return "";
    const code = matchShareCode(match);
    return `${window.location.origin}/share/${code}`;
  }, [match]);

  const copyShare = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("공유 링크를 복사하세요", shareUrl);
    }
  };

  if (missing && !match) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-zinc-400">경기 기록을 찾을 수 없습니다.</p>
        <Link href="/history" className="mt-4 inline-block text-emerald-400 hover:underline">
          기록으로 이동
        </Link>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-zinc-500">
        불러오는 중…
      </div>
    );
  }

  if (live) {
    return <LiveMatch match={match} />;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-3 py-4 sm:px-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/history" className="text-sm text-zinc-400 hover:text-white">
          ← 기록
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto border-white/15"
          onClick={copyShare}
        >
          {copied ? "복사됨" : "공유 링크 복사"}
        </Button>
        <Link
          href={`/match/${match.id}?live=1`}
          className="text-sm text-emerald-400 hover:underline"
        >
          라이브 다시보기
        </Link>
      </div>

      <Scoreboard match={match} />
      <EventFeed match={match} />
      <LineupBoard match={match} />
      <StatsTable match={match} />
    </div>
  );
}
