import type { Metadata } from "next";
import { DotGothic16, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jose Raphael V. Dichoso | Portfolio",
  description: "Freelance Full-Stack Developer and Computer Engineering student at Ateneo de Naga University. Building autonomous automation pipelines and web systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dotGothic.variable} ${spaceMono.variable}`}>
      <body className="font-mono bg-[#090a0c] text-neutral-200 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
