import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export function up(knex: Knex): any {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.string('payload')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.NOTIFY, table => {
    table.dropColumn('payload');
  });
}

