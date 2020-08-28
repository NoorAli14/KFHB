import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.USER, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('tenant_id');
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('middle_name');
    table.string('email');
    table.string('contact_no');
    table.string('password_digest');
    table.string('gender');
    table.string('date_of_birth');
    table.string('nationality_id');
    table.boolean('is_owner').defaultTo(false);
    table.string('status');
    table.string('password_reset_token');
    table.timestamp('password_reset_token_expiry');
    table.string('invitation_token');
    table.timestamp('invitation_token_expiry');
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');

    //index
    table.index(['username'], 'user_username_index');
    table.index(['email'], 'user_email_index');
    table.index(['nationality_id'], 'user_nationality_id_index');
    table.index(['status'], 'user_status_index');
    table.index(['contact_no'], 'user_contact_no_index');
    table.index(['is_owner'], 'user_is_owner_index');
    table.index(['tenant_id'], 'user_tenant_id_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.USER);
}
