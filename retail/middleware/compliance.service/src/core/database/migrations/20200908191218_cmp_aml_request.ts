import * as Knex from 'knex';
import { TABLE, AML_REQUEST_STATUSES } from '@common/constants';
import { DATABASE_UUID_METHOD } from '@common/utilities';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE.AML_REQUEST, table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(DATABASE_UUID_METHOD(knex));

    table.uuid('tenant_id').notNullable();
    table.uuid('user_id').notNullable();

    table.text('aml_text');
    table.string('request_reference');

    table.string('remarks');
    table.string('status').defaultTo(AML_REQUEST_STATUSES.PENDING);

    table.timestamp('created_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('created_by');

    table.timestamp('updated_on', { useTz: true }).defaultTo(knex.fn.now());
    table.string('updated_by');

    table.timestamp('deleted_on', { useTz: true });
    table.string('deleted_by');

    table.index('user_id', `${TABLE.AML_REQUEST}_USER_ID_INDEX`);
    table.index('status', `${TABLE.AML_REQUEST}_STATUS_INDEX`);
    table.index('tenant_id', `${TABLE.AML_REQUEST}_TENDANT_ID_INDEX`);
    table.index('deleted_on', `${TABLE.AML_REQUEST}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE.AML_REQUEST);
}
