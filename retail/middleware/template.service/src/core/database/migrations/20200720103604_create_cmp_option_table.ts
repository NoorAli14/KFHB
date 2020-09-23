import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.OPTION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.string('name').notNullable();
    table.string('name_ar').notNullable();

    table.uuid('question_id');
    table
      .foreign('question_id')
      .references('id')
      .inTable(TABLE.QUESTION);

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.OPTION);
}
