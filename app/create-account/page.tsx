"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-10 lg:px-16">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-[45%] max-w-[537px]">
          
          {/* Logo */}
          <div className="relative w-[180px] h-[32px] lg:w-[232px] lg:h-[40px]">
            <Image
              src="/images/logo.png"
              alt="OneSyncID"
              fill
              priority
              sizes="232px"
              className="object-contain object-left"
            />
          </div>

          {/* Illustration */}
          <div className="relative w-full" style={{ paddingBottom: `${(514 / 500.44) * 100}%` }}>
            <Image
              src="/images/create-account.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-contain object-top"
            />
          </div>

          {/* Tagline */}
          <p className="text-center lg:text-left text-[#0052b4] text-xl lg:text-[27px] font-bold leading-snug tracking-wide">
            Verify Once. Access Everything.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="w-full lg:w-[45%] max-w-[600px] bg-white rounded-lg p-6 lg:p-8"
          style={{ boxShadow: "0px 0px 5.5px 1.5px rgba(0,0,0,0.25)" }}
        >
          <div className="flex flex-col gap-8 min-h-0 lg:min-h-[659px] justify-between">
            <div className="flex flex-col gap-8">

              {/* Title */}
              <div className="flex flex-col gap-2">
                <p className="text-2xl lg:text-[30px] font-semibold text-black">
                  Create your OneSyncID
                </p>
                <p className="text-sm text-[#a09898]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/merge")}
                    className="text-[#025fc9] font-medium bg-transparent border-none cursor-pointer text-sm"
                  >
                    Merge now
                  </button>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm lg:text-base font-medium text-[#5e5757] tracking-wider">
                  ACCOUNT TYPE
                </p>

                {/* Tabs */}
                <div className="flex items-center border border-[#d9d9d9] rounded-xl px-4 py-2">
                  {/* Personal */}
                  <button
                    type="button"
                    onClick={() => router.push("/create-account/personal")}
                    className="flex-1 flex items-center justify-center py-2 text-[#5e5757] text-base font-medium tracking-wide bg-transparent border-none cursor-pointer"
                  >
                    Personal
                  </button>
                  {/* Organization — active */}
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center py-2 text-[#025fc9] text-base font-medium tracking-wide bg-transparent border-none cursor-default border-b-[3px] border-b-[#025fc9]"
                    style={{ borderBottom: "3px solid #025fc9" }}
                  >
                    Organization
                  </button>
                </div>

                {/* Organization message */}
                <button
                  type="button"
                  onClick={() => router.push("/create-account/personal")}
                  className="bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  <p className="text-base text-[#0052b4] text-justify">
                    Please create a personal account first to proceed.
                  </p>
                </button>
              </div>
            </div>

            {/* Merge accounts banner */}
            <div className="flex gap-2 items-start justify-center rounded-xl px-4 py-3"
              style={{
                backgroundColor: "rgba(2,95,201,0.05)",
                border: "1px solid rgba(2,95,201,0.2)",
              }}
            >
              <Info size={16} color="#025fc9" className="flex-shrink-0 mt-[2px]" />
              <p className="text-xs text-[#025fc9] tracking-wide leading-4 m-0">
                Already have an account with another email?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/merge")}
                  className="text-xs font-semibold text-[#025fc9] bg-transparent border-none cursor-pointer p-0"
                >
                  Merge accounts
                </button>
              </p>
            </div>
          </div>

          {/* Bottom logo */}
          <div className="flex justify-center mt-6">
            <div className="relative w-[98px] h-[17px]">
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
      </div>

      {/* FOOTER */}
      <div className="flex flex-wrap justify-center items-center gap-4 pb-8 text-[#605353] text-sm px-4">
        <span className="cursor-pointer">Privacy &amp; Terms</span>
        <span className="cursor-pointer">Contact us</span>
        <button className="flex items-center gap-1 bg-transparent border-none text-[#605353] text-sm cursor-pointer">
          <MapPin size={20} color="#605353" />
          <span>Change region</span>
          <ChevronDown size={24} color="#605353" />
        </button>
      </div>
    </div>
  );
}