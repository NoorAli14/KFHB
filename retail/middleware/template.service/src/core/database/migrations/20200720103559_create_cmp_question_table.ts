import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.QUESTION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.uuid('tenant_id').notNullable();
    table.string('title').notNullable();

    table.string('title_ar').notNullable();
    table.string('type').notNullable();

    table.string('rules').notNullable();
    table.string('status').defaultTo('ACTIVE');

    table.uuid('section_id');
    table
      .foreign('section_id')
      .references('id')
      .inTable(TABLE.SECTION);

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');

    // table.unique(['title']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.QUESTION);
}
