import type { Metadata } from "next";
import { DotGothic16, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { EmailModalProvider } from "@/components/providers/email-modal-provider";

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
  metadataBase: new URL("https://jrdichoso.vercel.app"),
  title: "Jose Raphael V. Dichoso | Portfolio",
  description:
    "Freelance Full-Stack Developer and Computer Engineering student at Ateneo de Naga University. Building autonomous automation pipelines and web systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jose Raphael V. Dichoso | Portfolio",
    description:
      "Freelance Full-Stack Developer and Computer Engineering student. Building autonomous automation pipelines and web systems.",
    url: "https://jrdichoso.vercel.app",
    siteName: "Jose Raphael V. Dichoso",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 1000,
        alt: "Jose Raphael V. Dichoso",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Raphael V. Dichoso | Portfolio",
    description:
      "Freelance Full-Stack Developer and Computer Engineering student.",
    images: ["/profile.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jose Raphael V. Dichoso",
  url: "https://jrdichoso.vercel.app",
  jobTitle: "Software & Systems Engineer",
  sameAs: [
    "https://github.com/joseraphael2003",
    "https://www.linkedin.com/in/jdichoso2003/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dotGothic.variable} ${spaceMono.variable}`}>
      <body className="font-mono bg-[#090a0c] text-neutral-200 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EmailModalProvider>
          {children}
        </EmailModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
