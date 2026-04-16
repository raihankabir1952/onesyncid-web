"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/no-passkey-found.png" leftFixed={true}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Set up your passkey
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
              Use your device&apos;s biometric authentication to create a <strong>secure passkey</strong> for this account.
            </p>

            {/* Instructions — lineHeight: "16px" (Figma: leading-[16px]) */}
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ fontSize: 14, color: "#5e5757", lineHeight: "16px" }}>
                Tap Continue to launch your device&apos;s biometric prompt.
              </li>
              <li style={{ fontSize: 14, color: "#5e5757", lineHeight: "16px" }}>
                Authenticate with Face ID, fingerprint, or your device PIN.
              </li>
              <li style={{ fontSize: 14, color: "#5e5757", lineHeight: "16px" }}>
                Your passkey is stored securely on this device — never shared.
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 20 }}>
            <button
              type="button"
              onClick={() => router.push("/get-started/no-passkey/success")}
              style={{ flex: 1, height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{ flex: 1, height: 44, backgroundColor: "transparent", color: "#5e5757", fontSize: 16, fontWeight: 500, border: "1.5px solid #d9d9d9", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Cancel
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