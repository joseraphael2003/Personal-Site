// Pure helpers for the GitHub contributions calendar payload.
// No server imports: the cron route, the DB read path and the client all use this.

const GITHUB_USERNAME = "joseraphael2003";

export const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
    date: string;
    count: number;
    level: ContributionLevel;
};

export type ContributionData = {
    total: number;
    contributions: ContributionDay[];
};

export function normalizeContributions(payload: unknown): ContributionData {
    if (!payload || typeof payload !== "object") {
        return { total: 0, contributions: [] };
    }
    const record = payload as Record<string, unknown>;

    // Upstream reports the yearly total as `{ lastYear: n }`, as a plain number,
    // or keyed per year, e.g. `{ "2025": n }`.
    let total = 0;
    if (typeof record.total === "number") {
        total = Number.isFinite(record.total) ? record.total : 0;
    } else if (record.total && typeof record.total === "object") {
        const totalRecord = record.total as Record<string, unknown>;
        const candidate =
            typeof totalRecord.lastYear === "number" ? totalRecord.lastYear : Object.values(totalRecord)[0];
        const parsed = typeof candidate === "number" ? candidate : Number(candidate);
        total = Number.isFinite(parsed) ? parsed : 0;
    }

    const contributions: ContributionDay[] = [];
    if (Array.isArray(record.contributions)) {
        for (const day of record.contributions) {
            if (!day || typeof day !== "object") {
                continue;
            }
            const dayRecord = day as Record<string, unknown>;
            if (typeof dayRecord.date !== "string") {
                continue;
            }
            const count = Number(dayRecord.count);
            const level = Math.trunc(Number(dayRecord.level));
            contributions.push({
                date: dayRecord.date,
                count: Number.isFinite(count) ? count : 0,
                level: Math.min(4, Math.max(0, Number.isFinite(level) ? level : 0)) as ContributionLevel,
            });
        }
    }

    return { total, contributions };
}
