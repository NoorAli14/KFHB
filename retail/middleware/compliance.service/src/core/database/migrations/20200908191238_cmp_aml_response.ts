import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.AML_RESPONSE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD()));

    table
      .uuid('request_id')
      .references('id')
      .inTable(TABLE.AML_REQUEST)
      .onDelete('cascade');

    table.string('status'); //(1.Clean, 2.Suspect, 3.Confirm-Clean and 4.Confirm-Block)
    table.text('response_text'); // {Aml Response 1 or Aml Response 2}

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('status', `${TABLE.AML_RESPONSE}_STATUS_INDEX`);
    table.index('deleted_on', `${TABLE.AML_RESPONSE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.AML_RESPONSE);
}
