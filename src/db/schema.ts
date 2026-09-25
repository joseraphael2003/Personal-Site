import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

// Cached payloads from external APIs (currently the GitHub contributions calendar)
// keyed by a stable string so the cron route can upsert atomically.
export const githubCache = pgTable("github_cache", {
    key: text("key").primaryKey(),
    data: jsonb("data").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
