import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Archive | Jose Raphael V. Dichoso",
  description: "Complete archive of software, automation systems, and engineering projects by Jose Raphael V. Dichoso.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects Archive | Jose Raphael V. Dichoso",
    description: "Complete archive of software, automation systems, and engineering projects by Jose Raphael V. Dichoso.",
    url: "https://jrdichoso.vercel.app/projects",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 1000,
        alt: "Jose Raphael V. Dichoso",
      },
    ],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
