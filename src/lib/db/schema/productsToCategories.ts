import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { product } from "./product";
import { category } from "./category";
import { relations } from "drizzle-orm";

export const productsToCategories = sqliteTable(
	'products_to_categories',
	{
		productId: integer('product_id')
			.notNull()
			.references(() => product.id),
		categoryId: integer('category_id')
			.notNull()
			.references(() => category.id)
	},
	(t) => [primaryKey({ columns: [t.productId, t.categoryId] })]
);

export const productsToCategoriesRelations = relations(productsToCategories, ({ one }) => ({
	product: one(product, {
		fields: [productsToCategories.productId],
		references: [product.id]
	}),
	user: one(category, {
		fields: [productsToCategories.categoryId],
		references: [category.id]
	})
}));
