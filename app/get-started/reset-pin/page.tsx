"use client";

import { useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

type ContactTab = "phone" | "email";

const COUNTRIES = [
  { name: "Bangladesh",     dialCode: "+880", flag: "🇧🇩" },
  { name: "United States",  dialCode: "+1",   flag: "🇺🇸" },
  { name: "United Kingdom", dialCode: "+44",  flag: "🇬🇧" },
  { name: "India",          dialCode: "+91",  flag: "🇮🇳" },
  { name: "Pakistan",       dialCode: "+92",  flag: "🇵🇰" },
];

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContactTab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const tabStyle = (tab: ContactTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 8,
    borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: 3, borderBottomStyle: "solid" as const,
    borderBottomColor: activeTab === tab ? "#025fc9" : "transparent",
    color: activeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const, fontFamily: "inherit",
  });

  return (
    <PageLayout illustration="/images/resetpin.png" leftFixed={true}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Reset your PIN
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
              Type your registered phone or email to reset your PIN.
            </p>

            {/* Phone / Email tabs */}
            <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px", alignItems: "center" }}>
              <button type="button" onClick={() => setActiveTab("phone")} style={tabStyle("phone")}>
                <Phone size={20} color={activeTab === "phone" ? "#025fc9" : "#5e5757"} /> Phone
              </button>
              <button type="button" onClick={() => setActiveTab("email")} style={tabStyle("email")}>
                <Mail size={20} color={activeTab === "email" ? "#025fc9" : "#5e5757"} /> Email
              </button>
            </div>

            {/* Phone input */}
            {activeTab === "phone" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PHONE NUMBER</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #d9d9d9", position: "relative" }}>
                  <button type="button" onClick={() => setCountryOpen(!countryOpen)}
                    style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, fontFamily: "inherit" }}>
                    <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
                    <span style={{ fontSize: 16, color: "#5e5757" }}>{selectedCountry.dialCode}</span>
                    <ChevronDown size={16} color="#5e5757" />
                  </button>
                  {countryOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 220, maxHeight: 220, overflowY: "auto" }}>
                      {COUNTRIES.map((c) => (
                        <button key={c.dialCode} type="button"
                          onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 16px", background: selectedCountry.dialCode === c.dialCode ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", fontFamily: "inherit", textAlign: "left" as const }}>
                          <span>{c.flag}</span><span>{c.dialCode}</span><span style={{ color: "#a09898" }}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="tel" placeholder="Enter your number" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                </div>
              </div>
            )}

            {/* Email input */}
            {activeTab === "email" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>EMAIL</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                  <input type="email" placeholder="Enter your email address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                </div>
              </div>
            )}

            {/* Need help */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "#333" }}>Need help?</span>
              <button type="button" onClick={() => router.push("/support")}
                style={{ fontSize: 14, fontWeight: 500, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                Contact Support
              </button>
            </div>
          </div>

          {/* Send OTP */}
          <button type="button" onClick={() => router.push("/get-started/reset-pin/create")}
            style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
            Send OTP
          </button>
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