import LeftIllustration from "./components/LeftIllustration";
import AuthCard from "./components/AuthCard";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Switzer', sans-serif" }}>

      {/* ===================== DESKTOP (lg+) ===================== */}
      <div className="hidden lg:block relative flex-1" style={{ minHeight: 920 }}>
        <LeftIllustration />
        <AuthCard />
      </div>

      {/* ===================== MOBILE (< lg) ===================== */}
      <div className="flex lg:hidden flex-col flex-1 px-6 py-8 gap-6">

        {/* Logo */}
        <div className="relative w-[180px] h-[32px]">
          <Image src="/images/logo.png" alt="OneSyncID" fill priority sizes="180px" className="object-contain object-left" />
        </div>

        {/* Illustration */}
        <div className="relative w-full" style={{ paddingBottom: `${(514 / 500.44) * 100}%` }}>
          <Image src="/images/union.png" alt="" fill priority sizes="90vw" className="object-contain object-top" />
        </div>

        {/* Tagline */}
        <p className="text-[#025fc9] text-xl font-bold leading-snug tracking-wide">
          Verify Once. Access Everything.
        </p>

        {/* Mobile Card */}
        <AuthCard isMobile />
      </div>

      <Footer />
    </div>
  );
}