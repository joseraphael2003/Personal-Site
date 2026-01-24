import { Scaffold } from "@/components/layout/scaffold";

// Mock Data
const EXPERIENCE = [
    {
        id: 1,
        role: "Senior Frontend Architect",
        company: "Tech Corp",
        period: "2023 - Present",
        description: "Leading the frontend architecture for high-scale applications. Migrated legacy systems to Next.js 14.",
    },
    {
        id: 2,
        role: "Product Engineer",
        company: "StartUp Inc",
        period: "2021 - 2023",
        description: "Built the founding team's MVP. Implemented real-time collaboration features using WebSockets.",
    },
    {
        id: 3,
        role: "UI/UX Designer",
        company: "Creative Studio",
        period: "2019 - 2021",
        description: "Designed award-winning interfaces for global brands. Specialized in interaction design and micro-interactions.",
    },
];

export default function ResumePage() {
    return (
        <Scaffold>
            <div className="max-w-3xl mx-auto space-y-12 pb-20">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Resume</h1>
                    <p className="text-muted-text text-lg">Professional Experience & Skills</p>
                </header>

                <div className="relative border-l border-accent/30 pl-8 ml-4 space-y-12">
                    {EXPERIENCE.map((job) => (
                        <div key={job.id} className="relative">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-primary bg-background" />

                            <div className="glass-card p-6 rounded-xl hover:border-primary/40 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                                    <span className="text-sm font-mono text-primary">{job.period}</span>
                                </div>
                                <div className="text-lg text-muted-text mb-4">{job.company}</div>
                                <p className="text-muted-text/80 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Scaffold>
    );
}
