import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool, { schema });

async function main() {
    console.log("Seeding database...");

    // 1. Clean existing data
    console.log("Cleaning tables...");
    await db.delete(schema.experience);
    await db.delete(schema.education);
    await db.delete(schema.projects);
    await db.delete(schema.toolstack);
    await db.delete(schema.memories);

    // 2. Insert Experience
    console.log("Inserting Experience...");
    await db.insert(schema.experience).values([
        {
            company: "Freelance Part-Time",
            role: "AI Operations Virtual Assistant",
            dates: "Jan. 2026 - May 2026",
            description: "",
            techStack: [
                "Followed strict SOPs to generate high-quality scripts that were funneled into generative AI workflows.",
                "AI generated contents were integrated together through video editing and other AI tools."
            ]
        },
        {
            company: "Freelance (Occasional)",
            role: "Laptop Technician",
            dates: "2023 - Present",
            description: "",
            // Storing full sentences in tech_stack as requested to revert style
            techStack: [
                "Performed L1 and L2 technical support on various laptops: internal cleaning and changing thermal paste, OS and app installations, backups and point restoration, tech queries and advice, software issues.",
                "Clients are mostly friends, family, and co-students."
            ]
        },
        {
            company: "Ateneo de Naga University Symphonic Band",
            role: "Trombone Section Leader and Band Librarian",
            dates: "2022 - Dec. 2025",
            description: "",
            techStack: [
                "Also served as Marching Major in 2022-2023 and Vice President in 2023-2024.",
                "Demonstrated leadership and coaching capabilities in a 40+ member band: sustaining high operational reliability, team coordination and morale for university and city events.",
                "Appointed as Band Librarian: handling the integrity of the band's piece repository, directed research and arranging/transcription projects to expand the performance catalogue."
            ]
        }
    ]);

    // 3. Insert Education
    console.log("Inserting Education...");
    await db.insert(schema.education).values([
        {
            degree: "Bachelor of Science in Computer Engineering",
            school: "Ateneo de Naga University | Major in Networks",
            yearStart: "2022",
            yearEnd: "2027",
            description: "",
            link: null, // Link handled in achievements
            achievements: [
                "Graduating Class of 2027",
                "University Band Scholarship Grantee (2022 - 2025)",
                "VITRO Inc. Academy Graduate | 2025"
            ]
        }
    ]);

    // 4. Insert Memories
    console.log("Inserting Memories...");
    await db.insert(schema.memories).values([
        {
            // id removed to allow serial auto-increment
            title: "Marching Band Parade",
            description: "> [LOG]: Demonstrating precision and endurance during the city fiesta parade. Sync rate 100%.",
            type: "image",
            src: "/memories/memory-01.jpg",
            year: "2023",
            tag: "PARADE"
        },
        {
            title: "VITRO Academy Graduation",
            description: "> [LOG]: Certified Data Center Specialist certification award ceremony. Credentials acquired.",
            type: "image",
            src: "/memories/memory-02.png",
            year: "2025",
            tag: "ACADEMY"
        },
        {
            title: "Vitro Academy Friends",
            description: "> [LOG]: Circa 2025. Celebrating with friends at Vitro Academy.",
            type: "image",
            src: "/memories/memory-03.png",
            year: "2025",
            tag: "FRIENDS"
        },
        {
            title: "AdNU Intramurals Opening March",
            description: "> [LOG]: Circa 2023. Photo taken a few moments before the marching starts.",
            type: "image",
            src: "/memories/memory-04-new.jpg",
            year: "2023",
            tag: "INTRAMS"
        },
        {
            title: "Trombone Solo Feature",
            description: "> [LOG]: Circa 2024. Photo of me playing a trombone solo, 'Misty'.",
            type: "image",
            src: "/memories/memory-05-new.png",
            year: "2024",
            tag: "SOLO"
        },
        {
            title: "Peñafrancia Festival Civic Parade",
            description: "> [LOG]: Circa 2025. My last major marching event as a band member.",
            type: "image",
            src: "/memories/memory-06.jpg",
            year: "2025",
            tag: "CIVIC"
        },
        {
            title: "Peñafrancia Festival Traslacion Procession",
            description: "> [LOG]: Circa 2025. Photo taken during the Peñafrancia Festival Traslacion Procession.",
            type: "image",
            src: "/memories/memory-07.jpg",
            year: "2025",
            tag: "TRASLACION"
        }
    ]);

    // 5. Insert Projects
    console.log("Inserting Projects...");
    await db.insert(schema.projects).values([
        {
            title: "OpsDeck",
            tagline: "AI-Powered Operations Dashboard",
            description: "AI-powered operations dashboard that automates the extraction of data from invoices/receipts while triaging support emails/tickets. An n8n automation intakes data from a Telegram bot, and Google Drive folders. Analyzed data is streamlined into one visual dashboard.",
            tags: ["Next.js", "Tailwind", "Supabase", "Vercel AI SDK", "n8n"],
            techStack: ["Next.js", "Tailwind", "Supabase", "Vercel AI SDK", "n8n"],
            linkRepo: null,
            imageUrl: "/projects/opsdeck/opsdeck-dashboard.png"
        },
        {
            title: "Naga City Incident Heat Map",
            tagline: "Public Safety Data Visualization",
            description: "Data-driven web app that visualizes real public safety incidents (traffic accidents, crimes, fires, drug operations) from local news on an interactive map, built with React + Kepler.gl. Currently in the process of manually geo-mapping exact coordinates (long/lat) of gathered incidents.",
            tags: ["React", "Vite", "Kepler.gl", "Python"],
            techStack: ["React", "Vite", "Kepler.gl", "Python"],
            linkRepo: null,
            imageUrl: "/projects/heatmap/heatmap-1.png"
        },
        {
            title: "Portfolio v2",
            tagline: "The Personal OS",
            description: "A Next.js 15 application featuring a morphing UI, glassmorphism, and persistent state animations.",
            tags: ["React", "Next.js", "Tailwind", "Motion"],
            techStack: ["React 19", "Next.js 15", "Drizzle ORM", "Supabase"],
            linkRepo: "https://github.com/joseraphael2003/portfolio",
            imageUrl: "/projects/portfolio.png"
        },
        {
            title: "Power Supply",
            tagline: "Electronics Course Project",
            description: "A custom power supply built with an 18-0-18V 6A transformer. Features custom-designed modules: bridge rectifier, two fixed voltage regulators, and a variable regulator. Outputs include slow-charge USB-A, fast-charge USB-A, and fast-charge USB-C.",
            tags: ["KiCAD", "Electronics"],
            techStack: ["KiCAD", "Electronics", "PCB Design"],
            linkRepo: null,
            imageUrl: "/projects/power-supply/psu-1.png"
        }
    ]);

    // 6. Insert Toolstack (Placeholder)
    console.log("Inserting Toolstack...");
    await db.insert(schema.toolstack).values([
        { name: "React", category: "Frontend", proficiency: 90, iconName: "React" },
        { name: "Next.js", category: "Frontend", proficiency: 85, iconName: "Next" },
        { name: "Node.js", category: "Backend", proficiency: 80, iconName: "Node" },
        { name: "Python", category: "Backend", proficiency: 75, iconName: "Python" },
        { name: "Cisco IOS", category: "Core", proficiency: 70, iconName: "Network" }
    ]);

    console.log("Seeding complete.");
    await pool.end();
}

main().catch((err) => {
    console.error("Seeding failed:");
    console.error(err);
    process.exit(1);
});
