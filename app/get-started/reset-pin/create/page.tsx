"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

function PinDots({ value, inputRef, onChange }: {
  value: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (val: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => inputRef.current?.focus()} style={{
        display: "flex", gap: 16, justifyContent: "center",
        paddingTop: 10, paddingBottom: 10, cursor: "text",
        borderBottom: "1px solid #d9d9d9",
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            width: 16, height: 16, borderRadius: "50%",
            backgroundColor: i < value.length ? "#025fc9" : "transparent",
            border: `1.5px solid ${i < value.length ? "#025fc9" : "#d9d9d9"}`,
            flexShrink: 0,
          }} />
        ))}
      </div>
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          opacity: 0,
          cursor: "text",
          fontSize: 16,
        }}
      />
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [logoutAll, setLogoutAll] = useState(false);
  const newPinRef = useRef<HTMLInputElement | null>(null);
  const confirmPinRef = useRef<HTMLInputElement | null>(null);

  return (
    <PageLayout illustration="/images/resetpin.png">
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Create a new PIN
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
            Your new PIN must be different from your previous PINs.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* NEW PIN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                NEW PIN
              </p>
              <PinDots value={newPin} inputRef={newPinRef} onChange={setNewPin} />
            </div>

            {/* CONFIRM NEW PIN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>
                  CONFIRM NEW PIN
                </p>
                <PinDots value={confirmPin} inputRef={confirmPinRef} onChange={setConfirmPin} />
              </div>

              {/* Log out of all devices */}
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={logoutAll}
                  onChange={(e) => setLogoutAll(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#5e5757" }}>Log out of all devices</span>
              </label>
            </div>
          </div>

          {/* Reset & Log In */}
          <button type="button" onClick={() => router.push("/get-started")}
            style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
            Reset &amp; Log In
          </button>
        </div>
      </div>
    </PageLayout>
  );
}