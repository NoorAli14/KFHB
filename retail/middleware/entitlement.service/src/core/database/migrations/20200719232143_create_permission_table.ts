import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.PERMISSION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.string('record_type').notNullable();
    table
      .timestamp('created_on', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table.string('created_by').notNullable();

    //index
    table.index(['record_type'], `${TABLE.PERMISSION}_RECORD_TYPE_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.PERMISSION);
}
