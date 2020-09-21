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

export const FOREIGN_KEYS = {
  TemplateGQL: [],
  SectionGQL: ['template_id'],
  QuestionGQL: ['section_id'],
  OptionGQL: ['question_id'],
  TemplateQuestionGQL: ['template_id', 'section_id', 'question_id'],
  TemplateResponseGQL: [],
  AmlRequest: [],
  AmlResponse: ['request_id'],
};

export const DATABASE_UUID_METHOD = 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_COMPLIANCE_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
