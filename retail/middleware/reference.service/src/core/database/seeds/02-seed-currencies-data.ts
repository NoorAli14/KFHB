import * as Knex from "knex";
import { TABLE, CREATED_BY, UPDATED_BY } from '@rubix/common/constants';
import { currencies } from "@common/assets/currencies";

export async function seed(knex: Knex): Promise<any> {
    return processSeed(knex, false);
  }
  
  export async function processSeed(
    knex: Knex,
    generateSql = true,
  ): Promise<any> {
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
    // Deletes ALL existing entries
    const deleteCurrencies = () =>  knex(TABLE.CURRENCY).del();
    // Insert Data into DB
    const insertCurrencies = () =>
    knex(TABLE.CURRENCY).insert(formattedCurrencies);
  
    if (generateSql) {
      let sql = '';
      sql += `${deleteCurrencies().toString()};\r\n\n`;
      sql += `${insertCurrencies().toString()};\r\n\n`;
      return sql;
    }
  
    await deleteCurrencies();
    return insertCurrencies();
  }
