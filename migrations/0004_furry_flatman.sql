PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`shopify_id` text,
	`stripe_id` text,
	CONSTRAINT "title_non_empty" CHECK(length("__new_product"."title") > 0)
);
--> statement-breakpoint
INSERT INTO `__new_product`("id", "title", "description", "shopify_id", "stripe_id") SELECT "id", "title", "description", "shopify_id", "stripe_id" FROM `product`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
ALTER TABLE `__new_product` RENAME TO `product`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `product_shopify_id_unique` ON `product` (`shopify_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_stripe_id_unique` ON `product` (`stripe_id`);