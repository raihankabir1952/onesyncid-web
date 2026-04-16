"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/password-reset-success.png" leftFixed={true}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Title — lineHeight: normal (Figma: leading-[normal], wraps naturally) */}
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0, lineHeight: "normal" }}>
          You&apos;re all set! Password changed successfully.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            Your password is now updated and secured. Let&apos;s get you back in.
          </p>

          {/* Button + tip — gap: 12 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              type="button"
              onClick={() => router.push("/get-started")}
              style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Sign In Now
            </button>
            <p style={{ fontSize: 12, color: "#0052b4", margin: 0 }}>
              You&apos;re protected. Enable two-step login for extra peace of mind.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}