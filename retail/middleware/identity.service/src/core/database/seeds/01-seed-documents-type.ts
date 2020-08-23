import * as Knex from 'knex';
import { TABLE, DOCUMENT_TYPES } from '@rubix/common/constants';
export async function seed(knex: Knex): Promise<any> {
  const documents: any = DOCUMENT_TYPES.map(t => {
    return {
      name: t,
      status: 'ACTIVE',
      created_by: 'SYSTEM',
      updated_by: 'SYSTEM',
    };
  });
  return knex(TABLE.DOCUMENT_TYPE).insert(documents);
}
