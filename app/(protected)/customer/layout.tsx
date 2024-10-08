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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Home className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">{NAVIGATION_LABELS.HOME}</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customer/services"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/customer/services"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Hammer className="h-5 w-5" />
                  <span className="sr-only">{NAVIGATION_LABELS.SERVICES}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.SERVICES}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customer/jobs"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/customer/jobs"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <BriefcaseBusiness className="h-5 w-5" />
                  <span className="sr-only">{NAVIGATION_LABELS.JOBS}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.JOBS}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customer/invoices"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/customer/invoices"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <NotepadText className="h-5 w-5" />
                  <span className="sr-only">{NAVIGATION_LABELS.INVOICES}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.INVOICES}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customer/quote"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/customer/quote"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Quote className="h-5 w-5" />
                  <span className="sr-only">
                    {NAVIGATION_LABELS.QUOTATIONS}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.QUOTATIONS}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customer/rewards"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/customer/rewards"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <TicketPercent className="h-5 w-5" />
                  <span className="sr-only">{NAVIGATION_LABELS.REWARDS}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.REWARDS}
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/settings"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">{NAVIGATION_LABELS.SETTINGS}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {NAVIGATION_LABELS.SETTINGS}
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Side Toggle Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
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
