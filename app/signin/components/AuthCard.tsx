"use client";

import { Phone, Mail } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { countries } from "../data/countries";
import CountrySelect from "./CountrySelect";
import PhoneInput from "./PhoneInput";
import LanguageSelect from "./LanguageSelect";

type Tab = "phone" | "email";

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState<Tab>("phone");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

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
        paddingTop: 39,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <p
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#000",
            margin: 0,
          }}
        >
          Welcome. Let&apos;s verify it&apos;s you.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <LanguageSelect />

            <CountrySelect
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <div
              style={{
                display: "flex",
                border: "1px solid #d9d9d9",
                borderRadius: 12,
                padding: 8,
              }}
            >
              <button
                onClick={() => setActiveTab("phone")}
                type="button"
                style={{
                  flex: 1,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderBottom:
                    activeTab === "phone" ? "3px solid #025fc9" : "none",
                  color: activeTab === "phone" ? "#025fc9" : "#5e5757",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <Phone size={20} />
                Phone
              </button>

              <button
                onClick={() => setActiveTab("email")}
                type="button"
                style={{
                  flex: 1,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderBottom:
                    activeTab === "email" ? "3px solid #025fc9" : "none",
                  color: activeTab === "email" ? "#025fc9" : "#5e5757",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <Mail size={20} />
                Email
              </button>
            </div>

            {activeTab === "phone" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p
                  style={{
                    color: "#5e5757",
                    fontSize: 16,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  PHONE NUMBER
                </p>

                <PhoneInput selectedCountry={selectedCountry} />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p
                  style={{
                    color: "#5e5757",
                    fontSize: 16,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  EMAIL ADDRESS
                </p>

                <div
                  style={{
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #d9d9d9",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: 16,
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 20 }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  height: 48,
                  backgroundColor: "#025fc9",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  height: 48,
                  backgroundColor: "transparent",
                  color: "#025fc9",
                  borderRadius: 8,
                  border: "1.5px solid #025fc9",
                  cursor: "pointer",
                }}
              >
                Create OneSyncID
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "auto",
          paddingTop: 20,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 98,
            height: 17,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="OneSyncID"
            fill
            sizes="98px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}