import * as Knex from 'knex';
import { TABLE } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.dropColumn('text');
    table.string('token')
    table.string('message_title').notNullable();
    table.string('message_body').notNullable();
    table.string('image_url')
    table.string('action')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.string('text').notNullable();
    table.dropColumn('token');
    table.dropColumn('message_title');
    table.dropColumn('message_body');
    table.dropColumn('image_url');
    table.dropColumn('action');
  });
}

