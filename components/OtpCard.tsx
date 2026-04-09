"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/OtpInput";
import ResendTimer from "@/components/ResendTimer";

type OtpStatus = "idle" | "success" | "error";

interface OtpCardProps {
  destination: string;
}

const VERIFY_BTN_COLOR: Record<OtpStatus, string> = {
  idle: "#025fc9",
  success: "#025fc9",
  error: "#ff3838",
};

export default function OtpCard({ destination }: OtpCardProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<OtpStatus>("idle");

  const isComplete = otp.every((d) => d !== "");

  // ✅ Auto-verify when 6th digit filled
  useEffect(() => {
    if (!isComplete || status !== "idle") return;

    const verify = async () => {
      const code = otp.join("");
      // TODO: replace with real API call
      const isCorrect = code === "123456";
      setStatus(isCorrect ? "success" : "error");
    };

    verify();
  }, [isComplete, otp, status]);

  // ✅ Navigate to /create-account after success
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => {
      router.push("/create-account");
    }, 1000);
    return () => clearTimeout(timer);
  }, [status, router]);

  const handleTryAgain = () => {
    setOtp(Array(6).fill(""));
    setStatus("idle");
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setStatus("idle");
    // TODO: call resend API
  };

  return (
    <div
      className="absolute bg-white flex flex-col justify-between"
      style={{
        right: "clamp(16px, 4.2vw, 60px)",
        top: 75,
        width: "clamp(320px, 41.7vw, 600px)",
        minHeight: 776,
        borderRadius: 8,
        boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
        padding: 30,
        fontFamily: "'Switzer', sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {/* Title */}
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Almost there. Enter your code.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* OTP section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Subtitle */}
            <p style={{ fontSize: 16, color: "#333", margin: 0, lineHeight: 1.5 }}>
              A 6-digit verification code is on its way to{" "}
              <span style={{ color: "#0052b4" }}>{destination}</span>.
            </p>

            {/* Input label */}
            <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0, textAlign: "center" }}>
              Enter your verification code
            </p>

            {/* 6-digit input */}
            <OtpInput value={otp} onChange={setOtp} status={status} />

            {/* Status messages */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 44 }}>
              <div style={{ height: 18 }} />

              {status === "idle" && (
                <ResendTimer initialSeconds={24} onResend={handleResend} />
              )}

              {status === "success" && (
                <p style={{ color: "#11a75c", fontSize: 14, fontWeight: 500, margin: 0, textAlign: "center" }}>
                  Phone number verified!
                </p>
              )}

              {status === "error" && (
                <>
                  <p style={{ color: "#ff3838", fontSize: 14, fontWeight: 500, margin: 0, textAlign: "center" }}>
                    That code doesn&apos;t match. Try again.
                  </p>
                  <p style={{ margin: 0, textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={handleResend}
                      style={{ color: "#0052b4", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      Resend code
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Need help */}
          <div style={{ display: "flex", gap: 4, alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: "#333" }}>Need help?</span>
            <button type="button" style={{ fontSize: 14, fontWeight: 500, color: "#0052b4", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Contact Support
            </button>
          </div>

          {/* Primary action button */}
          {status !== "success" && (
            <button
              type="button"
              onClick={status === "error" ? handleTryAgain : undefined}
              disabled={status === "idle" && !isComplete}
              style={{
                width: "100%",
                height: 44,
                backgroundColor: VERIFY_BTN_COLOR[status],
                color: "#fff",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
                border: "none",
                cursor: status === "idle" && !isComplete ? "not-allowed" : "pointer",
                opacity: status === "idle" && !isComplete ? 0.6 : 1,
                transition: "opacity 0.2s ease, background-color 0.2s ease",
              }}
            >
              {status === "error" ? "Try Again" : "Verify"}
            </button>
          )}

          {/* Back */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={{ fontSize: 16, color: "#5e5757", background: "none", border: "none", cursor: "pointer" }}
            >
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
  );
}