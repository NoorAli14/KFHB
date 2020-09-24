import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE.SECTION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));

    table.uuid('tenant_id').notNullable();
    table.string('name');

    table.string('name_ar');
    table.string('level').notNullable();

    table
      .uuid('template_id')
      .references('id')
      .inTable(TABLE.TEMPLATE)
      .onDelete('cascade');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on');
    table.string('deleted_by');

    table.index('tenant_id', `${TABLE.SECTION}_TENDANT_ID_INDEX`);
    table.index('name', `${TABLE.SECTION}_NAME_INDEX`);
    table.index('name_ar', `${TABLE.SECTION}_NAME_AR_INDEX`);
    table.index('deleted_on', `${TABLE.SECTION}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.SECTION);
}
