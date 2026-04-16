import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";

interface PageLayoutProps {
  illustration: string;
  children: React.ReactNode;
  cardVerticalCenter?: boolean;
  stickyHeader?: React.ReactNode;
  leftFixed?: boolean;
}

export default function PageLayout({
  illustration,
  children,
  cardVerticalCenter = false,
  stickyHeader,
  leftFixed = false,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ===================== DESKTOP LAYOUT (xl+ / 1280px+) =====================
          ⚠️ Must be xl, NOT lg.
          Left column ends at 56 + 537 = 593px.
          Right card on a 1024px screen starts at 1024 - 60 - 600 = 364px → overlap!
          At 1280px: 1280 - 60 - 600 = 620px → safe 27px gap.
      */}
      <div className="hidden xl:block relative flex-1" style={{ minHeight: 920 }}>

        {/* LEFT COLUMN — Figma: left:56, top:85 (pinned) | gap:30 outer, gap:33 inner */}
        <div
          className="absolute flex flex-col"
          style={{
            left: 56,
            top: leftFixed ? 85 : "50%",
            transform: leftFixed ? "none" : "translateY(-50%)",
            width: 537,
            gap: 30,
          }}
        >
          {/* Logo */}
          <div style={{ position: "relative", width: 232, height: 40, flexShrink: 0 }}>
            <Image
              src="/images/logo.png"
              alt="OneSyncID"
              fill
              priority
              sizes="232px"
              className="object-contain object-left"
            />
          </div>

          {/* Illustration + tagline — inner gap:33 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 33 }}>
            <div style={{ position: "relative", width: 500, height: 514, flexShrink: 0 }}>
              <Image
                src={illustration}
                alt=""
                fill
                priority
                sizes="500px"
                className="object-contain object-top"
              />
            </div>
            <p style={{
              color: "#0052b4",
              fontSize: 27,
              fontWeight: 700,
              lineHeight: "34px",
              letterSpacing: "0.27px",
              whiteSpace: "nowrap",
              margin: 0,
            }}>
              Verify Once. Access Everything.
            </p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="absolute bg-white flex flex-col"
          style={{
            right: 60,
            top: cardVerticalCenter ? "50%" : 75,
            transform: cardVerticalCenter ? "translateY(-50%)" : "none",
            width: 600,
            minHeight: 776,
            maxHeight: "calc(100vh - 120px)",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* HEADER
              flexShrink:0 keeps it pinned at top.
              (position:sticky won't activate inside overflow:hidden — not needed here)
          */}
          {stickyHeader && (
            <div style={{
              flexShrink: 0,
              padding: "30px 30px 20px",
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
            }}>
              {stickyHeader}
            </div>
          )}

          {/* SCROLLABLE BODY */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: stickyHeader ? "20px 30px 30px" : 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            scrollbarWidth: "thin",
          }}>
            {children}

            {/* Bottom logo */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
              <div style={{ position: "relative", width: 98, height: 17 }}>
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE / TABLET LAYOUT (< xl / < 1280px) ===================== */}
      <div className="flex xl:hidden flex-col flex-1 px-6 py-8 gap-6">

        {/* Logo */}
        <div className="relative w-[180px] h-[32px]">
          <Image
            src="/images/logo.png"
            alt="OneSyncID"
            fill
            priority
            sizes="180px"
            className="object-contain object-left"
          />
        </div>

        {/* Illustration — responsive, capped at 280px so it never overflows narrow screens */}
        <div className="relative w-full max-w-[280px]" style={{ aspectRatio: "280 / 287" }}>
          <Image
            src={illustration}
            alt=""
            fill
            priority
            sizes="(max-width: 1279px) 280px"
            className="object-contain object-top"
          />
        </div>

        {/* Tagline */}
        <p className="text-[#0052b4] text-xl font-bold leading-snug tracking-wide">
          Verify Once. Access Everything.
        </p>

        {/* Card */}
        <div
          className="bg-white rounded-[8px] flex flex-col overflow-hidden"
          style={{ boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)" }}
        >
          {/* Header */}
          {stickyHeader && (
            <div className="p-6 border-b border-[#f0f0f0] bg-white" style={{ flexShrink: 0 }}>
              {stickyHeader}
            </div>
          )}

          {/* Body */}
          <div className="flex flex-col p-6 gap-6">
            {children}

            {/* Bottom logo */}
            <div className="flex justify-center pt-4">
              <div className="relative w-[98px] h-[17px]">
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
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