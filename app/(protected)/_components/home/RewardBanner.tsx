import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { REWARD_BANNER } from "@/app/constants";

const RewardBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg">
            <Gift className="text-blue-500 h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              {REWARD_BANNER.TITLE} <Sparkles className="ml-2 h-5 w-5" />
            </h3>
            <p className="text-sm opacity-90">{REWARD_BANNER.DESCRIPTION}</p>
          </div>
        </div>
        <Button variant="secondary" className="whitespace-nowrap ml-4">
          {REWARD_BANNER.BUTTON_TEXT}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RewardBanner;
