"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function MergeCancelledPage() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/merge-cancel.png" cardVerticalCenter>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Title */}
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Merge cancelled
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <p style={{ fontSize: 16, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>
            No changes were made. Your accounts remain separate and independent.
          </p>

          {/* Continue to account creation */}
          <button
            type="button"
            onClick={() => router.push("/create-account/personal")}
            style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}
          >
            Continue to Account Creation
          </button>
        </div>
      </div>
    </PageLayout>
  );
}