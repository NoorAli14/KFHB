import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@common/index';
export function up(knex: Knex): any {
    return knex.schema.createTable(TABLE.MODULE, table => {
        table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
        table.string('name').notNullable();
        table.uuid('parent_id');
        table.string('status').defaultTo(STATUS.ACTIVE).notNullable();
        table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
        table.string('created_by').notNullable();

        //index
        table.index(['name'], `${TABLE.MODULE}_NAME_INDEX`);
        table.index(['status'], `${TABLE.MODULE}_STATUS_INDEX`);
        table.index(['parent_id'], `${TABLE.MODULE}_PARENT_ID_INDEX`);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE.MODULE);
}
