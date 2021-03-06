import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/';
export const up = (knex: Knex): any => {
  return knex.schema.createTable(TABLE.COMMENT, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table.text('message');
    table
      .uuid('post_id')
      .references('id')
      .inTable(TABLE.POST)
      .onDelete('cascade');
    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.timestamp('updated_on').defaultTo(knex.fn.now());
  });
};

export const down = (knex: Knex): any => {
  return knex.schema.dropTable(TABLE.COMMENT);
};
