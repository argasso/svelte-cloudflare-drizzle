import { integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, table } from "../utils";
import { relations } from "drizzle-orm";
import { productsToCategories } from "./productsToCategories";

export const product = table('product', {
	id: integer().primaryKey(),
	title: text().notNull(),
	description: text(),
	shopifyId: text('shopify_id').unique(),
	stripeId: text('stripe_id').unique()
});

export const productRelations = relations(product, ({ many }) => ({
	productsToCategories: many(productsToCategories)
}));

export const productInsertSchema = createInsertSchema(product, {
	title: schema => schema.trim().min(1)
});
