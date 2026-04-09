"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, Phone, Mail, Copy, FileText, Shield, ChevronDown, MapPin, X, User } from "lucide-react";
import { useRouter } from "next/navigation";

type ModeTab = "phone" | "email";

const COUNTRIES = [
  { name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { name: "India", dialCode: "+91", flag: "🇮🇳" },
];

const CALL_TIMES = ["8-10 AM", "10 AM - 12 PM", "1 - 2 PM", "4 - 6 PM"];
const CALL_DAYS = ["Today", "Tomorrow", "Any day this week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const LANGUAGES = ["Bengali", "English", "Hindi", "Arabic", "French"];
const ACCESSIBILITY_OPTIONS = ["Hearing Aid", "Tourette Syndrome", "Autism", "Visual Support"];

function Dropdown({ value, options, onSelect }: { value: string; options: string[]; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen((v) => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
        <span style={{ fontSize: 16, color: "#000" }}>{value}</span>
        <ChevronDown size={24} color="#5e5757" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #e5e7eb", maxHeight: 200, overflowY: "auto" }}>
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onSelect(opt); setOpen(false); }} style={{ width: "100%", padding: "10px 16px", textAlign: "left" as const, background: value === opt ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 15, color: value === opt ? "#025fc9" : "#333", fontFamily: "inherit", fontWeight: value === opt ? 500 : 400 }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modeTab, setModeTab] = useState<ModeTab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [callTime, setCallTime] = useState("");
  const [callDay, setCallDay] = useState("Any day this week");
  const [language, setLanguage] = useState("Bengali");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const tabStyle = (tab: ModeTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: tab === modeTab ? 0 : 0,
    background: tab === modeTab ? "#fff" : "none",
    border: tab === modeTab ? "1px solid #025fc9" : "none",
    borderRadius: tab === modeTab ? 8 : 0,
    color: tab === modeTab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, cursor: "pointer" as const, fontFamily: "inherit",
  });

  const toggleAccessibility = (opt: string) => {
    setSelectedAccessibility((prev) => prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const f = e.target.files?.[0]; if (f) setUploadedFile(f); e.target.value = ""; }} style={{ display: "none" }} />

      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>
        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/support.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>Verify Once. Access Everything.</p>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", minHeight: 776, maxHeight: "calc(100vh - 120px)", borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", overflow: "hidden" }}>

          {/* STICKY HEADER */}
          <div style={{ flexShrink: 0, padding: "24px 30px 20px", backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}>
            <button type="button" onClick={() => router.back()} style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 8 }}>
              <ArrowLeft size={24} color="#025fc9" />
            </button>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>Agent Support</p>
          </div>

          {/* SCROLLABLE BODY */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 30px 50px", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* PREFERRED MODE */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>PREFERRED MODE</p>
              <div style={{ display: "flex", backgroundColor: "#f5f5f5", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 10px", alignItems: "center", gap: 4 }}>
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
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 16px" }}>
                  <span style={{ fontSize: 16, color: "#5e5757" }}>OSY-658902</span>
                  <button type="button" onClick={() => navigator.clipboard.writeText("OSY-658902")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }} title="Copy">
                    <Copy size={20} color="#5e5757" />
                  </button>
                </div>
              </div>
            </div>

            {/* ISSUE DETAILS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>ISSUE DETAILS</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                {/* Title row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px", borderBottom: "1px solid #d9d9d9" }}>
                  <User size={20} color="#5e5757" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", margin: 0, marginBottom: 6 }}>TITLE</p>
                    <input type="text" defaultValue="Can't sign in, password not working" style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                  </div>
                </div>
                {/* Description row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px" }}>
                  <User size={20} color="#5e5757" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", margin: 0, marginBottom: 6 }}>DESCRIPTION</p>
                    <textarea defaultValue="I'm unable to sign in to my OneSync account. My password isn't being accepted even though I reset it. I've tried 3 times and the account may now be locked." style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent", resize: "none", minHeight: 80, lineHeight: "21px" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* FILE UPLOAD */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>UPLOAD FILE (OPTIONAL)</p>
              {uploadedFile ? (
                <div style={{ border: "1px solid #025fc9", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(2,95,201,0.04)" }}>
                  <FileText size={24} color="#025fc9" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#025fc9", margin: 0 }}>{uploadedFile.name}</p>
                    <p style={{ fontSize: 12, color: "#a09898", margin: 0 }}>{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button type="button" onClick={() => setUploadedFile(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <X size={18} color="#5e5757" />
                  </button>
                </div>
              ) : (
                <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minHeight: 190, justifyContent: "center" }}>
                  <FileText size={24} color="#5e5757" />
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#5e5757", margin: 0, textAlign: "center" }}>Upload your file here</p>
                  <p style={{ fontSize: 12, color: "#a0a0a0", margin: 0, textAlign: "center" }}>Accepted Formats: PDF, JPG, PNG (Max 5 MB per file)</p>
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontFamily: "inherit" }}>
                    Upload
                  </button>
                </div>
              )}
            </div>

            {/* CONTACT DETAILS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CONTACT DETAILS</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                {/* Full name */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px", borderBottom: "1px solid #d9d9d9" }}>
                  <User size={20} color="#5e5757" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", margin: 0, marginBottom: 6 }}>FULL NAME</p>
                    <input type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                  </div>
                </div>
                {/* Phone */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px 16px", borderBottom: "1px solid #d9d9d9", position: "relative" }}>
                  <button type="button" onClick={() => setCountryOpen(!countryOpen)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, fontFamily: "inherit" }}>
                    <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
                    <span style={{ fontSize: 16, color: "#5e5757" }}>{selectedCountry.dialCode}</span>
                    <ChevronDown size={16} color="#5e5757" />
                  </button>
                  {countryOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 200, maxHeight: 180, overflowY: "auto", border: "1px solid #e5e7eb" }}>
                      {COUNTRIES.map((c) => (
                        <button key={c.dialCode} type="button" onClick={() => { setSelectedCountry(c); setCountryOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 16px", background: selectedCountry.dialCode === c.dialCode ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", fontFamily: "inherit", textAlign: "left" as const }}>
                          <span>{c.flag}</span><span>{c.dialCode}</span><span style={{ color: "#a09898" }}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div style={{ width: 1, height: 40, backgroundColor: "#d9d9d9", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", margin: 0, marginBottom: 4 }}>PHONE NUMBER</p>
                    <input type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                  </div>
                </div>
                {/* Email */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "20px 16px" }}>
                  <Mail size={20} color="#5e5757" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, color: "#5e5757", margin: 0, marginBottom: 6 }}>EMAIL ADDRESS</p>
                    <input type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* PREFERRED CALL TIME */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>PREFERRED CALL TIME</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                {/* Time chips */}
                <div style={{ padding: "20px 16px", borderBottom: "1px solid #d9d9d9" }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, marginBottom: 12 }}>SELECT A TIME</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {CALL_TIMES.map((t) => (
                      <button key={t} type="button" onClick={() => setCallTime(t)} style={{ border: `1px solid ${callTime === t ? "#025fc9" : "#d9d9d9"}`, borderRadius: 8, padding: "5px 12px", fontSize: 16, color: callTime === t ? "#025fc9" : "#767676", backgroundColor: callTime === t ? "rgba(2,95,201,0.05)" : "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Preferred day dropdown */}
                <div style={{ padding: "20px 16px" }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, marginBottom: 8 }}>PREFERRED DAY</p>
                  <Dropdown value={callDay} options={CALL_DAYS} onSelect={setCallDay} />
                </div>
              </div>
            </div>

            {/* CONTACT LANGUAGE */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CONTACT LANGUAGE</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, padding: "20px 16px" }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, marginBottom: 8 }}>PREFERRED LANGUAGE</p>
                <Dropdown value={language} options={LANGUAGES} onSelect={setLanguage} />
              </div>
            </div>

            {/* ACCESSIBILITY NEEDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>ACCESSIBILITY NEEDS (IF ANY)</p>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: 12, padding: "20px 16px" }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, marginBottom: 12 }}>SELECT ALL THAT APPLIES</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {ACCESSIBILITY_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => toggleAccessibility(opt)} style={{ border: `1px solid ${selectedAccessibility.includes(opt) ? "#025fc9" : "#d9d9d9"}`, borderRadius: 8, padding: "5px 12px", fontSize: 16, color: selectedAccessibility.includes(opt) ? "#025fc9" : "#767676", backgroundColor: selectedAccessibility.includes(opt) ? "rgba(2,95,201,0.05)" : "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Security notice */}
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
              <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#a09898", margin: 0, lineHeight: "14px" }}>
                Your case will be assigned a reference number. Average response time is under 4 hours during business hours.
              </p>
            </div>

            {/* Submit Case button */}
            <button
              type="button"
               style={{
                      width: "100%",
                      padding: "10px",
                      height: 56,                 // bigger height like image
                      backgroundColor: "#1b5fb8", // slightly deeper blue like image
                      color: "#fff",
                      fontSize: 14,               // larger text
                      fontWeight: 600,            // bolder text
                      border: "none",
                      borderRadius: 12,           // more rounded corners
                      cursor: "pointer",
                      fontFamily: "switzer, sans-serif",
                      letterSpacing: "0.2px",
                      marginTop: 10
                    }}
            >
              Submit Case
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, paddingTop: 20, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" /><span>Change region</span><ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}