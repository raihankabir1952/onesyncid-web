"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, Paperclip, Image as ImageIcon, Mic, Send, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

interface Message {
  id: number;
  role: "user" | "bot";
  text?: string;
  steps?: { title: string; desc: string }[];
  showAgent?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: "user", text: "My passkey isn't working" },
  {
    id: 2,
    role: "bot",
    text: "Passkey failures are usually device-specific. Here's what to check:",
    steps: [
      { title: "Confirm biometrics are set up", desc: "Go to your device Settings → Face ID / Fingerprint and ensure it's enrolled." },
      { title: "Remove and re-register the passkey", desc: "Sign in with OTP → Profile → Security → Passkeys → Remove, then re-add." },
      { title: "Update the OneSyncID app", desc: "An outdated app version can break passkey authentication." },
    ],
    showAgent: true,
  },
];

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: message.trim() }]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
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
      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.zip" onChange={() => {}} style={{ display: "none" }} />
      <input ref={imageInputRef} type="file" accept="image/*" onChange={() => {}} style={{ display: "none" }} />

      {/* Chat area */}
      <div style={{ flex: 1, backgroundColor: "rgba(185,185,185,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "0 -30px -30px -30px" }}>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "30px 20px 10px", display: "flex", flexDirection: "column", gap: 20 }}>
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ backgroundColor: "#025fc9", borderRadius: 12, padding: "8px 12px", maxWidth: "70%" }}>
                    <p style={{ fontSize: 16, color: "#fff", margin: 0, lineHeight: "22.75px" }}>{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, backgroundColor: "#025fc9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Bot size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
                      {msg.text && (
                        <p style={{ fontSize: 16, color: "#5e5757", margin: 0, lineHeight: "22.75px" }}>{msg.text}</p>
                      )}
                      {msg.steps && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {msg.steps.map((step) => (
                            <div key={step.title} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <p style={{ fontSize: 16, fontWeight: 500, color: "#333", margin: 0 }}>{step.title}</p>
                              <p style={{ fontSize: 14, color: "#5e5757", margin: 0 }}>{step.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.showAgent && (
                      <div style={{ backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ padding: 16, borderBottom: "1px solid #d9d9d9", display: "flex", flexDirection: "column", gap: 10 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <p style={{ fontSize: 14, color: "#5e5757", margin: 0, letterSpacing: "0.14px", lineHeight: "21px" }}>STILL NOT RESOLVED?</p>
                            <p style={{ fontSize: 16, fontWeight: 600, color: "#000", margin: 0, lineHeight: "21px" }}>Talk to a human agent</p>
                          </div>
                          <button type="button" onClick={() => router.push("/support/agent")}
                            style={{ width: "100%", height: 40, backgroundColor: "#025fc9", color: "#fff", fontSize: 16, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                            Connect to Agent
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid #d9d9d9", padding: "20px 20px 30px", flexShrink: 0 }}>
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