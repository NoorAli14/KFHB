import * as Knex from 'knex';
import { TABLE, STATUSES } from '@common/constants';
import { DATABASE_UUID_METHOD } from '@common/utilities';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE.TEMPLATE_RESPONSE, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));

    table.uuid('tenant_id').notNullable();

    table
      .uuid('template_id')
      .references('id')
      .inTable(TABLE.TEMPLATE)
      .onDelete('cascade');

    table.text('results').notNullable();
    table.string('remarks').notNullable();

    table.string('status').defaultTo(STATUSES.ACTIVE);
    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', `${TABLE.TEMPLATE_RESPONSE}_TENDANT_ID_INDEX`);
    table.index('status', `${TABLE.TEMPLATE_RESPONSE}_STATUS_INDEX`);
    table.index('deleted_on', `${TABLE.TEMPLATE_RESPONSE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.TEMPLATE_RESPONSE);
}
