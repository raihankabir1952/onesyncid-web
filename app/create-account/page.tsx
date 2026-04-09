"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority loading="eager" sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/create-account.png" alt="" fill priority loading="eager" sizes="(max-width: 768px) 300px, (max-width: 1200px) 37vw, 537px" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="absolute bg-white flex flex-col"
          style={{
            right: "clamp(16px, 4.2vw, 60px)",
            top: "50%", transform: "translateY(-50%)",
            width: "clamp(320px, 41.7vw, 600px)",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            padding: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 40, minHeight: 659, justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>Create your OneSyncID</p>
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

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>ACCOUNT TYPE</p>

                {/* Tabs */}
                <div style={{ display: "flex", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                  {/* Personal */}
                  <button
                    type="button"
                    onClick={() => router.push("/create-account/personal")}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8,
                      borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
                      borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "#025fc9",
                      color: "#5e5757", fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                      background: "none", cursor: "pointer",
                    }}
                  >
                    Personal
                  </button>
                  {/* Organization — active */}
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
                    Organization
                  </button>
                </div>

                {/* Organization message */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 16, color: "#333", letterSpacing: "0.16px", margin: 0, textAlign: "justify" }}>
                    Want to register your Brand, Business, Education, or NGO/Government?
                  </p>
                  <p style={{ fontSize: 16, color: "#0052b4", margin: 0, textAlign: "justify" }}>
                    Please create a personal account first to proceed.
                  </p>
                </div>
              </div>
            </div>

            {/* Merge accounts banner */}
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start", justifyContent: "center", backgroundColor: "rgba(2,95,201,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(2,95,201,0.2)", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
              <Info size={16} color="#025fc9" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#025fc9", letterSpacing: "0.12px", margin: 0, lineHeight: "16px" }}>
                Already have an account with another email?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/merge")}
                  style={{ fontSize: 12, fontWeight: 600, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
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