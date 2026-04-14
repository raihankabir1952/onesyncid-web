"use client";

import { Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/trust.png" cardVerticalCenter>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Do you trust this device?
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
              Trusted devices skip verification on future sign-ins. Only trust devices you own and regularly use.
            </p>

            {/* Device card */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 20px", backgroundColor: "#fff" }}>
              <div style={{ backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, padding: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Smartphone size={20} color="#025fc9" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#333", margin: 0, letterSpacing: "0.14px" }}>iPhone 15 Pro</p>
                <p style={{ fontSize: 12, color: "#5e5757", margin: 0, letterSpacing: "0.12px" }}>Dhaka, Bangladesh · Just now</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>
              Choosing &quot;Don&apos;t Trust&quot; means you&apos;ll need to verify with OTP every time you sign in on this device.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.push("/get-started/welcome")}
                className="flex-1"
                style={{ height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
              >
                Yes, Trust This Device
              </button>
              <button
                type="button"
                onClick={() => router.push("/get-started/welcome")}
                className="flex-1"
                style={{ height: 48, backgroundColor: "transparent", color: "#5e5757", fontSize: 16, fontWeight: 500, border: "1.5px solid #d9d9d9", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
              >
                Don&apos;t Trust
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}