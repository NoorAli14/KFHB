import * as Knex from 'knex';
import { TABLE } from '@common/constants';
import { uuidV4 } from '@common/utilities';
import { Template } from '@app/v1/templates/template.model';
import { Section } from '@app/v1/sections/section.model';
import { Question } from '@app/v1/questions/question.model';
import { Option } from '@app/v1/options/option.model';
import { TemplateQuestion } from '@app/v1/template-questions/template-question.model';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.TEMPLATE).del();

  const templates: Template[] = [
    { id: uuidV4(), name: 'FATCA' },
    { id: uuidV4(), name: 'CRS' },
    { id: uuidV4(), name: 'KYC' },
  ];
  const sections: Section[] = [
    { id: uuidV4(), name: 'Section 1', level: 'level 1' },
    { id: uuidV4(), name: 'Section 2', level: 'level 2' },
  ];
  const questions: Question[] = [
    { id: uuidV4(), title: 'Question 1', type: 'checkbox' },
    { id: uuidV4(), title: 'Question 2', type: 'text' },
    { id: uuidV4(), title: 'Question 3', type: 'text' },
  ];
  const options: Option[] = [
    { id: uuidV4(), name: 'TRUE', question_id: questions[0].id },
    { id: uuidV4(), name: 'FALSE', question_id: questions[0].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[1].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[2].id },
  ];

  const template_questions: TemplateQuestion[] = [
    {
      id: uuidV4(),
      rules: 'TEXT',
      status: true,
      template_id: templates[2].id,
      section_id: sections[0].id,
      question_id: questions[0].id,
    },
    {
      id: uuidV4(),
      rules: 'TEXT',
      status: true,
      template_id: templates[2].id,
      section_id: sections[0].id,
      question_id: questions[0].id,
    },
    {
      id: uuidV4(),
      rules: 'TEXT',
      status: true,
      template_id: templates[2].id,
      section_id: sections[0].id,
      question_id: questions[0].id,
    },
  ];

  // Inserts seed entries
  await knex(TABLE.TEMPLATE).insert(templates);

  await knex(TABLE.QUESTION).insert(questions);

  await knex(TABLE.SECTION).insert(sections);

  await knex(TABLE.OPTION).insert(options);

  await knex(TABLE.TEMPLATE_QUESTIONS).insert(template_questions);
}
