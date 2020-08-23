import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@rubix/common/constants';
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE.SESSION, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw(DATABASE_UUID_METHOD));
    table.uuid('user_id').notNullable();
    table.uuid('tenant_id').notNullable();
    table.uuid('reference_id').notNullable();
    table.string('target_user_id').notNullable();
    table.string('check_id');

    table.string('status');

    table.timestamp('created_on').defaultTo(knex.fn.now());
    table.string('created_by').notNullable();

    table.timestamp('updated_on').defaultTo(knex.fn.now());
    table.string('updated_by').notNullable();

    table.timestamp('deleted_on');
    table.string('deleted_by');

    table.index('user_id', 'IDT_SESSION_USER_ID_INDEX');
    table.index('tenant_id', 'IDT_SESSION_TENANT_ID_INDEX');
    table.index('reference_id', 'IDT_SESSION_REFERENCE_ID_INDEX');
    table.index('target_user_id', 'IDT_SESSION_TARGET_USER_ID_INDEX');
    table.index('check_id', 'IDT_SESSION_TARGET_CHECK_ID_INDEX');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.SESSION);
}
