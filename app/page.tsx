// app/page.tsx (Client Component)
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, googleProvider, db } from "../lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type Lang = "en" | "ko" | "ja";

// 간단한 다국어 텍스트 정의
const copy = {
  nav: {
    en: { spring: "Spring Package", benefits: "Benefits", contact: "Contact" },
    ko: { spring: "봄학기 패키지", benefits: "혜택 안내", contact: "문의하기" },
    ja: { spring: "春学期パッケージ", benefits: "特典", contact: "お問い合わせ" },
  },
  heroTitle1: {
    en: "Making Your Life in Korea",
    ko: "한국에서의 생활을",
    ja: "韓国での生活を",
  },
  heroTitle2: {
    en: "Easy and Worry Free",
    ko: "더 쉽고 걱정 없이",
    ja: "もっと簡単に、ノーウォーリーズ",
  },
  heroBody: {
    en: `noworrieskorea helps you settle in Korea seamlessly. For the Spring semester, we’ve prepared a special package for international students and expats who find their home through NoWorries.`,
    ko: `noworrieskorea는 한국 정착을 위한 집 찾기부터 생활 전반까지 함께 돕는 서비스입니다. 이번 봄학기를 맞아, 노워리즈를 통해 집을 구하는 유학생과 외국인 근로자를 위한 스페셜 패키지를 준비했습니다.`,
    ja: `noworrieskorea は、韓国での住まい探しから生活サポートまでを行うリロケーションサービスです。春学期に向けて、NoWorries を通して家を契約する留学生・駐在員のためのスペシャルパッケージを用意しました。`,
  },
  heroCta: {
    en: "Apply for Spring Package",
    ko: "봄학기 패키지 신청하기",
    ja: "春学期パッケージを申し込む",
  },
  heroSub: {
    en: "Housing first, benefits unlocked automatically.",
    ko: "집을 먼저 정하면, 혜택은 자동으로 따라옵니다.",
    ja: "住まいを決めれば、特典は自動的についてきます。",
  },
  packageTitle: {
    en: "Spring 202X Special Package",
    ko: "Spring 202X 스페셜 패키지",
    ja: "Spring 202X スペシャルパッケージ",
  },
  packageDesc: {
    en: `During the spring semester, if you sign a housing contract through noworrieskorea, you can receive all essential settlement services in one package.`,
    ko: `봄학기 동안 noworrieskorea를 통해 집을 계약하는 분들께, 한국 정착에 필요한 서비스를 한 번에 제공하는 패키지입니다.`,
    ja: `春学期の間、noworrieskorea を通して家を契約すると、韓国での生活に必要なサポートをまとめて受けられるパッケージです。`,
  },
  contactTitle: {
    en: "Contact",
    ko: "문의하기",
    ja: "お問い合わせ",
  },
  contactDesc: {
    en: "For Spring Package application / partnership / other inquiries",
    ko: "봄학기 스페셜 패키지 신청 / 파트너십 / 기타 문의",
    ja: "春学期スペシャルパッケージの申請・提携・その他のお問い合わせ",
  },
};

export default function Page() {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [lang, setLang] = useState<Lang>("en"); // 기본 언어: 영어

  // 로그인 상태 감지 + Firestore에 유저 정보 저장
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // 이메일을 도큐먼트 ID로 사용 (이메일이 없으면 uid fallback)
        const docId = firebaseUser.email || firebaseUser.uid;

        await setDoc(
          doc(db, "users", docId),
          {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData?.[0]?.providerId,
            updatedAt: serverTimestamp(),
            // createdAt은 최초 생성 시에만 넣고 싶으면 서버에서 트리거로 처리해도 됨
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    });

    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoadingAuth(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoadingAuth(true);
      await signOut(auth);
    } catch (err) {
      console.error(err);
      alert("로그아웃 중 오류가 발생했어요.");
    } finally {
      setLoadingAuth(false);
    }
  };

  const tNav = copy.nav[lang];

  return (
    <main className="min-h-screen bg-[#190F58] text-white relative">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="#"
          className="font-semibold tracking-wide text-white hover:opacity-80 transition"
        >
          noworrieskorea
        </Link>

        <div className="flex items-center gap-4">
          {/* 언어 선택 탭 */}
          <div className="hidden items-center gap-1 text-xs sm:flex">
            {(["en", "ko", "ja"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 border text-[11px] ${
                  lang === l
                    ? "bg-white text-[#190F58] border-white"
                    : "border-white/40 text-blue-100 hover:bg-white/10"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <nav
            className="hidden items-center gap-6 text-sm text-blue-100/80 sm:flex"
            aria-label="Primary"
          >
            <Link href="#package" className="hover:text-white">
              {tNav.spring}
            </Link>
            <Link href="#benefits" className="hover:text-white">
              {tNav.benefits}
            </Link>
            <Link href="#contact" className="hover:text-white">
              {tNav.contact}
            </Link>
          </nav>

          {/* 유저 정보 + Google Auth 버튼 */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100/90">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || user.email || "user"}
                    className="h-8 w-8 rounded-full border border-white/40 object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold truncate max-w-[140px]">
                    {user.displayName || "No name"}
                  </span>
                  <span className="truncate max-w-[160px] opacity-80">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={user ? handleLogout : handleGoogleLogin}
              disabled={loadingAuth}
              className="flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 py-2 text-xs sm:text-sm text-blue-50 hover:bg-white/10 disabled:opacity-60"
            >
              {loadingAuth
                ? "Loading..."
                : user
                ? "Logout"
                : "Sign in with Google"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-20 sm:pb-24">
        <h1 className="text-4xl font-bold leading-snug sm:text-5xl lg:text-6xl">
          <span className="block">{copy.heroTitle1[lang]}</span>
          <span className="mt-1 block">{copy.heroTitle2[lang]}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
          {copy.heroBody[lang]}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#190F58] hover:bg-blue-50 transition"
          >
            {copy.heroCta[lang]}
          </Link>
          <p className="text-xs text-blue-100/80">{copy.heroSub[lang]}</p>
        </div>
      </section>

      {/* Package overview */}
      <section id="package" className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
        <div className="rounded-3xl bg-white/5 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {copy.packageTitle[lang]}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/90 sm:text-base">
            {copy.packageDesc[lang]}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-blue-50 sm:text-base">
            <li>
              • 한국 도착 시{" "}
              <span className="font-semibold">공항 픽업 서비스</span> 지원
            </li>
            <li>
              • 피부과, 성형외과, 치과 등{" "}
              <span className="font-semibold">제휴 클리닉 할인</span> 제공
            </li>
            <li>
              • 제휴된 한국{" "}
              <span className="font-semibold">프리미엄 F&amp;B 브랜드</span>에서
              최대 <span className="font-semibold">20% 할인</span>
            </li>
            <li>
              • <span className="font-semibold">U+</span>를 통한 유심 구매 및
              휴대폰 개통 할인
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits detail */}
      <section
        id="benefits"
        className="mx-auto max-w-6xl px-6 pb-20 space-y-8 sm:space-y-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Housing & Arrival</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
              집 찾기, 계약, 랜드로드와의 커뮤니케이션까지 noworrieskorea가
              함께합니다. 한국에 도착하면 제휴 차량을 통해 공항에서 바로 집까지
              픽업을 받아보세요.
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Healthcare Support</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
              믿을 수 있는 피부과, 성형외과, 치과 파트너들과 제휴되어 있어,
              예약부터 통역, 결제까지 더 안전하고 합리적으로 이용할 수
              있습니다.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Premium F&amp;B Partners</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
              한국의 프리미엄 카페, 레스토랑, 바 브랜드들과 협업하여 최대{" "}
              <span className="font-semibold">20% 할인</span> 혜택을
              제공합니다. 친구들과의 모임, 데이트, 혼밥까지 부담 없이 즐겨보세요.
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Telecom by U+</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
              유심 구매부터 휴대폰 개통까지, U+와 함께 할인된 가격으로 빠르게
              연결해 드립니다. 한국에 도착한 순간부터 바로 데이터와 통화를
              사용할 수 있도록 준비해요.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
        <div className="rounded-3xl bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">
            {copy.contactTitle[lang]}
          </h2>
          <p className="mt-2 text-sm text-blue-100/90 sm:text-base">
            {copy.contactDesc[lang]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@noworrieskorea.com"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#190F58] hover:bg-blue-50 transition"
            >
              hello@noworrieskorea.com
            </a>
            <a
              href="https://instagram.com/noworrieskorea"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-5 py-3 text-sm text-blue-50 hover:bg-white/10 transition"
            >
              Instagram @noworrieskorea
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-10 text-xs text-blue-100/70">
        <span>© {currentYear} noworrieskorea. All rights reserved.</span>
        <span className="opacity-80">Made with Next.js</span>
      </footer>
    </main>
  );
}
