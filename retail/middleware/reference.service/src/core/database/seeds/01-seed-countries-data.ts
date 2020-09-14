import * as Knex from "knex";
import { TABLE, CREATED_BY, UPDATED_BY } from '@rubix/common/constants';
import { countries } from "@common/assets/countries";
import { nationalities } from "@common/assets/nationalities";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex(TABLE.COUNTRY).del();
    // Formats data according to db
    const formattedCountries = Object.entries(countries).map(([key, country]) => {
        return {
            name: country.name,
            iso_code: key,
            continent_code: country.continent,
            capital_name: country.capital,
            phone_code: country.phone,
            nationality: nationalities[key]?.nationality,
            created_by: CREATED_BY.SYSTEM,
            updated_by: UPDATED_BY.SYSTEM,
        }
    });
    // Inserts data to db in bulk
    await knex.batchInsert(TABLE.COUNTRY, formattedCountries);
};
