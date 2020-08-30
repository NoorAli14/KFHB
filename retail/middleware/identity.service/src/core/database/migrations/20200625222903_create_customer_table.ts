import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.CUSTOMER, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.string('first_name');
    table.string('middle_name');
    table.string('last_name');
    table.string('email');
    table.string('contact_no');
    table.string('gender');
    table.string('date_of_birth');
    table.string('national_id');
    table.string('nationality');

    table.string('target_user_id');
    table.uuid('tenant_id').notNullable();
    table.uuid('session_id');

    table.string('status');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on');
    table.string('deleted_by');

    table.index('session_id', 'IDT_CUSTOMER_SESSION_ID_INDEX');
    table.index('tenant_id', 'IDT_CUSTOMER_TENANT_ID_INDEX');
    table.index('email', 'IDT_CUSTOMER_EMAIL_INDEX');
    table.index('status', 'IDT_CUSTOMER_STATUS_INDEX');
    table.index('target_user_id', 'IDT_CUSTOMER_TARGET_USER_ID_INDEX');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.CUSTOMER);
}
