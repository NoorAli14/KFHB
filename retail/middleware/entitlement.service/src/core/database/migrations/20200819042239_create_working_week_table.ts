import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.WORKING_WEEK, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('week_day');
    table.time('start_time');
    table.time('end_time');
    table.integer('full_day');
    table.string('remarks');
    table.string('status');
    table.string('created_by');
    table.string('updated_by');
    table.string('deleted_by');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.timestamp('deleted_on');

    //index
    table.index(['week_day'], 'working_week_week_day_index');
    table.index(['status'], 'working_week_status_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.WORKING_WEEK);
}
