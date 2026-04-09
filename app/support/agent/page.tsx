"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Phone, Mail, Copy, FileText, Shield, ChevronDown, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

type ModeTab = "phone" | "email";

const COUNTRIES = [
  { name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { name: "India", dialCode: "+91", flag: "🇮🇳" },
];

const ACCESSIBILITY_OPTIONS = ["Hearing Aid", "Tourette Syndrome", "Autism", "Visual Support"];

export default function Page() {
  const router = useRouter();
  const [modeTab, setModeTab] = useState<ModeTab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [callTime, setCallTime] = useState("Select a time");
  const [callDay, setCallDay] = useState("Any day this week");
  const [language, setLanguage] = useState("Bengali");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const tabStyle = (tab: ModeTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: 3, borderBottomStyle: "solid" as const,
    borderBottomColor: modeTab === tab ? "#025fc9" : "transparent",
    color: modeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const, fontFamily: "inherit",
  });

  const toggleAccessibility = (opt: string) => {
    setSelectedAccessibility((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

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

        {/* RIGHT CARD — scrollable form */}
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", maxHeight: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30, overflowY: "auto" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button type="button" onClick={() => router.back()} style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <ArrowLeft size={24} color="#025fc9" />
              </button>
              <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>Agent Support</p>
            </div>

            {/* PREFERRED MODE */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>PREFERRED MODE</p>
              <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px", alignItems: "center" }}>
                <button type="button" onClick={() => setModeTab("phone")} style={tabStyle("phone")}>
                  <Phone size={20} color={modeTab === "phone" ? "#025fc9" : "#5e5757"} /> Phone
                </button>
                <button type="button" onClick={() => setModeTab("email")} style={tabStyle("email")}>
                  <Mail size={20} color={modeTab === "email" ? "#025fc9" : "#5e5757"} /> Email
                </button>
              </div>
            </div>

            {/* CASE ID */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CASE ID (AUTO-GENERATED)</p>
              <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, color: "#5e5757", letterSpacing: "0.16px" }}>OSY-658902</span>
                <button type="button" style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                  <Copy size={20} color="#5e5757" />
                </button>
              </div>
            </div>

            {/* ISSUE TITLE */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>ISSUE TITLE</p>
              <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                <input type="text" placeholder="Enter issue title" defaultValue="Can't sign in, password not working" style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, borderBottom: "1px solid #d9d9d9", paddingBottom: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>DESCRIPTION</p>
              <textarea
                defaultValue="I'm unable to sign in to my OneSync account. My password isn't being accepted even though I reset it. I've tried 3 times and the account may now be locked."
                style={{ border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent", resize: "none", minHeight: 80, lineHeight: "21px" }}
              />
            </div>

            {/* FILE UPLOAD */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>UPLOAD FILE (OPTIONAL)</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minHeight: 190, justifyContent: "center" }}>
                <FileText size={24} color="#5e5757" />
                <p style={{ fontSize: 14, fontWeight: 500, color: "#5e5757", margin: 0, textAlign: "center" }}>Upload your file here</p>
                <p style={{ fontSize: 12, color: "#a0a0a0", margin: 0, textAlign: "center" }}>Accepted Formats: PDF, JPG, PNG (Max 5 MB per file)</p>
                <button type="button" style={{ backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, padding: "8px 10px", cursor: "pointer", fontFamily: "inherit" }}>
                  Upload
                </button>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Full name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>FULL NAME</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                  <input type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PHONE NUMBER</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #d9d9d9", position: "relative" }}>
                  <button type="button" onClick={() => setCountryOpen(!countryOpen)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, fontFamily: "inherit" }}>
                    <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
                    <span style={{ fontSize: 16, color: "#5e5757" }}>{selectedCountry.dialCode}</span>
                    <ChevronDown size={16} color="#5e5757" />
                  </button>
                  {countryOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 200, maxHeight: 180, overflowY: "auto" }}>
                      {COUNTRIES.map((c) => (
                        <button key={c.dialCode} type="button" onClick={() => { setSelectedCountry(c); setCountryOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 16px", background: selectedCountry.dialCode === c.dialCode ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", fontFamily: "inherit", textAlign: "left" as const }}>
                          <span>{c.flag}</span><span>{c.dialCode}</span><span style={{ color: "#a09898" }}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="tel" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>EMAIL ADDRESS</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                  <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                </div>
              </div>
            </div>

            {/* CALL PREFERENCES */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Call time */}
              <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px", marginBottom: 8 }}>PREFERRED CALL TIME</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, color: "#5e5757" }}>{callTime}</span>
                  <ChevronDown size={20} color="#5e5757" />
                </div>
              </div>
              {/* Call day */}
              <div style={{ borderBottom: "1px solid #d9d9d9", paddingBottom: 10, paddingTop: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px", marginBottom: 8 }}>PREFERRED DAY</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, color: "#5e5757" }}>{callDay}</span>
                  <ChevronDown size={20} color="#5e5757" />
                </div>
              </div>
            </div>

            {/* PREFERRED LANGUAGE */}
            <div>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px", marginBottom: 8 }}>PREFERRED LANGUAGE</p>
              <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, color: "#000" }}>{language}</span>
                <ChevronDown size={20} color="#5e5757" />
              </div>
            </div>

            {/* ACCESSIBILITY NEEDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>ACCESSIBILITY NEEDS (IF ANY)</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                {ACCESSIBILITY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleAccessibility(opt)}
                    style={{
                      border: `1px solid ${selectedAccessibility.includes(opt) ? "#025fc9" : "#d9d9d9"}`,
                      borderRadius: 8, padding: "5px 12px", fontSize: 16,
                      color: selectedAccessibility.includes(opt) ? "#025fc9" : "#767676",
                      backgroundColor: selectedAccessibility.includes(opt) ? "rgba(2,95,201,0.05)" : "transparent",
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Security notice */}
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
              <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#a09898", margin: 0, lineHeight: "14px" }}>
                Your case will be assigned a reference number. Average response time is under 4 hours during business hours.
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
            >
              Submit Case
            </button>
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
