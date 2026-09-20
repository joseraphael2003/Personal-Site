import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { db } from "@/db";
import * as schema from "@/db/schema";

const GITHUB_USERNAME = "joseraphael2003";
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const res = await fetch(CONTRIBUTIONS_URL, {
            // Always fetch fresh data from the contributions API
            cache: "no-store",
        });

        if (!res.ok) {
            return Response.json(
                { ok: false, error: `Upstream API responded with status ${res.status}` },
                { status: 502 },
            );
        }

        const payload = await res.json();

        const totalCount =
            typeof payload.total?.lastYear === "number"
                ? payload.total.lastYear
                : typeof payload.total === "number"
                ? payload.total
                : Number(Object.values(payload.total || {})[0]) || 0;

        const normalizedPayload = {
            total: totalCount,
            contributions: Array.isArray(payload.contributions) ? payload.contributions : [],
        };

        await db
            .insert(schema.githubCache)
            .values({
                key: "contributions",
                data: normalizedPayload,
                updatedAt: new Date(),
            })
            .onConflictDoUpdate({
                target: schema.githubCache.key,
                set: {
                    data: normalizedPayload,
                    updatedAt: new Date(),
                },
            });
        // Purge the static landing page cache so the new data is served
        revalidatePath("/");

        return Response.json({ ok: true, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("GitHub contributions cron failed:", error);
        return Response.json(
            { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 },
        );
    }
}
