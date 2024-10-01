"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import copy from "clipboard-copy";
import crypto from "crypto";

export default function ReferralCode() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }
  const referralCode = user?.unsafeMetadata.referralCode;

  const handleGenerate = async () => {
    const result = await user.update({
      unsafeMetadata: {
        ...user.unsafeMetadata,
        referralCode: generateReferralCode(user.id),
      },
    });
    console.log(result);
  };

  const generateReferralCode = (userId: string) => {
    const hash = crypto.createHash("sha256").update(userId).digest("hex");
    const referralCode = parseInt(hash, 16)
      .toString(36)
      .substring(0, 5)
      .toUpperCase();
    return `REF-${referralCode}`;
  };

  const handleCopy = async () => {
    const text =
      "Hey there! 👋🏻 \n\nI'm excited to invite you to try out Repair.sg's amazing cleaning and maintenance services! Whether it’s aircon servicing, home cleaning or installing electrical appliances, they’ve got you covered! ✨\n\nUse my special referral code: " +
      referralCode +
      " to unlock $15 off your first booking! It’s a little treat just for you! 🎁 Let’s make your space shine!";

    try {
      await copy(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const referralCodeDisplay = () => {
    return referralCode ? (
      <Button
        variant="outline"
        onClick={() => {
          handleCopy();
          toast("Referral code copied to clipboard");
        }}
        className="w-full h-auto"
      >
        <div className="flex flex-row lg:flex-col 2xl:flex-row items-center justify-between w-full">
          <p className="flex font-bold text-lg">{referralCode as string}</p>
          <p className="flex text-xs text-muted-foreground">Click to copy</p>
        </div>
      </Button>
    ) : (
      <Button
        variant="default"
        onClick={() => {
          handleGenerate();
          toast("Referral code successfully generated");
        }}
        className="w-full h-auto"
      >
        <p className="text-wrap">Generate Referral Code</p>
      </Button>
    );
  };

  return <>{referralCodeDisplay()}</>;
}
