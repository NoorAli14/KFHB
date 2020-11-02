import * as Knex from 'knex';
import { TABLE } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table => {
    table.dropIndex(['username'], `${TABLE.USER}_USERNAME_INDEX`);

    table.dropColumn('username');
    table.date('date_of_birth').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table => {
    table.string('date_of_birth').alter();
    table.string('username');

    table.index(['username'], `${TABLE.USER}_USERNAME_INDEX`);
  });
}
