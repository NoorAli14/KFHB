import * as Knex from 'knex';
import { TABLE, DOCUMENT_TYPES, CREATED_BY } from '@rubix/common';

export async function seed(knex: Knex): Promise<any> {
  const documents: any = DOCUMENT_TYPES.map(t => {
    return {
      name: t,
      status: 'ACTIVE',
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    };
  });
  return knex(TABLE.DOCUMENT_TYPE).insert(documents);
}
