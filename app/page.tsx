import HeroSection from "./_components/Hero";
import ReviewSection from "./_components/Review";
import PredictorBanner from "./(protected)/_components/home/PredictorBanner";
import ServicesPage from "./(protected)/customer/services/page";
import Logo from "./_components/Logo";

export default function Home() {
  return (
    <div className="container mx-auto py-2 px-4 lg:px-10 max-w-7xl">
      <HeroSection />
      <PredictorBanner />
      <div className="p-4">
        <ServicesPage />
      </div>
      <ReviewSection />
      <Logo />
    </div>
  );
}
