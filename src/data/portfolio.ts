export interface Profile {
  name: string;
  role: string;
  location: string;
  status: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface WorkRole {
  company: string;
  role: string;
  period: string;
  location: string;
  summaryBullet?: string;
  bullets: string[];
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface PipelineStep {
  stage: string;
  details: string;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "COMMISSIONED" | "PERSONAL";
  confidential: boolean;
  year: string;
  techStack: string[];
  pipelineSteps?: PipelineStep[];
  specs?: ProjectSpec[];
  primaryImage?: string | null;
  galleryImages?: GalleryItem[];
  repoUrl?: string | null;
  liveUrl?: string | null;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  honors?: string;
  details: string[];
}

export interface LeadershipItem {
  organization: string;
  roles: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  badgeUrl: string;
  verifyUrl?: string;
  moreUrl?: string;
  skills?: string[];
  honors?: string;
  earner?: string;
  galleryImages?: GalleryItem[];
}

export interface InvolvementItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  gallery: GalleryItem[];
}

export const profile: Profile = {
  name: "Jose Raphael V. Dichoso",
  role: "Freelance Full-Stack Developer & Automation Specialist",
  location: "Philippines",
  status: "Available for Work",
  headline: "JOSE RAPHAEL V. DICHOSO",
  bio: "Computer Engineering student majoring in Networks, at Ateneo de Naga University. Developer with 3 months of commissioned project work building web apps and internal tools. VITRO Academy Certified Data Center Specialist (Top 10% of five universities). Experienced virtual assistant for US-based clients, comfortable with remote async work. Proven leader (Ateneo de Naga University Symphonic Band).",
  email: "joseraphael2003@gmail.com",
  phone: "REDACTED",
  github: "https://github.com/joseraphael2003",
  linkedin: "https://www.linkedin.com/in/jdichoso2003/",
  website: "https://jrdichoso.vercel.app",
};

export const workExperience: WorkRole[] = [
  {
    company: "Freelance",
    role: "Developer & Automations Engineer",
    period: "Jul 2026 - Present",
    location: "Remote",
    summaryBullet:
      "Building full-stack client dashboards, custom web scraping actors, and automated internal tools for international agencies.",
    bullets: [
      "Built a full-stack dashboard and automation platform using Next.js, React, and PostgreSQL for an Italian social media agency, streamlining multi-channel marketing data, financial tracking, and scheduled client campaigns across third-party APIs and 6 daemon processes.",
      "Built an in-house Apify web scraping actor using TypeScript, Crawlee, and residential proxies to reliably ingest Reddit account metrics, posts, and engagement data at scale while bypassing strict rate limits.",
      "Developed an internal tool for a US-based SEO client that selects and scores backlink domains from their inventory: picks a client niche, pulls evidence via Ahrefs, AI, and HTTP crawlers, classifies and scores each domain, produces a reviewable table for human intervention, then exports a curated list.",
    ],
  },
  {
    company: "Integrya Technologies",
    role: "Tech Intern",
    period: "Jun 2026 - Jul 2026",
    location: "Remote, Taguig City, Philippines",
    summaryBullet:
      "Built full-stack project management system with automated meeting minutes extraction.",
    bullets: [
      "Built a full-stack project management system (Django, React, PostgreSQL) that automates extraction of actionable work items from company-format meeting minutes and QA documents.",
      "Documented official meeting minutes and action items during live online client conferences to ensure project deliverables remained aligned across teams.",
    ],
  },
  {
    company: "US-Based Clients",
    role: "AI Operations Virtual Assistant",
    period: "Jan 2026 - May 2026",
    location: "Part-Time / Remote",
    summaryBullet:
      "Constructed multi-phase prompt architectures and SOPs for generative AI media pipelines.",
    bullets: [
      "Conducted research and followed strict SOPs to generate high-quality, consistent ingredients funneled into generative AI workflows.",
      "Built multi-phase prompt systems that turn rough ideas into concrete scripts with designated prompts for media generation.",
    ],
  },
  {
    company: "Freelance",
    role: "Laptop Technician",
    period: "Aug 2023 - Nov 2025",
    location: "Philippines",
    summaryBullet:
      "L1/L2 component-level hardware diagnostics, thermal servicing, and OS maintenance.",
    bullets: [
      "Performed L1 and L2 technical support across various laptop models, including component-level diagnostics, internal cleaning, and thermal paste replacement.",
      "Handled OS and application installations, automated backup routines, system point restoration, and day-to-day technical queries.",
    ],
  },
];

export const flagshipProjects: Project[] = [
  {
    id: "social-media-dashboard",
    title: "Social Media Automation Dashboard",
    tagline: "Commissioned Internal Tool for Italian Agency",
    description:
      "An automated multi-platform operations dashboard coordinating content scheduling, client asset intake, and notification dispatch across distributed messaging channels.",
    category: "COMMISSIONED",
    confidential: true,
    year: "2026",
    techStack: ["Python", "FastAPI", "Airtable API", "Telegram Bot API", "Apify", "Cron"],
    pipelineSteps: [
      {
        stage: "Ingestion",
        details: "Telegram webhook triggers, Airtable asset records, and custom Apify scraping actors.",
      },
      {
        stage: "Processing",
        details: "Python cron workers, rate-limited media queues, and task validation scripts.",
      },
      {
        stage: "Delivery",
        details: "Automated channel dispatch, client review status sync, and persistent audit logging.",
      },
    ],
    specs: [
      { label: "Core Stack", value: "Python, FastAPI, Airtable API" },
      { label: "Automation", value: "Telegram Bots, Apify Actors" },
      { label: "Execution", value: "Scheduled Background Cron Workers" },
      { label: "Delivery", value: "Real-Time Multi-Channel Broadcast" },
    ],
  },
  {
    id: "domain-selector",
    title: "Domain Scorer and Selection Tool",
    tagline: "Commissioned Internal Tool for US SEO Client",
    description:
      "Algorithmic decision-support system that filters and scores backlink domains from high-volume inventory by niche relevance, authority metrics, and automated HTTP heuristic checks.",
    category: "COMMISSIONED",
    confidential: true,
    year: "2026",
    techStack: ["TypeScript", "Next.js", "Python", "Ahrefs API", "HTTP Crawlers", "Tailwind CSS"],
    pipelineSteps: [
      {
        stage: "Input Stage",
        details: "Domain inventory ingestion, client niche selection, and target parameter filters.",
      },
      {
        stage: "Scoring Engine",
        details: "Ahrefs API metrics, HTTP crawler verification, and algorithmic quality rating.",
      },
      {
        stage: "Human Review",
        details: "Interactive reviewable data table, approval controls, and curated CSV export.",
      },
    ],
    specs: [
      { label: "Architecture", value: "Automated Heuristic Scoring Pipeline" },
      { label: "Integrations", value: "Ahrefs API, Custom HTTP Crawlers" },
      { label: "Data Handling", value: "High-Volume Inventory Parsing & Scoring" },
      { label: "Output", value: "Human Review Interface & Filtered CSV" },
    ],
  },
  {
    id: "opsdeck",
    title: "OpsDeck",
    tagline: "AI-Powered Operations Dashboard",
    description:
      "An operations hub integrating Telegram bot intakes, n8n automations, Google Drive, and Supabase. Auto-extracts invoice and receipt data, triages support tickets, and enables human-in-the-loop editing.",
    category: "PERSONAL",
    confidential: false,
    year: "2026",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Supabase", "n8n", "Vercel AI SDK", "PostgreSQL"],
    primaryImage: "/projects/opsdeck/opsdeck-dashboard.png",
    galleryImages: [
      {
        src: "/projects/opsdeck/opsdeck-dashboard.png",
        caption: "Figure 1: Main Operations Overview & Financial Ingestion",
      },
      {
        src: "/projects/opsdeck/opsdeck-n8n.png",
        caption: "Figure 2: n8n Webhook Workflow & Multi-Channel Pipeline",
      },
      {
        src: "/projects/opsdeck/opsdeck-tickets.png",
        caption: "Figure 3: Automated Support Ticket Categorization & Triage",
      },
      {
        src: "/projects/opsdeck/opsdeck-transactions.png",
        caption: "Figure 4: Extracted Invoice Transactions & Verification Table",
      },
      {
        src: "/projects/opsdeck/opsdeck-activity.png",
        caption: "Figure 5: Live System Activity Stream & Webhook Logs",
      },
    ],
    specs: [
      { label: "Frontend", value: "Next.js 16 (App Router), Tailwind CSS v4" },
      { label: "Backend", value: "Supabase / Neon PostgreSQL, n8n" },
      { label: "AI Pipeline", value: "Vercel AI SDK, Document Data Extraction" },
      { label: "Webhooks", value: "Telegram Bot API, Google Drive Sync" },
    ],
    repoUrl: null,
    liveUrl: null,
  },
];

export const archiveProjects: Project[] = [
  ...flagshipProjects,
  {
    id: "mnemosyne",
    title: "Mnemosyne",
    tagline: "Local-First AI Memory System",
    description:
      "Local memory assistant utilizing semantic search and LLM-powered extraction over markdown and conversation archives. Exposes MCP and REST APIs for external tool integration.",
    category: "PERSONAL",
    confidential: false,
    year: "2026",
    techStack: ["Python", "React", "SQLite", "ChromaDB", "MCP API", "FastAPI"],
    primaryImage: "/projects/mnemosyne/mnemosyne-1.png",
    galleryImages: [
      { src: "/projects/mnemosyne/mnemosyne-1.png", caption: "Mnemosyne Overview" },
      { src: "/projects/mnemosyne/mnemosyne-2.png", caption: "Semantic Memory Retrieval" },
      { src: "/projects/mnemosyne/mnemosyne-3.png", caption: "Markdown Knowledge Graph" },
      { src: "/projects/mnemosyne/mnemosyne-4.png", caption: "LLM Context Extraction" },
      { src: "/projects/mnemosyne/mnemosyne-5.png", caption: "MCP API Integration" },
    ],
    repoUrl: null,
    liveUrl: null,
  },
  {
    id: "mubrew",
    title: "MuBrew",
    tagline: "Specialty Coffee Tracking Application",
    description:
      "Mobile tracking application built with Flutter and Supabase featuring custom brew timers, parameter logging, ratio calculations, and bean inventory management.",
    category: "PERSONAL",
    confidential: false,
    year: "2026",
    techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    primaryImage: "/projects/mubrew/mubrew-1.jpg",
    galleryImages: [
      { src: "/projects/mubrew/mubrew-1.jpg", caption: "MuBrew Mobile Dashboard" },
      { src: "/projects/mubrew/mubrew-2.jpg", caption: "Brew Ratio Calculator" },
      { src: "/projects/mubrew/mubrew-3.jpg", caption: "Extraction Timer & Graph" },
      { src: "/projects/mubrew/mubrew-4.jpg", caption: "Bean Inventory Logging" },
      { src: "/projects/mubrew/mubrew-5.jpg", caption: "Historical Brew Log" },
    ],
    repoUrl: null,
  },
  {
    id: "power-supply",
    title: "Modular Bench Power Supply",
    tagline: "Custom Electronics & PCB Hardware Build",
    description:
      "A custom lab power supply designed around an 18-0-18V 6A transformer. Features custom-designed modular boards: bridge rectifier, dual fixed voltage regulators, and variable regulation.",
    category: "PERSONAL",
    confidential: false,
    year: "2025",
    techStack: ["KiCAD EDA", "PCB Design", "Analog Electronics", "Voltage Regulation"],
    primaryImage: "/projects/power-supply/psu-1.png",
    galleryImages: [
      { src: "/projects/power-supply/psu-1.png", caption: "Power Supply Front Panel" },
      { src: "/projects/power-supply/psu-2.jpg", caption: "Modular PCB Sub-boards" },
      { src: "/projects/power-supply/psu-3.png", caption: "Bench Testing & Voltage Calibration" },
    ],
    repoUrl: null,
    liveUrl: null,
  },
  {
    id: "heatmap",
    title: "Naga City Incident Heat Map",
    tagline: "Geospatial Public Safety Visualization",
    description:
      "Geospatial data visualization analyzing emergency and traffic incident patterns across Naga City coordinates using React, Vite, Kepler.gl, and Python data preprocessing.",
    category: "PERSONAL",
    confidential: false,
    year: "2025",
    techStack: ["React", "Vite", "Kepler.gl", "Python", "Geospatial Analysis"],
    primaryImage: "/projects/heatmap/heatmap-1.png",
    galleryImages: [
      { src: "/projects/heatmap/heatmap-1.png", caption: "Naga City Incident Heat Map" },
    ],
    repoUrl: null,
    liveUrl: null,
  },
  {
    id: "reddit-apify-actor",
    title: "Reddit Account & Engagement Scraper",
    tagline: "Custom Apify Actor for Distributed Social Scraping",
    description:
      "An autonomous web scraping actor developed with TypeScript, Crawlee, and residential proxy rotation. Built to ingest Reddit user profiles, engagement metrics, posts, and nested comment structures at scale while reliably bypassing rate limits.",
    category: "COMMISSIONED",
    confidential: false,
    year: "2026",
    techStack: ["TypeScript", "Apify SDK", "Crawlee", "Node.js", "Residential Proxies"],
    primaryImage: null,
    repoUrl: null,
    liveUrl: null,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "Dart", "C++"],
  },
  {
    title: "Frameworks & Systems",
    skills: ["React 19", "Next.js 16 (App Router)", "FastAPI", "Django", "Flutter", "Vite"],
  },
  {
    title: "Databases & Storage",
    skills: ["PostgreSQL", "Drizzle ORM", "Supabase", "SQLite", "ChromaDB"],
  },
  {
    title: "Automation & Tooling",
    skills: ["n8n Workflows", "Apify Actors", "Telegram Bots", "Git / GitHub", "Linux", "Vercel"],
  },
  {
    title: "Engineering",
    skills: ["Cisco IOS", "KiCAD", "Digital Electronics", "Analog Electronics", "Octave"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Ateneo de Naga University",
    degree: "BS Computer Engineering (Networks Track)",
    period: "Aug 2022 - Jul 2027",
    location: "Naga City, Philippines",
    honors: "University Band Scholarship Grantee",
    details: [
      "Concentration in network topologies, routing protocols, embedded microcontrollers, and hardware engineering.",
      "Completed 4 years of continuous scholarship service through university symphonic band leadership.",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "vitro-data-center-specialist",
    title: "Certified Data Center Specialist",
    issuer: "VITRO Inc. Academy",
    year: "2025",
    badgeUrl: "/certifications/vitro-1.png",
    honors: "Top 10% of five universities",
    moreUrl:
      "https://www.linkedin.com/posts/jdichoso2003_vitro25-vitroacademy-activity-7379857518933487616-To3N?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFHx_o0Bmeh6Vi1Gg2tr6xBMI1dBbQ7zXC0",
    galleryImages: [
      {
        src: "/certifications/vitro-1.png",
        caption:
          "VITRO Certified Data Center Specialist Certificate Award Ceremony (2025)",
      },
      {
        src: "/certifications/vitro-2.png",
        caption:
          "Graduation and credential verification with VITRO Academy peers",
      },
      {
        src: "/certifications/vitro-3.jpg",
        caption: "VITRO Academy cohort celebration at the facility logo wall",
      },
      {
        src: "/certifications/vitro-4.jpg",
        caption: "VITRO Academy peer cohort gathering at the academy facility",
      },
    ],
  },
  {
    id: "ccna-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2025",
    credentialId: "bea0d534-b685-41b8-8e0f-75c62ef94502",
    badgeUrl:
      "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/linkedin_thumb_CCNAITN__1_.png",
    verifyUrl: "https://www.credly.com/badges/bea0d534-b685-41b8-8e0f-75c62ef94502/public_url",
    earner: "Jose Raphael Vidal Dichoso",
  },
  {
    id: "ccna-switching-routing-wireless-essentials",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    credentialId: "2ba3d0f7-ebc8-4e77-b3b3-14cf96cad970",
    badgeUrl:
      "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/linkedin_thumb_CCNASRWE__1_.png",
    verifyUrl: "https://www.credly.com/badges/2ba3d0f7-ebc8-4e77-b3b3-14cf96cad970/public_url",
    earner: "Jose Raphael Vidal Dichoso",
  },
];

export const involvement: InvolvementItem[] = [
  {
    id: "symphonic-band",
    organization: "Ateneo de Naga University Symphonic Band",
    role: "Vice President · Marching Leader · Trombone Section Leader · Band Librarian",
    period: "2022 - 2025",
    description:
      "Four years of executive and section leadership coordinating operational scheduling, rehearsals, and repertoire cataloging across a 40-member symphonic ensemble.",
    highlights: [
      "Managed weekly rehearsal schedules and section synchronization for civic parades and formal concert performances.",
      "Cataloged and preserved the complete musical library repository containing hundreds of scored arrangements.",
      "Coordinated instrument maintenance, logistics, and university event performance deployments.",
    ],
    gallery: [
      { src: "/involvement/band/band-1.jpg", caption: "Leading the trombone section through a city parade." },
      { src: "/involvement/band/band-2.jpg", caption: "Marching band parading down a city street." },
      { src: "/involvement/band/band-3.png", caption: "Full ensemble performing on an outdoor night stage." },
      { src: "/involvement/band/band-4.jpg", caption: "Brass and saxophones parading past historic buildings." },
      { src: "/involvement/band/band-5.jpg", caption: "Full band with sousaphone marching a tree-lined avenue." },
    ],
  },
  {
    id: "celestial-carabaos",
    organization: "Celestial Carabaos",
    role: "Guitarist",
    period: "2026 - Present",
    description:
      "Indie ensemble guitarist featured on the March 2026 EP Pedagogy of Desire, contributing tracked guitar parts across the record and its standout singles.",
    highlights: [
      "Recorded guitar tracks for the March 2026 EP Pedagogy of Desire.",
      "Featured on Track 1 \"With You Tonight\" and the standout single \"Morena\".",
      "Tracked acoustic and electric guitar parts in home studio sessions.",
    ],
    gallery: [
      {
        src: "/involvement/celestial-carabaos/celestial-carabaos-1.jpg",
        caption: "Acoustic guitar tracking session with headphones in the studio.",
      },
      {
        src: "/involvement/celestial-carabaos/celestial-carabaos-2.jpg",
        caption: "Studio session with bandmates under blue lighting.",
      },
    ],
  },
  {
    id: "the-masirams",
    organization: "The Masirams",
    role: "Lead Guitarist",
    period: "2022 - Present",
    description:
      "Live campus band delivering full-band sets across Ateneo de Naga University Open House and university festivities, from stage showcases to grand tribute balls.",
    highlights: [
      "Performed live across Ateneo de Naga University Open House and university festivities.",
      "Delivered full-band sets with guitars, keyboards, saxophone, and vocals.",
      "Recognized on stage with band certificates at university events.",
    ],
    gallery: [
      {
        src: "/involvement/the-masirams/the-masirams-1.jpg",
        caption: "Lead guitar set on stage under purple event lighting.",
      },
      {
        src: "/involvement/the-masirams/the-masirams-2.jpg",
        caption: "Full band lineup in the recording studio.",
      },
      {
        src: "/involvement/the-masirams/the-masirams-3.jpg",
        caption: "Live set at the NightinGala tribute ball stage.",
      },
      {
        src: "/involvement/the-masirams/the-masirams-4.jpg",
        caption: "The band celebrating on stage with certificates and instruments.",
      },
    ],
  },
];

export const leadership: LeadershipItem[] = involvement.map((item) => ({
  organization: item.organization,
  roles: item.role,
  period: item.period,
  description: item.description,
  responsibilities: item.highlights,
}));

