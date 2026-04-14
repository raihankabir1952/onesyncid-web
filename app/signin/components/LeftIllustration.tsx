import Image from "next/image";

export default function LeftIllustration() {
  return (
    <div
      className="absolute flex flex-col"
      style={{
        left: "clamp(24px, 3.9vw, 56px)",
        top: 50,
        width: "clamp(300px, 37.3vw, 537px)",
        gap: 30,
      }}
    >
      {/* Logo */}
      <div style={{ position: "relative", width: 232, height: 40 }}>
        <Image
          src="/images/logo.png"
          alt="OneSyncID"
          fill
          priority
          sizes="232px"
          className="object-contain object-left"
        />
      </div>

      {/* Illustration Collage */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(514 / 500.44) * 100}%`,
        }}
      >
        <div className="absolute inset-0">
          {/* Union */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: `${(280.08 / 514) * 100}%`,
            }}
          >
            <Image
              src="/images/union.png"
              alt=""
              fill
              priority
              sizes="537px"
              className="object-cover"
            />
          </div>

          {/* Rectangle 3 */}
          <div
            style={{
              position: "absolute",
              left: "0%",
              top: `${(261 / 514) * 100}%`,
              width: `${(256 / 500.44) * 100}%`,
              height: `${(253 / 514) * 100}%`,
              border: "1px solid #025fc9",
              borderRadius: "0 0 12px 12px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/rect3.png"
              alt=""
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>

          {/* Rectangle 5 */}
          <div
            style={{
              position: "absolute",
              left: `${(248 / 500.44) * 100}%`,
              top: `${(224 / 514) * 100}%`,
              width: `${(252 / 500.44) * 100}%`,
              height: `${(195 / 514) * 100}%`,
              border: "1px solid #025fc9",
              borderRadius: "12px 0 12px 0",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/rect5.png"
              alt=""
              fill
              sizes="252px"
              className="object-cover"
              style={{
                objectPosition: "-11.05% -10.6%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          color: "#025fc9",
          fontSize: 27,
          fontWeight: 700,
          lineHeight: "34px",
          letterSpacing: "0.27px",
          whiteSpace: "nowrap",
        }}
      >
        Verify Once. Access Everything.
      </p>
    </div>
  );
}