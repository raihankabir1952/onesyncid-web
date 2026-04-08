"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";

type AccountType = "personal" | "organization";

export default function CreateAccountCard() {
  const [accountType, setAccountType] = useState<AccountType>("organization");

  return (
    <div
      className="absolute bg-white flex flex-col justify-between"
      style={{
        right: "clamp(16px, 4.2vw, 60px)",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(320px, 41.7vw, 600px)",
        borderRadius: 8,
        boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
        padding: 30,
        fontFamily: "'Switzer', sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, minHeight: 659, justifyContent: "space-between" }}>

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          {/* Title + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
              Create your OneSyncID
            </p>
            <p style={{ fontSize: 14, color: "#a09898", margin: 0 }}>
              Already have an account?{" "}
              <button
                type="button"
                style={{ color: "#025fc9", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14 }}
              >
                Merge now
              </button>
            </p>
          </div>

          {/* Account type section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Label */}
            <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", margin: 0 }}>
              ACCOUNT TYPE
            </p>

            {/* Tab switcher — ✅ border split into separate properties */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#d9d9d9",
                borderRadius: 12,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              {/* Personal tab */}
              <button
                type="button"
                onClick={() => setAccountType("personal")}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  // ✅ No shorthand — use borderBottom only, rest explicit
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: accountType === "personal" ? 3 : 0,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#025fc9",
                  color: accountType === "personal" ? "#025fc9" : "#5e5757",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "0.16px",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Personal
              </button>

              {/* Organization tab */}
              <button
                type="button"
                onClick={() => setAccountType("organization")}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  // ✅ No shorthand — use borderBottom only, rest explicit
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: accountType === "organization" ? 3 : 0,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#025fc9",
                  color: accountType === "organization" ? "#025fc9" : "#5e5757",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "0.16px",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Organization
              </button>
            </div>

            {/* Tab content */}
            {accountType === "organization" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 16, color: "#333", letterSpacing: "0.16px", margin: 0, textAlign: "justify" }}>
                  Want to register your Brand, Business, Education, or NGO/Government?
                </p>
                <p style={{ fontSize: 16, color: "#0052b4", margin: 0, textAlign: "justify" }}>
                  Please create a personal account first to proceed.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>
                  Fill in your personal details to create your OneSyncID.
                </p>
                {/* TODO: personal account form fields */}
              </div>
            )}
          </div>
        </div>

        {/* Bottom — info banner */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "rgba(2,95,201,0.05)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(2,95,201,0.2)",
            borderRadius: 12,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Info size={16} color="#025fc9" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#025fc9", letterSpacing: "0.12px", margin: 0, lineHeight: "16px" }}>
            Already have an account with another email?{" "}
            <button
              type="button"
              style={{ fontSize: 12, fontWeight: 600, color: "#025fc9", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Merge accounts
            </button>
          </p>
        </div>
      </div>

      {/* Bottom logo */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <div style={{ position: "relative", width: 98, height: 17 }}>
          <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}