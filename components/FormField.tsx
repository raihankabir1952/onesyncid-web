import React from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <p style={{ fontSize: 16, fontWeight: 500, color: "#5e5757", letterSpacing: "0.16px", lineHeight: "21px", margin: 0 }}>
        {label}
      </p>
      {children}
      {error && (
        <span style={{ color: "#d93025", fontSize: 13, marginTop: -4 }}>{error}</span>
      )}
    </div>
  );
}