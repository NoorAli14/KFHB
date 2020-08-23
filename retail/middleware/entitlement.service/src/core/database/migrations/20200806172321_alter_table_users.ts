import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.table(TABLE.USER, table =>  {
        table.string('token');
        table.timestamp('token_expiry');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.table(TABLE.USER, table =>  {
        table.dropColumn('token');
        table.dropColumn('token_expiry');
    });
}

