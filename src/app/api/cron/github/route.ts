import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { CONTRIBUTIONS_URL, normalizeContributions } from "@/lib/github-contributions";

export async function GET(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    const authHeader = request.headers.get("authorization");
    // Fail closed: no secret configured means no authorised callers.
    if (!secret || authHeader !== `Bearer ${secret}`) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const res = await fetch(CONTRIBUTIONS_URL, {
            // Always fetch fresh data from the contributions API
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) {
            return Response.json(
                { ok: false, error: `Upstream API responded with status ${res.status}` },
                { status: 502 },
            );
        }

        const normalizedPayload = normalizeContributions(await res.json());

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
        return Response.json({ ok: false, error: "Internal error" }, { status: 500 });
    }
}
