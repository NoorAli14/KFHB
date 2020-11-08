import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.NOTIFY, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
    table.string('platform').notNullable();
    table.string('device_id').notNullable();
    table.string('text').notNullable();
    table.string('status').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by')
    table.timestamp('deleted_on').defaultTo(knex.fn.now());
    table.string('deleted_by')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists(TABLE.NOTIFY);
}