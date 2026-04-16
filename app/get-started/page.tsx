"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Eye, EyeOff, ScanFace, Fingerprint, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type AuthTab = "password" | "pin";

function PinDots({ value, onFocus, error }: { value: string; onFocus: () => void; error?: boolean }) {
  return (
    <div onClick={onFocus} style={{
      display: "flex", justifyContent: "center", gap: 8, // ← was 16, Figma: 8px gap
      paddingTop: 10, paddingBottom: 10, cursor: "text",
      borderBottom: `1px solid ${error ? "#d93025" : "#d9d9d9"}`,
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          width: 16, height: 16, borderRadius: "50%",
          backgroundColor: i < value.length ? "#025fc9" : "transparent",
          border: `1.5px solid ${i < value.length ? "#025fc9" : "#d9d9d9"}`,
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthTab>("password");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const pinRef = useRef<HTMLInputElement>(null);

  const tabStyle = (tab: AuthTab) => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8,
    borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
    borderBottomWidth: 3, borderBottomStyle: "solid" as const,
    borderBottomColor: activeTab === tab ? "#025fc9" : "transparent",
    color: activeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16, fontWeight: 500, letterSpacing: "0.16px",
    background: "none", cursor: "pointer" as const, fontFamily: "inherit",
  });

  const handleSignIn = () => {
    let hasError = false;
    if (!username.trim()) { setUsernameError("Username or email is required"); hasError = true; }
    else setUsernameError("");
    if (activeTab === "password" && !password.trim()) { setPasswordError("Password is required"); hasError = true; }
    else if (activeTab === "pin" && pin.length < 6) { setPasswordError("Please enter your 6 digit PIN"); hasError = true; }
    else setPasswordError("");
    if (hasError) return;
    router.push("/get-started/trust");
  };

  const formContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Username */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>USERNAME OR EMAIL</p>
            <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${usernameError ? "#d93025" : "#d9d9d9"}` }}>
              <input type="text" placeholder="Enter your username or email" value={username}
                onChange={(e) => { setUsername(e.target.value); if (usernameError) setUsernameError(""); }}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
            </div>
            {usernameError && <span style={{ color: "#d93025", fontSize: 13 }}>{usernameError}</span>}
          </div>

          {/* Password/PIN tabs */}
          <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px", height: 53, alignItems: "center" }}>
            <button type="button" onClick={() => { setActiveTab("password"); setPasswordError(""); }} style={tabStyle("password")}>Password</button>
            <button type="button" onClick={() => { setActiveTab("pin"); setPasswordError(""); }} style={tabStyle("pin")}>PIN</button>
          </div>

          {/* Password */}
          {activeTab === "password" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PASSWORD</p>
              <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${passwordError ? "#d93025" : "#d9d9d9"}` }}>
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                  {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                </button>
              </div>
              {passwordError && <span style={{ color: "#d93025", fontSize: 13 }}>{passwordError}</span>}
            </div>
          )}

          {/* PIN */}
          {activeTab === "pin" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>6 DIGIT PIN</p>
              <div style={{ position: "relative" }}>
                <PinDots value={pin} onFocus={() => pinRef.current?.focus()} error={!!passwordError} />
                <input ref={pinRef} type="password" inputMode="numeric" maxLength={6} value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); if (passwordError) setPasswordError(""); }}
                  style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }} />
              </div>
              {passwordError && <span style={{ color: "#d93025", fontSize: 13 }}>{passwordError}</span>}
            </div>
          )}
        </div>

        {/* Remember me + Forgot */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
            <span style={{ fontSize: 14, color: "#5e5757" }}>Remember me</span>
          </label>
          <button type="button"
            onClick={() => activeTab === "pin" ? router.push("/get-started/reset-pin") : router.push("/get-started/reset-password")}
            style={{ fontSize: 14, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
            {activeTab === "password" ? "Forgot password?" : "Forgot PIN?"}
          </button>
        </div>

        {/* Face ID + Fingerprint */}
        <div style={{ display: "flex", gap: 12, paddingTop: 20 }}>
          <button type="button" onClick={() => router.push("/get-started/no-passkey")}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <ScanFace size={20} color="#025fc9" />
            <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Face ID</span>
          </button>
          <button type="button" onClick={() => router.push("/get-started/no-passkey")}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <Fingerprint size={20} color="#025fc9" />
            <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Fingerprint</span>
          </button>
        </div>
      </div>

      {/* Terms + Sign In */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontSize: 12, color: "#333", margin: 0 }}>
          By signing in, you agree to our{" "}
          <button type="button" onClick={() => router.push("/support")} style={{ color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "inherit" }}>Terms</button>
          {" "}and{" "}
          <button type="button" onClick={() => router.push("/support")} style={{ color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "inherit" }}>Privacy Policy</button>
        </p>
        <button type="button" onClick={handleSignIn}
          style={{ width: "100%", height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
          Sign In
        </button>
      </div>

      {/* Or divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9" }} />
        <span style={{ fontSize: 14, color: "#5e5757" }}>Or</span>
        <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9" }} />
      </div>

      {/* OTP button */}
      <button type="button"
        style={{ width: "100%", height: 44, border: "1.5px solid #025fc9", backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
        Sign In with One Time Password
      </button>

      {/* Back */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="button" onClick={() => router.back()}
          style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ===================== DESKTOP (xl+ / 1280px+) ===================== */}
      <div className="hidden xl:flex flex-1 relative" style={{ minHeight: 920 }}>

        {/* LEFT — pinned: left:56, top:85 | gap:30 outer, gap:33 inner */}
        <div className="absolute flex flex-col" style={{ left: 56, top: 85, width: 537, gap: 30 }}>
          <div style={{ position: "relative", width: 232, height: 40, flexShrink: 0 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 33 }}>
            <div style={{ position: "relative", width: 500, height: 514, flexShrink: 0 }}>
              <Image src="/images/signin.png" alt="" fill priority sizes="500px" className="object-contain object-top" />
            </div>
            <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap", margin: 0 }}>
              Verify Once. Access Everything.
            </p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute bg-white flex flex-col"
          style={{
            right: 60, top: 75, width: 600,
            maxHeight: "calc(100vh - 115px)",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Sticky header */}
          <div style={{ flexShrink: 0, padding: "30px 30px 20px", backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>Sign in to your account</p>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 30px 30px", scrollbarWidth: "thin" }}>
            {formContent}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}>
              <div style={{ position: "relative", width: 98, height: 17 }}>
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE / TABLET (< xl) ===================== */}
      <div className="flex xl:hidden flex-col flex-1 px-6 py-8 gap-6">

        {/* Logo */}
        <div className="relative w-[180px] h-[32px]">
          <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="180px" className="object-contain object-left" />
        </div>

        {/* Illustration — responsive */}
        <div className="relative w-full max-w-[280px]" style={{ aspectRatio: "280 / 287" }}>
          <Image src="/images/signin.png" alt="" fill priority sizes="280px" className="object-contain object-top" />
        </div>

        {/* Tagline */}
        <p className="text-[#0052b4] text-xl font-bold leading-snug tracking-wide">
          Verify Once. Access Everything.
        </p>

        {/* Card */}
        <div className="bg-white rounded-[8px] overflow-hidden flex flex-col" style={{ boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)" }}>
          <div className="p-6 border-b border-[#f0f0f0] bg-white" style={{ flexShrink: 0 }}>
            <p style={{ fontSize: 24, fontWeight: 600, color: "#000", margin: 0 }}>Sign in to your account</p>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {formContent}
            <div className="flex justify-center pt-2">
              <div className="relative w-[98px] h-[17px]">
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER ===================== */}
      <div className="flex flex-wrap justify-center items-center gap-5 py-10 text-[#605353] text-[14px] px-4">
        <button type="button" onClick={() => router.push("/support")} style={{ color: "#605353", background: "none", border: "none", fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
          Privacy &amp; Terms
        </button>
        <button type="button" onClick={() => router.push("/support")} style={{ color: "#605353", background: "none", border: "none", fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
          Contact us
        </button>
        <button type="button" className="flex items-center gap-[3px] bg-transparent border-none text-[#605353] text-[14px] cursor-pointer">
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}