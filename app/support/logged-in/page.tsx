"use client";

import Image from "next/image";
import { HelpCircle, Lock, Phone, Key, MessageCircle, ArrowRight, Shield, CheckCircle2, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const COMMON_ISSUES = [
  { icon: HelpCircle, title: "What is my OneSyncID?",     sub: "Learn how to find your unique identifier",  href: "/get-started/support/finding-id" },
  { icon: Lock,       title: "Account locked or blocked", sub: "Regain access after failed attempts",       href: "#" },
  { icon: Phone,      title: "Didn't receive OTP code",   sub: "Troubleshoot email and SMS delivery",       href: "#" },
  { icon: Key,        title: "Passkey not working",       sub: "Reset or re-register your passkey",         href: "#" },
];

const ACTIVE_CASES = [
  { id: "OSY6578902", title: "Unable to update phone number",        statusColor: "#11a75c" },
  { id: "OSY6573411", title: "Document verification taking too long", statusColor: "#f59e0b" },
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
        <div className="absolute bg-white flex flex-col justify-between" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30, gap: 30, overflowY: "auto", maxHeight: 776 }}>

          {/* User profile */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 600, color: "#5e5757" }}>
              JD
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>John Doe</span>
                <CheckCircle2 size={16} color="#025fc9" />
              </div>
              <p style={{ fontSize: 12, color: "#5e5757", margin: 0, letterSpacing: "0.12px" }}>johndoe26@yahoo.com</p>
            </div>
          </div>

          {/* COMMON ISSUES */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>COMMON ISSUES</p>
            <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
              {COMMON_ISSUES.map(({ icon: Icon, title, sub, href }, i) => (
                <button key={title} type="button" onClick={() => router.push(href)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "20px 16px", borderBottom: i < COMMON_ISSUES.length - 1 ? "1px solid #d9d9d9" : "none", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color="#025fc9" />
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0, letterSpacing: "0.16px" }}>{title}</p>
                    <p style={{ fontSize: 14, color: "#5e5757", margin: 0, letterSpacing: "0.14px" }}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SMART SUPPORT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>SMART SUPPORT</p>
            <div style={{ backgroundColor: "rgba(2,95,201,0.05)", border: "1px solid rgba(2,95,201,0.2)", borderRadius: 12, overflow: "hidden" }}>
              <button type="button" onClick={() => router.push("/get-started/support/chat")} style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
                <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={16} color="#025fc9" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0 }}>Describe your issue</p>
                    <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>Get instant answers or connect with a human agent</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Start Chatting</span>
                    <ArrowRight size={16} color="#025fc9" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SIGN IN TO TRACK YOUR CASE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>SIGN IN TO TRACK YOUR CASE</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                {ACTIVE_CASES.map(({ id, title, statusColor }, i) => (
                  <button key={id} type="button" onClick={() => router.push("/get-started/support/case")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "20px 16px", borderBottom: i < ACTIVE_CASES.length - 1 ? "1px solid #d9d9d9" : "none", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: statusColor, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 16, color: "#5e5757", margin: 0, lineHeight: "18px" }}>Case ID: {id}</p>
                      <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0 }}>{title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button type="button" style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
              Continue
            </button>
          </div>

          {/* Security notice */}
          <div style={{ display: "flex", gap: 6, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
            <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: "#a09898", margin: 0, lineHeight: "14px" }}>
              Support staff will n<span style={{ color: "#5e5757" }}>ever ask for your password or full OTP. </span>
              End the conversation and report it if they do.
            </p>
          </div>

          {/* Back + Logo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
            <button type="button" onClick={() => router.back()} style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Back</button>
            <div style={{ position: "relative", width: 98, height: 17 }}>
              <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
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
