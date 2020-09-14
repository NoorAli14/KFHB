import * as Knex from 'knex';
import {
  TABLE,
  DOCUMENT_TYPES,
  CREATED_BY,
  DOCUMENT_TYPE_STATUSES,
} from '@rubix/common';

export async function seed(knex: Knex): Promise<any> {
  await knex(TABLE.DOCUMENT_TYPE).del();
  const documents: any = [];
  for (let name in DOCUMENT_TYPES) {
    documents.push({
      name: name,
      status: DOCUMENT_TYPE_STATUSES.ACTIVE,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    });
  }
  console.log(`${JSON.stringify(documents, null, 2)}`);
  return knex(TABLE.DOCUMENT_TYPE).insert(documents);
}
