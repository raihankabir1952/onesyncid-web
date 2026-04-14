"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Paperclip, Image as ImageIcon, Mic, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const QUICK_CHIPS = ["Account locked", "Passkey issue", "OTP not arriving", "Find my ID"];

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    router.push("/support/chat/conversation");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("File selected:", file.name);
    e.target.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("Image selected:", file.name);
    e.target.value = "";
  };

  return (
    <PageLayout
      illustration="/images/support.png"
      leftFixed
      stickyHeader={
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <button type="button" onClick={() => router.back()}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, marginTop: 2 }}>
            <ArrowLeft size={24} color="#025fc9" />
          </button>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0 }}>Smart Support</p>
              <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>Usually answers in seconds</p>
            </div>
            <button type="button" onClick={() => router.push("/support/agent")}
              style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
              <div style={{ position: "relative", width: 20, height: 20, flexShrink: 0 }}>
                <Image src="/images/agent.png" alt="Agent Support" fill sizes="20px" className="object-contain" />
              </div>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#025fc9" }}>Agent Support</span>
            </button>
          </div>
        </div>
      }
    >
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.zip" onChange={handleFileChange} style={{ display: "none" }} />
      <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />

      {/* Chat area */}
      <div style={{ flex: 1, backgroundColor: "rgba(185,185,185,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "0 -30px -30px -30px", padding: "0" }}>

        {/* Welcome */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center", paddingTop: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", paddingLeft: 20, paddingRight: 20 }}>
            <div style={{ width: 40, height: 40, backgroundColor: "rgba(2,95,201,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MessageCircle size={24} color="#025fc9" />
            </div>
            <p style={{ fontSize: 14, color: "#a09898", textAlign: "center", margin: 0, lineHeight: "22.75px", letterSpacing: "0.14px" }}>
              Tell me what&apos;s going wrong with your account.{"\n"}
              I&apos;ll find the right answer or get you to someone who can help.
            </p>
          </div>

          {/* Quick chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", paddingLeft: 20, paddingRight: 20 }}>
            {QUICK_CHIPS.map((chip) => (
              <button key={chip} type="button" onClick={() => router.push("/support/chat/conversation")}
                style={{ backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 8, padding: "5px 10px", fontSize: 14, color: "#5e5757", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.14px", lineHeight: "22.75px" }}>
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid #d9d9d9", padding: "20px 20px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 44, display: "flex", alignItems: "center", backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 9999, padding: "8px 16px", gap: 8 }}>
              <input type="text" placeholder="Describe your issue..." value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", fontFamily: "inherit", background: "transparent" }} />
              {!message.trim() && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                    <Paperclip size={20} color="#5e5757" />
                  </button>
                  <button type="button" onClick={() => imageInputRef.current?.click()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                    <ImageIcon size={20} color="#5e5757" />
                  </button>
                </div>
              )}
            </div>
            <button type="button" onClick={handleSend}
              style={{ width: 40, height: 40, backgroundColor: "#025fc9", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {message.trim() ? <Send size={18} color="#fff" style={{ marginRight: -2 }} /> : <Mic size={20} color="#fff" />}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}