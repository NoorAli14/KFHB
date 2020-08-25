import * as Knex from 'knex';
import {TABLE} from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.WORKING_WEEK, table => {
    table.dropIndex(['status'], 'role_status_index');
    table.index(['status'], 'working_week_status_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.WORKING_WEEK, table => {
    table.dropIndex(['status'], 'working_week_status_index');
    table.index(['status'], 'role_status_index');
  });
}
