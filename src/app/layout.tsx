import type { Metadata } from "next";
import { DotGothic16, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { EmailModalProvider } from "@/components/providers/email-modal-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { PageTransitionProvider } from "@/components/ui/page-transition";

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
  jobTitle: profile.role,
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dotGothic.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          // Restores the stored theme and accent before first paint so the
          // palette never flashes the default. Kept in sync with
          // ui/theme-toggle.tsx and ui/accent-cycle.tsx.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light")}var a=localStorage.getItem("portfolio-accent");if(a&&/^(emerald|cyan|violet|amber|rose)$/.test(a)){document.documentElement.setAttribute("data-accent",a)}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-text bg-page text-body antialiased selection:bg-accent/20 selection:text-accent-soft min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <EmailModalProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </EmailModalProvider>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
