import React from "react";
import PhoneSection from "./sections/PhoneSection";
import Divider from "@/components/ui/divider";

export default function PhoneTab() {
  return (
    <div>
      <h1 className="text-[1.0625rem] font-semibold pb-[-6px]">Phone</h1>
      <Divider />
      <PhoneSection />
    </div>
  );
}
