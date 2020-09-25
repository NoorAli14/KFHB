import * as Knex from 'knex';
import {DATABASE_UUID_METHOD, TABLE} from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.MODULE_PERMISSION, table => {
    table.uuid('id').primary().defaultTo(knex.raw(DATABASE_UUID_METHOD));
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
    table.timestamp('created_on', {useTz: true}).defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    //composite unique
    table.unique(['module_id', 'permission_id'])
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.MODULE_PERMISSION);
}
