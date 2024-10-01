"use client";

import { Button } from "@/components/ui/button";
import { Share, SparklesIcon } from "lucide-react";
import { SHARE_REFERRAL } from "../constants";
import { useState } from "react";
import ShareModal from "@/app/(protected)/_components/share/ShareModal";
import { useUser } from "@clerk/nextjs";
import GenerateReferralCodeTile from "./GenerateReferralCodeTile";

export default function ShareReferralTile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user } = useUser();
  const referralCode = user?.unsafeMetadata.referralCode as string;

  console.log("hi");
  console.log(referralCode);

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
            <p className="text-lg font-bold text-primary">
              {SHARE_REFERRAL.TITLE}
            </p>
            <p className="text-sm text-primary">{SHARE_REFERRAL.SUBTITLE}</p>
          </div>
        </div>

        {/* Share button */}
        <div>
          <Button
            onClick={openModal}
            className="bg-white text-blue-500 hover:bg-gray-100 border border-gray-300"
          >
            <Share className="h-5 w-5 mr-2" />
            {SHARE_REFERRAL.SHARE}
          </Button>

          {isModalOpen &&
            (referralCode ? (
              <ShareModal onClose={closeModal} />
            ) : (
              <GenerateReferralCodeTile
                referralCode={referralCode}
                onClose={closeModal}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
