// app/page.tsx (Client Component)
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Neon backdrop accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{background: "radial-gradient(40% 40% at 50% 50%, #7fff00 0%, rgba(127,255,0,0) 70%)"}} />
        <div className="absolute top-1/2 -translate-y-1/2 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30" style={{background: "radial-gradient(40% 40% at 50% 50%, #7fff00 0%, rgba(127,255,0,0) 70%)"}} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fff00]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7fff00]/70 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(127,255,0,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,255,0,.35)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Nav */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-wide text-[#7fff00] hover:text-white transition">NEXT GEN</Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
          <Link href="#about" className="hover:text-white">About</Link>
          <Link href="#vision" className="hover:text-white">Vision</Link>
          <Link href="#contact" className="hover:text-white">Contact</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-[1.05]">
          <span className="block text-white">Build the</span>
          <span className="mt-2 block text-[#7fff00]" style={{textShadow: "0 0 20px rgba(127,255,0,1), 0 0 40px rgba(127,255,0,.9)"}}>Next Generation</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          검은 배경 위에 연두 네온의 심장. <span className="text-white font-medium">Next Gen</span>은 창업가와 크리에이터를 위한 실험실입니다.
          새로운 제품과 문화를 빠르게 만들고, 세상에 증명합니다.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-[#7fff00]/60 bg-[#7fff00]/10 px-5 py-3 text-[#7fff00] hover:text-black hover:bg-[#7fff00]/80 hover:border-[#7fff00] transition"
            style={{boxShadow: "0 0 30px rgba(127,255,0,.8), inset 0 0 16px rgba(127,255,0,.4)"}}
          >
            <span className="font-medium">네온 컨택트</span>
            <svg className="h-4 w-4 translate-x-0 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>

          {/* External Instagram */}
          <a
            href="https://instagram.com/nextgen.kr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-zinc-200 hover:border-[#7fff00] hover:text-[#7fff00] transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.8A6.2 6.2 0 1 0 18.2 14 6.2 6.2 0 0 0 12 7.8Zm0 2.4A3.8 3.8 0 1 1 8.2 14 3.8 3.8 0 0 1 12 10.2Zm6.5-4a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1Z"/>
            </svg>
            <span className="font-medium">@nextgen.kr</span>
          </a>
        </div>
      </section>

      {/* Founder card */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#7fff00]/60 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 p-6 backdrop-blur">
            <h2 className="text-xl tracking-wide text-[#7fff00]">Founder</h2>
            <p className="mt-2 text-3xl font-bold">송유빈</p>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              사용자와 창업가가 진짜로 원하는 것을 빠르게 만들고 검증합니다. Next Gen은
              프로토타입 → 베타 → 론치까지의 사이클을 네온처럼 선명하게, 짧게 가져갑니다.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com/nextgen.kr" target="_blank" rel="noreferrer" className="rounded-xl border border-[#7fff00]/60 px-4 py-2 text-sm text-[#7fff00] hover:bg-[#7fff00]/10">Instagram</a>
              <Link href="#contact" className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-[#7fff00]">Contact</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 p-6 bg-zinc-900/30">
            <h3 className="text-lg text-zinc-300">What we build</h3>
            <ul className="mt-3 space-y-3 text-zinc-300">
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7fff00] shadow-[0_0_14px_rgba(127,255,0,1)]"/>네온 같은 간결함의 제품 경험</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7fff00] shadow-[0_0_14px_rgba(127,255,0,1)]"/>크리에이터 & 스타트업 도구</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#7fff00] shadow-[0_0_14px_rgba(127,255,0,1)]"/>커뮤니티가 사랑하는 브랜드</li>
            </ul>
            <div className="mt-6 rounded-xl border border-[#7fff00]/40 p-4 text-sm text-zinc-400">
              Next.js + Tailwind 중심의 모던 스택. 빠른 배포, 데이터 기반 개선, 미학에 집착.
            </div>
          </div>
        </div>
      </section>

      {/* Vision strip */}
      <section id="vision" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-[#7fff00]/40 p-10 bg-gradient-to-br from-black to-zinc-900/60">
          <h2 className="text-3xl sm:text-4xl font-bold">
            미래는 <span className="text-[#7fff00]" style={{textShadow: "0 0 24px rgba(127,255,0,1)"}}>만드는 자</span>의 것
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            사용자 문제를 레이저처럼 관통하는 솔루션. Next Gen은 작은 팀으로 큰 임팩트를 만듭니다.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-zinc-800 p-8 bg-zinc-900/40">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-zinc-300">콜라보 / 제휴 / 채용 문의</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@nextgen.kr"
              className="rounded-2xl border border-[#7fff00]/60 bg-[#7fff00]/10 px-5 py-3 text-[#7fff00] hover:bg-[#7fff00]/30"
            >
              hello@nextgen.kr
            </a>
            <a
              href="https://instagram.com/nextgen.kr"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-zinc-200 hover:border-[#7fff00] hover:text-[#7fff00]"
            >
              Instagram @nextgen.kr
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-10 flex items-center justify-between text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} Next Gen. All rights reserved.</span>
        <span className="text-[#7fff00]">Made with Next.js</span>
      </footer>
    </main>
  );
}
