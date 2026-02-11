import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Sora } from "next/font/google"; // Removed Geist_Mono
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jose Raphael Dichoso | Portfolio",
  description: "Computer Engineering student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} ${sora.variable} antialiased`}
      >
        <NoiseOverlay />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
