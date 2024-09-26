import { Button } from "@/components/ui/button";
import { Share, SparklesIcon } from "lucide-react";

export default function ReferralBanner() {
  return (
    <div className="relative w-full mx-auto mt-8">
      {/* Banner container */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-300 to-yellow-200 shadow-lg">
        {/* Left section with text and icon */}
        <div className="flex items-center space-x-3">
          {/* Sparkles icon */}
          <div className="text-primary">
            <SparklesIcon className="h-8 w-8" />
          </div>
          {/* Text content */}
          <div>
            <p className="text-lg font-bold text-primary">Give $15, Get $15</p>
            <p className="text-sm text-primary">
              Every friend you refer gets $15 off their first booking and you
              get $15
            </p>
          </div>
        </div>

        {/* Share button */}
        <div>
          <Button className="bg-white text-blue-500 hover:bg-gray-100 border border-gray-300">
            <Share className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
