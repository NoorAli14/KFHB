import * as Knex from 'knex';
import {DATABASE_UUID_METHOD, TABLE} from '@common/constants';
export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(TABLE.ROLE_MODULE_PERMISSION, table => {
        table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
        table.uuid('role_module_id');
        table.uuid('permission_id');
        table.string('status');
        table.string('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());

        //foreign
        table.foreign('role_module_id').references(`${TABLE.ROLE_MODULE}.id`).onDelete('CASCADE');
        table.foreign('permission_id').references(`${TABLE.PERMISSION}.id`).onDelete('CASCADE');

        //index
        table.index(['status'], 'role_module_status_index');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE.ROLE_MODULE_PERMISSION);
}
