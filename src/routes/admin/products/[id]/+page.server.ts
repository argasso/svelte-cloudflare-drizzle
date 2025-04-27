import { product, productInsertSchema } from '$lib/db/schema';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { getFormDataValidator } from '$lib/server/db';
import { conflictUpdateAllExcept } from '$lib/db/utils'

const NEW = 'new';
const schema = zod(productInsertSchema);
const validate = getFormDataValidator(productInsertSchema);

export const load: PageServerLoad = async ({ locals, params, ...rest }) => {
	console.log('load, referer:', rest.request.headers.get('referer'));

	if (params.id === NEW) {
		return { entity: undefined };
	}

	const id = parseInt(params.id);
	if (isNaN(id)) {
		error(400, 'ID must be a number');
	}

	const entity = await locals.db.query.product.findFirst({
		where: eq(product.id, id)
	});

	if (entity) {
		return { form: await superValidate(entity, schema) };
	} else {
		return { form: await superValidate(schema) };
	}
};

export const actions: Actions = {
	default: async (event) => {
		console.log('in action');

		const { locals, request, url } = event;
		// const formData = await getFormData(request);
		// const parsed = productInsertSchema.safeParse(formData);
		// if (parsed.success) {
		// 	const result = await locals.db
		// 		.insert(product)
		// 		.values(parsed.data)
		// 		.onConflictDoUpdate({
		// 			target: product.id,
		// 			set: conflictUpdateAllExcept(product, ['id'])
		// 		})
		// 		.returning();
		// 	if (url.pathname.endsWith(`/${NEW}`)) {
		// 		redirect(303, url.pathname.replace(NEW, result[0].id.toString()));
		// 	}
		// }

		const form = await validate(request);
		console.log('in action, valid: ', form.valid, 'data:', form.data);
		console.log('in action, valid: ', form.valid);

		if (!form.valid) {
			console.log('in action, form not valid');

			return fail(400, {
				form
			});
		}

		const result = await locals.db
			.insert(product)
			.values(form.data)
			.onConflictDoUpdate({
				target: product.id,
				set: conflictUpdateAllExcept(product, ['id'])
			})
			.returning();

		if (url.pathname.endsWith(`/${NEW}`)) {
			redirect(303, url.pathname.replace(NEW, result[0].id.toString()));
		}

		return {
			form
		};
	}
};

async function getFormData(request: Request) {
	const data = await request.formData();
	return Object.fromEntries(data.entries());
}
