"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

function PinDots({ value, onFocus }: { value: string; onFocus: () => void }) {
  return (
    <div
      onClick={onFocus}
      style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        cursor: "text",
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: i < value.length ? "#025fc9" : "transparent",
            border: `1.5px solid ${i < value.length ? "#025fc9" : "#d9d9d9"}`,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [logoutAll, setLogoutAll] = useState(false);
  const newPinRef = useRef<HTMLInputElement>(null);
  const confirmPinRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Switzer', sans-serif" }}
    >
      {/* ── MAIN ── */}
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div
          className="absolute flex flex-col"
          style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}
        >
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/resetpin.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="absolute bg-white flex flex-col justify-between"
          style={{
            right: "clamp(16px, 4.2vw, 60px)", top: 75,
            width: "clamp(320px, 41.7vw, 600px)", height: 776,
            borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", padding: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>Create a new PIN</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>

              <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
                Your new PIN must be different from your previous PINs.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* NEW PIN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>NEW PIN</p>
                  <div style={{ position: "relative" }}>
                    <PinDots value={newPin} onFocus={() => newPinRef.current?.focus()} />
                    <input
                      ref={newPinRef}
                      type="password"
                      inputMode="numeric"
                      maxLength={6}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                    />
                  </div>
                </div>

                {/* CONFIRM NEW PIN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0, letterSpacing: "0.16px" }}>CONFIRM NEW PIN</p>
                    <div style={{ position: "relative" }}>
                      <PinDots value={confirmPin} onFocus={() => confirmPinRef.current?.focus()} />
                      <input
                        ref={confirmPinRef}
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                      />
                    </div>
                  </div>

                  {/* Log out of all devices */}
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={logoutAll}
                      onChange={(e) => setLogoutAll(e.target.checked)}
                      style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 14, color: "#5e5757" }}>Log out of all devices</span>
                  </label>
                </div>
              </div>

              {/* Reset & Log In */}
              <button
                type="button"
                onClick={() => router.push("/get-started/password")}
                style={{ width: "100%", height: 44, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
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
