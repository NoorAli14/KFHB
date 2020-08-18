import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.OTP, table => {
    table.increments();
    table.string('user_id').notNullable();
    table.string('delivery_mode').notNullable();
    table.string('mobile_no');
    table.string('email');
    table.string('otp_code').notNullable();
    table.string('status').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();
    table.timestamp('deleted_on');
    table.string('deleted_by')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.OTP);
}