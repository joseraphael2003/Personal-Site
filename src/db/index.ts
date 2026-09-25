import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Requires DATABASE_URL in .env
// Memoised on globalThis so dev-server hot reloads reuse one pool.
const g = globalThis as typeof globalThis & { __pgPool?: Pool };
const pool = (g.__pgPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
}));

export const db = drizzle(pool, { schema });
