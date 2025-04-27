DROP TABLE `user`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`shopify_id` text,
	CONSTRAINT "name_non_empty" CHECK(length("__new_category"."name") > 0)
);
--> statement-breakpoint
INSERT INTO `__new_category`("id", "name", "shopify_id") SELECT "id", "name", "shopify_id" FROM `category`;--> statement-breakpoint
DROP TABLE `category`;--> statement-breakpoint
ALTER TABLE `__new_category` RENAME TO `category`;--> statement-breakpoint
PRAGMA foreign_keys=ON;