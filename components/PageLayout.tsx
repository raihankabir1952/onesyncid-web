import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";

interface PageLayoutProps {
  illustration: string;
  children: React.ReactNode;
  cardVerticalCenter?: boolean;
  stickyHeader?: React.ReactNode; // ← sticky title area
}

export default function PageLayout({
  illustration,
  children,
  cardVerticalCenter = false,
  stickyHeader,
}: PageLayoutProps) {
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
            <Image src="/images/logo.png" alt="OneSyncID" fill priority loading="eager" sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src={illustration} alt="" fill priority loading="eager" sizes="(max-width: 768px) 300px, (max-width: 1200px) 37vw, 537px" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="absolute bg-white flex flex-col"
          style={{
            right: "clamp(16px, 4.2vw, 60px)",
            top: cardVerticalCenter ? "50%" : 75,
            transform: cardVerticalCenter ? "translateY(-50%)" : "none",
            width: "clamp(320px, 41.7vw, 600px)",
            minHeight: 776,
            maxHeight: "calc(100vh - 120px)",
            borderRadius: 8,
            boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)",
            overflow: "hidden", // clip inner scroll
          }}
        >
          {/* STICKY HEADER — stays fixed while scrolling */}
          {stickyHeader && (
            <div style={{
              flexShrink: 0,
              padding: "30px 30px 20px",
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}>
              {stickyHeader}
            </div>
          )}

          {/* SCROLLABLE BODY */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: stickyHeader ? "20px 30px 30px" : 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            {children}

            {/* Bottom logo */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
              <div style={{ position: "relative", width: 98, height: 17 }}>
                <Image src="/images/logo.png" alt="OneSyncID" fill sizes="98px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, paddingTop: 20, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer" }}>
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}