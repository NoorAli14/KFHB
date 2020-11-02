import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.string('payload')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.dropColumn('payload');
  });
}

