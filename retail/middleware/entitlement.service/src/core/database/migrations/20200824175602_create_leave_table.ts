import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, STATUS } from '@common/constants';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.LEAVE, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('tenant_id').notNullable();
    table.uuid('leave_type_id').notNullable();
    table.uuid('user_id').notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
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

    //foreign key
    table
      .foreign('user_id')
      .references(`${TABLE.USER}.id`)
      .onDelete('CASCADE');
    table
      .foreign('leave_type_id')
      .references(`${TABLE.LEAVE_TYPE}.id`)
      .onDelete('CASCADE');

    //index
    table.index(['start_date'], `${TABLE.LEAVE}_START_DATE_INDEX`);
    table.index(['end_date'], `${TABLE.LEAVE}_END_DATE_INDEX`);
    table.index(['tenant_id'], `${TABLE.LEAVE}_TENANT_ID_INDEX`);
    table.index(['status'], `${TABLE.LEAVE}_STATUS_INDEX`);
    table.index(['deleted_on'], `${TABLE.LEAVE}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.LEAVE);
}
