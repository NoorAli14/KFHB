import * as Knex from "knex";
import {TABLE} from "@common/constants";

export function up(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.renameColumn("next_step", "last_step")
    });
}

export function down(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.renameColumn("last_step", "next_step")
    });
}
