"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import PersonalAccountForm from "@/components/PersonalAccountForm";

export default function PersonalAccountPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Switzer', sans-serif" }}
    >
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div
          className="absolute flex flex-col"
          style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}
        >
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority loading="eager" sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/personal.png" alt="" fill priority loading="eager" sizes="(max-width: 768px) 300px, (max-width: 1200px) 37vw, 537px" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD
            Structure:
            ┌─────────────────────┐
            │  FIXED HEADER       │  ← Title + tabs (sticky)
            ├─────────────────────┤
            │  SCROLLABLE BODY    │  ← Form fields scroll
            └─────────────────────┘
        */}
        <div
          className="absolute bg-white flex flex-col"
          style={{
            right: "clamp(16px, 4.2vw, 60px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(320px, 41.7vw, 600px)",
            maxHeight: "90vh",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            overflow: "hidden", // clip the scroll inside
          }}
        >
          {/* ── FIXED HEADER ── */}
          <div
            style={{
              flexShrink: 0,
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 20,
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "#f0f0f0",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Title + subtitle */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
                Create your OneSyncID
              </p>
              <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/merge")}
                  style={{ color: "#025fc9", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14 }}
                >
                  Merge now
                </button>
              </p>
            </div>

            {/* Account type tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>
                ACCOUNT TYPE
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9",
                  borderRadius: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
                }}
              >
                {/* Personal — active */}
                <button
                  type="button"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8,
                    borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
                    borderBottomWidth: 3, borderBottomStyle: "solid", borderBottomColor: "#025fc9",
                    color: "#025fc9", fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                    background: "none", cursor: "default",
                  }}
                >
                  Personal
                </button>
                {/* Organization — navigate back */}
                <button
                  type="button"
                  onClick={() => router.push("/create-account")}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8,
                    borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
                    borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "#025fc9",
                    color: "#5e5757", fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                    background: "none", cursor: "pointer",
                  }}
                >
                  Organization
                </button>
              </div>
            </div>
          </div>

          {/* ── SCROLLABLE FORM BODY ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingTop: 24,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 30,
              scrollbarWidth: "thin",
            }}
          >
            <PersonalAccountForm />

            {/* Bottom logo */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}>
              <div style={{ position: "relative", width: 98, height: 17 }}>
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
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