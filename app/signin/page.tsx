import LeftIllustration from "./components/LeftIllustration";
import AuthCard from "./components/AuthCard";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div
        className="relative flex-1 w-full"
        style={{ minHeight: 900 }}
      >
        <LeftIllustration />
        <AuthCard />
      </div>

      <Footer />
    </div>
  );
}