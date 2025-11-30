// app/page.tsx (Client Component)
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [lang, setLang] = useState<Lang>("en");

  // 로그인 상태 감지 + Firestore 유저 저장
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docId = firebaseUser.email || firebaseUser.uid;
        await setDoc(
          doc(db, "users", docId),
          {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData?.[0]?.providerId,
            updatedAt: serverTimestamp(),
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
      alert("로그인 중 오류가 발생했어요.");
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
          {/* 언어 선택 */}
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

          {/* 메뉴 */}
          <nav className="hidden items-center gap-6 text-sm text-blue-100/80 sm:flex">
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

          {/* 유저 + 로그인 */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100/90">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="h-8 w-8 rounded-full border border-white/40 object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold truncate max-w-[140px]">
                    {user.displayName}
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
              {loadingAuth ? "Loading..." : user ? "Logout" : "Sign in with Google"}
            </button>
          </div>

          {/* ✅ 우측 상단 test.png 이미지 */}
       <Image
  src="/test.png"
  alt="test badge"
  width={20}
  height={20}
  className="mt-[2px] object-contain opacity-90"
/>

        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-20 sm:pb-24">
        <h1 className="text-4xl font-bold sm:text-6xl">
          {copy.heroTitle1[lang]} <br /> {copy.heroTitle2[lang]}
        </h1>
        <p className="mt-6 max-w-2xl text-blue-100/90">
          {copy.heroBody[lang]}
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-semibold">{copy.contactTitle[lang]}</h2>
        <p className="mt-2 text-sm text-blue-100/90">
          {copy.contactDesc[lang]}
        </p>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-blue-100/70">
        © {currentYear} noworrieskorea. All rights reserved.
      </footer>
    </main>
  );
}
