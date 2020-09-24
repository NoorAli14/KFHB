import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.TEMPLATE_RESPONSE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table
      .uuid('template_id')
      .references('id')
      .inTable(TABLE.TEMPLATE)
      .onDelete('cascade');

    table.string('results').notNullable();
    table.string('remarks').notNullable();

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');

    table.index('deleted_on', `${TABLE.TEMPLATE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.TEMPLATE_RESPONSE);
}
