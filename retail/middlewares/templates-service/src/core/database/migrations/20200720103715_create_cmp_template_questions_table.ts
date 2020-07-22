import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.TEMPLATE_QUESTIONS, table => {
		table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.uuid('template_id');
    table.uuid('section_id');
    table.uuid('question_id');

    table
      .foreign('template_id')
      .references('id')
      .inTable(TABLE.TEMPLATE);
    table
      .foreign('section_id')
      .references('id')
      .inTable(TABLE.SECTION);
    table
      .foreign('question_id')
      .references('id')
      .inTable(TABLE.QUESTION);
    table.string('rules').notNullable();
    table.boolean('status').defaultTo(false);
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.TEMPLATE_QUESTIONS);
}
