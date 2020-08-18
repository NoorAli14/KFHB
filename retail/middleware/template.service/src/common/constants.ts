export enum TABLE {
  TEMPLATE = 'CMP_TEMPLATE',
  QUESTION = 'CMP_QUESTION',
  SECTION = 'CMP_SECTION',
  OPTION = 'CMP_OPTION',
  TEMPLATE_RESPONSE = 'CMP_TEMPLATE_RESPONSES',
}

export const FOREIGN_KEYS = {
  TemplateGQL: [],
  SectionGQL: ['template_id'],
  QuestionGQL: ['section_id'],
  OptionGQL: ['question_id'],
  TemplateResponseGQL: [],
};

export const DATABASE_UUID_METHOD = 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_TEMPLATE_MIGRATION';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
