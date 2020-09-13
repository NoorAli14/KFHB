import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.AML_RESPONSE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.uuid('request_id');
    table.string('response_status');

    table.timestamp('response_on');
    table.integer('response_type');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');

    table
      .foreign('request_id')
      .references('id')
      .inTable(TABLE.AML_REQUEST);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.AML_RESPONSE);
}
