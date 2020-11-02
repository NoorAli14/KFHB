import * as Knex from 'knex';
import { DATABASE_UUID_METHOD, TABLE } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.USER_ROLE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

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
