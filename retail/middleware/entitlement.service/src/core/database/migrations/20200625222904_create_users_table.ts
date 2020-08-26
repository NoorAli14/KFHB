import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.USER, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('middle_name');
    table.string('email');
    table.string('contact_no');
    table.string('password_digest');
    table.string('gender');
    table.date('date_of_birth');
    table.string('nationality_id');
    table.string('status');
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
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.USER);
}
