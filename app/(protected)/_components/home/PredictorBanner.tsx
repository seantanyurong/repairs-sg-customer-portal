import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Cpu } from "lucide-react";
import { PREDICTOR_BANNER } from "@/app/constants";
import Link from "next/link";

const PredictorBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg">
            <Cpu className="text-yellow-600 h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              {PREDICTOR_BANNER.TITLE} <BarChart className="ml-2 h-5 w-5" />
            </h3>
            <p className="text-sm opacity-90">{PREDICTOR_BANNER.DESCRIPTION}</p>
          </div>
        </div>
        <Link href="/customer/predictor">
          <Button
            variant="secondary"
            className="whitespace-nowrap ml-4 text-primary-foreground"
          >
            {PREDICTOR_BANNER.BUTTON_TEXT}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PredictorBanner;
