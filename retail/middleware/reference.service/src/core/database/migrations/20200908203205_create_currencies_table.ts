import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@rubix/common/';

export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.CURRENCY, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
    table.string('name');
    table.string('iso_code');
    table.integer('numeric_code');
    table.integer('minor_unit');
    table.string('status').defaultTo(STATUS.ACTIVE);
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');
    table.index(['name'], `${TABLE.CURRENCY}_NAME_INDEX`);
    table.index(['iso_code'], `${TABLE.CURRENCY}_ISO_CODE_INDEX`);
    table.index(['status'], `${TABLE.CURRENCY}_STATUS_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.CURRENCY);
}
