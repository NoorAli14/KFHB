import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.USER_ROLE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));

    table
      .uuid('user_id')
      .references('id')
      .inTable(TABLE.USER)
      .onDelete('cascade');

    table
      .uuid('role_id')
      .references('id')
      .inTable(TABLE.ROLE)
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.USER_ROLE);
}
