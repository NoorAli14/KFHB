import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@common/index';
export function up(knex: Knex): any {
    return knex.schema.createTable(TABLE.ROLE, table => {
        table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
        table.uuid('tenant_id').notNullable();
        table.string('name').notNullable();
        table.string('description');
        table.string('status').defaultTo(STATUS.ACTIVE).notNullable();
        table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
        table.string('created_by').notNullable();
        table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
        table.string('updated_by');
        table.timestamp('deleted_on', { useTz: true });
        table.string('deleted_by');

    //index
    table.index(['name'], `${TABLE.ROLE}_NAME_INDEX`);
    table.index(['status'], `${TABLE.ROLE}_STATUS_INDEX`);
    table.index(['tenant_id'], `${TABLE.ROLE}_TENANT_ID_INDEX`);
    table.index(['deleted_on'], `${TABLE.ROLE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.ROLE);
}
