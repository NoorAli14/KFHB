import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export function up(knex: Knex) {
  return knex.schema.alterTable(TABLE.TEMPLATE_RESPONSE, table => {
    table.uuid('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE.TEMPLATE_RESPONSE, table => {
    table.dropColumn('user_id');
  });
}
