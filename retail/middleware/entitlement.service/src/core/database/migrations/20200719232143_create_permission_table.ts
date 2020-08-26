import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(TABLE.PERMISSION, table => {
        table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
        table.string('record_type');
        table.string('created_by');
        table.timestamp('created_on').defaultTo(knex.fn.now());

        //index
        table.index(['record_type'], 'permission_record_type_index');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(TABLE.PERMISSION);
}
