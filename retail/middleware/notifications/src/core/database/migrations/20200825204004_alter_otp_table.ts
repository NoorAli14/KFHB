import * as Knex from 'knex';
import { TABLE } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.string('updated_by').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.string('updated_by').notNullable();
  });
}
