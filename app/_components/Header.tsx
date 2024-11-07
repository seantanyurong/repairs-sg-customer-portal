"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CustomerUserButton from "../(protected)/_components/account/CustomerUserButton";

const NAVIGATION_LABELS = {
  PREDICTOR: "Predictor",
  SERVICES: "Services",
  JOBS: "Jobs",
  INVOICES: "Invoices",
  QUOTATIONS: "Quotations",
  REWARDS: "Rewards",
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      {/* Top Nav Bar */}
      <NavigationMenu className="bg-primary w-full h-16 flex items-center justify-between px-8">
        <Link href="/customer">
          <Image
            src="/images/logo.jpg"
            alt="Repair.sg Logo"
            width={90}
            height={90}
          />
        </Link>

        <NavigationMenuList>
          <SignedIn>
            {Object.entries(NAVIGATION_LABELS).map(([key, label]) => (
              <NavigationMenuItem key={key}>
                <Link
                  href={`/customer/${key.toLowerCase()}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${
                      pathname === `/customer/${key.toLowerCase()}`
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary"
                    }`}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </SignedIn>
          {/* Sign In/Out Button */}
          <div className="flex justify-between p-4">
            <SignedIn>
              <CustomerUserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
