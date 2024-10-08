"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Phone } from "lucide-react";
import PhoneTab from "./tabs/phone/PhoneTab";

export default function CustomerUserButton() {
  return (
    <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10" } }}>
      <UserButton.MenuItems>
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
      <UserButton.UserProfilePage label="account" />
      <UserButton.UserProfilePage
        label="Phone"
        url="phone"
        labelIcon={<Phone size={16} strokeWidth={2.25} />}
      >
        <PhoneTab />
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage label="security" />
    </UserButton>
  );
}
