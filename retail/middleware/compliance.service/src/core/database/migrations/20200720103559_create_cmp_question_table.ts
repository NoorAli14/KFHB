import * as Knex from 'knex';
import { TABLE, STATUSES } from '@common/constants';
import { DATABASE_UUID_METHOD } from '@common/utilities';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE.QUESTION, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));


    table.uuid('tenant_id').notNullable();
    table.string('title');

    table.string('title_ar');
    table.string('type');

    table.string('rules');
    table.string('status').defaultTo(STATUSES.ACTIVE);

    table
      .uuid('section_id')
      .references('id')
      .inTable(TABLE.SECTION)
      .onDelete('cascade');

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', `${TABLE.QUESTION}_TENDANT_ID_INDEX`);
    table.index('type', `${TABLE.QUESTION}_TYPE_INDEX`);
    table.index('status', `${TABLE.QUESTION}_STATUS_INDEX`);
    table.index('deleted_on', `${TABLE.QUESTION}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.QUESTION);
}
