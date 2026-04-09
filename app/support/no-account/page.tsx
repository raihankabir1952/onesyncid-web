"use client";

import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  "I've never had an account before",
  "I may have registered under a different contact",
  "My account was locked/banned",
];

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/support.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", height: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

            <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>We didn&apos;t find any account</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
                Answers this questions below to help us identify the issue.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => router.push("/get-started/support/no-account/contact")}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 16px", border: "1px solid #d9d9d9", borderRadius: 12, background: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#333", letterSpacing: "0.14px" }}>{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" /><span>Change region</span><ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}
