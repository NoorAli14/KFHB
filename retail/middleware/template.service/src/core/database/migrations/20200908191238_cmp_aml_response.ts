import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.AML_RESPONSE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table
      .uuid('request_id')
      .references('id')
      .inTable(TABLE.AML_REQUEST)
      .onDelete('cascade');

    table.string('response_status'); //(1.Clean, 2.Suspect, 3.Confirm-Clean and 4.Confirm-Block)
    table.string('response_type'); // {Aml Response 1 or Aml Response 2}

    table.timestamp('response_on');
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
  return knex.schema.dropTable(TABLE.AML_RESPONSE);
}
