import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.AML_REQUEST, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.uuid('tenant_id').notNullable();
    table.uuid('customer_id').notNullable();

    table.text('aml_text');
    table.string('request_reference');

    table.string('remarks');
    table.string('status');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.AML_REQUEST);
}
