"use client";

import { ArrowLeft, CheckCircle2, User, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/support.png" cardVerticalCenter leftFixed>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button type="button" onClick={() => router.back()}
              style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
              <ArrowLeft size={24} color="#025fc9" />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#025fc9" }}>CASE ID: OSY2348905</span>
            </button>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#996500", backgroundColor: "rgba(255,244,229,0.71)", border: "1px solid #fde3e0", borderRadius: 8, padding: "3px 10px" }}>
              In Review
            </span>
          </div>
          <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>
            Title: Unable to update phone number
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <p style={{ fontSize: 16, color: "#5e5757", margin: 0 }}>
            Unable to update phone number. I&apos;ve tried 3 times but the system is not accepting.
          </p>

          {/* CASE PROGRESS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CASE PROGRESS</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

              {/* Step 1 - Submitted */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#025fc9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={18} color="#fff" />
                </div>
                <span style={{ fontSize: 12, color: "#025fc9" }}>SUBMITTED</span>
              </div>

              <div style={{ flex: 1, height: 1, backgroundColor: "#025fc9", margin: "0 4px", marginBottom: 20 }} />

              {/* Step 2 - In Review */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 59 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "rgba(2,95,201,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>2</span>
                </div>
                <span style={{ fontSize: 12, color: "#025fc9" }}>IN REVIEW</span>
              </div>

              <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9", margin: "0 4px", marginBottom: 20 }} />

              {/* Step 3 - Decision */}
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
    </PageLayout>
  );
}