import * as Knex from 'knex';
import { TABLE } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.dropColumn('token');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.string('token');
  });
}

