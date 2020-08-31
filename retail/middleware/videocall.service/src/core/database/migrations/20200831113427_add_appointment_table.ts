import * as Knex from 'knex';
import {
  TABLE,
  DATABASE_UUID_METHOD,
  GENDER,
  APPOINTMENT_STATUS,
} from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.APPOINTMENT, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.dateTime('call_time').notNullable();
    table
      .enum('gender', Object.values(GENDER), {
        useNative: true,
        enumName: 'GENDER',
      })
      .notNullable();
    table
      .enum('status', Object.values(APPOINTMENT_STATUS), {
        useNative: true,
        enumName: 'APPOINTMENT_STATUS',
      })
      .notNullable();

    table.uuid('user_id');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.APPOINTMENT);
}
