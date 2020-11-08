import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export function up(knex: Knex): any {
  return knex.schema.alterTable(TABLE.NOTIFY, table => {
    table.text('payload').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.NOTIFY, table => {
    table.string('payload',4000).alter();
  });
}

