"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OtpInput, { OtpInputProps } from "@/components/OtpInput";
import ResendTimer from "@/components/ResendTimer";

type OtpStatus = "idle" | "success" | "error";

interface OtpCardProps {
  destination: string;
}

export default function OtpCard({ destination }: OtpCardProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<OtpStatus>("idle");

  const isComplete = otp.every((d) => d !== "");

  useEffect(() => {
    if (!isComplete || status !== "idle") return;
    const verify = async () => {
      const code = otp.join("");
      setStatus(code === "123456" ? "success" : "error");
    };
    verify();
  }, [isComplete, otp, status]);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => router.push("/create-account"), 1000);
    return () => clearTimeout(timer);
  }, [status, router]);

  const handleTryAgain = () => {
    setOtp(Array(6).fill(""));
    setStatus("idle");
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setStatus("idle");
  };

  const otpProps: OtpInputProps = {
    value: otp,
    onChange: (val: string[]) => setOtp(val),
    status,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

      {/* ── OTP section ─────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Description */}
        <p style={{ fontSize: 16, color: "#333", margin: 0, lineHeight: 1.5 }}>
          A 6-digit verification code is on its way to{" "}
          <span style={{ color: "#0052b4" }}>{destination}</span>.
        </p>

        {/* Label */}
        <p style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#000",
          margin: 0,
          textAlign: "center",
        }}>
          Enter your verification code
        </p>

        {/* OTP boxes — OtpInput handles per-box focus/status borders */}
        <OtpInput {...otpProps} />

        {/* ── Status feedback ──────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 44 }}>

          {/* Idle: countdown timer */}
          {status === "idle" && (
            <ResendTimer initialSeconds={24} onResend={handleResend} />
          )}

          {/* Success: verified message */}
          {status === "success" && (
            <p style={{
              color: "#11a75c",
              fontSize: 14,
              fontWeight: 500,
              margin: 0,
              textAlign: "center",
            }}>
              Phone number verified!
            </p>
          )}

          {/* Error: mismatch message + resend link */}
          {status === "error" && (
            <>
              <p style={{
                color: "#ff3838",
                fontSize: 14,
                fontWeight: 500,
                margin: 0,
                textAlign: "center",
              }}>
                That code doesn&apos;t match. Try again.
              </p>
              <p style={{ margin: 0, textAlign: "center" }}>
                <button
                  type="button"
                  onClick={handleResend}
                  style={{
                    color: "#0052b4",
                    fontSize: 14,
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Resend code
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Need help ───────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: 14, color: "#333" }}>Need help?</span>
        <button
          type="button"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#0052b4",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Contact Support
        </button>
      </div>

      {/* ── Primary action button (hidden on success) ───────────── */}
      {status !== "success" && (
        <button
          type="button"
          onClick={status === "error" ? handleTryAgain : undefined}
          disabled={status === "idle" && !isComplete}
          style={{
            width: "100%",
            height: 44,
            backgroundColor: status === "error" ? "#ff3838" : "#025fc9",
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

      {/* ── Back (hidden on success) ─────────────────────────────── */}
      {status !== "success" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              fontSize: 16,
              color: "#5e5757",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}