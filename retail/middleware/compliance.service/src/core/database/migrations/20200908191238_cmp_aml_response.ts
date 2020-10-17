import * as Knex from 'knex';
import { TABLE } from '@common/constants';
import { DATABASE_UUID_METHOD } from '@common/utilities';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE.AML_RESPONSE, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));


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
