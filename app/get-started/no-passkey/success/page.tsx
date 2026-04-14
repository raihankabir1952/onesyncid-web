"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/password-reset-success.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Passkey created successfully
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            You can now sign in using Face ID or fingerprint — no password needed.
          </p>

          <button
            type="button"
            onClick={() => router.push("/get-started/trust")}
            style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
          >
            Continue
          </button>
        </div>
      </div>
    </PageLayout>
  );
}