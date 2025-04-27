import { product } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const products = await locals.db.select().from(product)
	return { products };
};
