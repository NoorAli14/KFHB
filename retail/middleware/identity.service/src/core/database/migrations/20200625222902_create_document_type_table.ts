import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, DOCUMENT_TYPE_STATUSES } from '@rubix/common';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.DOCUMENT_TYPE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('tenant_id').notNullable();

    table
      .string('name')
      .notNullable();
    table.string('record_type', 50).notNullable();
    table.boolean('is_required').defaultTo(false);
    table.string('status').defaultTo(DOCUMENT_TYPE_STATUSES.ACTIVE);

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', 'IDT_DOCUMENT_TYPE_TENANT_ID_INDEX');
    table.index('name', 'IDT_DOCUMENT_TYPE_NAME_INDEX');
    table.index('record_type', 'IDT_DOCUMENT_TYPE_RECORD_TYPE_INDEX');
    table.index('status', 'IDT_DOCUMENT_TYPE_STATUS_INDEX');

    table.unique(['name', 'tenant_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.DOCUMENT_TYPE);
}
