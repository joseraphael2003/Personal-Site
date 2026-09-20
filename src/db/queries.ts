import { db } from "./index";
import * as schema from "./schema";
import { asc, eq } from "drizzle-orm";

export async function getProfileData() {
    const [experience, education, memories, projects, toolstack] = await Promise.all([
        db.query.experience.findMany({
            orderBy: [asc(schema.experience.id)],
        }),
        db.query.education.findMany({
            orderBy: [asc(schema.education.id)],
        }),
        db.query.memories.findMany({
            orderBy: [asc(schema.memories.id)],
        }),
        db.query.projects.findMany({
            orderBy: [asc(schema.projects.id)],
        }),
        db.query.toolstack.findMany({
            orderBy: [asc(schema.toolstack.id)],
        }),
    ]);

    return {
        experience,
        education,
        memories,
        projects,
        toolstack,
    };
}

export async function getGithubContributions() {
    try {
        const rows = await db
            .select()
            .from(schema.githubCache)
            .where(eq(schema.githubCache.key, "contributions"))
            .limit(1);
        if (rows.length > 0 && rows[0]?.data) {
            const raw = rows[0].data as Record<string, unknown>;
            const total =
                typeof raw.total === "number"
                    ? raw.total
                    : typeof (raw.total as Record<string, unknown>)?.lastYear === "number"
                    ? (raw.total as Record<string, unknown>).lastYear
                    : Number(Object.values((raw.total as Record<string, unknown>) || {})[0]) || 0;

            const contributions = Array.isArray(raw.contributions)
                ? (raw.contributions as Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>)
                : [];

            return {
                total: Number(total) || 0,
                contributions,
            };
        }
    } catch {
        // Database or relation may not exist yet in local development
    }
    return null;
}
