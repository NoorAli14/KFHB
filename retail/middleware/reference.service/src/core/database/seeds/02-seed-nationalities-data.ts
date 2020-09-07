import * as Knex from "knex";
import { TABLE } from '@rubix/common/constants';
import { nationalities } from "@common/assets/nationalities";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex(TABLE.NATIONALITY).del();
    // Formats data according to db
    const formattedNationalities = Object.entries(nationalities).map(([key, nationality]) => {
        return {
            name: nationality,
            country_code: key,
            created_by: 'SYSTEM',
            updated_by: 'SYSTEM',
        }
    });
    // Inserts data to db in bulk
    await knex.batchInsert(TABLE.NATIONALITY, formattedNationalities);
};
