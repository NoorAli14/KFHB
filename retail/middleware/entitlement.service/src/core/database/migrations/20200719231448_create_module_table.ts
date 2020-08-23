import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(TABLE.MODULE, table => {
        table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
        table.string('name');
        table.uuid('parent_id');
        table.string('status');
        table.string('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());

        //index
        table.index(['name'], 'module_name_index');
        table.index(['status'], 'module_status_index');
        table.index(['parent_id'], 'module_parent_id_index');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE.MODULE);
}
