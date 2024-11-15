import type { Metadata } from "next";
import { connectToMongoDB } from "@/lib/db";
import localFont from "next/font/local";
import "./css/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  connectToMongoDB();

  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
