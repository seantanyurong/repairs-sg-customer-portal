'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart, Cpu, Clock } from "lucide-react";
import PredictorForm from "./_components/PredictorForm";

const PREDICTOR_BANNER = {
  TITLE: "Estimate Your Repair Job",
  DESCRIPTION: "Thinking of requesting a Repair Job but unsure of how long your repair will take or how much it will cost?",
  BUTTON_TEXT: "Start Predicting Now"
};

const PredictorPage: React.FC = () => {
  const [predictedDuration, setPredictedDuration] = useState<string | null>(null);
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);

  const handlePricePredict = (price: string) => {
    setPredictedPrice(price);
  };

  const handleDurationPredict = (duration: string) => {
    setPredictedDuration(duration);
  };

  // After predictions are updated, scroll to the results
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  React.useEffect(() => {
    if (predictedPrice && predictedDuration) {
      scrollToResults();
    }
  }, [predictedPrice, predictedDuration]);

  return (
    <div className="space-y-8 max-w-screen-lg mx-auto">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-yellow-400 to-yellow-200 text-black py-8 text-center">
        <h1 className="text-4xl font-bold">{PREDICTOR_BANNER.TITLE}</h1>
        <p className="mt-4 text-xl">{PREDICTOR_BANNER.DESCRIPTION}</p>
        <Link href="#predictor-form">
          <Button className="mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-500 text-black rounded-lg">
            {PREDICTOR_BANNER.BUTTON_TEXT}
          </Button>
        </Link>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-4">
        <h2 className="text-3xl font-semibold text-center">How It Works</h2>
        <div className="flex flex-col lg:flex-row justify-around mt-10 space-y-4 lg:space-y-0 lg:space-x-10">
          <div className="step flex-1 flex flex-col items-center justify-center text-center">
            <div className="icon bg-white p-4 rounded-full mx-auto flex items-center justify-center">
              <BarChart className="text-primary h-12 w-12" />
            </div>
            <h3 className="mt-2 font-semibold">Step 1: Choose Repair Category</h3>
            <p>Pick the type of Repair Job to get started.</p>
          </div>
          <div className="step flex-1 flex flex-col items-center justify-center text-center">
            <div className="icon bg-white p-4 rounded-full mx-auto flex items-center justify-center">
              <Cpu className="text-primary h-12 w-12" />
            </div>
            <h3 className="mt-2 font-semibold">Step 2: Provide Details</h3>
            <p>Input the relevant details for an accurate estimate.</p>
          </div>
          <div className="step flex-1 flex flex-col items-center justify-center text-center">
            <div className="icon bg-white p-4 rounded-full mx-auto flex items-center justify-center">
              <Clock className="text-primary h-12 w-12" />
            </div>
            <h3 className="mt-2 font-semibold">Step 3: Receive Your Estimate</h3>
            <p>Get an accurate estimate of duration and cost instantly!</p>
          </div>
        </div>
      </section>

      {/* Predictor Form */}
      <section id="predictor-form" className="predictor-form py-4">
        <h2 className="text-3xl font-semibold text-center">Get Your Estimate</h2>
        <PredictorForm
          onPricePredict={handlePricePredict}
          onDurationPredict={handleDurationPredict}
        />
      </section>

      {/* Result Section */}
      {predictedPrice && predictedDuration && (
        <section ref={resultsRef} className="results py-4 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center">Your Estimate</h2>
          <div className="result-info mt-8 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold">Estimated Duration: {predictedDuration} Minutes</h3>
            <h3 className="text-2xl font-bold mt-4">Estimated Cost: ${predictedPrice}</h3>
            <p className="text-lg mt-4 text-black">
              Based on the information you provided, here is your estimated repair time and cost.
            </p>
            <p className="text-lg mt-4 text-black">
              This is an approximation based on our historical data of similar jobs.
            </p>
            <Link href="/customer/services">
              <Button className="mt-8 px-6 py-3 bg-primary hover:bg-yellow-500 text-black rounded-lg">
                Schedule Your Repair Now
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default PredictorPage;
