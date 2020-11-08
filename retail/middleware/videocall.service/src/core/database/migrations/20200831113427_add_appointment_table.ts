import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common';

export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.APPOINTMENT, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));

    table.uuid('tenant_id').notNullable();
    table.uuid('user_id').notNullable();

    table.timestamp('call_time', { useTz: true }).notNullable();
    table.string('gender');
    table.string('status');

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('tenant_id', `${TABLE.APPOINTMENT}_TENANT_ID_INDEX`);
    table.index('user_id', `${TABLE.APPOINTMENT}_USER_ID_INDEX`);
    table.index('gender', `${TABLE.APPOINTMENT}_GENDER_INDEX`);
    table.index('status', `${TABLE.APPOINTMENT}_STATUS_INDEX`);
    table.index('deleted_on', `${TABLE.APPOINTMENT}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.APPOINTMENT);
}
