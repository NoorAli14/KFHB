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

export const DATABASE_UUID_METHOD = (): string => 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_COMPLIANCE_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
