"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { CountryItem } from "../types/country";
import { countries } from "../data/countries";
import { useRef, useState, useEffect } from "react";

type Props = {
  selectedCountry: CountryItem;
  setSelectedCountry: (c: CountryItem) => void;
};

export default function CountrySelect({
  selectedCountry,
  setSelectedCountry,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ flex: 1, position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
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
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              width: 20,
              height: 14,
            }}
          >
            <Image
              src={selectedCountry.flag}
              alt={selectedCountry.name}
              fill
              sizes="20px"
              className="object-cover"
              unoptimized={selectedCountry.flag.startsWith("http")}
            />
          </div>

          {selectedCountry.name}
        </span>

        <ChevronDown size={20} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            zIndex: 20,
          }}
        >
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setSelectedCountry(c);
                setOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                gap: 10,
                padding: 10,
                background: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 22,
                  height: 16,
                }}
              >
                <Image
                  src={c.flag}
                  alt={c.name}
                  fill
                  sizes="22px"
                  className="object-cover"
                  unoptimized={c.flag.startsWith("http")}
                />
              </div>

              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}