import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.string('updated_by').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.string('updated_by').notNullable();
  });
}
