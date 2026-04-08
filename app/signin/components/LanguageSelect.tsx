"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type LanguageItem = {
  code: string;
  name: string;
};

const languages: LanguageItem[] = [
  { code: "EN", name: "English" },
  { code: "BD", name: "Bangla" },
];

export default function LanguageSelect() {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        position: "relative",
        zIndex: 40, // 🔥 IMPORTANT
      }}
    >
      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔥 IMPORTANT
          setOpen((prev) => !prev);
        }}
        type="button"
        style={{
          width: "100%",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #d9d9d9",
          background: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Globe size={20} color="#5e5757" />

          <span
            style={{
              color: "#5e5757",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {selected.code} {selected.name}
          </span>
        </span>

        <ChevronDown size={20} color="#5e5757" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: 10,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
            zIndex: 9999, // 🔥 IMPORTANT
            overflow: "hidden",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                background:
                  selected.code === lang.code
                    ? "#f5f9ff"
                    : "#fff",
                border: "none",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Globe size={18} />

              {lang.code} {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}