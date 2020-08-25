import * as Knex from 'knex';
import {TABLE} from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.USER, table => {
    table.string('date_of_birth').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.USER, table => {
    table.date('date_of_birth').alter();
  });
}
