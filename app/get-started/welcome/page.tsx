"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/welcome.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Title */}
        <div>
          <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0, lineHeight: "1.3" }}>
            Welcome to OneSyncID.
          </p>
          <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0, lineHeight: "1.3" }}>
            You&apos;re all set to go!
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            Enable notifications to stay updated on your updates and alerts.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => router.push("/get-started")}
              className="flex-1"
              style={{ height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Yes, Keep Me Updated
            </button>
            <button
              type="button"
              onClick={() => router.push("/get-started/trust")}
              className="flex-1"
              style={{ height: 44, backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, border: "1.5px solid #025fc9", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}