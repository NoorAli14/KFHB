import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.dropColumn('mobile_no');
    table.dropColumn('email');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.string('mobile_no');
    table.string('email');
  });
}
