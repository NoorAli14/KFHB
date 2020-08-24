import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table =>  {
    table.renameColumn('token', 'password_reset_token');
    table.renameColumn('token_expiry', 'password_reset_token_expiry');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table =>  {
    table.renameColumn('password_reset_token_expiry', 'token_expiry');
    table.renameColumn('password_reset_token', 'token');
  });
}
