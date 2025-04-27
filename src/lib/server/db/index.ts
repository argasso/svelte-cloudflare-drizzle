import { createClient } from '@libsql/client';
import type { RequestEvent } from '@sveltejs/kit';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleLibSql } from 'drizzle-orm/libsql';
import { superValidate } from 'sveltekit-superforms';
import { zod, type ZodValidation } from 'sveltekit-superforms/adapters';
import * as schema from '../../db/schema';

export function createLibSQLDatabase(url: string) {
	const client = createClient({ url });
	return drizzleLibSql(client, {schema, casing: 'snake_case' });
}

export function createD1Database(database: D1Database) {
	return drizzleD1(database, { schema, casing: 'snake_case' });
}

export type DrizzleClient =
	| ReturnType<typeof createLibSQLDatabase>
	| ReturnType<typeof createD1Database>;

export function getFormDataValidator<T extends ZodValidation>(dbSchema: T) {
	const formSchema = zod(dbSchema);
	return async (request?: Request) => {
        if (request) {
            const newFormData = new FormData()
            const formData = await request.formData()
            formData.entries().filter(e => e[1] !== '').forEach(([key, value]) => {
                newFormData.append(key, value)
            })
            console.log('before validator', Object.fromEntries(newFormData.entries()))
            return await superValidate(formData, formSchema, {strict: true})
        } 
		return await superValidate(formSchema);
    }
}

function removeEmptyString(formData: FormData) {

}