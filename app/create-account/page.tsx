import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import CreateAccountCard from "@/components/CreateAccountCard";

export default function CreateAccountPage() {
  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Switzer', sans-serif" }}
    >
      {/* ── MAIN AREA ── */}
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT — logo + create-account.png + tagline
            Figma: left=56, top=85, gap=33
        */}
        <div
          className="absolute flex flex-col"
          style={{
            left: "clamp(24px, 3.9vw, 56px)",
            top: 85,
            width: "clamp(300px, 37.3vw, 537px)",
            gap: 33,
          }}
        >
          {/* Logo */}
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image
              src="/images/logo.png"
              alt="OneSyncID"
              fill
              priority
              loading="eager"
              sizes="232px"
              className="object-contain object-left"
            />
          </div>

          {/* Illustration — create-account.png (Figma: 500×514) */}
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image
              src="/images/create-account.png"
              alt=""
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 300px, (max-width: 1200px) 37vw, 537px"
              className="object-contain object-top"
            />
          </div>

          {/* Tagline */}
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD — vertically centered (Figma: top=50%, translateY=-50%) */}
        <CreateAccountCard />
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer" }}>
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}