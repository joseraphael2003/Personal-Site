export interface Project {
    id: string;
    title: string;
    category: "Mobile App" | "Web App" | "AI/ML";
    status: "Live" | "Beta" | "Concept";
    description: string;
    techStack: string[];
    links: {
        video?: string; // YouTube
        demo?: string;
        repo?: string;
    };
    assets: {
        thumbnail: string; // For video connection or cover
        gallery: string[]; // For carousel
    };
}

export const projects: Project[] = [
    {
        id: "mubrew",
        title: "µBrew",
        category: "Mobile App",
        status: "Beta",
        description: "A coffee-centric utility app designed for the modern barista. Features a precision brew timer, recipe notebook, and bean inventory tracker. Built with a focus on ease-of-use and aesthetic minimalism.",
        techStack: ["Flutter", "Dart", "Supabase", "Material 3"],
        links: {
            video: "https://youtu.be/LWc7ESAtwEQ", // Documentation Vlog #1
        },
        assets: {
            thumbnail: "/projects/mubrew/mubrew-1.jpg", // Using first screen as cover
            gallery: [
                "/projects/mubrew/mubrew-1.jpg",
                "/projects/mubrew/mubrew-2.jpg",
                "/projects/mubrew/mubrew-3.jpg",
                "/projects/mubrew/mubrew-4.jpg",
                "/projects/mubrew/mubrew-5.jpg",
            ]
        }
    },
    {
        id: "portfolio-v2",
        title: "Personal Site",
        category: "Web App",
        status: "Live",
        description: "This website itself is a project. It is not only a dynamic resume, but also a showcase of my technicality and dedication as someone not of web development background. Throughout the project, I became more and more proficient with interacting and leveraging AI tools such as Gemini Pro and Antigravity: from validation of my ideas to codebase development.",
        techStack: ["Next.js 15", "React 19", "Tailwind 4", "Framer Motion"],
        links: {},
        assets: {
            thumbnail: "",
            gallery: []
        }
    }
];
