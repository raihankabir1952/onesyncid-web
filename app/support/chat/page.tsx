"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Headphones, Paperclip, Image as ImageIcon, Mic, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const QUICK_CHIPS = ["Account locked", "Passkey issue", "OTP not arriving", "Find my ID"];

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      <div className="relative flex-1 w-full" style={{ minHeight: 900 }}>

        {/* LEFT */}
        <div className="absolute flex flex-col" style={{ left: "clamp(24px, 3.9vw, 56px)", top: 85, width: "clamp(300px, 37.3vw, 537px)", gap: 33 }}>
          <div style={{ position: "relative", width: 232, height: 40 }}>
            <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="232px" className="object-contain object-left" />
          </div>
          <div style={{ position: "relative", width: "100%", paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image src="/images/support.png" alt="" fill priority sizes="(max-width: 768px) 300px, 37vw" className="object-contain object-top" />
          </div>
          <p style={{ color: "#0052b4", fontSize: 27, fontWeight: 700, lineHeight: "34px", letterSpacing: "0.27px", whiteSpace: "nowrap" }}>
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD — full height chat layout */}
        <div className="absolute bg-white flex flex-col" style={{ right: "clamp(16px, 4.2vw, 60px)", top: 75, width: "clamp(320px, 41.7vw, 600px)", height: 776, borderRadius: 8, boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ borderBottom: "1px solid #d9d9d9", padding: "0 30px 20px", paddingTop: 30 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <button type="button" onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, marginTop: 2 }}>
                <ArrowLeft size={24} color="#025fc9" />
              </button>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0 }}>Smart Support</p>
                  <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>Usually answers in seconds</p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/get-started/support/agent")}
                  style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
                >
                  <Headphones size={20} color="#025fc9" />
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Agent Support</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, backgroundColor: "rgba(185,185,185,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            {/* Welcome message */}
            <div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center", padding: "60px 30px 20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageCircle size={24} color="#025fc9" />
                </div>
                <p style={{ fontSize: 14, color: "#a09898", textAlign: "center", margin: 0, lineHeight: "22.75px", letterSpacing: "0.14px" }}>
                  Tell me what&apos;s going wrong with your account.{"\n"}
                  I&apos;ll find the right answer or get you to someone who can help.
                </p>
              </div>

              {/* Quick chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setMessage(chip)}
                    style={{ backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 8, padding: "5px 10px", fontSize: 14, color: "#5e5757", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.14px" }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div style={{ borderTop: "1px solid #d9d9d9", padding: "20px 20px 30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 9999, padding: "8px 16px" }}>
                  <input
                    type="text"
                    placeholder="Describe your issue..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#5e5757", fontFamily: "inherit", background: "transparent" }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Paperclip size={20} color="#5e5757" style={{ cursor: "pointer" }} />
                    <ImageIcon size={20} color="#5e5757" style={{ cursor: "pointer" }} />
                  </div>
                </div>
                <button
                  type="button"
                  style={{ width: 40, height: 40, backgroundColor: "#025fc9", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <Mic size={20} color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, paddingBottom: 40, color: "#605353", fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>Privacy &amp; Terms</span>
        <span style={{ cursor: "pointer" }}>Contact us</span>
        <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", color: "#605353", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          <MapPin size={20} color="#605353" /><span>Change region</span><ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}
