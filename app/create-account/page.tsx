"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ===================== DESKTOP LAYOUT (xl+ / 1280px+) ===================== */}
      <div className="hidden xl:block relative flex-1" style={{ minHeight: 920 }}>

        {/* LEFT COLUMN — pinned: left:56, top:85 | gap:30 outer, gap:33 inner */}
        <div
          className="absolute flex flex-col"
          style={{ left: 56, top: 85, width: 537, gap: 30 }}
        >
          {/* Logo */}
          <div style={{ position: "relative", width: 232, height: 40, flexShrink: 0 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>

          {/* Illustration + tagline — inner gap: 33 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 33 }}>
            <div style={{ position: "relative", width: 500, height: 514, flexShrink: 0 }}>
              <Image src="/images/create-account.png" alt="" fill priority sizes="500px" className="object-contain object-top" />
            </div>
            <p style={{
              color: "#0052b4", fontSize: 27, fontWeight: 700,
              lineHeight: "34px", letterSpacing: "0.27px",
              whiteSpace: "nowrap", margin: 0,
            }}>
              Verify Once. Access Everything.
            </p>
          </div>
        </div>

        {/* RIGHT CARD — vertically centered */}
        <div
          className="absolute bg-white flex flex-col"
          style={{
            right: 60,
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            padding: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 40, minHeight: 659, justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
                  Create your OneSyncID
                </p>
                <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>
                  Already have an account?{" "}
                  <button type="button" onClick={() => router.push("/merge")}
                    style={{ color: "#025fc9", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14 }}>
                    Merge now
                  </button>
                </p>
              </div>

              {/* Account type section */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>ACCOUNT TYPE</p>

                {/* Tab container */}
                <div style={{
                  display: "flex", alignItems: "center",
                  border: "1px solid #d9d9d9", borderRadius: 12,
                  padding: "8px 16px",
                }}>
                  <button type="button" onClick={() => router.push("/create-account/personal")}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 8, background: "none", border: "none", cursor: "pointer",
                      color: "#5e5757", fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                    }}>
                    Personal
                  </button>
                  <button type="button"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 8, background: "none", cursor: "default", border: "none",
                      borderBottom: "3px solid #025fc9",
                      color: "#025fc9", fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                    }}>
                    Organization
                  </button>
                </div>

                {/* Messages */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 16, color: "#333", margin: 0, textAlign: "justify", letterSpacing: "0.16px" }}>
                    Want to register your Brand, Business, Education, or NGO/Government?
                  </p>
                  <button type="button" onClick={() => router.push("/create-account/personal")}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
                    <p style={{ fontSize: 16, color: "#0052b4", margin: 0, textAlign: "justify" }}>
                      Please create a personal account first to proceed.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Merge banner */}
            <div style={{
              display: "flex", gap: 6, alignItems: "flex-start", justifyContent: "center",
              backgroundColor: "rgba(2,95,201,0.05)",
              border: "1px solid rgba(2,95,201,0.2)",
              borderRadius: 12, padding: "10px 16px",
            }}>
              <Info size={16} color="#025fc9" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#025fc9", letterSpacing: "0.12px", margin: 0, lineHeight: "16px" }}>
                Already have an account with another email?{" "}
                <button type="button" onClick={() => router.push("/merge")}
                  style={{ fontSize: 12, fontWeight: 600, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Merge accounts
                </button>
              </p>
            </div>
          </div>

          {/* Bottom logo */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
            <div style={{ position: "relative", width: 98, height: 17 }}>
              <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE / TABLET LAYOUT (< xl) ===================== */}
      <div className="flex xl:hidden flex-col flex-1 px-6 py-8 gap-6">

        {/* Logo */}
        <div className="relative w-[180px] h-[32px]">
          <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="180px" className="object-contain object-left" />
        </div>

        {/* Illustration */}
        <div className="relative w-full max-w-[280px]" style={{ aspectRatio: "280 / 287" }}>
          <Image src="/images/create-account.png" alt="" fill priority sizes="280px" className="object-contain object-top" />
        </div>

        {/* Tagline */}
        <p className="text-[#0052b4] text-xl font-bold leading-snug tracking-wide">
          Verify Once. Access Everything.
        </p>

        {/* Card */}
        <div className="bg-white rounded-[8px] p-6 flex flex-col gap-6" style={{ boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)" }}>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold text-black">Create your OneSyncID</p>
            <p className="text-sm text-[#a09898]">
              Already have an account?{" "}
              <button type="button" onClick={() => router.push("/merge")}
                className="text-[#025fc9] font-medium bg-transparent border-none cursor-pointer text-sm">
                Merge now
              </button>
            </p>
          </div>

          {/* Account Type */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-[#5e5757]">ACCOUNT TYPE</p>
            <div className="flex items-center border border-[#d9d9d9] rounded-xl px-4 py-2">
              <button type="button" onClick={() => router.push("/create-account/personal")}
                className="flex-1 flex items-center justify-center py-2 text-[#5e5757] text-base font-medium bg-transparent border-none cursor-pointer">
                Personal
              </button>
              <button type="button" className="flex-1 flex items-center justify-center p-2 text-[#025fc9] text-base font-medium bg-transparent cursor-default"
                style={{ borderBottom: "3px solid #025fc9" }}>
                Organization
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3">
              <p className="text-base text-[#333] text-justify">
                Want to register your Brand, Business, Education, or NGO/Government?
              </p>
              <button type="button" onClick={() => router.push("/create-account/personal")}
                className="bg-transparent border-none p-0 cursor-pointer text-left">
                <p className="text-base text-[#0052b4] text-justify">
                  Please create a personal account first to proceed.
                </p>
              </button>
            </div>
          </div>

          {/* Merge banner */}
          <div className="flex gap-2 items-start rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(2,95,201,0.05)", border: "1px solid rgba(2,95,201,0.2)" }}>
            <Info size={16} color="#025fc9" className="flex-shrink-0 mt-[1px]" />
            <p className="text-xs text-[#025fc9] tracking-wide leading-4 m-0">
              Already have an account with another email?{" "}
              <button type="button" onClick={() => router.push("/merge")}
                className="text-xs font-semibold text-[#025fc9] bg-transparent border-none cursor-pointer p-0">
                Merge accounts
              </button>
            </p>
          </div>

          {/* Bottom logo */}
          <div className="flex justify-center mt-2">
            <div className="relative w-[98px] h-[17px]">
              <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER ===================== */}
      <div className="flex flex-wrap justify-center items-center gap-4 pb-10 pt-5 px-6 text-[#605353] text-[14px]">
        <span className="cursor-pointer whitespace-nowrap shrink-0">Privacy &amp; Terms</span>
        <span className="cursor-pointer whitespace-nowrap shrink-0">Contact us</span>
        <button className="flex items-center gap-[3px] bg-transparent border-none text-[#605353] text-[14px] cursor-pointer whitespace-nowrap shrink-0">
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}