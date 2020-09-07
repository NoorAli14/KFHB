import * as Knex from "knex";
import { TABLE } from '@rubix/common/constants';
import { countries } from "@common/assets/countries";

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
            currency_code: country.currency,
        }
    });
    // Inserts data to db in bulk
    await knex.batchInsert(TABLE.COUNTRY, formattedCountries);
};
