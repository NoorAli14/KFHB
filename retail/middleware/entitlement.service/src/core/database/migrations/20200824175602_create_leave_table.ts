import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.LEAVE, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('user_id');
    table.string('calendar_day');
    table.string('holiday_type');
    table.string('holiday_details');
    table.integer('is_repetitive');
    table.string('remarks');
    table.string('status');
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');

    //foreign key
    table.foreign('user_id').references(`${TABLE.USER}.id`).onDelete('CASCADE');

    //index
    table.index(['calendar_day'], 'leave_calendar_day_index');
    table.index(['holiday_type'], 'leave_holiday_type_index');
    table.index(['is_repetitive'], 'leave_is_repetitive_index');
    table.index(['status'], 'leave_status_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.LEAVE);
}
