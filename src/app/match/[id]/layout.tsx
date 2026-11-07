import { Suspense } from "react";

export default function MatchLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-8 text-center text-zinc-400">불러오는 중…</div>}>{children}</Suspense>;
}
