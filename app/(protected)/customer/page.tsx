import HeroSection from "../../_components/Hero";
import ReviewSection from "../../_components/Review";
import Footer from "../../_components/Footer";
import RewardBanner from "../_components/home/RewardBanner";
import PredictorBanner from "../_components/home/PredictorBanner";
import JobsPage from "./services/page";
import ShareReferralTile from "./(home)/_components/ShareReferralTile";
import JobTable from "./(home)/_components/JobTable";


export default function CustomerHome() {
  return (
    <div>
      <RewardBanner />
      <HeroSection />
      <PredictorBanner />

      <div className="container mx-auto py-2 px-4 lg:px-10">
        <div className="p-4">
          <JobsPage />
        </div>
      </div>

      <ShareReferralTile />

      <div className="container mx-auto py-2 px-4 lg:px-10">
        <div className="p-4">
          <JobTable />
        </div>
        
      </div>

      <ReviewSection />
      <Footer />
    </div>
  );
}
