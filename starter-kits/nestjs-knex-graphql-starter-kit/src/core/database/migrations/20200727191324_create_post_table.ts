import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.POST, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.text('description');
    table
      .uuid('user_id')
      .references('id')
      .inTable(TABLE.USER)
      .onDelete('cascade');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.POST);
}
