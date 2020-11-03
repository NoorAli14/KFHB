import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.OTP, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
    table.uuid('user_id').notNullable();
    table.uuid('tenent_id').notNullable();
    table.string('delivery_mode').notNullable();
    table.string('mobile_no');
    table.string('email');
    table.string('otp_code').notNullable();
    table.string('status').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    // table.foreign('user_id').references(`${TABLE.USER}.id`).onDelete('CASCADE');
    // table.foreign('tenent_id').references(`${TABLE.USER}.id`).onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists(TABLE.OTP);
}