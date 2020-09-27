import * as Knex from 'knex';
import { TABLE, CREATED_BY } from '@common/constants';
import { uuidV4 } from '@common/utilities';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.TEMPLATE).del();

  const templates: any[] = [
    {
      id: uuidV4(),
      name: 'FATCA',
      name_ar: 'FATCA AR',
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'CRS',
      name_ar: 'CRS AR',
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'KYC',
      name_ar: 'KYC AR',
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const sections: any[] = [
    {
      id: uuidV4(),
      name: 'Template 1 Section 1',
      name_ar: 'Template 1 Section 1',
      level: 'level 1',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 1 Section 3',
      name_ar: 'Template 1 Section 2',
      level: 'level 3',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 1',
      name_ar: 'Template 1 Section 2',
      level: 'level 1',
      template_id: templates[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 2 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 1',
      name_ar: 'Template 1 Section 2',
      level: 'level 1',
      template_id: templates[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Template 3 Section 2',
      name_ar: 'Template 1 Section 2',
      level: 'level 2',
      template_id: templates[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'What are the anticipated banking transactions on your account',
      name_ar: 'What are the anticipated banking transactions on your account',
      level: 'level 3',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const questions: any[] = [
    {
      id: uuidV4(),
      title: 'Question 1',
      title_ar: 'Question 1',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 2',
      title_ar: 'Question 2',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 3',
      title_ar: 'Question 3',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 4',
      title_ar: 'Question 4',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[3].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 5',
      title_ar: 'Question 5',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[4].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 6',
      title_ar: 'Question 6',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[5].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Question 7',
      title_ar: 'Question 7',
      type: 'text',
      rules: '{required: true}',
      section_id: sections[6].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cash Deposit',
      title_ar: 'Cash Deposit',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cash Withdrawl',
      title_ar: 'Cash Withdrawl',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cheque Deposit',
      title_ar: 'Cash Withdrawl',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },

    {
      id: uuidV4(),
      title: 'Internal Transfers to KFHB Accounts',
      title_ar: 'Internal Transfers to KFHB Accounts',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Transfers to other banks in Bahrain',
      title_ar: 'Transfers to other banks in Bahrain',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Incoming International Transfers',
      title_ar: 'Incoming International Transfers',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Outgoing International Transfers',
      title_ar: 'Outgoing International Transfers',
      type: 'radio button',
      rules: '{required: true}',
      section_id: sections[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const options: any[] = [
    {
      id: uuidV4(),
      name: 'TRUE',
      name_ar: 'TRUE',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'FALSE',
      name_ar: 'FALSE',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[3].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[4].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[5].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'TEXT',
      name_ar: 'TEXT',
      question_id: questions[6].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[7].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[8].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[8].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[9].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[9].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },

    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[10].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[10].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[11].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[11].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[12].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[12].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[13].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[13].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  // Inserts seed entries
  await knex(TABLE.TEMPLATE).insert(
    templates.map(template => ({
      ...template,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    })),
  );

  await knex(TABLE.SECTION).insert(
    sections.map(section => ({
      ...section,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    })),
  );

  await knex(TABLE.QUESTION).insert(
    questions.map(question => ({
      ...question,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    })),
  );

  await knex(TABLE.OPTION).insert(
    options.map(option => ({
      ...option,
      created_by: CREATED_BY.SYSTEM,
      updated_by: CREATED_BY.SYSTEM,
    })),
  );
}
