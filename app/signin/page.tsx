import LeftIllustration from "./components/LeftIllustration";
import AuthCard from "./components/AuthCard";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "'Switzer', sans-serif" }}
    >
      {/* ===================== DESKTOP (lg+) ===================== */}
      <div
        className="hidden lg:block relative flex-1"
        style={{ minHeight: 920 }}
      >
        <LeftIllustration />
        <AuthCard />
      </div>

      {/* ===================== MOBILE (< lg) ===================== */}
      <div className="flex lg:hidden flex-col flex-1 px-6 py-8 gap-6">
        {/* Logo */}
        <div className="relative w-[180px] h-[32px]">
          <Image
            src="/images/logo.png"
            alt="OneSyncID"
            fill
            priority
            sizes="180px"
            className="object-contain object-left"
          />
        </div>

        {/* Mobile Illustration Collage */}
        <div className="relative w-full max-w-[360px] mx-auto aspect-[500.44/514]">
          {/* Union */}
          <div className="absolute left-0 top-0 w-full h-[54.5%]">
            <Image
              src="/images/union.png"
              alt=""
              fill
              priority
              sizes="90vw"
              className="object-cover"
            />
          </div>

          {/* Rectangle 3 */}
          <div className="absolute left-0 top-[50.8%] w-[51.2%] h-[49.2%] overflow-hidden border border-[#025fc9] rounded-b-[12px]">
            <Image
              src="/images/rect3.png"
              alt=""
              fill
              sizes="45vw"
              className="object-cover"
            />
          </div>

          {/* Rectangle 5 */}
          <div className="absolute left-[49.6%] top-[43.6%] w-[50.4%] h-[37.9%] overflow-hidden border border-[#025fc9] rounded-tr-[12px] rounded-bl-[12px]">
            <Image
              src="/images/rect5.png"
              alt=""
              fill
              sizes="45vw"
              className="object-cover"
              style={{ objectPosition: "-11.05% -10.6%" }}
            />
          </div>
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