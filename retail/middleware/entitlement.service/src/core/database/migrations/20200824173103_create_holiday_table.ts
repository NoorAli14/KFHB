import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.HOLIDAY, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('tenant_id').notNullable();
    table.date('holiday_date').notNullable();
    table.string('description');
    table.string('remarks');
    table
      .string('status')
      .defaultTo(STATUS.ACTIVE)
      .notNullable();
    table
      .timestamp('created_on', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table.string('created_by').notNullable();
    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');
    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    //index
    table.index(['status'], `${TABLE.HOLIDAY}_STATUS_INDEX`);
    table.index(['tenant_id'], `${TABLE.HOLIDAY}_TENANT_ID_INDEX`);
    table.index(['holiday_date'], `${TABLE.HOLIDAY}_HOLIDAY_DATE_INDEX`);
    table.index(['deleted_on'], `${TABLE.HOLIDAY}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.HOLIDAY);
}
