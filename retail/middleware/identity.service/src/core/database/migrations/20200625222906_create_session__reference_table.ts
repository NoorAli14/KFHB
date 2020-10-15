import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.SESSION_REFERENCE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table.uuid('tenant_id').notNullable();
    table
      .uuid('session_id')
      .references('id')
      .inTable(TABLE.SESSION)
      .onDelete('cascade');
    table
      .uuid('document_type_id')
      .references('id')
      .inTable(TABLE.DOCUMENT_TYPE)
      .onDelete('cascade');
    table.string('attachable_id').notNullable();

    table.string('status').notNullable();
    table.text('processed_data');
    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', 'IDT_SESSION_REFERENCE_TENANT_ID_INDEX');
    table.index('attachable_id', 'IDT_SESSION_REFERENCE_ATTACHABLE_ID_INDEX');
    table.index('status', 'IDT_SESSION_REFERENCE_STATUS_INDEX');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.SESSION_REFERENCE);
}
