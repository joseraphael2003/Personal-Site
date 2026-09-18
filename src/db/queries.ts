import { db } from "./index";
import * as schema from "./schema";
import { asc } from "drizzle-orm";

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
