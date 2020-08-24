import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table =>  {
    table.string('invitation_token');
    table.timestamp('invitation_token_expiry');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.USER, table =>  {
    table.dropColumn('invitation_token');
    table.dropColumn('invitation_token_expiry');
  });
}
