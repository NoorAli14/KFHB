export enum TABLE {
  TEMPLATE = 'CMP_TEMPLATE',
  QUESTION = 'CMP_QUESTION',
  SECTION = 'CMP_SECTION',
  OPTION = 'CMP_OPTION',
  TEMPLATE_QUESTIONS = 'CMP_TEMPLATE_QUESTIONS',
  TEMPLATE_RESPONSE = 'CMP_TEMPLATE_RESPONSES',
  AML_REQUEST = 'CMP_AML_REQUEST',
  AML_RESPONSE = 'CMP_AML_RESPONSE',
}

export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';

export const CREATED_BY: Record<string, string> = {
  SYSTEM: 'SYSTEM',
  API: 'API',
};

export const FOREIGN_KEYS = {
  Template: [],
  Section: ['template_id'],
  Question: ['section_id'],
  Option: ['question_id'],
  TemplateQuestionGQL: ['template_id', 'section_id', 'question_id'],
  TemplateResponse: [],
  AmlRequest: [],
  AmlResponse: ['request_id'],
};

export const STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f00';
export const X_CORRELATION_KEY = 'x-correlation-id';

export const DATABASE_UUID_METHOD = (): string => 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_COMPLIANCE_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
export const AML_REQUEST_STATUSES = {
  CLEAN: 'CLEAN',
  SUSPECT: 'SUSPECT',
  BLOCK: 'BLOCK',
};

export const OPTION_QUERY = `id name name_ar status created_on created_by updated_on updated_by`;

export const QUESTION_QUERY = `id title title_ar type rules status created_on created_by updated_on updated_by options {${OPTION_QUERY}}`;

export const SECTION_QUERY = `id tenant_id name name_ar level status created_on created_by updated_on updated_by questions {${QUESTION_QUERY}}`;

export const TEMPLATE_QUERY = `id name name_ar status created_on created_by updated_on updated_by sections {${SECTION_QUERY}}`;
