import { DATABASE_UUID_METHOD, STATUS, TABLE } from '@rubix/common/';
import * as Knex from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE.ATTACHMENT, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));

    table.uuid('tenant_id').notNullable();
    table.uuid('customer_id').notNullable();

    table.string('file_name');
    table.float('file_size');
    table.string('file_path');

    table.string('attachment_id');
    table
      .string('status')
      .defaultTo(STATUS.ACTIVE)
      .notNullable();

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', `${TABLE.ATTACHMENT}_TENANT_ID_INDEX`);
    table.index('customer_id', `${TABLE.ATTACHMENT}_CUSTOMER_ID_INDEX`);
    table.index('status', `${TABLE.ATTACHMENT}_STATUS_INDEX`);
    table.index('deleted_on', `${TABLE.ATTACHMENT}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.ATTACHMENT);
}
