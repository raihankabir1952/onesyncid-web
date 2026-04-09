"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

function check(password: string) {
  return {
    minLength:   password.length >= 8,
    uppercase:   /[A-Z]/.test(password),
    lowercase:   /[a-z]/.test(password),
    special:     /[^A-Za-z0-9]/.test(password),
    number:      /[0-9]/.test(password),
  };
}

function RequirementDot({ met, typed }: { met: boolean; typed: boolean }) {
  const color = !typed ? "#d9d9d9" : met ? "#11a75c" : "#ff3838";
  return (
    <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
  );
}

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [logoutAll, setLogoutAll] = useState(false);

  const typed = password.length > 0;
  const reqs = check(password);
  const allMet = Object.values(reqs).every(Boolean);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ── MAIN ── */}
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/reset-password.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="absolute bg-white flex flex-col justify-between" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", height: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>Create a new password</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
                Your new password must be different from your previous passwords
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* PASSWORD */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: typed ? "#025fc9" : "#5e5757", margin: 0, letterSpacing: "0.16px" }}>PASSWORD</p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${typed ? "rgba(2,95,201,0.3)" : "#d9d9d9"}` }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                      {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                    </button>
                  </div>
                </div>

                {/* PASSWORD REQUIREMENTS — shown when user starts typing */}
                {typed && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                      PASSWORD MUST INCLUDE
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {[
                        { label: "Minimum 8 characters",    met: reqs.minLength },
                        { label: "One uppercase character", met: reqs.uppercase },
                        { label: "One lowercase character", met: reqs.lowercase },
                        { label: "One special character",   met: reqs.special },
                        { label: "One number",              met: reqs.number },
                      ].map(({ label, met }) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <RequirementDot met={met} typed={typed} />
                          <span style={{ fontSize: 16, color: !typed ? "#a09898" : met ? "#11a75c" : "#ff3838", letterSpacing: "0.16px" }}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONFIRM PASSWORD */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>CONFIRM PASSWORD</p>
                    <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: "1px solid #d9d9d9" }}>
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#000", fontFamily: "inherit", background: "transparent" }}
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                        {showConfirm ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                      </button>
                    </div>
                  </div>

                  {/* Log out of all devices */}
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={logoutAll} onChange={(e) => setLogoutAll(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#5e5757" }}>Log out of all devices</span>
                  </label>
                </div>
              </div>

              {/* Reset & Log In */}
              <button
                type="button"
                onClick={() => { if (allMet && confirmPassword === password) router.push("/get-started/reset-password/success"); }}
                style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", opacity: allMet ? 1 : 0.6 }}
              >
                Reset &amp; Log In
              </button>
            </div>
          </div>

          {/* Bottom logo */}
          <div style={{ display: "flex", justifyContent: "center" }}>
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
