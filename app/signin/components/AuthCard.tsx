"use client";

import { Phone, Mail } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { countries } from "../data/countries";
import CountrySelect from "./CountrySelect";
import PhoneInput from "./PhoneInput";
import LanguageSelect from "./LanguageSelect";

type Tab = "phone" | "email";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type Props = {
  isMobile?: boolean;
};

export default function AuthCard({ isMobile = false }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setEmailError(result.error.flatten().fieldErrors.email?.[0] || "");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSignIn = () => {
    if (activeTab === "email") {
      if (!validateEmail()) return;
    } else {
      if (!phoneNumber.trim()) { setPhoneError("Phone number is required"); return; }
      if (phoneNumber.replace(/\D/g, "").length < 6) { setPhoneError("Enter a valid phone number"); return; }
      setPhoneError("");
    }
    router.push("/otp");
  };

  const formContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 30 }}>

      {/* Language + Country */}
      <div style={{ display: "flex", gap: 16 }}>
        <LanguageSelect />
        <CountrySelect selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 30 }}>
        <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: 8 }}>
          <button onClick={() => setActiveTab("phone")} type="button"
            style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center", padding: 8, borderBottom: activeTab === "phone" ? "3px solid #025fc9" : "none", color: activeTab === "phone" ? "#025fc9" : "#5e5757", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <Phone size={20} /> Phone
          </button>
          <button onClick={() => setActiveTab("email")} type="button"
            style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center", padding: 8, borderBottom: activeTab === "email" ? "3px solid #025fc9" : "none", color: activeTab === "email" ? "#025fc9" : "#5e5757", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <Mail size={20} /> Email
          </button>
        </div>

        {/* Phone */}
        {activeTab === "phone" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: "#5e5757", fontSize: 16, fontWeight: 500, margin: 0 }}>PHONE NUMBER</p>
            <PhoneInput selectedCountry={selectedCountry} value={phoneNumber}
              onChange={(val) => { setPhoneNumber(val); if (phoneError) setPhoneError(""); }} />
            {phoneError && <span style={{ color: "#d93025", fontSize: 13 }}>{phoneError}</span>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: "#5e5757", fontSize: 16, fontWeight: 500, margin: 0 }}>EMAIL ADDRESS</p>
            <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: emailError ? "1px solid #d93025" : "1px solid #d9d9d9" }}>
              <input type="email" placeholder="Enter your email address" value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                onBlur={validateEmail}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
            </div>
            {emailError && <span style={{ color: "#d93025", fontSize: 13, marginTop: 4 }}>{emailError}</span>}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button type="button" onClick={handleSignIn}
            style={{ width: "100%", minHeight: 48, backgroundColor: "#025fc9", color: "#fff", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, fontFamily: "inherit", padding: "12px 16px" }}>
            Sign In
          </button>
          <button type="button" onClick={() => router.push("/create-account")}
            style={{ width: "100%", minHeight: 48, backgroundColor: "transparent", color: "#025fc9", borderRadius: 8, border: "1.5px solid #025fc9", cursor: "pointer", fontSize: 16, fontWeight: 500, fontFamily: "inherit", padding: "12px 16px" }}>
            Create OneSyncID
          </button>
        </div>
      </div>
    </div>
  );

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <div className="bg-white rounded-[8px] p-6 flex flex-col gap-6"
        style={{ boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)" }}>
        <p style={{ fontSize: 24, fontWeight: 600, color: "#000", margin: 0 }}>
          Welcome. Let&apos;s verify it&apos;s you.
        </p>
        {formContent}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ position: "relative", width: 98, height: 17 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
          </div>
        </div>
      </div>
    );
  }

  /* ── DESKTOP ── */
  return (
    <div className="absolute bg-white flex flex-col justify-between"
      style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", minHeight: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", paddingTop: 39, paddingBottom: 30, paddingLeft: 30, paddingRight: 30 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Welcome. Let&apos;s verify it&apos;s you.
        </p>
        {formContent}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 20 }}>
        <div style={{ position: "relative", width: 98, height: 17 }}>
          <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}