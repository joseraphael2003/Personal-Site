"use client";

import { Scaffold } from "@/components/layout/scaffold";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Network, Cpu, Code, Users, ChevronRight, Award, GraduationCap, FolderGit2, Terminal } from "lucide-react";
import { MemoryStream } from "@/components/content/memory-stream";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    } as const
  }
};

// Define types roughly based on schema return
type ProfileData = {
  experience: any[];
  education: any[]; // will contain achievements array
  memories: any[];
  projects: any[];
  toolstack: any[];
};

export function HomePage({ data }: { data: ProfileData }) {
  const { experience, education, memories, projects, toolstack } = data;
  const { scrollY } = useScroll();
  const [innerHeight, setInnerHeight] = useState(1000); // Default to avoid divide by zero
  const [isSettled, setIsSettled] = useState(false);
  const [isExperienceSettled, setIsExperienceSettled] = useState(false);
  const [isEducationSettled, setIsEducationSettled] = useState(false);

  useEffect(() => {
    // Initialize height
    setInnerHeight(window.innerHeight);

    const handleResize = () => setInnerHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map scroll to progress (0 to 100% as we scroll one viewport height)
  // Input: [0, innerHeight] -> Output: [0, 1]
  const rawProgress = useTransform(scrollY, [0, innerHeight * 0.9], [0, 1]);
  const progressWidth = useSpring(useTransform(rawProgress, (v) => `${v * 100}%`), {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Experience Scroll Progress
  const rawExperienceProgress = useTransform(scrollY, [innerHeight * 0.9, innerHeight * 1.8], [0, 1]);
  const experienceProgressWidth = useSpring(useTransform(rawExperienceProgress, (v) => `${v * 100}%`), {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Education Scroll Progress
  const rawEducationProgress = useTransform(scrollY, [innerHeight * 1.8, innerHeight * 2.7], [0, 1]);
  const educationProgressWidth = useSpring(useTransform(rawEducationProgress, (v) => `${v * 100}%`), {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Track settling state
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Core Infrastructure
      if (latest > innerHeight * 0.9 && !isSettled) {
        setIsSettled(true);
      }
      else if (latest < innerHeight * 0.8 && isSettled) {
        setIsSettled(false);
      }

      // Experience
      if (latest > innerHeight * 1.8 && !isExperienceSettled) {
        setIsExperienceSettled(true);
      }
      else if (latest < innerHeight * 1.7 && isExperienceSettled) {
        setIsExperienceSettled(false);
      }

      // Education
      if (latest > innerHeight * 2.7 && !isEducationSettled) {
        setIsEducationSettled(true);
      }
      else if (latest < innerHeight * 2.6 && isEducationSettled) {
        setIsEducationSettled(false);
      }
    });
  }, [scrollY, innerHeight, isSettled, isExperienceSettled, isEducationSettled]);

  return (
    <Scaffold>
      {/* Glass Overlay "Core Infrastructure" Section */}
      <div id="core-infrastructure" className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              System Status: Online
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Core Infrastructure
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xl text-muted-text leading-relaxed pb-4">
                &gt; The underlying kernel of my technical background. Initializing user parameters and loading modules.
              </p>
            </div>

            {/* Scroll Progress Bar - Aligned to full width (module margins) */}
            <div className="relative w-full h-[4px]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                style={{
                  width: progressWidth,
                }}
                animate={{
                  clipPath: isSettled ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)"
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: isSettled ? 0.2 : 0
                }}
              />
            </div>
          </header>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isSettled ? "visible" : "hidden"}
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">01.</span>
                <Network className="w-6 h-6 text-primary" />
                Networks
              </h3>
              <p className="text-muted-text leading-relaxed">
                Aspiring network engineer. Particular interest in data center operations: VITRO Academy Graduate - Certified Data Center Specialist. Proficiency in Cisco technologies and operating systems.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">02.</span>
                <Cpu className="w-6 h-6 text-primary" />
                Hardware
              </h3>
              <p className="text-muted-text leading-relaxed">
                Experienced in L1/L2 computer hardware troubleshooting: laptop internal cleaning, thermal paste change, system issues. Trained in analog electronics throughout university courses.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">03.</span>
                <Code className="w-6 h-6 text-primary" />
                Software
              </h3>
              <p className="text-muted-text leading-relaxed">
                AI-assisted full stack developer. Developed a coffee-centric app: µBrew. Learned through Cisco Academy: C++, Python, Database Admin, and Linux OS. This portfolio website is a living deployment of my responsive design philosophy.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">04.</span>
                <Users className="w-6 h-6 text-primary" />
                Leadership
              </h3>
              <p className="text-muted-text leading-relaxed">
                Former Vice-President, Marching Band Leader, Trombone Section Leader, and Band Librarian managing 40+ members. Orchestrated complex group dynamics, maintaining operational morale, and managing high-integrity digital repositories with &quot;note-by-note&quot; organization and precision.
              </p>
            </motion.div>
          </motion.div>

          <div className="pt-12 border-t border-white/5">
            <div className="font-mono text-sm text-muted-text/60">
              &gt; System Check Complete. <br />
              &gt; Ready for interaction.
            </div>
          </div>
        </div>
      </div>

      {/* Glass Overlay "Runtime Logs" (Experience) Section */}
      <div id="experience" className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60 -mt-12 pt-24 shadow-[0_-20px_40px_-15px_rgba(0,0,0,1)] relative z-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Log Status: Archived
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Experience
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xl text-muted-text leading-relaxed pb-4">
                &gt; Accessing chronological data records. Executed modules and key milestones.
              </p>
            </div>

            {/* Experience Scroll Progress Bar */}
            <div className="relative w-full h-[4px]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                style={{
                  width: experienceProgressWidth,
                }}
                animate={{
                  clipPath: isExperienceSettled ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)"
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: isExperienceSettled ? 0.2 : 0
                }}
              />
            </div>
          </header>

          <motion.div
            className="space-y-12 relative border-l-2 border-white/10 ml-3 pl-8 md:pl-12 py-4"
            variants={containerVariants}
            initial="hidden"
            animate={isExperienceSettled ? "visible" : "hidden"}
          >
            {experience.map((job, idx) => (
              <motion.div key={job.id} className="relative" variants={itemVariants}>
                <span className="absolute -left-[45px] md:-left-[61px] top-2 w-6 h-6 rounded-full bg-black border-2 border-primary flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-primary" : "bg-primary/50"}`} />
                </span>
                <div className="space-y-2">
                  <span className="font-mono text-sm text-primary">{job.dates}</span>
                  <h3 className="text-2xl font-bold text-white">{job.company}</h3>
                  <p className="text-muted-text text-lg">{job.role}</p>
                  <ul className="space-y-3 pt-2">
                    {job.techStack?.map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-muted-text/80 leading-relaxed">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Section Footer/Separator */}
          <div className="pt-12 pb-12">
            <div className="font-mono text-sm text-muted-text/60">
              &gt; Log Sequence Complete. <br />
              &gt; Loading Academic Modules...
            </div>
          </div>
        </div>
      </div>

      {/* Glass Overlay "Education" Section */}
      <div id="education" className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60 -mt-12 pt-24 shadow-[0_-20px_40px_-15px_rgba(0,0,0,1)] relative z-30">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Academic Records
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Education
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xl text-muted-text leading-relaxed pb-4">
                &gt; Increasing Knowledge Base...
              </p>
            </div>

            {/* Education Scroll Progress Bar */}
            <div className="relative w-full h-[4px]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                style={{
                  width: educationProgressWidth,
                }}
                animate={{
                  clipPath: isEducationSettled ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)"
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: isEducationSettled ? 0.2 : 0
                }}
              />
            </div>
          </header>

          <motion.div
            className="space-y-12 relative border-l-2 border-white/10 ml-3 pl-8 md:pl-12 py-4"
            variants={containerVariants}
            initial="hidden"
            animate={isEducationSettled ? "visible" : "hidden"}
          >
            {education.map((edu, idx) => (
              <motion.div key={edu.id} className="relative" variants={itemVariants}>
                <span className="absolute -left-[45px] md:-left-[61px] top-2 w-6 h-6 rounded-full bg-black border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div className="space-y-2">
                  <span className="font-mono text-sm text-primary">{edu.yearStart} - {edu.yearEnd}</span>
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-muted-text text-lg">{edu.school}</p>
                  <ul className="space-y-3 pt-2">
                    {edu.achievements?.map((point: string, i: number) => {
                      const isVitro = point.includes("VITRO");
                      const IconComp = i === 0 ? GraduationCap : Award;
                      return (
                        <li key={i} className="flex items-start gap-3 text-muted-text/80 leading-relaxed">
                          <IconComp className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span>
                            {point}
                            {isVitro && (
                              <a
                                href="https://www.linkedin.com/posts/vitrodc_vitro25-vitroacademy-activity-7379695082590883840-iwZE?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFHx_o0Bmeh6Vi1Gg2tr6xBMI1dBbQ7zXC0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 ml-2 inline-flex items-center gap-1 transition-colors hover:underline"
                              >
                                [See more]
                              </a>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Memory Stream */}
          <div className="mt-12 border-t border-white/5 pt-8">
            <h3 className="text-sm font-mono text-muted-text/60 mb-6 uppercase tracking-wider pl-4 border-l-2 border-primary/40">
              &gt; University Highlights
            </h3>
            <MemoryStream items={memories} />
          </div>
        </div>
      </div>
      {/* Glass Overlay "Projects" Section */}
      <div id="projects" className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60 -mt-12 pt-24 shadow-[0_-20px_40px_-15px_rgba(0,0,0,1)] relative z-40">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Development Status
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Projects
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xl text-muted-text leading-relaxed pb-4">
                &gt; Accessing repository data...
              </p>
            </div>
          </header>

          <div className="border-l-2 border-white/10 ml-3 pl-8 md:pl-12 py-12">
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <FolderGit2 className="w-16 h-16 text-muted-text/20 mb-4" />
              <p className="text-muted-text font-mono">
                    // UNDER DEVELOPMENT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Glass Overlay "Toolstack" Section */}
      <div id="toolstack" className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60 -mt-12 pt-24 shadow-[0_-20px_40px_-15px_rgba(0,0,0,1)] relative z-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              System Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Toolstack
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xl text-muted-text leading-relaxed pb-4">
                &gt; Analyzing kernel capabilities...
              </p>
            </div>
          </header>

          <div className="border-l-2 border-white/10 ml-3 pl-8 md:pl-12 py-12">
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <Terminal className="w-16 h-16 text-muted-text/20 mb-4" />
              <p className="text-muted-text font-mono">
                    // UNDER DEVELOPMENT
              </p>
            </div>
          </div>
        </div>
      </div>

    </Scaffold >
  );
}
