import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/';
export const up = (knex: Knex): any => {
  return knex.schema.createTable(TABLE.USER, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table.string('first_name');
    table.string('last_name');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
};

export const down = (knex: Knex): any => {
  return knex.schema.dropTable(TABLE.USER);
};
