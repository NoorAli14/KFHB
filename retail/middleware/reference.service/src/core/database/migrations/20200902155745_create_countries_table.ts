import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.COUNTRY, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('name');
    table.string('iso_code');
    table.string('continent_code');
    table.string('capital_name');
    table.string('phone_code');
    table.string('nationality');
    table.string('status').defaultTo(STATUS.ACTIVE);
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');
    table.index(['name'], `${TABLE.COUNTRY}_NAME_INDEX`);
    table.index(['iso_code'], `${TABLE.COUNTRY}_ISO_CODE_INDEX`);
    table.index(['status'], `${TABLE.COUNTRY}_STATUS_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.COUNTRY);
}
