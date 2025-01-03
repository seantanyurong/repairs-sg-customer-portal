"use client";

import "../../css/globals.css";
import Link from "next/link";

import {
  BriefcaseBusiness,
  Hammer,
  Home,
  NotepadText,
  PanelLeft,
  Quote,
  Settings,
  TicketPercent,
} from "lucide-react";
import { NAVIGATION_LABELS } from "../../constants";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import Loading from "./loading";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Closing of the side panel when a link is clicked
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLinkClick = (): void => {
    setIsOpen(false);
  };

  function Header() {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Side Toggle Menu */}
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="sm:hidden"
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="sm:max-w-xs bg-secondary border-0"
              >
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    onClick={handleLinkClick}
                  >
                    <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">{NAVIGATION_LABELS.HOME}</span>
                  </Link>
                  <Link
                    href="/customer/predictor"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/predictor"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <Hammer className="h-5 w-5" />
                    {NAVIGATION_LABELS.PREDICTOR}
                  </Link>
                  <Link
                    href="/customer/services"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/services"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <Hammer className="h-5 w-5" />
                    {NAVIGATION_LABELS.SERVICES}
                  </Link>
                  <Link
                    href="/customer/jobs"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/jobs"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <BriefcaseBusiness className="h-5 w-5" />
                    {NAVIGATION_LABELS.JOBS}
                  </Link>
                  <Link
                    href="/customer/invoices"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/invoices"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <NotepadText className="h-5 w-5" />
                    {NAVIGATION_LABELS.INVOICES}
                  </Link>
                  <Link
                    href="/customer/quote"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/quote"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <Quote className="h-5 w-5" />
                    {NAVIGATION_LABELS.QUOTATIONS}
                  </Link>
                  <Link
                    href="/customer/rewards"
                    className={`flex items-center gap-4 px-2.5 ${
                      pathname === "/customer/rewards"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <TicketPercent className="h-5 w-5" />
                    {NAVIGATION_LABELS.REWARDS}
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    onClick={handleLinkClick}
                  >
                    <Settings className="h-5 w-5" />
                    {NAVIGATION_LABELS.SETTINGS}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header />
    </Suspense>
  );
}
