import type { Handle } from '@sveltejs/kit';
import { createD1Database, createLibSQLDatabase } from '$lib/server/db';
import { env } from '$env/dynamic/private';

const db = env.DATABASE_URL ? createLibSQLDatabase(env.DATABASE_URL) : null;

export const handle: Handle = async ({ event, resolve }) => {
    if (event.platform?.env.DB) {
        event.locals.db = createD1Database(event.platform.env.DB);
    } else if (db) {
        event.locals.db = db;
    } else {
        throw new Error('No database found');
    }

	const response = await resolve(event);
	return response;
};