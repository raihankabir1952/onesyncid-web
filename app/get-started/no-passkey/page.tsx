"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/no-passkey-found.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          No passkey found
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            Create a passkey to sign in <strong>faster and more securely</strong> without a password.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 20 }}>
            <button
              type="button"
              onClick={() => router.push("/get-started/no-passkey/setup")}
              style={{ flex: 1, height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Create Passkey
            </button>
            <button
              type="button"
              style={{ flex: 1, height: 44, backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, border: "1.5px solid #025fc9", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Use OTP Instead
            </button>
          </div>
        </div>

        {/* Back */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Back
          </button>
        </div>
      </div>
    </PageLayout>
  );
}