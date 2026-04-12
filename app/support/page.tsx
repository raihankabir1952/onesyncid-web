"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HelpCircle, Lock, Phone, Key, MessageCircle,
  ArrowRight, Shield, Mail, ChevronDown, MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ContactTab = "phone" | "email";

const COUNTRIES = [
  { name: "Bangladesh",   dialCode: "+880", flagImg: "/images/flag.png", code: "BD" },
  { name: "United States", dialCode: "+1",  flagImg: null,               code: "US" },
  { name: "India",        dialCode: "+91",  flagImg: null,               code: "IN" },
];

const COMMON_ISSUES = [
  { icon: HelpCircle, title: "What is my OneSyncID?",     sub: "Learn how to find your unique identifier", href: "/support/finding-id" },
  { icon: Lock,       title: "Account locked or blocked", sub: "Regain access after failed attempts",      href: "#" },
  { icon: Phone,      title: "Didn't receive OTP code",   sub: "Troubleshoot email and SMS delivery",      href: "#" },
  { icon: Key,        title: "Passkey not working",       sub: "Reset or re-register your passkey",        href: "#" },
];

function FlagDisplay({ country, size = "normal" }: { country: typeof COUNTRIES[0]; size?: "normal" | "small" }) {
  const w = size === "small" ? 24 : 30;
  const h = size === "small" ? 16 : 20;
  if (country.flagImg) {
    return (
      <div style={{ position: "relative", width: w, height: h, border: "0.5px solid #eee", flexShrink: 0 }}>
        <Image src={country.flagImg} alt={country.name} fill sizes={`${w}px`} className="object-cover" />
      </div>
    );
  }
  return (
    <div style={{ width: w, height: h, backgroundColor: "#f0f0f0", border: "0.5px solid #eee", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#666" }}>{country.code}</span>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContactTab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const tabStyle = (tab: ContactTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: 3, borderBottomStyle: "solid" as const,
    borderBottomColor: activeTab === tab ? "#025fc9" : "transparent",
    color: activeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const, fontFamily: "inherit",
  });

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ── MAIN ── */}
      <div className="relative flex-1 w-full flex justify-end" style={{ paddingTop: 75, paddingBottom: 40 }}>

        {/* LEFT — absolute, decorative */}
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

        {/* RIGHT CARD — normal flow, anchored to right */}
        <div
          className="bg-white flex flex-col justify-between"
          style={{
            marginRight: "clamp(16px, 4.2vw, 60px)",
            width: "clamp(320px, 41.7vw, 600px)",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            padding: 30,
            gap: 30,
          }}
        >
          {/* COMMON ISSUES */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0, letterSpacing: "0.14px" }}>COMMON ISSUES</p>
            <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden", backgroundColor: "#fff" }}>
              {COMMON_ISSUES.map(({ icon: Icon, title, sub, href }, i) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => router.push(href)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "20px 16px",
                    borderBottom: i < COMMON_ISSUES.length - 1 ? "1px solid #d9d9d9" : "none",
                    background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const,
                  }}
                >
                  <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color="#025fc9" />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
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
              <button
                type="button"
                onClick={() => router.push("/support/chat")}
                style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const }}
              >
                <div style={{ width: 24, height: 24, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={16} color="#025fc9" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0, letterSpacing: "0.18px" }}>Describe your issue</p>
                    <p style={{ fontSize: 14, color: "#5e5757", margin: 0, letterSpacing: "0.14px" }}>Get instant answers or connect with a human agent</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Start Chatting</span>
                    <ArrowRight size={16} color="#025fc9" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* VERIFY TO TRACK CASE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>VERIFY TO START TRACKING YOUR CASE</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {/* Phone/Email tabs */}
              <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px", alignItems: "center" }}>
                <button type="button" onClick={() => setActiveTab("phone")} style={tabStyle("phone")}>
                  <Phone size={20} color={activeTab === "phone" ? "#025fc9" : "#5e5757"} /> Phone
                </button>
                <button type="button" onClick={() => setActiveTab("email")} style={tabStyle("email")}>
                  <Mail size={20} color={activeTab === "email" ? "#025fc9" : "#5e5757"} /> Email
                </button>
              </div>

              {activeTab === "phone" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PHONE NUMBER</p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", gap: 30, borderBottom: "1px solid #d9d9d9", position: "relative" }}>
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, fontFamily: "inherit" }}
                    >
                      <FlagDisplay country={selectedCountry} />
                      <span style={{ fontSize: 16, color: "#5e5757" }}>{selectedCountry.dialCode}</span>
                      <ChevronDown size={16} color="#5e5757" />
                    </button>
                    {countryOpen && (
                      <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 200, maxHeight: 200, overflowY: "auto" }}>
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.dialCode}
                            type="button"
                            onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 16px", background: selectedCountry.dialCode === c.dialCode ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", fontFamily: "inherit", textAlign: "left" as const }}
                          >
                            <FlagDisplay country={c} size="small" />
                            <span>{c.dialCode}</span>
                            <span style={{ color: "#a09898" }}>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <input
                      type="tel"
                      placeholder="Enter your number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                    />
                  </div>
                </div>
              )}

              {activeTab === "email" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>EMAIL ADDRESS</p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => router.push("/support/logged-in")}
              style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Send OTP
            </button>
          </div>

          {/* Security notice */}
          <div style={{ display: "flex", gap: 6, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
            <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: "#a09898", margin: 0, lineHeight: "14px", letterSpacing: "0.12px" }}>
              Support staff will n<span style={{ color: "#5e5757" }}>ever ask for your password or full OTP. </span>
              End the conversation and report it if they do.
            </p>
          </div>

          {/* Back */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" onClick={() => router.back()} style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Back
            </button>
          </div>

          {/* Bottom logo */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 98, height: 17 }}>
              <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 50, paddingTop: 20, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" /><span>Change region</span><ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}