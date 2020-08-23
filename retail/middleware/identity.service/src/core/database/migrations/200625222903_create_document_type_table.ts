import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.DOCUMENT_TYPE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table
      .string('name')
      .unique()
      .notNullable();
    table.string('status');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on');
    table.string('deleted_by');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.DOCUMENT_TYPE);
}
