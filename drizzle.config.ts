import { defineConfig } from 'drizzle-kit';

// Use better-sqlite driver for local development
export default process.env.LOCAL_DB_PATH
? defineConfig({
		schema: "./src/lib/db/schema",
		dialect: "sqlite",
		dbCredentials: {
			url: process.env.LOCAL_DB_PATH,
		},
		casing: 'snake_case',
	})
: defineConfig({
		schema: "./src/lib/db/schema",
		out: "./migrations",
		dialect: "sqlite",
		driver: "d1-http",
		dbCredentials: {
			databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
			token: process.env.CLOUDFLARE_D1_TOKEN!,
			accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		},
		casing: 'snake_case',
	});
  