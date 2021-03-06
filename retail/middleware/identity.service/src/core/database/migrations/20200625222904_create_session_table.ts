import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.SESSION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table
      .uuid('customer_id')
      .references('id')
      .inTable(TABLE.CUSTOMER)
      .onDelete('cascade');
    table.uuid('tenant_id').notNullable();
    table.uuid('reference_id').notNullable();
    table.string('check_id').notNullable();
    table.string('target_user_id').notNullable();
    table.string('fido_reg_req_id').notNullable();
    table.text('fido_reg_req').notNullable();
    table.string('evaluation_id');

    table.string('status');

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', 'IDT_SESSION_TENANT_ID_INDEX');
    table.index('reference_id', 'IDT_SESSION_REFERENCE_ID_INDEX');
    table.index('target_user_id', 'IDT_SESSION_TARGET_USER_ID_INDEX');
    table.index('check_id', 'IDT_SESSION_TARGET_CHECK_ID_INDEX');
    table.index('evaluation_id', 'IDT_SESSION_EVALUATION_ID_INDEX');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.SESSION);
}
