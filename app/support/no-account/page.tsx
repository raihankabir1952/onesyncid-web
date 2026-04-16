"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const OPTIONS = [
  "I've never had an account before",
  "I may have registered under a different contact",
  "My account was locked/banned",
];

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
          <p style={{ fontSize: 16, color: "#333", marginTop: 0, marginBottom: 0 }}>
            Answers this questions below to help us identify the issue.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {OPTIONS.map((option) => (
              <button key={option} type="button"
                onClick={() => router.push("/support/no-account/contact")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 16px", border: "1px solid #d9d9d9", borderRadius: 12, background: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#333", letterSpacing: "0.14px" }}>{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}