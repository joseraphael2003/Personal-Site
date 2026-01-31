"use client";

import { Scaffold } from "@/components/layout/scaffold";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Network,
  Cpu,
  Laptop,
  Code,
  Users,
  ChevronRight,
  GraduationCap,
  Award,
  FolderGit2,
  Terminal,
  RadioReceiver,
  Sparkles,
  FileCode2,
  Sigma,
  Rocket,
  LayoutTemplate,
  Braces,
  Palette,
  Database,
  Smartphone,
  TerminalSquare,
  AudioWaveform,
  Music4,
  Clapperboard,
  Image,
  Zap
} from "lucide-react";
import { MemoryStream } from "@/components/content/memory-stream";
import { projects } from "@/lib/data/projects";
import { ProjectSpotlight } from "@/components/content/project-spotlight";

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
  // Note: 'projects' is imported from static file at line 35
  // Renaming DB projects to avoid shadowing
  const { experience, education, memories, projects: dbProjects, toolstack } = data;
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
      <div id="core-infrastructure" className="min-h-screen w-full glass-panel border-white/10 p-6 md:p-12 backdrop-blur-md md:backdrop-blur-xl bg-black/60 will-change-transform">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              System Status: Online
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Core Infrastructure
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-xs md:text-xl text-muted-text leading-relaxed pb-4">
                &gt; The underlying kernel of my technical background. Initializing user parameters and loading modules.
              </p>
            </div>

            {/* Scroll Progress Bar - Aligned to full width (module margins) */}
            <div className="relative w-full h-[4px] hidden md:block">
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
              <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">01.</span>
                <Network className="w-6 h-6 text-primary" />
                Networks
              </h3>
              <p className="text-[13px] md:text-lg text-muted-text leading-relaxed">
                Aspiring network engineer. Particular interest in data center operations: VITRO Academy Graduate - Certified Data Center Specialist. Proficiency in Cisco technologies and operating systems.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">02.</span>
                <Cpu className="w-6 h-6 text-primary" />
                Hardware
              </h3>
              <p className="text-[13px] md:text-lg text-muted-text leading-relaxed">
                Experienced in L1/L2 computer hardware troubleshooting: laptop internal cleaning, thermal paste change, system issues. Trained in analog and digital electronics throughout university courses.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">03.</span>
                <Code className="w-6 h-6 text-primary" />
                Software
              </h3>
              <p className="text-[13px] md:text-lg text-muted-text leading-relaxed">
                AI-assisted full stack developer. Developed a coffee-centric app: µBrew. Learned through Cisco Academy: C++, Python, Database Admin, and Linux OS. This portfolio website is a living deployment of my responsive design philosophy.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">04.</span>
                <Users className="w-6 h-6 text-primary" />
                Leadership
              </h3>
              <p className="text-[13px] md:text-lg text-muted-text leading-relaxed">
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
      <div id="experience" className="min-h-screen w-full glass-panel border-white/10 p-6 md:p-12 backdrop-blur-md md:backdrop-blur-xl bg-black/60 pt-24 relative z-20 will-change-transform">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Log Status: Archived
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Experience
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-[13px] md:text-xl text-muted-text leading-relaxed pb-4">
                &gt; Accessing chronological data records. Executed modules and key milestones.
              </p>
            </div>

            {/* Experience Scroll Progress Bar */}
            <div className="relative w-full h-[4px] hidden md:block">
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
            className="space-y-12 relative border-l-2 border-white/10 ml-3 pl-4 md:pl-12 py-4"
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
                  <h3 className="text-lg md:text-2xl font-bold text-white">
                    {job.role === "Trombone Section Leader" ? "Trombone Section Leader and Band Librarian" : job.role}
                  </h3>
                  <p className="text-muted-text text-[13px] md:text-lg">
                    {job.company === "Ateneo de Naga University" && job.role.includes("Band") ? "Ateneo de Naga Symphonic Band" : job.company}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {job.techStack?.map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-muted-text/80 leading-relaxed text-[13px] md:text-lg">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        {point}
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
      <div id="education" className="min-h-screen w-full glass-panel border-white/10 p-6 md:p-12 backdrop-blur-md md:backdrop-blur-xl bg-black/60 pt-24 relative z-30 will-change-transform">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Academic Records: Verified
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Education
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-[13px] md:text-xl text-muted-text leading-relaxed pb-4">
                &gt; Increasing Knowledge Base...
              </p>
            </div>

            {/* Education Scroll Progress Bar */}
            <div className="relative w-full h-[4px] hidden md:block">
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
            className="space-y-12 relative border-l-2 border-white/10 ml-3 pl-4 md:pl-12 py-4"
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
                  <h3 className="text-lg md:text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-muted-text text-[13px] md:text-lg">{edu.school}</p>
                  <ul className="space-y-3 pt-2">
                    {edu.achievements?.map((point: string, i: number) => {
                      const isVitro = point.includes("VITRO");
                      const isCisco = point.includes("CCNA");
                      return (
                        <li key={i} className={`flex items-start gap-3 leading-relaxed text-[13px] md:text-lg text-muted-text`}>
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isVitro || isCisco ? "bg-accent animate-pulse" : "bg-primary/50"}`} />
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
      <div id="projects" className="w-full glass-panel border-white/10 p-6 md:p-12 backdrop-blur-md md:backdrop-blur-xl bg-black/60 pt-24 pb-32 relative z-40 will-change-transform">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Development Status: Active
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-[13px] md:text-xl text-muted-text leading-relaxed pb-4">
                &gt; Accessing repository data...
              </p>
            </div>
          </header>

          {/* Project Spotlight - Full width, no vertical line */}
          <div className="mt-10 mb-8">
            <ProjectSpotlight projects={projects} />
          </div>
        </div>
      </div>

      {/* Glass Overlay "Toolstack" Section */}
      <div id="toolstack" className="min-h-screen w-full glass-panel border-white/10 p-4 md:p-12 backdrop-blur-md md:backdrop-blur-xl bg-black/60 pt-24 pb-32 relative z-50 will-change-transform">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-4 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              System Architecture: Stable
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Toolstack
            </h2>
            <div className="relative max-w-2xl">
              <p className="text-[13px] md:text-xl text-muted-text leading-relaxed pb-4">
                &gt; Analyzing kernel capabilities...
              </p>
            </div>
          </header>

          <div className="border-l-2 border-white/10 ml-3 pl-4 md:pl-12 py-8 space-y-12">

            {/* Group 1: ENGINEER */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-primary/60 uppercase tracking-widest">
                // ENGINEER &bull; SYSTEMS_&_AI
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Cisco iOS", icon: RadioReceiver, highlight: "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-200" },
                  { name: "Linux", icon: Terminal },
                  { name: "Gemini Pro", icon: Sparkles },
                  { name: "Python", icon: FileCode2 },
                  { name: "KiCAD", icon: Cpu },
                  { name: "Octave", icon: Sigma },
                  { name: "Antigravity", icon: Rocket, highlight: "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)] text-yellow-200" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className={`
                      relative overflow-hidden
                      inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full 
                      bg-surface/40 bg-noise border 
                      transition-all duration-300 hover:scale-105 hover:bg-surface/60
                      ${tool.highlight ? tool.highlight : "border-white/5 hover:border-white/20"}
                    `}
                  >
                    <tool.icon className={`w-4 h-4 md:w-5 md:h-5 ${tool.highlight ? "text-inherit" : "text-muted-text"}`} />
                    <span className={`text-sm md:text-base font-medium ${tool.highlight ? "text-inherit" : "text-white/80"}`}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2: SHIP */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-primary/60 uppercase tracking-widest">
                // SHIP &bull; FULL_STACK
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Next.js", icon: LayoutTemplate },
                  { name: "TypeScript", icon: Braces },
                  { name: "Tailwind CSS", icon: Palette },
                  { name: "Supabase", icon: Database },
                  { name: "Flutter (Dart)", icon: Smartphone, highlight: "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-cyan-200" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className={`
                      relative overflow-hidden
                      inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full 
                      bg-surface/40 bg-noise border 
                      transition-all duration-300 hover:scale-105 hover:bg-surface/60
                      ${tool.highlight ? tool.highlight : "border-white/5 hover:border-white/20"}
                    `}
                  >
                    <tool.icon className={`w-4 h-4 md:w-5 md:h-5 ${tool.highlight ? "text-inherit" : "text-muted-text"}`} />
                    <span className={`text-sm md:text-base font-medium ${tool.highlight ? "text-inherit" : "text-white/80"}`}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 3: STUDIO */}
            <div className="space-y-4">
              <h3 className="font-mono text-sm text-primary/60 uppercase tracking-widest">
                // STUDIO &bull; CREATIVE_SUITE
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "FL Studio", icon: AudioWaveform, highlight: "border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)] text-orange-200" },
                  { name: "Musescore", icon: Music4, highlight: "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)] text-indigo-200" },
                  { name: "DaVinci Resolve", icon: Clapperboard },
                  { name: "Affinity Studio", icon: Image },
                  { name: "Nano Banana Pro", icon: Zap },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className={`
                      relative overflow-hidden
                      inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full 
                      bg-surface/40 bg-noise border 
                      transition-all duration-300 hover:scale-105 hover:bg-surface/60
                      ${tool.highlight ? tool.highlight : "border-white/5 hover:border-white/20"}
                    `}
                  >
                    <tool.icon className={`w-4 h-4 md:w-5 md:h-5 ${tool.highlight ? "text-inherit" : "text-muted-text"}`} />
                    <span className={`text-sm md:text-base font-medium ${tool.highlight ? "text-inherit" : "text-white/80"}`}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div >

    </Scaffold >
  );
}
