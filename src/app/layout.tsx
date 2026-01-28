import { NoiseOverlay } from "@/components/ui/noise-overlay";
import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${sora.className} ${geistMono.variable} antialiased`}
      >
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
