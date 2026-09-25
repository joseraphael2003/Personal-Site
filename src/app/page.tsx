import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { GitHubActivity } from "@/components/sections/github-activity";
import { OtherInvolvement } from "@/components/sections/other-involvement";
import { Footer } from "@/components/layout/footer";
import { getGithubContributions } from "@/db/queries";
export default async function Home() {
  const initialContributions = await getGithubContributions();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-page text-body selection:bg-accent/20 selection:text-accent-soft">
      <Header />
      <main className="flex-1">
        <Hero />
        <Work />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <GitHubActivity initialData={initialContributions} />
        <OtherInvolvement />
      </main>
      <Footer />
    </div>
  );
}
