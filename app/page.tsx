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

export default function Page() {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  // 로그인 상태 감지 + Firestore에 유저 정보 저장
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // 비밀번호는 절대 저장 X
        await setDoc(
          doc(db, "users", firebaseUser.uid),
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
          <nav
            className="hidden items-center gap-6 text-sm text-blue-100/80 sm:flex"
            aria-label="Primary"
          >
            <Link href="#package" className="hover:text-white">
              Spring Package
            </Link>
            <Link href="#benefits" className="hover:text-white">
              Benefits
            </Link>
            <Link href="#contact" className="hover:text-white">
              Contact
            </Link>
          </nav>

          {/* Google Auth 버튼 */}
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
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-20 sm:pb-24">
        <h1 className="text-4xl font-bold leading-snug sm:text-5xl lg:text-6xl">
          <span className="block">Making Your Life in Korea</span>
          <span className="mt-1 block">Easy and Worry Free</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
          noworrieskorea helps you settle in Korea seamlessly. For the{" "}
          <span className="font-semibold text-white">Spring semester</span>,
          we’ve prepared a special package for international students and
          expats who find their home through NoWorries.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#190F58] hover:bg-blue-50 transition"
          >
            Apply for Spring Package
          </Link>
          <p className="text-xs text-blue-100/80">
            Housing first, benefits unlocked automatically.
          </p>
        </div>
      </section>

      {/* Package overview */}
      <section
        id="package"
        className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20"
      >
        <div className="rounded-3xl bg-white/5 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Spring 202X Special Package
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/90 sm:text-base">
            봄학기 동안 <span className="font-semibold">noworrieskorea</span>를
            통해 한국 집을 계약하는 분들께, 생활 정착에 필요한 서비스를
            한 번에 제공합니다.
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
              집 찾기, 계약, 랜드로드와의 커뮤니케이션까지
              noworrieskorea가 함께합니다. 한국에 도착하면 제휴 차량을 통해
              공항에서 바로 집까지 픽업을 받아보세요.
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
              유심 구매부터 휴대폰 개통까지, U+와 함께 할인된 가격으로
              빠르게 연결해 드립니다. 한국에 도착한 순간부터 바로 데이터와
              통화를 사용할 수 있도록 준비해요.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24"
      >
        <div className="rounded-3xl bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-blue-100/90 sm:text-base">
            봄학기 스페셜 패키지 신청 / 파트너십 / 기타 문의
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
