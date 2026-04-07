export interface Project {
    id: string;
    title: string;
    category: "Mobile App" | "Web App" | "AI/ML" | "Hardware" | "Data Viz";
    status: "Live" | "Beta" | "Concept" | "In Development" | "Work in Progress" | "Discontinued";
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
        id: "opsdeck",
        title: "OpsDeck",
        category: "Web App",
        status: "Work in Progress",
        description: "AI-powered operations dashboard that automates the extraction of data from invoices/receipts while triaging support emails/tickets. An n8n automation intakes data from a Telegram bot, and Google Drive folders. Analyzed data is streamlined into one visual dashboard. App was built for my purpose of learning n8n integration.",
        techStack: ["Next.js", "Tailwind", "Supabase", "Vercel AI SDK", "n8n"],
        links: {},
        assets: {
            thumbnail: "/projects/opsdeck/opsdeck-dashboard.png",
            gallery: [
                "/projects/opsdeck/opsdeck-dashboard.png",
                "/projects/opsdeck/opsdeck-transactions.png",
                "/projects/opsdeck/opsdeck-tickets.png",
                "/projects/opsdeck/opsdeck-activity.png",
                "/projects/opsdeck/opsdeck-n8n.png"
            ]
        }
    },
    {
        id: "naga-heatmap",
        title: "Naga City Incident Heat Map",
        category: "Data Viz",
        status: "Work in Progress",
        description: "Data-driven web app that visualizes real public safety incidents (traffic accidents, crimes, fires, drug operations) from local news on an interactive map, built with React + Kepler.gl. Currently in the process of manually geo-mapping exact coordinates (long/lat) of gathered incidents.",
        techStack: ["React", "Vite", "Kepler.gl", "Python"],
        links: {},
        assets: {
            thumbnail: "/projects/heatmap/heatmap-1.png",
            gallery: [
                "/projects/heatmap/heatmap-1.png"
            ]
        }
    },
    {
        id: "mubrew",
        title: "µBrew",
        category: "Mobile App",
        status: "Discontinued",
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
    },
    {
        id: "power-supply",
        title: "Power Supply",
        category: "Hardware",
        status: "Live",
        description: "A custom power supply built with an 18-0-18V 6A transformer. Features custom-designed modules: bridge rectifier, two fixed voltage regulators, and a variable regulator. Outputs include slow-charge USB-A, fast-charge USB-A, and fast-charge USB-C.",
        techStack: ["KiCAD", "Electronics"],
        links: {},
        assets: {
            thumbnail: "/projects/power-supply/psu-1.png",
            gallery: [
                "/projects/power-supply/psu-1.png",
                "/projects/power-supply/psu-2.jpg",
                "/projects/power-supply/psu-3.png"
            ]
        }
    }
];
