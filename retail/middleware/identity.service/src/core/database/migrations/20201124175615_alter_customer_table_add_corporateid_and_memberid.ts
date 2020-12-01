import * as Knex from "knex";
import {TABLE} from "@common/constants";

export function up(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.string('entity_id');
        table.string('entity_member_id');
        table.index(['entity_id'], `${TABLE.CUSTOMER}_ENTITY_ID_INDEX`);
        table.index(['entity_member_id'], `${TABLE.CUSTOMER}_ENTITY_MEMBER_ID_INDEX`);
    });
}

export function down(knex: Knex): any {
    return knex.schema.table(TABLE.CUSTOMER, table =>  {
        table.dropIndex(['entity_member_id'], `${TABLE.CUSTOMER}_ENTITY_MEMBER_ID_INDEX`);
        table.dropIndex(['entity_id'], `${TABLE.CUSTOMER}_ENTITY_ID_INDEX`);
        table.dropColumn('entity_member_id');
        table.dropColumn('entity_id');
    });
}
