import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.NATIONALITY, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('name');
    table.string('country_code');
    table.string('status').defaultTo('ACTIVE');
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');
    table.index(['name'], `${TABLE.NATIONALITY}_NAME_INDEX`);
    table.index(['country_code'], `${TABLE.NATIONALITY}_COUNTRY_CODE_INDEX`);
    table.index(['status'], `${TABLE.NATIONALITY}_STATUS_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.NATIONALITY);
}
