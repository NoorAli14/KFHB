import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.QUESTION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
		table.string('title').notNullable();
		table.string('title_ar').notNullable();
    table.string('type').notNullable();

    table.string('rules').notNullable();
    table.boolean('status').defaultTo(true);

    table.uuid('section_id');
    table
      .foreign('section_id')
      .references('id')
      .inTable(TABLE.SECTION);

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());

    // table.unique(['title']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.QUESTION);
}
