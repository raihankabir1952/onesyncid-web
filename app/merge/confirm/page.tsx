"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "lucide-react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

function MergeConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newEmail = searchParams.get("newEmail") ?? "johndoe26@yahoo.com";
  const existingEmail = searchParams.get("existingEmail") ?? "johndoe@gmail.com";

  const handleConfirm = () => {
    router.push(`/merge/success?emails=${encodeURIComponent(existingEmail)}&emails=${encodeURIComponent(newEmail)}`);
  };

  const handleUndo = () => {
    router.push("/merge/cancelled");
  };

  return (
    <PageLayout illustration="/images/merge.png" cardVerticalCenter>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Title */}
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          2 accounts merged
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Accounts preview */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>

            {/* Existing account card */}
            <div style={{ flex: 1, borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, alignSelf: "flex-start" }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#025fc9", letterSpacing: "0.12px" }}>Existing</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image src="/images/profile.png" alt="profile" fill sizes="32px" className="object-cover" />
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#333", letterSpacing: "0.16px", margin: 0, wordBreak: "break-all" }}>{existingEmail}</p>
              </div>
            </div>

            {/* Link icon connector */}
            <div style={{ width: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, flexShrink: 0 }}>
              <div style={{ width: 1, height: 20, backgroundColor: "#d9d9d9" }} />
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(2,95,201,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link size={20} color="#025fc9" />
              </div>
              <div style={{ width: 1, height: 20, backgroundColor: "#d9d9d9" }} />
            </div>

            {/* New account card */}
            <div style={{ flex: 1, borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, alignSelf: "flex-start" }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#025fc9", letterSpacing: "0.12px" }}>New</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image src="/images/profile.png" alt="profile" fill sizes="32px" className="object-cover" />
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#333", letterSpacing: "0.16px", margin: 0, wordBreak: "break-all" }}>{newEmail}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 14, color: "#5e5757", letterSpacing: "0.14px", margin: 0 }}>
              Your documents, history &amp; preferences from the existing account will carry over.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 20 }}>
              <button type="button" onClick={handleConfirm} style={{ flex: 1, height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}>
                Confirm Merge
              </button>
              <button type="button" onClick={handleUndo} style={{ flex: 1, height: 48, backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, borderRadius: 8, borderWidth: 1.5, borderStyle: "solid", borderColor: "#025fc9", cursor: "pointer" }}>
                Undo &amp; Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function MergeConfirmPage() {
  return (
    <Suspense fallback={null}>
      <MergeConfirmContent />
    </Suspense>
  );
}