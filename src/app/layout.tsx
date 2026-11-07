import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist_Mono, Outfit, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diari Football — 축구 시뮬레이션",
  description:
    "팀과 선수를 만들고, 현실적인 이벤트로 경기를 시뮬레이션하며, 경기지·라인업·통계·이벤트 그래픽까지 남기는 축구 시뮬레이터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${outfit.variable} ${newsreader.variable} ${mono.variable} min-h-dvh bg-[#0b0d10] font-sans text-zinc-100 antialiased`}
      >
        <Suspense fallback={<div className="h-14 border-b border-white/10 bg-[#0b0d10]" />}>
          <SiteHeader />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
