"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const STEPS = [
  {
    num: "1",
    title: "Check your welcome email",
    desc: `When you first registered, a welcome email was sent containing your OneSyncID username. Search your inbox for "OneSync" or "OSY-".`,
  },
  {
    num: "2",
    title: "Recognize the format",
    desc: `When you first registered, a welcome email was sent containing your username. Search your inbox for "OneSync" or "OSY-".`,
  },
  {
    num: "3",
    title: "Find it inside the app",
    desc: "Once signed in, go to Profile → Account Details. Your OneSyncID username is displayed at the top.",
  },
  {
    num: "4",
    title: "Still can't find it?",
    desc: `Contact support with your registered phone number or email. We'll verify your identity and recover your OneSyncID account.`,
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <PageLayout illustration="/images/support.png" leftFixed>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button type="button" onClick={() => router.back()}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
            <ArrowLeft size={24} color="#025fc9" />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#025fc9", letterSpacing: "0.14px" }}>FINDING YOUR ID</span>
          </button>
          <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>What is my OneSyncID</p>
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <p style={{ fontSize: 16, color: "#5e5757", margin: 0 }}>
            Your OneSyncID username is a unique identifier that links your account across all government and connected services.
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 14, color: "#025fc9" }}>{num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0 }}>{title}</p>
                  <p style={{ fontSize: 14, color: "#5e5757", margin: 0, marginTop: 2 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}