"use client";

import React, { useState, Suspense } from "react";
import { Eye, EyeOff, Phone, Mail, ChevronDown, Shield } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";

type AuthMethod = "password" | "pin";
type OtpMethod = "phone" | "email";

function MergeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newEmail = searchParams.get("newEmail") ?? "johndoe@mail.com";

  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");
  const [otpMethod, setOtpMethod] = useState<OtpMethod>("phone");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpFieldError, setOtpFieldError] = useState("");

  const handleContinue = () => {
    let hasError = false;
    if (!username.trim()) { setUsernameError("Username or email is required"); hasError = true; }
    else setUsernameError("");
    if (!password.trim()) { setPasswordError(authMethod === "pin" ? "PIN is required" : "Password is required"); hasError = true; }
    else setPasswordError("");
    if (otpMethod === "phone" && !phone.trim()) { setOtpFieldError("Phone number is required"); hasError = true; }
    else if (otpMethod === "email" && !otpEmail.trim()) { setOtpFieldError("Email address is required"); hasError = true; }
    else setOtpFieldError("");
    if (hasError) return;
    router.push(`/merge/confirm?newEmail=${encodeURIComponent(newEmail)}&existingEmail=johndoe@gmail.com`);
  };

  return (
    <PageLayout
      illustration="/images/merge.png"
      leftFixed={true}
      stickyHeader={
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Merge accounts
        </p>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

        {/* Warning banner — gap: 3 (Figma), not 6 */}
        <div style={{
          display: "flex", gap: 3, alignItems: "flex-start",
          backgroundColor: "rgba(255,244,229,0.7)",
          border: "1px solid #fde3e0",
          borderRadius: 12, padding: "10px 16px",
        }}>
          <Shield size={15} color="#996500" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 12, color: "#996500", letterSpacing: "0.12px", lineHeight: "14px" }}>
            <p style={{ margin: 0 }}>We need to confirm you own the existing account before merging. </p>
            <p style={{ margin: 0 }}>This prevents unauthorized account takeovers.</p>
          </div>
        </div>

        {/* New account info — gap: 6 between label and email */}
        <div style={{
          backgroundColor: "rgba(2,95,201,0.05)",
          border: "1px solid rgba(2,95,201,0.2)",
          borderRadius: 12, padding: "10px 16px",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>
            NEW ACCOUNT BEING CREATED
          </p>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#000", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>
            {newEmail}
          </p>
        </div>

        {/* Sign into existing account */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>SIGN INTO YOUR EXISTING ACCOUNT</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Username/email field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>USERNAME OR EMAIL</p>
              <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${usernameError ? "#d93025" : "#d9d9d9"}`, padding: "10px 0" }}>
                <input
                  type="text"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); if (usernameError) setUsernameError(""); }}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: username ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                />
              </div>
              {usernameError && <span style={{ color: "#d93025", fontSize: 13 }}>{usernameError}</span>}
            </div>

            {/* Password / PIN tab */}
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px" }}>
              {(["password", "pin"] as AuthMethod[]).map((method) => (
                <button key={method} type="button"
                  onClick={() => { setAuthMethod(method); setPasswordError(""); }}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 8, background: "none",
                    border: "none",
                    borderBottom: authMethod === method ? "3px solid #025fc9" : "none",
                    color: authMethod === method ? "#025fc9" : "#5e5757",
                    fontSize: 16, fontWeight: 500, cursor: "pointer",
                  }}>
                  {method === "password" ? "Password" : "PIN"}
                </button>
              ))}
            </div>

            {/* Password/PIN field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>
                {authMethod === "password" ? "PASSWORD" : "PIN"}
              </p>
              <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${passwordError ? "#d93025" : "#d9d9d9"}`, padding: "10px 0" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={authMethod === "password" ? "Enter your password" : "Enter your PIN"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: password ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
                  {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                </button>
              </div>
              {passwordError && <span style={{ color: "#d93025", fontSize: 13 }}>{passwordError}</span>}
            </div>

            {/* Forgot password / PIN */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="button"
                onClick={() => router.push(authMethod === "pin" ? "/get-started/reset-pin" : "/get-started/reset-password")}
                style={{ fontSize: 14, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {authMethod === "pin" ? "Forgot PIN?" : "Forgot password?"}
              </button>
            </div>
          </div>

          {/* OTP alternative */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#5e5757", margin: 0 }}>OR VERIFY WITH OTP INSTEAD</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

              {/* Phone/Email OTP tab */}
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #d9d9d9", borderRadius: 12, padding: "8px 16px" }}>
                {(["phone", "email"] as OtpMethod[]).map((method) => (
                  <button key={method} type="button"
                    onClick={() => { setOtpMethod(method); setOtpFieldError(""); }}
                    style={{
                      flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center",
                      padding: 8, background: "none", border: "none",
                      borderBottom: otpMethod === method ? "3px solid #025fc9" : "none",
                      color: otpMethod === method ? "#025fc9" : "#5e5757",
                      fontSize: 16, fontWeight: 500, cursor: "pointer",
                    }}>
                    {method === "phone" ? <Phone size={20} /> : <Mail size={20} />}
                    {method === "phone" ? "Phone" : "Email"}
                  </button>
                ))}
              </div>

              {/* Phone input */}
              {otpMethod === "phone" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>PHONE NUMBER</p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", gap: 20, borderBottom: `1px solid ${otpFieldError ? "#d93025" : "#d9d9d9"}` }}>
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                      <div style={{ position: "relative", width: 30, height: 20 }}>
                        <Image src="/images/flag.png" alt="BD" fill sizes="30px" className="object-cover rounded-sm" />
                      </div>
                      <span style={{ color: "#5e5757", fontSize: 16 }}>+880</span>
                      <ChevronDown size={16} color="#5e5757" />
                    </button>
                    <div style={{ width: 1, height: 20, backgroundColor: "#d9d9d9" }} />
                    <input
                      type="tel"
                      placeholder="Enter your number"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); if (otpFieldError) setOtpFieldError(""); }}
                      style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: phone ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                    />
                  </div>
                  {otpFieldError && <span style={{ color: "#d93025", fontSize: 13 }}>{otpFieldError}</span>}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>EMAIL ADDRESS</p>
                  <div style={{ height: 44, display: "flex", alignItems: "center", borderBottom: `1px solid ${otpFieldError ? "#d93025" : "#d9d9d9"}` }}>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={otpEmail}
                      onChange={(e) => { setOtpEmail(e.target.value); if (otpFieldError) setOtpFieldError(""); }}
                      style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: otpEmail ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                    />
                  </div>
                  {otpFieldError && <span style={{ color: "#d93025", fontSize: 13 }}>{otpFieldError}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Continue */}
        <button type="button" onClick={handleContinue}
          style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}>
          Continue
        </button>

        {/* Back */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" onClick={() => router.back()}
            style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer" }}>
            Back
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default function MergePage() {
  return (
    <Suspense fallback={null}>
      <MergeContent />
    </Suspense>
  );
}