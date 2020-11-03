import * as Knex from 'knex';
import { TABLE, CREATED_BY, UPDATED_BY } from '@rubix/common/constants';
import { countries } from '@common/assets/countries';
import { nationalities } from '@common/assets/nationalities';

export async function seed(knex: Knex): Promise<any> {
  return processSeed(knex, false);
}

export async function processSeed(
  knex: Knex,
  generateSql = true,
): Promise<any> {
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
    };
  });
  // Insert Data into DB
  const insertCountries = () =>
    knex(TABLE.COUNTRY).insert(formattedCountries);

  if (generateSql) {
    let sql = '';
    sql += `${insertCountries().toString()};\r\n\n`;
    return sql;
  }
  return insertCountries();
}
