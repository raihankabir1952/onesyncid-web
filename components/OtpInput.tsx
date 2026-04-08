"use client";

import React, { useRef, KeyboardEvent, ClipboardEvent } from "react";

type OtpStatus = "idle" | "success" | "error";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  status: OtpStatus;
}

const borderColor: Record<OtpStatus, string> = {
  idle: "#025fc9",
  success: "#11a75c",
  error: "#ff3838",
};

export default function OtpInput({ value, onChange, status }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...value];
    pasted.split("").forEach((d, i) => { next[i] = d; });
    onChange(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const filledCount = value.filter((d) => d !== "").length;

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        width: "100%",
        /* ✅ prevent overflow */
        boxSizing: "border-box",
      }}
    >
      {value.map((digit, i) => {
        const isActive = status === "idle" && i === filledCount;
        const hasFill = digit !== "";
        const color =
          status !== "idle"
            ? borderColor[status]
            : hasFill || isActive
            ? borderColor.idle
            : "#d9d9d9";

        return (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            style={{
              /* ✅ flex:1 with minWidth:0 prevents overflow */
              flex: "1 1 0",
              minWidth: 0,
              /* Figma: h=80, but use aspect-ratio so it scales with width */
              aspectRatio: "1 / 1",
              maxHeight: 80,
              borderRadius: 12,
              border: `2px solid ${color}`,
              backgroundColor: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: 600,
              color: "#000",
              outline: "none",
              cursor: "text",
              fontFamily: "'Switzer', sans-serif",
              transition: "border-color 0.15s ease",
              padding: 0,
              boxSizing: "border-box",
            }}
          />
        );
      })}
    </div>
  );
}