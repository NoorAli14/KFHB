import * as Knex from "knex";
import { TABLE, CREATED_BY, UPDATED_BY } from '@rubix/common/constants';
import { currencies } from "@common/assets/currencies";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex(TABLE.CURRENCY).del();
    // Formats data according to db
    const formattedCurrencies = Object.entries(currencies).map(([key, currency]) => {
        return {
            name: currency.currency,
            iso_code: key,
            numeric_code: currency.numericCode,
            minor_unit: currency.minorUnit,
            created_by: CREATED_BY.SYSTEM,
            updated_by: UPDATED_BY.SYSTEM,
        }
    });
    // Inserts data to db in bulk
    await knex.batchInsert(TABLE.CURRENCY, formattedCurrencies);
};
