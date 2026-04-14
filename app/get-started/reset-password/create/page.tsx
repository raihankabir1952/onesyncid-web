"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

function check(password: string) {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    number: /[0-9]/.test(password),
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
    <PageLayout illustration="/images/reset-password.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Create a new password
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            Your new password must be different from your previous passwords
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* PASSWORD */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: typed ? "#025fc9" : "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                PASSWORD
              </p>
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

            {/* PASSWORD REQUIREMENTS */}
            {typed && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                  PASSWORD MUST INCLUDE
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "Minimum 8 characters", met: reqs.minLength },
                    { label: "One uppercase character", met: reqs.uppercase },
                    { label: "One lowercase character", met: reqs.lowercase },
                    { label: "One special character", met: reqs.special },
                    { label: "One number", met: reqs.number },
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
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                  CONFIRM PASSWORD
                </p>
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
    </PageLayout>
  );
}