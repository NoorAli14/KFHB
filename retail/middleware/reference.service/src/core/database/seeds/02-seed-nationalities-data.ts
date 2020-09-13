import * as Knex from "knex";
import { TABLE, CREATED_BY, UPDATED_BY } from '@rubix/common/constants';
import { nationalities } from "@common/assets/nationalities";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex(TABLE.NATIONALITY).del();
    // Formats data according to db
    const formattedNationalities = Object.entries(nationalities).map(([key, nationality]) => {
        return {
            name: nationality,
            country_code: key,
            created_by: CREATED_BY.SYSTEM,
            updated_by: UPDATED_BY.SYSTEM,
        }
    });
    // Inserts data to db in bulk
    await knex.batchInsert(TABLE.NATIONALITY, formattedNationalities);
};
