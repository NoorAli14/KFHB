import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table => {
    table.string('entity_id');
    table.index(['entity_id'], `${TABLE.USER}_ENTITY_ID_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table => {
    table.dropIndex(['entity_id'], `${TABLE.USER}_ENTITY_ID_INDEX`);
    table.dropColumn('entity_id');
  });
}
