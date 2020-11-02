import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.MODULE, table => {
    table.string('slug');
    table.index(['slug'], `${TABLE.MODULE}_SLUG_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.MODULE, table => {
    table.dropIndex(['slug'], `${TABLE.MODULE}_SLUG_INDEX`);
    table.dropColumn('slug');
  });
}
