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

  const handleContinue = () => {
    router.push(`/merge/confirm?newEmail=${encodeURIComponent(newEmail)}&existingEmail=johndoe@gmail.com`);
  };

  return (
    <PageLayout illustration="/images/merge.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        {/* Title */}
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Merge accounts
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

          {/* Warning banner */}
          <div style={{ display: "flex", gap: 6, alignItems: "flex-start", backgroundColor: "rgba(255,244,229,0.7)", borderWidth: 1, borderStyle: "solid", borderColor: "#fde3e0", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
            <Shield size={15} color="#996500" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 12, color: "#996500", letterSpacing: "0.12px", lineHeight: "14px" }}>
              <p style={{ margin: 0 }}>We need to confirm you own the existing account before merging.</p>
              <p style={{ margin: 0 }}>This prevents unauthorized account takeovers.</p>
            </div>
          </div>

          {/* New account info */}
          <div style={{ backgroundColor: "rgba(2,95,201,0.05)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(2,95,201,0.2)", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#025fc9", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>NEW ACCOUNT BEING CREATED</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#000", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>{newEmail}</p>
          </div>

          {/* Sign into existing account */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#767676", margin: 0 }}>SIGN INTO YOUR EXISTING ACCOUNT</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Username/email field */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>USERNAME OR EMAIL</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#d9d9d9", paddingTop: 10, paddingBottom: 10 }}>
                  <input
                    type="text"
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: username ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                  />
                </div>
              </div>

              {/* Password / PIN tab */}
              <div style={{ display: "flex", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                <button type="button" onClick={() => setAuthMethod("password")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: authMethod === "password" ? 3 : 0, borderBottomStyle: "solid" as const, borderBottomColor: "#025fc9", color: authMethod === "password" ? "#025fc9" : "#5e5757", fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const }}>
                  Password
                </button>
                <button type="button" onClick={() => setAuthMethod("pin")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: authMethod === "pin" ? 3 : 0, borderBottomStyle: "solid" as const, borderBottomColor: "#025fc9", color: authMethod === "pin" ? "#025fc9" : "#5e5757", fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const }}>
                  PIN
                </button>
              </div>

              {/* Password field */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>{authMethod === "password" ? "PASSWORD" : "PIN"}</p>
                <div style={{ height: 44, display: "flex", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#d9d9d9", paddingTop: 10, paddingBottom: 10 }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={authMethod === "password" ? "Enter your password" : "Enter your PIN"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: password ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
                    {showPassword ? <EyeOff size={20} color="#a09898" /> : <Eye size={20} color="#a09898" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" style={{ fontSize: 14, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Forgot password?
                </button>
              </div>
            </div>

            {/* OTP alternative */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#5e5757", margin: 0 }}>OR VERIFY WITH OTP INSTEAD</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {/* Phone/Email OTP tab */}
                <div style={{ display: "flex", alignItems: "center", borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderRadius: 12, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                  <button type="button" onClick={() => setOtpMethod("phone")} style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center", padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: otpMethod === "phone" ? 3 : 0, borderBottomStyle: "solid" as const, borderBottomColor: "#025fc9", color: otpMethod === "phone" ? "#025fc9" : "#5e5757", fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const }}>
                    <Phone size={20} /> Phone
                  </button>
                  <button type="button" onClick={() => setOtpMethod("email")} style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", justifyContent: "center", padding: 8, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: otpMethod === "email" ? 3 : 0, borderBottomStyle: "solid" as const, borderBottomColor: "#025fc9", color: otpMethod === "email" ? "#025fc9" : "#5e5757", fontSize: 16, fontWeight: 500, background: "none", cursor: "pointer" as const }}>
                    <Mail size={20} /> Email
                  </button>
                </div>

                {/* Phone input */}
                {otpMethod === "phone" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>PHONE NUMBER</p>
                    <div style={{ height: 44, display: "flex", alignItems: "center", gap: 20, borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#d9d9d9" }}>
                      <button type="button" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                        <div style={{ position: "relative", width: 30, height: 20 }}>
                          <Image src="/images/flag.png" alt="BD" fill sizes="30px" className="object-cover rounded-sm" />
                        </div>
                        <span style={{ color: "#5e5757", fontSize: 16 }}>+880</span>
                        <ChevronDown size={16} color="#5e5757" />
                      </button>
                      <div style={{ width: 1, height: 20, backgroundColor: "#d9d9d9" }} />
                      <input type="tel" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: phone ? "#000" : "#a09898", fontFamily: "'Switzer', sans-serif" }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", margin: 0 }}>EMAIL ADDRESS</p>
                    <div style={{ height: 44, display: "flex", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#d9d9d9" }}>
                      <input type="email" placeholder="Enter your email address" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: "#a09898", fontFamily: "'Switzer', sans-serif" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue */}
          <button type="button" onClick={handleContinue} style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, borderRadius: 8, border: "none", cursor: "pointer" }}>
            Continue
          </button>

          {/* Back */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" onClick={() => router.back()} style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer" }}>
              Back
            </button>
          </div>
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