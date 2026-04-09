"use client";

import Image from "next/image";
import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/support.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", height: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30, overflowY: "auto" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button type="button" onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
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
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" /><span>Change region</span><ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}
