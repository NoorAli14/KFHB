import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.OPTION, table => {
    table.uuid('id').primary();

    table.uuid('question_id');

    table
      .foreign('question_id')
      .references('id')
      .inTable(TABLE.QUESTION);
    table.string('type').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.OPTION);
}
