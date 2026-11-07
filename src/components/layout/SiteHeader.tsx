"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "홈" },
  { href: "/teams/", label: "팀" },
  { href: "/play/", label: "경기" },
  { href: "/history/", label: "기록" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const norm = pathname.endsWith("/") || pathname === "" ? pathname : `${pathname}/`;
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d10]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-600 text-sm font-black text-white">
            DF
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide text-white">Diari Football</div>
            <div className="text-[10px] text-zinc-500">축구 시뮬레이션</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? norm === "/" || pathname === ""
                : norm === l.href || pathname.startsWith(l.href.replace(/\/$/, ""));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm text-zinc-400 transition hover:text-white",
                  active && "bg-white/10 text-white",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
