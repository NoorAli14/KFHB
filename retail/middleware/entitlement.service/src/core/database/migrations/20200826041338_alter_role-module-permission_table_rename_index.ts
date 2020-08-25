import * as Knex from 'knex';
import {TABLE} from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.ROLE_MODULE_PERMISSION, table => {
    table.dropIndex(['status'], 'role_module_status_index');
    table.index(['status'], 'role_module_permission_status_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.ROLE_MODULE_PERMISSION, table => {
    table.dropIndex(['status'], 'role_module_permission_status_index');
    table.index(['status'], 'role_module_status_index');
  });
}
