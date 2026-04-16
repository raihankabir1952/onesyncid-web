"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Phone, Mail, Copy, FileText, Shield, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";

type ModeTab = "phone" | "email";

const COUNTRIES = [
  { name: "Bangladesh",    dialCode: "+880", flag: "🇧🇩" },
  { name: "United States", dialCode: "+1",   flag: "🇺🇸" },
  { name: "India",         dialCode: "+91",  flag: "🇮🇳" },
];

const CALL_TIMES = ["Select a time", "8-10 AM", "10 AM - 12 PM", "1 - 2 PM", "4 - 6 PM"];
const CALL_DAYS  = ["Today", "Tomorrow", "Any day this week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const LANGUAGES  = ["Bengali", "English", "Hindi", "Arabic", "French"];
const ACCESSIBILITY_OPTIONS = ["Hearing Aid", "Tourette Syndrome", "Autism", "Visual Support"];

function Dropdown({ value, options, onSelect }: { value: string; options: string[]; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
        <span style={{ fontSize: 16, color: "#000" }}>{value}</span>
        <ChevronDown size={20} color="#5e5757" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #e5e7eb", maxHeight: 200, overflowY: "auto" }}>
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onSelect(opt); setOpen(false); }}
              style={{ width: "100%", padding: "10px 16px", textAlign: "left" as const, background: value === opt ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 15, color: value === opt ? "#025fc9" : "#333", fontFamily: "inherit", fontWeight: value === opt ? 500 : 400 }}>
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
  const [callTime, setCallTime] = useState("Select a time");
  const [callDay, setCallDay] = useState("Any day this week");
  const [language, setLanguage] = useState("Bengali");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Standard bottom-border underline tab (Figma: same pattern as all phone/email tabs)
  const tabStyle = (tab: ModeTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 8,
    borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: 3, borderBottomStyle: "solid" as const,
    borderBottomColor: modeTab === tab ? "#025fc9" : "transparent",
    color: modeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const, fontFamily: "inherit",
  });

  const toggleAccessibility = (opt: string) => {
    setSelectedAccessibility((prev) => prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]);
  };

  return (
    <PageLayout
      illustration="/images/support.png"
      leftFixed
      stickyHeader={
        // gap: 10 between back button and title (Figma: gap-[10px])
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button type="button" onClick={() => router.back()}
            style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <ArrowLeft size={24} color="#025fc9" />
          </button>
          <p style={{ fontSize: 20, fontWeight: 600, color: "#000", margin: 0 }}>Agent Support</p>
        </div>
      }
    >
      <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) setUploadedFile(f); e.target.value = ""; }}
        style={{ display: "none" }} />

      {/* gap: 20 for all sections (Figma: gap-[20px]) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* PREFERRED MODE — standard bottom-border underline tab */}
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

        {/* CASE ID — flat, no bottom border line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>CASE ID (AUTO-GENERATED)</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40 }}>
            <span style={{ fontSize: 16, color: "#5e5757", letterSpacing: "0.16px" }}>OSY-658902</span>
            <button type="button" onClick={() => navigator.clipboard.writeText("OSY-658902")}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              <Copy size={20} color="#5e5757" />
            </button>
          </div>
        </div>

        {/* ISSUE TITLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>ISSUE TITLE</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
            <input type="text" defaultValue="Can't sign in, password not working"
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderBottom: "1px solid #d9d9d9", paddingBottom: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>DESCRIPTION</p>
          <textarea defaultValue="I'm unable to sign in to my OneSync account. My password isn't being accepted even though I reset it. I've tried 3 times and the account may now be locked."
            style={{ border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent", resize: "none", minHeight: 80, lineHeight: "21px" }} />
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
              <button type="button" onClick={() => fileInputRef.current?.click()}
                style={{ backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, padding: "8px 10px", cursor: "pointer", fontFamily: "inherit" }}>
                Upload
              </button>
            </div>
          )}
        </div>

        {/* FULL NAME */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>FULL NAME</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
            <input type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PHONE NUMBER</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", gap: 30, borderBottom: "1px solid #d9d9d9", position: "relative" }}>
            <button type="button" onClick={() => setCountryOpen(!countryOpen)}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, fontFamily: "inherit" }}>
              <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
              <span style={{ fontSize: 16, color: "#5e5757" }}>{selectedCountry.dialCode}</span>
              <ChevronDown size={16} color="#5e5757" />
            </button>
            {countryOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 50, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 200, maxHeight: 180, overflowY: "auto", border: "1px solid #e5e7eb" }}>
                {COUNTRIES.map((c) => (
                  <button key={c.dialCode} type="button" onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 16px", background: selectedCountry.dialCode === c.dialCode ? "rgba(2,95,201,0.05)" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", fontFamily: "inherit", textAlign: "left" as const }}>
                    <span>{c.flag}</span><span>{c.dialCode}</span><span style={{ color: "#a09898" }}>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
            <input type="tel" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
          </div>
        </div>

        {/* EMAIL ADDRESS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>EMAIL ADDRESS</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
            <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
          </div>
        </div>

        {/* PREFERRED CALL TIME — flat dropdown, border-b on each field (Figma: no box container) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid #d9d9d9", paddingBottom: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PREFERRED CALL TIME</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
            <Dropdown value={callTime} options={CALL_TIMES} onSelect={setCallTime} />
          </div>
        </div>

        {/* PREFERRED DAY — flat dropdown, border-b */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, borderBottom: "1px solid #d9d9d9", paddingBottom: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PREFERRED DAY</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
            <Dropdown value={callDay} options={CALL_DAYS} onSelect={setCallDay} />
          </div>
        </div>

        {/* PREFERRED LANGUAGE — flat, no box container */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PREFERRED LANGUAGE</p>
          <div style={{ height: 44, display: "flex", alignItems: "center", paddingTop: 10, paddingBottom: 10 }}>
            <Dropdown value={language} options={LANGUAGES} onSelect={setLanguage} />
          </div>
        </div>

        {/* ACCESSIBILITY NEEDS — gap: 20 between chips (Figma: gap-[20px]) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>ACCESSIBILITY NEEDS (IF ANY)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {ACCESSIBILITY_OPTIONS.map((opt) => (
              <button key={opt} type="button" onClick={() => toggleAccessibility(opt)}
                style={{ border: `1px solid ${selectedAccessibility.includes(opt) ? "#025fc9" : "#d9d9d9"}`, borderRadius: 8, padding: "5px 12px", fontSize: 16, color: selectedAccessibility.includes(opt) ? "#025fc9" : "#767676", backgroundColor: selectedAccessibility.includes(opt) ? "rgba(2,95,201,0.05)" : "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Security notice — gap: 3 (Figma: gap-[3px]) */}
        <div style={{ display: "flex", gap: 3, alignItems: "flex-start", border: "1px solid #d9d9d9", borderRadius: 12, padding: "10px 16px" }}>
          <Shield size={14} color="#a09898" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#a09898", margin: 0, lineHeight: "14px", letterSpacing: "0.12px" }}>
            Your case will be assigned a reference number. Average response time is under 4 hours during business hours.
          </p>
        </div>

        {/* Submit Case */}
        <button type="button"
          style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
          Submit Case
        </button>
      </div>
    </PageLayout>
  );
}