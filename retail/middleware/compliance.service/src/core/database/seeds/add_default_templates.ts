import * as Knex from 'knex';
import { TABLE, CREATED_BY } from '@common/constants';
import { uuidV4 } from '@common/utilities';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.TEMPLATE).del();

  const templates: any[] = [
    {
      id: uuidV4(),
      name: 'Banking Transactions',
      name_ar: 'Banking Transactions',
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'FATCA & CRS',
      name_ar: 'FATCA & CRS',
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const sections: any[] = [
    {
      id: uuidV4(),
      name: 'What are the anticipated cash transactions on your account',
      name_ar: 'What are the anticipated cash transactions on your account',
      level: 'level 1',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
      name_ar:
        'Retrieving data. Wait a few seconds and try to cut or copy again.',
      level: 'level 1',
      template_id: templates[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Individual Certification',
      name_ar: 'Individual Certification',
      level: 'level 1',
      template_id: templates[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const questions: any[] = [
    {
      id: uuidV4(),
      title: 'Purpose of Account',
      title_ar: 'Purpose of Account',
      type: 'dropdown',
      rules: '{required: true}',
      section_id: sections[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cash Deposit',
      title_ar: 'Cash Deposit',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cash Withdrawal',
      title_ar: 'Cash Withdrawal',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Cheque Deposit',
      title_ar: 'Cheque Deposit',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },

    {
      id: uuidV4(),
      title: 'Internal Transfers to KFHB Accounts',
      title_ar: 'Internal Transfers to KFHB Accounts',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Outgoing International Transfers',
      title_ar: 'Outgoing International Transfers',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Transfers to other banks in Bahrain',
      title_ar: 'Transfers to other banks in Bahrain',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Incoming International Transfers',
      title_ar: 'Incoming International Transfers',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Are you a US Citizen?',
      title_ar: 'Are you a US Citizen?',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Are you a US Tax Resident?',
      title_ar: 'Are you a US Tax Resident?',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title: 'Were you born in the US?',
      title_ar: 'Were you born in the US?',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      title:
        'Are you a tax resident in any other country other than the Kingdom of Bahrain or US?',
      title_ar:
        'Are you a tax resident in any other country other than the Kingdom of Bahrain or US?',
      type: 'checkbox',
      rules: '{required: true}',
      section_id: sections[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
  ];

  const options: any[] = [
    {
      id: uuidV4(),
      name: 'Saving / Investment',
      name_ar: 'Saving / Investment',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Salary Transfer',
      name_ar: 'Salary Transfer',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Financing facility',
      name_ar: 'Financing facility',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Others',
      name_ar: 'Others',
      question_id: questions[0].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[1].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[2].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[3].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[3].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },

    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[4].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[4].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[5].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
      question_id: questions[5].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'High',
      name_ar: 'High',
      question_id: questions[6].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Low',
      name_ar: 'Low',
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
      name: 'Yes',
      name_ar: 'Yes',
      question_id: questions[8].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'No',
      name_ar: 'No',
      question_id: questions[8].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Yes',
      name_ar: 'Yes',
      question_id: questions[9].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'No',
      name_ar: 'No',
      question_id: questions[9].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Yes',
      name_ar: 'Yes',
      question_id: questions[10].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'No',
      name_ar: 'No',
      question_id: questions[10].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'Yes',
      name_ar: 'Yes',
      question_id: questions[11].id,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
    },
    {
      id: uuidV4(),
      name: 'No',
      name_ar: 'No',
      question_id: questions[11].id,
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
