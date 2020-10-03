import * as Knex from 'knex';
import {
  TABLE,
  DOCUMENT_TYPES,
  CREATED_BY,
  DOCUMENT_TYPE_STATUSES,
  SEED_DOCUMENTS_lIST
} from '@rubix/common';

export async function seed(knex: Knex): Promise<any> {
  await knex(TABLE.DOCUMENT_TYPE).del();
  const documents: any = SEED_DOCUMENTS_lIST.map(document => {
    return { ...document, ...{ tenant_id: process.env.ENV_RBX_TENANT_ID, created_by: CREATED_BY.SYSTEM, updated_by: CREATED_BY.SYSTEM } }
  });
  // for (let name in DOCUMENT_TYPES) {
  //   documents.push({
  //     name: name,
  //     tenant_id: process.env.RBX_TENANT_ID,
  //     status: DOCUMENT_TYPE_STATUSES.ACTIVE,
  //     created_by: CREATED_BY.SYSTEM,
  //     updated_by: CREATED_BY.SYSTEM,
  //   });
  // }
  console.log(`${JSON.stringify(documents, null, 2)}`);
  return knex(TABLE.DOCUMENT_TYPE).insert(documents);
}
