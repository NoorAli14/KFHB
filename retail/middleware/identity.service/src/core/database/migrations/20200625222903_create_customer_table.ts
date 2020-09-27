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
    table.string('national_id_no');
    table.string('national_id_expiry');

    table.string('nationality');
    table.string('nationality_code');
    table.string('device_id');
    table.string('platform');

    table.uuid('tenant_id').notNullable();
    table.uuid('session_id');

    table.string('next_step');

    table.boolean('is_aml_verified').defaultTo(false);
    table.boolean('is_email_verified').defaultTo(false);
    table.boolean('is_contact_no_verified').defaultTo(false);
    table.boolean('is_evaluation_verified');

    table.string('status');

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('session_id', 'IDT_CUSTOMER_SESSION_ID_INDEX');
    table.index('tenant_id', 'IDT_CUSTOMER_TENANT_ID_INDEX');
    table.index('email', 'IDT_CUSTOMER_EMAIL_INDEX');
    table.index('national_id_no', 'IDT_CUSTOMER_NATIONAL_ID_NO_INDEX');
    table.index('nationality_code', 'IDT_CUSTOMER_NATIONALITY_CODE_INDEX');
    table.index('device_id', 'IDT_CUSTOMER_DEVICE_ID_INDEX');
    table.index('status', 'IDT_CUSTOMER_STATUS_INDEX');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.CUSTOMER);
}
