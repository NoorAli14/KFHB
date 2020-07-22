import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.TEMPLATE_RESPONSE, table => {
    table.uuid('id').primary();

    table.uuid('template_question_id');

    table
      .foreign('template_question_id')
      .references('id')
      .inTable(TABLE.TEMPLATE_QUESTIONS);
    table.string('value').notNullable();
    table.string('remarks').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.TEMPLATE_RESPONSE);
}
