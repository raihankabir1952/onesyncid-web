"use client";

import Image from "next/image";
import { HelpCircle, Lock, Phone, Key, MessageCircle, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const COMMON_ISSUES = [
  { icon: HelpCircle, title: "What is my OneSyncID?",     sub: "Learn how to find your unique identifier",  href: "/support/finding-id" },
  { icon: Lock,       title: "Account locked or blocked", sub: "Regain access after failed attempts",       href: "#" },
  { icon: Phone,      title: "Didn't receive OTP code",   sub: "Troubleshoot email and SMS delivery",       href: "#" },
  { icon: Key,        title: "Passkey not working",       sub: "Reset or re-register your passkey",         href: "#" },
];

const ACTIVE_CASES = [
  { id: "OSY6578902", title: "Unable to update phone number",         statusColor: "#11a75c" },
  { id: "OSY6573411", title: "Document verification taking too long", statusColor: "#f59e0b" },
];

export default function Page() {
  const router = useRouter();

  return (
    // No stickyHeader — Figma: profile info and sections are all one flat flow (gap:30)
    <PageLayout illustration="/images/support.png" leftFixed>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

        {/* Profile header — sits inline in content flow, no divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src="/images/profile.png" alt="profile" fill sizes="40px" className="object-cover" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#000", letterSpacing: "0.16px" }}>John Doe</span>
              <CheckCircle2 size={16} color="#025fc9" />
            </div>
            <p style={{ fontSize: 12, color: "#5e5757", marginTop: 0, marginBottom: 0, letterSpacing: "0.12px" }}>johndoe26@yahoo.com</p>
          </div>
        </div>

        {/* COMMON ISSUES */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", marginTop: 0, marginBottom: 0 }}>COMMON ISSUES</p>
          <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
            {COMMON_ISSUES.map(({ icon: Icon, title, sub, href }, i) => (
              <button key={title} type="button" onClick={() => router.push(href)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "20px 16px", borderBottom: i < COMMON_ISSUES.length - 1 ? "1px solid #d9d9d9" : "none", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
                <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} color="#025fc9" />
                </div>
                {/* gap: 3 between title and subtitle (Figma: gap-[3px]) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#000", marginTop: 0, marginBottom: 0, letterSpacing: "0.16px" }}>{title}</p>
                  <p style={{ fontSize: 14, color: "#5e5757", marginTop: 0, marginBottom: 0, letterSpacing: "0.14px" }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SMART SUPPORT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", marginTop: 0, marginBottom: 0 }}>SMART SUPPORT</p>
          <div style={{ backgroundColor: "rgba(2,95,201,0.05)", border: "1px solid rgba(2,95,201,0.2)", borderRadius: 12, overflow: "hidden" }}>
            <button type="button" onClick={() => router.push("/support/chat")}
              style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
              <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={16} color="#025fc9" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#000", marginTop: 0, marginBottom: 0 }}>Describe your issue</p>
                  <p style={{ fontSize: 14, color: "#5e5757", marginTop: 0, marginBottom: 0 }}>Get instant answers or connect with a human agent</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Start Chatting</span>
                  <ArrowRight size={16} color="#025fc9" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* TRACK CASE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", marginTop: 0, marginBottom: 0 }}>SIGN IN TO TRACK YOUR CASE</p>
            <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
              {ACTIVE_CASES.map(({ id, title, statusColor }, i) => (
                <button key={id} type="button" onClick={() => router.push("/support/case")}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "20px 16px", borderBottom: i < ACTIVE_CASES.length - 1 ? "1px solid #d9d9d9" : "none", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: statusColor, flexShrink: 0 }} />
                  {/* gap: 3 between case ID and title (Figma: gap-[3px]) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", marginTop: 0, marginBottom: 0, lineHeight: "18px", letterSpacing: "0.16px" }}>Case ID: {id}</p>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#000", marginTop: 0, marginBottom: 0 }}>{title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => router.push("/support/no-account")}
            style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
            Continue
          </button>
        </div>

        {/* Security notice — gap: 3 (Figma: gap-[3px]) */}
        <div style={{ display: "flex", gap: 3, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
          <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#a09898", marginTop: 0, marginBottom: 0, lineHeight: "14px" }}>
            Support staff will n<span style={{ color: "#5e5757" }}>ever ask for your password or full OTP. </span>
            End the conversation and report it if they do.
          </p>
        </div>

        {/* Back */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" onClick={() => router.back()}
            style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            Back
          </button>
        </div>
      </div>
    </PageLayout>
  );
}