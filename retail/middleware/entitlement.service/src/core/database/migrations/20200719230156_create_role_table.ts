import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(TABLE.ROLE, table => {
        table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
        table.string('name');
        table.string('description');
        table.string('status');
        table.string('created_by');
        table.string('updated_by');
        table.string('deleted_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.timestamp('updated_on').defaultTo(knex.fn.now());
        table.timestamp('deleted_on');

        //index
        table.index(['name'], 'role_name_index');
        table.index(['status'], 'role_status_index');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE.ROLE);
}
