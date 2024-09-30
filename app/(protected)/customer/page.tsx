import ShareReferralTile from "./(home)/_components/ShareReferralTile";
import RewardBanner from "../_components/home/RewardBanner";

export default function CustomerHome() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ShareReferralTile />
        <RewardBanner />
      </div>
}
