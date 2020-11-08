import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.WORKING_WEEK, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
    table.uuid('tenant_id').notNullable();
    table.string('week_day').notNullable();
    table.string('start_time_local');
    table.string('end_time_local');
    table.integer('full_day');
    table.string('remarks');
    table.string('status').defaultTo(STATUS.ACTIVE).notNullable();
    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now()).notNullable();
    table.string('created_by').notNullable();
    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');
    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    //index
    table.index(['week_day'], `${TABLE.WORKING_WEEK}_WEEK_DAY_INDEX`);
    table.index(['status'], `${TABLE.WORKING_WEEK}_STATUS_INDEX`);
    table.index(['tenant_id'], `${TABLE.WORKING_WEEK}_TENANT_ID_INDEX`);
    table.index(
      ['start_time_local'],
      `${TABLE.WORKING_WEEK}_START_TIME_LOCAL_INDEX`,
    );
    table.index(
      ['end_time_local'],
      `${TABLE.WORKING_WEEK}_END_TIME_LOCAL_INDEX`,
    );
    table.index(['deleted_on'], `${TABLE.WORKING_WEEK}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.WORKING_WEEK);
}
