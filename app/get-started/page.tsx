"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Eye, EyeOff, ScanFace, Fingerprint, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type AuthTab = "password" | "pin";

function PinDots({ value, onFocus }: { value: string; onFocus: () => void }) {
  return (
    <div
      onClick={onFocus}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        paddingTop: 10,
        paddingBottom: 10,
        cursor: "text",
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: i < value.length ? "#025fc9" : "transparent",
            border: `1.5px solid ${i < value.length ? "#025fc9" : "#d9d9d9"}`,
            flexShrink: 0,
          }}
        />
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
  const pinRef = useRef<HTMLInputElement>(null);

  const tabStyle = (tab: AuthTab) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 3,
    borderBottomStyle: "solid" as const,
    borderBottomColor: activeTab === tab ? "#025fc9" : "transparent",
    color: activeTab === tab ? "#025fc9" : "#5e5757",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.16px",
    background: "none",
    cursor: "pointer" as const,
    fontFamily: "inherit",
  });

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Switzer', sans-serif" }}
    >
      {/* ── MAIN ── */}
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div
          className="absolute flex flex-col"
          style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}
        >
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/signin.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="absolute bg-white flex flex-col justify-between"
          style={{
            right: "clamp(16px, 4.2vw, 60px)", top: 75,
            width: "clamp(320px, 41.7vw, 600px)", minHeight: 776,
            borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
              Sign in to your account
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Username / Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                  USERNAME OR EMAIL
                </p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                  <input
                    type="text"
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                  />
                </div>
              </div>

              {/* Password / PIN tabs */}
              <div style={{ display: "flex", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px", height: 53, alignItems: "center" }}>
                <button type="button" onClick={() => setActiveTab("password")} style={tabStyle("password")}>
                  Password
                </button>
                <button type="button" onClick={() => setActiveTab("pin")} style={tabStyle("pin")}>
                  PIN
                </button>
              </div>

              {/* PASSWORD field */}
              {activeTab === "password" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                    PASSWORD
                  </p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                    >
                      {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                    </button>
                  </div>
                </div>
              )}

              {/* PIN field */}
              {activeTab === "pin" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                    6 DIGIT PIN
                  </p>
                  <div style={{ position: "relative" }}>
                    <PinDots value={pin} onFocus={() => pinRef.current?.focus()} />
                    <input
                      ref={pinRef}
                      type="password"
                      inputMode="numeric"
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                    />
                  </div>
                </div>
              )}

              {/* Remember me + Forgot */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: 16, height: 16, cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 14, color: "#5e5757" }}>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => { if (activeTab === "pin") router.push("/get-started/reset-pin");
                    else router.push("/get-started/reset-password");
                   }}
                  style={{ fontSize: 14, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
                >
                  {activeTab === "password" ? "Forgot password?" : "Forgot PIN?"}
                </button>
              </div>

              {/* Face ID + Fingerprint */}
              <div style={{ display: "flex", gap: 12 }}>
                <button type="button" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  <ScanFace size={20} color="#025fc9" />
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Face ID</span>
                </button>
                <button type="button" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 12, padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  <Fingerprint size={20} color="#025fc9" />
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Fingerprint</span>
                </button>
              </div>

              {/* Terms + Sign In */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 12, color: "#333", margin: 0 }}>
                  By signing in, you agree to our{" "}
                  <button type="button" style={{ color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "inherit" }}>Terms</button>
                  {" "}and{" "}
                  <button type="button" style={{ color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "inherit" }}>Privacy Policy</button>
                </p>
                <button type="button" style={{ width: "100%", height: 48, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                  Sign In
                </button>
              </div>

              {/* Or */}
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9" }} />
                <span style={{ fontSize: 14, color: "#5e5757" }}>Or</span>
                <div style={{ flex: 1, height: 1, backgroundColor: "#d9d9d9" }} />
              </div>

              {/* OTP */}
              <button type="button" style={{ width: "100%", height: 44, border: "1.5px solid #025fc9", backgroundColor: "transparent", color: "#025fc9", fontSize: 16, fontWeight: 500, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                Sign In with One Time Password
              </button>

              {/* Back */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" onClick={() => router.back()} style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Bottom logo */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", paddingTop: 20 }}>
            <div style={{ position: "relative", width: 98, height: 17 }}>
              <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}
