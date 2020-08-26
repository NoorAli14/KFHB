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
    { id: uuidV4(), name: 'FATCA', name_ar: 'FATCA AR' },
    { id: uuidV4(), name: 'CRS', name_ar: 'CRS AR' },
    { id: uuidV4(), name: 'KYC', name_ar: 'KYC AR' },
  ];
  const sections: Section[] = [
    {
      id: uuidV4(),
      name: 'Template 1 Section 1',
      name_ar: 'Template 1 Section 1',
      level: 'level 1',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 3',
      name_ar: 'Template 1 Section 2',
      level: 'level 3',
      template_id: templates[0].id,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 1',
      name_ar: 'Template 1 Section 2',
      level: 'level 1',
      template_id: templates[1].id,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[1].id,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 1',
      name_ar: 'Template 1 Section 2',
      level: 'level 1',
      template_id: templates[2].id,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[2].id,
    },
  ];
  const questions: Question[] = [
    {
      id: uuidV4(),
      title: 'Question 1',
      title_ar: 'Question 1',
      type: 'checkbox',
      rules: '{required: true}',
      status: true,
      section_id: sections[0].id,
    },
    {
      id: uuidV4(),
      title: 'Question 2',
      title_ar: 'Question 2',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[1].id,
    },
    {
      id: uuidV4(),
      title: 'Question 3',
      title_ar: 'Question 3',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[2].id,
    },
    {
      id: uuidV4(),
      title: 'Question 4',
      title_ar: 'Question 4',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[3].id,
    },
    {
      id: uuidV4(),
      title: 'Question 5',
      title_ar: 'Question 5',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[4].id,
    },
    {
      id: uuidV4(),
      title: 'Question 6',
      title_ar: 'Question 6',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[5].id,
    },
    {
      id: uuidV4(),
      title: 'Question 7',
      title_ar: 'Question 7',
      type: 'text',
      rules: '{required: true}',
      status: true,
      section_id: sections[6].id,
    },
  ];
  const options: Option[] = [
    {
      id: uuidV4(),
      name: 'TRUE',
      name_ar: 'TRUE',
      question_id: questions[0].id,
    },
    {
      id: uuidV4(),
      name: 'FALSE',
      name_ar: 'FALSE',
      question_id: questions[0].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[1].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[2].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[3].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[4].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[5].id,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[6].id,
    },
  ];

  const template_questions: TemplateQuestion[] = [
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[0].id,
      question_id: questions[0].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[1].id,
      question_id: questions[1].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[2].id,
      question_id: questions[2].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[1].id,
      section_id: sections[3].id,
      question_id: questions[3].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[4].id,
      question_id: questions[4].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[5].id,
      question_id: questions[5].id,
    },
    {
      id: uuidV4(),
      rules: '{required: true}',
      status: true,
      template_id: templates[0].id,
      section_id: sections[6].id,
      question_id: questions[6].id,
    },
  ];

  // Inserts seed entries
  await knex(TABLE.TEMPLATE).insert(templates);

  await knex(TABLE.SECTION).insert(sections);

  await knex(TABLE.QUESTION).insert(questions);

  await knex(TABLE.OPTION).insert(options);

  await knex(TABLE.TEMPLATE_QUESTIONS).insert(template_questions);
}
