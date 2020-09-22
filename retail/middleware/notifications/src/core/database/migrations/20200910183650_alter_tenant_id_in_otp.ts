import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(TABLE.OTP, table => {
    table.renameColumn('tenent_id', 'tenant_id')
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.OTP, table => {
    table.renameColumn('tenant_id', 'tenent_id')
  });
}
