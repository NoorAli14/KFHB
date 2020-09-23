import * as Knex from 'knex';
import {TABLE, DATABASE_UUID_METHOD, STATUS} from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.LEAVE_TYPE, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('tenant_id').notNullable();
    table.string('name').notNullable();
    table.string('status').defaultTo(STATUS.ACTIVE).notNullable();
    table.timestamp('created_on', {useTz: true}).defaultTo(knex.fn.now()).notNullable();
    table.string('created_by').notNullable();
    table.timestamp('updated_on', {useTz: true}).defaultTo(knex.fn.now());
    table.string('updated_by');
    table.timestamp('deleted_on', {useTz: true});
    table.string('deleted_by');

    //index
    table.index(['name'], `${TABLE.LEAVE_TYPE}_NAME_INDEX`);
    table.index(['tenant_id'], `${TABLE.LEAVE_TYPE}_TENANT_ID_INDEX`);
    table.index(['status'], `${TABLE.LEAVE_TYPE}_STATUS_INDEX`);
    table.index(['deleted_on'], `${TABLE.LEAVE_TYPE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.LEAVE_TYPE);
}
