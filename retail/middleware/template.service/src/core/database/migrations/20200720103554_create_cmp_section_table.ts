import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.SECTION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('name').notNullable();
    table.string('level').notNullable();

    table.uuid('template_id');
    table
      .foreign('template_id')
      .references('id')
      .inTable(TABLE.TEMPLATE);

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());

    table.unique(['name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.SECTION);
}
