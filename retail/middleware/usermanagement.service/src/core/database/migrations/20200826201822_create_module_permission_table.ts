import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.MODULE_PERMISSION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table
      .uuid('module_id')
      .references('id')
      .inTable(TABLE.MODULE)
      .onDelete('cascade');
    table
      .uuid('permission_id')
      .references('id')
      .inTable(TABLE.PERMISSION)
      .onDelete('cascade');
    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    //composite unique
    table.unique(['module_id', 'permission_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.MODULE_PERMISSION);
}
