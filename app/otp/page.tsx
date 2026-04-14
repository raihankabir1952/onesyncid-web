import React from "react";
import OtpCard from "@/components/OtpCard";
import PageLayout from "@/components/PageLayout";

const MOCK_DESTINATION = "+8801723456789";

export default function OtpPage() {
  return (
    <PageLayout
      illustration="/images/otp.png"
      stickyHeader={
        <p style={{ fontSize: 30, fontWeight: 600, color: "#000", margin: 0 }}>
          Almost there. Enter your code.
        </p>
      }
    >
      <OtpCard destination={MOCK_DESTINATION} />
    </PageLayout>
  );
}