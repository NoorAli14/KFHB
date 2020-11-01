import * as Knex from 'knex';
import { TABLE, CREATED_BY, SEED_DOCUMENTS_lIST } from '@rubix/common';

export async function seed(knex: Knex): Promise<any> {
  return processSeed(knex, false);
}

export async function processSeed(
  knex: Knex,
  generateSql = true,
): Promise<any> {
  // Formats data according to db
  const documents = SEED_DOCUMENTS_lIST.map(document => {
    return {
      name: document.name,
      record_type: document.record_type,
      is_required: Number(document.is_required),
      tenant_id: process.env.ENV_RBX_TENANT_ID,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    };
  });
  // Deletes ALL existing entries
  const deleteDocuments = () => knex(TABLE.DOCUMENT_TYPE).del();
  // Insert Data into DB
  const insertDocuments = () => knex(TABLE.DOCUMENT_TYPE).insert(documents);

  if (generateSql) {
    let sql = '';
    sql += `${deleteDocuments().toString()};\r\n\n`;
    sql += `${insertDocuments().toString()};\r\n\n`;
    return sql;
  }

  await deleteDocuments();
  return knex(TABLE.DOCUMENT_TYPE).insert(documents);
}
