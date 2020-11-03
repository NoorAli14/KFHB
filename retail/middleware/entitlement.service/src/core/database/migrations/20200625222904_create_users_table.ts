import * as Knex from 'knex';
import { TABLE, DATABASE_UUID_METHOD } from '@common/index';
export function up(knex: Knex): any {
  return knex.schema.createTable(TABLE.USER, table => {
    table.uuid('id').primary().defaultTo(DATABASE_UUID_METHOD(knex));
    table.uuid('tenant_id').notNullable();
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('middle_name');
    table.string('email').notNullable();
    table.string('contact_no');
    table.string('password_digest');
    table.string('gender');
    table.string('date_of_birth');
    table.string('nationality_id');
    table.boolean('is_owner').defaultTo(false);
    table.string('status').notNullable();
    table.string('password_reset_token');
    table.timestamp('password_reset_token_expiry', { useTz: true });
    table.string('invitation_token');
    table.timestamp('invitation_token_expiry', { useTz: true });
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
    table.index(['username'], `${TABLE.USER}_USERNAME_INDEX`);
    table.index(['email'], `${TABLE.USER}_EMAIL_INDEX`);
    table.index(['nationality_id'], `${TABLE.USER}_NATIONALITY_ID_INDEX`);
    table.index(['status'], `${TABLE.USER}_STATUS_INDEX`);
    table.index(['gender'], `${TABLE.USER}_GENDER_INDEX`);
    table.index(['contact_no'], `${TABLE.USER}_CONTACT_NO_INDEX`);
    table.index(['is_owner'], `${TABLE.USER}_IS_OWNER_INDEX`);
    table.index(['tenant_id'], `${TABLE.USER}_TENANT_ID_INDEX`);
    table.index(
      ['password_reset_token'],
      `${TABLE.USER}_PASSWORD_RESET_TOKEN_INDEX`,
    );
    table.index(['invitation_token'], `${TABLE.USER}_INVITATION_TOKEN_INDEX`);
    table.index(['deleted_on'], `${TABLE.USER}_DELETED_ON_INDEX`);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE.USER);
}
