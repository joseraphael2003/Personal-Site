import { drizzle } from "drizzle-orm/node-postgres";
// NOTE: switching to pg-lite or just pg? usually for supabase 'postgres' or 'pg' is used.
// But for broader compatibility or edge, sometimes http drivers.
// User didn't specify edge, so standard 'pg' pool is fine.
import { Pool } from "pg";
import * as schema from "./schema";

// Helper to initialize DB
// Requires DATABASE_URL in .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
