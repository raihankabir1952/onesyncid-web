"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    // cardVerticalCenter removed — Figma: card at top:75, not vertically centered
    <PageLayout illustration="/images/support.png" leftFixed>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

        <p style={{ fontSize: 20, fontWeight: 600, color: "#000", marginTop: 0, marginBottom: 0 }}>
          We didn&apos;t find any account
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 16, color: "#333", marginTop: 0, marginBottom: 0 }}>We&apos;ve received your feedback.</p>
            <p style={{ fontSize: 16, color: "#333", marginTop: 0, marginBottom: 0 }}>
              You can use our AI powered Smart Support or contact our team directly. No account needed.
            </p>
          </div>

          {/* Buttons — always row, gap: 12 (Figma: gap-[12px]) */}
          <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
            <button type="button" onClick={() => router.push("/support/chat")}
              style={{ flex: 1, height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
              Smart Support
            </button>
            <button type="button" onClick={() => router.push("/support/agent")}
              style={{ flex: 1, height: 44, backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, border: "1.5px solid #025fc9", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
              Agent Support
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}