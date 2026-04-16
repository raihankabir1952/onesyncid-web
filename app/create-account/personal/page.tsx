"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import PersonalAccountForm from "@/components/PersonalAccountForm";

export default function PersonalAccountPage() {
  const router = useRouter();

  return (
    <PageLayout
      illustration="/images/personal.png"
      leftFixed={true}           // ← pins left column to top:85 (matches Figma)
      cardVerticalCenter={true}  // ← card is vertically centered (matches Figma)
      stickyHeader={
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* gap was 20 — Figma uses 40 between title block and tabs block */}

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
              Create your OneSyncID
            </p>
            <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/merge")}
                style={{
                  color: "#025fc9", fontWeight: 500,
                  background: "none", border: "none",
                  cursor: "pointer", padding: 0, fontSize: 14,
                }}
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
            <div style={{
              display: "flex", alignItems: "center",
              border: "1px solid #d9d9d9", borderRadius: 12,
              padding: "8px 16px",
            }}>
              {/* Personal — active */}
              <button type="button"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 8, background: "none", border: "none",
                  borderBottom: "3px solid #025fc9",
                  cursor: "default", color: "#025fc9",
                  fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                }}>
                Personal
              </button>
              {/* Organization — inactive */}
              <button type="button" onClick={() => router.push("/create-account")}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 8, background: "none", border: "none",
                  cursor: "pointer", color: "#5e5757",
                  fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
                }}>
                Organization
              </button>
            </div>
          </div>
        </div>
      }
    >
      <PersonalAccountForm />
    </PageLayout>
  );
}