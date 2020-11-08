import * as Knex from 'knex';
import { TABLE } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.MODULE_PERMISSION_ROLE, table => {
    table.uuid('module_permission_id')
      .references('id')
      .inTable(TABLE.MODULE_PERMISSION)
      .onDelete('cascade');

    table.uuid('role_id')
      .references('id')
      .inTable(TABLE.ROLE)
      .onDelete('cascade');

    //composite primary key
    table.primary(['module_permission_id', 'role_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.MODULE_PERMISSION_ROLE);
}
