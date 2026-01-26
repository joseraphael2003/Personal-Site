"use client";

import { Scaffold } from "@/components/layout/scaffold";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function Home() {
  const { scrollY } = useScroll();
  const [innerHeight, setInnerHeight] = useState(1000); // Default to avoid divide by zero
  const [isSettled, setIsSettled] = useState(false);

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

  // Track settling state
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Trigger when overlay covers most of the screen (90%)
      if (latest > innerHeight * 0.9 && !isSettled) {
        setIsSettled(true);
      }
      // Reset when user scrolls back up (80%) - Reverses animations
      else if (latest < innerHeight * 0.8 && isSettled) {
        setIsSettled(false);
      }
    });
  }, [scrollY, innerHeight, isSettled]);

  return (
    <Scaffold>
      {/* Glass Overlay "Core Infrastructure" Section */}
      <div className="min-h-screen w-full rounded-t-3xl glass-panel border-t border-white/10 p-12 backdrop-blur-xl bg-black/60">
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
                &gt; The underlying kernel of my character stack. Initializing user parameters and loading modules.
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
                  delay: 0.2
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
                Networks
              </h3>
              <p className="text-muted-text leading-relaxed">
                Aspiring network engineer. Particular interest in data center operations: VITRO Academy Graduate - Certified Data Center Specialist. Proficiency in Cisco technologies and operating systems.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">02.</span>
                Hardware
              </h3>
              <p className="text-muted-text leading-relaxed">
                Experienced in L1/L2 computer hardware troubleshooting: laptop internal cleaning, thermal paste change, system issues. Trained in analog electronics throughout university courses.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">03.</span>
                Software
              </h3>
              <p className="text-muted-text leading-relaxed">
                AI-assisted full stack developer. Developed a coffee-centric app: µBrew. Currently developing a consolidated management application for a university symphonic band. This portfolio website is a living deployment of my responsive design philosophy.
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-primary font-mono">04.</span>
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
    </Scaffold>
  );
}
