"use client";

import React, { useEffect, useState } from "react";

interface ResendTimerProps {
  initialSeconds?: number;
  onResend: () => void;
}

export default function ResendTimer({ initialSeconds = 30, onResend }: ResendTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleResend = () => {
    setSeconds(initialSeconds);
    onResend();
  };

  const formatted = `0:${String(seconds).padStart(2, "0")}`;

  if (seconds > 0) {
    return (
      <p style={{ color: "#5e5757", fontSize: 14, margin: 0, textAlign: "center" }}>
        Resend code in{" "}
        <span style={{ color: "#0052b4", fontWeight: 500 }}>{formatted}</span>
      </p>
    );
  }

  return (
    <p style={{ color: "#5e5757", fontSize: 14, margin: 0, textAlign: "center" }}>
      <button
        type="button"
        onClick={handleResend}
        style={{ color: "#0052b4", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: 0 }}
      >
        Resend code
      </button>
    </p>
  );
}