import { pgTable, text, serial, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
    id: serial("id").primaryKey(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    dates: text("dates").notNull(),
    description: text("description").notNull(),
    techStack: text("tech_stack").array(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageUrl: text("image_url"),
    liveLink: text("live_link"),
    tags: text("tags").array(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const tracks = pgTable("tracks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    audioUrl: text("audio_url").notNull(),
    coverArt: text("cover_art"),
    isLicensed: boolean("is_licensed").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
