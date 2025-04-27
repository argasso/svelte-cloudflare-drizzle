import { getTableColumns, SQL, sql } from 'drizzle-orm';
import { check, SQLiteTable, sqliteTable, type SQLiteColumnBuilderBase } from 'drizzle-orm/sqlite-core';
import { createSchemaFactory } from 'drizzle-zod';

export function table<TColumnsMap extends Record<string, SQLiteColumnBuilderBase>>(
	name: string,
	columns: TColumnsMap
) {
	return sqliteTable(name, columns, (table) =>
		Object.entries(table)
			.filter(([_k, v]) => v.dataType === 'string' && v.notNull)
			.map(([_k, v]) => check(`${v.name}_non_empty`, sql`length(${v}) > 0`))
	);
}

export function conflictUpdateAllExcept<
	T extends SQLiteTable,
	E extends (keyof T['$inferInsert'])[]
>(table: T, except: E) {
	const columns = getTableColumns(table);
	const updateColumns = Object.entries(columns).filter(
		([col]) => !except.includes(col as keyof typeof table.$inferInsert)
	);

	return updateColumns.reduce(
		(acc, [colName, table]) => ({
			...acc,
			[colName]: sql.raw(`excluded.${table.name}`)
		}),
		{}
	) as Omit<Record<keyof typeof table.$inferInsert, SQL>, E[number]>;
}

const {createInsertSchema, createSelectSchema, createUpdateSchema} = createSchemaFactory({
	coerce: {
		number: true
	}
});

export {createInsertSchema, createSelectSchema, createUpdateSchema}
