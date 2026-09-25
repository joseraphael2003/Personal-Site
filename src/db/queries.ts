import { db } from "./index";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { normalizeContributions, type ContributionData } from "@/lib/github-contributions";

export async function getGithubContributions(): Promise<ContributionData | null> {
    try {
        const rows = await db
            .select()
            .from(schema.githubCache)
            .where(eq(schema.githubCache.key, "contributions"))
            .limit(1);

        const row = rows[0];
        if (row) {
            // Cached rows predate (and can outlive) the current payload shape,
            // so the stored jsonb is normalised on read.
            return normalizeContributions(row.data);
        }
    } catch (e) {
        console.error("github_cache read failed:", e);
    }
    return null;
}
