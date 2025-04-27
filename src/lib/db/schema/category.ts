import { integer, text } from "drizzle-orm/sqlite-core";
import { table } from "../utils";
import { relations } from "drizzle-orm";
import { productsToCategories } from "./productsToCategories";

export const category = table('category', {
	id: integer().primaryKey(),
	name: text().notNull(),
	shopifyId: text()
});

export const categoryRelations = relations(category, ({ many }) => ({
	productsToCategories: many(productsToCategories)
}));
