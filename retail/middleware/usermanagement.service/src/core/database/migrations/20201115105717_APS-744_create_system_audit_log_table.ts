import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD, TEMP_ROLE } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.SYSTEM_AUDIT_LOG, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));
    table.uuid('tenant_id').notNullable();
    table
      .uuid('user_id')
      .references('id')
      .inTable(TABLE.USER)
      .onDelete('cascade');
    table.string('audit_code').notNullable();
    table.string('audit_text');
    table
      .timestamp('created_on', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .string('created_by')
      .notNullable()
      .defaultTo(TEMP_ROLE.SYSTEM);

    //index
    table.index(['tenant_id'], `${TABLE.SYSTEM_AUDIT_LOG}_TENANT_ID_INDEX`);
    table.index(['user_id'], `${TABLE.SYSTEM_AUDIT_LOG}_USER_ID_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.SYSTEM_AUDIT_LOG);
}
