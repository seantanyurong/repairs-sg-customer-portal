import type { Metadata } from 'next';
import { connectToMongoDB } from '@/lib/db';
import localFont from 'next/font/local';
import './css/globals.css';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang='en'>
      <TooltipProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </TooltipProvider>
    </html>
  );
}
