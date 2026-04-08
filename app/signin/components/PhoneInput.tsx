"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { CountryItem } from "../types/country";

type Props = {
  selectedCountry: CountryItem;
};

export default function PhoneInput({
  selectedCountry,
}: Props) {
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        gap: 30,
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 30,
            height: 20,
          }}
        >
          <Image
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            fill
            sizes="30px"
            className="object-cover"
            unoptimized={selectedCountry.flag.startsWith("http")}
          />
        </div>

        {selectedCountry.code}

        <ChevronDown size={20} />
      </button>

      <input
        type="tel"
        placeholder="Enter your number"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
}