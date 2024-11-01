import ShareReferralTile from "./(home)/_components/ShareReferralTile";
import RewardBanner from "../_components/home/RewardBanner";
import JobsPage from "./services/page";
import JobTable from "./(home)/_components/JobTable";
import PromotionalVideo from "./(home)/_components/PromotionalVideo";

export default function CustomerHome() {
  return (
    <div>
      <PromotionalVideo />
      <div className="container mx-auto py-2 px-4 lg:px-10">
        <div className="p-4">
          <ShareReferralTile />
        </div>

        <div className="p-4">
          <JobsPage />
        </div>

        <div className="p-4">
          <RewardBanner />
        </div>

        <div className="p-4">
          <JobTable />
        </div>
      </div>
    </div>
  );
}
