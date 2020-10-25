import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.renameColumn("next_step", "last_step")
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.renameColumn("last_step", "next_step")
    });
}
