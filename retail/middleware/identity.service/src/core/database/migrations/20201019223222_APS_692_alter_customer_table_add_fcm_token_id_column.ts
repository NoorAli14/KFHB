import * as Knex from "knex";
import {TABLE} from "@common/constants";

export function up(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.string('fcm_token_id');
        table.index(['fcm_token_id'], `${TABLE.CUSTOMER}_FCM_TOKEN_ID_INDEX`);
    });
}

export function down(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.dropIndex(['fcm_token_id'], `${TABLE.CUSTOMER}_FCM_TOKEN_ID_INDEX`);
        table.dropColumn('fcm_token_id');
    });
}
