import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
    id: serial("id").primaryKey(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    dates: text("dates").notNull(),
    description: text("description").notNull(),
    // Store bullet points as a JSON array or simple text array
    // Postgres text[] is supported by drizzle as text("...").array()
    techStack: text("tech_stack").array(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const education = pgTable("education", {
    id: serial("id").primaryKey(),
    degree: text("degree").notNull(),
    school: text("school").notNull(),
    yearStart: text("year_start").notNull(),
    yearEnd: text("year_end").notNull(),
    description: text("description"), // Optional
    link: text("link"), // Optional (e.g. for certifications)
    achievements: text("achievements").array(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    tagline: text("tagline"), // Short description
    description: text("description"), // Full description
    imageUrl: text("image_url"),
    techStack: text("tech_stack").array(),
    linkDemo: text("link_demo"),
    linkRepo: text("link_repo"),
    tags: text("tags").array(), // Categories like "Web", "Hardware"
    createdAt: timestamp("created_at").defaultNow(),
});

export const toolstack = pgTable("toolstack", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull(), // "Core", "Frontend", "Backend", "Hardware"
    proficiency: integer("proficiency"), // 0-100
    iconName: text("icon_name"), // Lucide icon name or path
    createdAt: timestamp("created_at").defaultNow(),
});

export const memories = pgTable("memories", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    type: text("type").default("image"), // "image" or "video"
    src: text("src").notNull(),
    year: text("year"), // "2023", "2025"
    tag: text("tag"), // "PARADE", "SOLO"
    createdAt: timestamp("created_at").defaultNow(),
});
