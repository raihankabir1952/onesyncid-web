"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import PageLayout from "@/components/PageLayout";

function MergeSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emails = searchParams.getAll("emails");
  const email1 = emails[0] ?? "johndoe@gmail.com";
  const email2 = emails[1] ?? "johndoe24@yahoo.com";

  return (
    // cardVerticalCenter removed — Figma: card at top:75, not vertically centered
    <PageLayout illustration="/images/merge.png" leftFixed={true}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Account merging successful!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
              Both email addresses now sign in to the same account. Your documents and history are intact.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[email1, email2].map((email) => (
                <div key={email} style={{
                  display: "flex", gap: 10, alignItems: "center",
                  backgroundColor: "rgba(2,95,201,0.05)",
                  border: "1px solid rgba(2,95,201,0.2)",
                  borderRadius: 12, padding: "10px 16px",
                }}>
                  <Mail size={20} color="#025fc9" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>
                    {email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => router.push("/get-started")}
            style={{ width: "100%", height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}>
            Sign In Now
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default function MergeSuccessPage() {
  return (
    <Suspense fallback={null}>
      <MergeSuccessContent />
    </Suspense>
  );
}