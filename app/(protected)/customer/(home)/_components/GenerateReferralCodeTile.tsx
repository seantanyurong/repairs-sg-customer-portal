import { XIcon } from "lucide-react";
import { GENERATE_REFERRAL } from "../constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface GenerateReferralCodeTileProps {
  onClose: () => void;
}

const GenerateReferralCodeTile: React.FC<GenerateReferralCodeTileProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg text-center relative">
        {/* Title & Close Button */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-lg font-semibold">{GENERATE_REFERRAL.TITLE}</div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-around items-center mb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-gray-700">
              {GENERATE_REFERRAL.SUBTITLE}
            </span>
          </div>
        </div>

        <Link href="/customer/rewards">
          <Button>{GENERATE_REFERRAL.BUTTON_TEXT}</Button>
        </Link>
      </div>
    </div>
  );
};

export default GenerateReferralCodeTile;
