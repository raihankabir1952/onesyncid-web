"use client";

import React, { useRef, KeyboardEvent, ClipboardEvent } from "react";

type OtpStatus = "idle" | "success" | "error";

export interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  status: OtpStatus;
}

const STATUS_BORDER_COLOR: Record<OtpStatus, string> = {
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
    <div style={{ display: "flex", gap: 10, width: "100%", boxSizing: "border-box" }}>
      {value.map((digit, i) => {
        // "active" = the next empty slot the user is about to type into
        const isActive = status === "idle" && i === filledCount;
        const hasFill  = digit !== "";

        // Border color:
        //   non-idle status  → status color (green / red), all boxes
        //   idle + filled    → blue (already entered)
        //   idle + active    → blue (cursor position)
        //   idle + empty     → light gray
        const colored = status !== "idle" || hasFill || isActive;
        const borderColorValue = colored ? STATUS_BORDER_COLOR[status] : "#d9d9d9";

        // Border width:
        //   2px  for active / filled / any non-idle state
        //   1.5px for empty, unfocused idle boxes
        const borderWidth = colored ? "2px" : "1.5px";

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
              flex: "1 1 0",
              minWidth: 0,
              height: 80,           // fixed height — no aspectRatio
              borderRadius: 12,
              border: `${borderWidth} solid ${borderColorValue}`,
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