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
    {
      id: uuidV4(),
      name: 'Template 1 Section 1',
      level: 'level 1',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 3',
      level: 'level 3',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 1',
      level: 'level 1',
      template_id: templates[1].id,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 2',
      level: 'level 2',
      template_id: templates[1].id,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 1',
      level: 'level 1',
      template_id: templates[2].id,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 2',
      level: 'level 2',
      template_id: templates[2].id,
    },
  ];
  const questions: Question[] = [
    {
      id: uuidV4(),
      title: 'Question 1',
      type: 'checkbox',
      rules: '{required: true}',
      status: true,
      section_id: sections[0].id,
    },
    {
      id: uuidV4(),
      title: 'Question 2',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[1].id,
    },
    {
      id: uuidV4(),
      title: 'Question 3',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[2].id,
    },
    {
      id: uuidV4(),
      title: 'Question 4',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[3].id,
    },
    {
      id: uuidV4(),
      title: 'Question 5',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[4].id,
    },
    {
      id: uuidV4(),
      title: 'Question 6',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[5].id,
    },
    {
      id: uuidV4(),
      title: 'Question 7',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[6].id,
    },
  ];
  const options: Option[] = [
    { id: uuidV4(), name: 'TRUE', question_id: questions[0].id },
    { id: uuidV4(), name: 'FALSE', question_id: questions[0].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[1].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[2].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[3].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[4].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[5].id },
    { id: uuidV4(), name: 'TEXT', question_id: questions[6].id },
  ];

  // Inserts seed entries
  await knex(TABLE.TEMPLATE).insert(templates);

  await knex(TABLE.SECTION).insert(sections);

  await knex(TABLE.QUESTION).insert(questions);

  await knex(TABLE.OPTION).insert(options);
}
