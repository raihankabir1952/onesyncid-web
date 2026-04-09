"use client";

import Image from "next/image";
import { ArrowLeft, CheckCircle2, User, Clock, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

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
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", height: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30, overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button type="button" onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                  <ArrowLeft size={24} color="#025fc9" />
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#025fc9" }}>CASE ID: OSY2348905</span>
                </button>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#996500", backgroundColor: "rgba(255,244,229,0.71)", border: "1px solid #fde3e0", borderRadius: 8, padding: "3px 10px" }}>
                  In Review
                </span>
              </div>
              <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>Title: Unable to update phone number</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <p style={{ fontSize: 16, color: "#5e5757", margin: 0 }}>
                Unable to update phone number. I&apos;ve tried 3 times but the system is not accepting.
              </p>

              {/* CASE PROGRESS */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CASE PROGRESS</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* Step 1 - Submitted (done) */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#025fc9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={18} color="#fff" />
                    </div>
                    <span style={{ fontSize: 12, color: "#025fc9" }}>SUBMITTED</span>
                  </div>

                  <div style={{ flex: 1, height: 1, backgroundColor: "#025fc9", margin: "0 4px", marginBottom: 20 }} />

                  {/* Step 2 - In Review (active) */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 59 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "rgba(2,95,201,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>2</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#025fc9" }}>IN REVIEW</span>
                  </div>

                  <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9", margin: "0 4px", marginBottom: 20 }} />

                  {/* Step 3 - Decision (pending) */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 59 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#d9d9d9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>3</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#a09898" }}>DECISION</span>
                  </div>
                </div>
              </div>

              {/* TIMELINE */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>TIMELINE</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>

                  {/* Event 1 */}
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CheckCircle2 size={24} color="#025fc9" style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>Case Submitted</p>
                      <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>Your case has been submitted successfully</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div style={{ width: 24, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 1, height: 30, backgroundColor: "#025fc9" }} />
                  </div>

                  {/* Event 2 */}
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <User size={24} color="#025fc9" style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>Agent Assigned</p>
                      <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>An agent has been assigned to your case. You&apos;ll receive decision within 24 hours.</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div style={{ width: 24, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 1, height: 30, backgroundColor: "#d9d9d9" }} />
                  </div>

                  {/* Event 3 */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Clock size={24} color="#a09898" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>Final Decision</p>
                  </div>
                </div>
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
