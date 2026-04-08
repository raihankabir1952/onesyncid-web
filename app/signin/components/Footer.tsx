"use client";

import { MapPin, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingBottom: 40,
        color: "#605353",
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>

      <span style={{ cursor: "pointer" }}>Contact us</span>

      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          background: "none",
          border: "none",
          color: "#605353",
          fontSize: 14,
          fontWeight: 400,
          cursor: "pointer",
          padding: 0,
        }}
      >
        <MapPin size={20} color="#605353" />
        <span>Change region</span>
        <ChevronDown size={24} color="#605353" />
      </button>
    </div>
  );
}