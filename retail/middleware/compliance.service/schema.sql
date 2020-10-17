/* [Compliance Service] [20200720103133] - 20200720103133_create_cmp_template_table.ts */;
CREATE TABLE [CMP_TEMPLATE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255), [name_ar] nvarchar(255), [status] nvarchar(255) default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_TEMPLATE_pkey] PRIMARY KEY ([id]));
CREATE INDEX [CMP_TEMPLATE_TENDANT_ID_INDEX] ON [CMP_TEMPLATE] ([tenant_id]);
CREATE INDEX [CMP_TEMPLATE_NAME_INDEX] ON [CMP_TEMPLATE] ([name]);
CREATE INDEX [CMP_TEMPLATE_NAME_AR_INDEX] ON [CMP_TEMPLATE] ([name_ar]);
CREATE INDEX [CMP_TEMPLATE_DELETED_ON_INDEX] ON [CMP_TEMPLATE] ([deleted_on]);


/* [Compliance Service] [20200720103554] - 20200720103554_create_cmp_section_table.ts */;
CREATE TABLE [CMP_SECTION] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255), [name_ar] nvarchar(255), [level] nvarchar(255), [template_id] uniqueidentifier, [status] nvarchar(255) default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_SECTION_pkey] PRIMARY KEY ([id]), CONSTRAINT [cmp_section_template_id_foreign] FOREIGN KEY ([template_id]) REFERENCES [CMP_TEMPLATE] ([id]) ON DELETE cascade);
CREATE INDEX [CMP_SECTION_TENDANT_ID_INDEX] ON [CMP_SECTION] ([tenant_id]);
CREATE INDEX [CMP_SECTION_LEVEL_INDEX] ON [CMP_SECTION] ([level]);
CREATE INDEX [CMP_SECTION_STATUS_INDEX] ON [CMP_SECTION] ([status]);
CREATE INDEX [CMP_SECTION_DELETED_ON_INDEX] ON [CMP_SECTION] ([deleted_on]);


/* [Compliance Service] [20200720103559] - 20200720103559_create_cmp_question_table.ts */;
CREATE TABLE [CMP_QUESTION] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [title] nvarchar(255), [title_ar] nvarchar(255), [type] nvarchar(255), [rules] nvarchar(255), [status] nvarchar(255) default 'ACTIVE', [section_id] uniqueidentifier, [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_QUESTION_pkey] PRIMARY KEY ([id]), CONSTRAINT [cmp_question_section_id_foreign] FOREIGN KEY ([section_id]) REFERENCES [CMP_SECTION] ([id]) ON DELETE cascade);
CREATE INDEX [CMP_QUESTION_TENDANT_ID_INDEX] ON [CMP_QUESTION] ([tenant_id]);
CREATE INDEX [CMP_QUESTION_TYPE_INDEX] ON [CMP_QUESTION] ([type]);
CREATE INDEX [CMP_QUESTION_STATUS_INDEX] ON [CMP_QUESTION] ([status]);
CREATE INDEX [CMP_QUESTION_DELETED_ON_INDEX] ON [CMP_QUESTION] ([deleted_on]);


/* [Compliance Service] [20200720103604] - 20200720103604_create_cmp_option_table.ts */;
CREATE TABLE [CMP_OPTION] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255), [name_ar] nvarchar(255), [question_id] uniqueidentifier, [status] nvarchar(255) default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_OPTION_pkey] PRIMARY KEY ([id]), CONSTRAINT [cmp_option_question_id_foreign] FOREIGN KEY ([question_id]) REFERENCES [CMP_QUESTION] ([id]) ON DELETE cascade);
CREATE INDEX [CMP_OPTION_TENDANT_ID_INDEX] ON [CMP_OPTION] ([tenant_id]);
CREATE INDEX [CMP_OPTION_STATUS_INDEX] ON [CMP_OPTION] ([status]);
CREATE INDEX [CMP_OPTION_DELETED_ON_INDEX] ON [CMP_OPTION] ([deleted_on]);


/* [Compliance Service] [20200720103727] - 20200720103727_create_cmp_template_responses_table.ts */;
CREATE TABLE [CMP_TEMPLATE_RESPONSES] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [template_id] uniqueidentifier, [results] nvarchar(max) not null, [remarks] nvarchar(255) not null, [status] nvarchar(255) default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_TEMPLATE_RESPONSES_pkey] PRIMARY KEY ([id]), CONSTRAINT [cmp_template_responses_template_id_foreign] FOREIGN KEY ([template_id]) REFERENCES [CMP_TEMPLATE] ([id]) ON DELETE cascade);
CREATE INDEX [CMP_TEMPLATE_RESPONSES_TENDANT_ID_INDEX] ON [CMP_TEMPLATE_RESPONSES] ([tenant_id]);
CREATE INDEX [CMP_TEMPLATE_RESPONSES_STATUS_INDEX] ON [CMP_TEMPLATE_RESPONSES] ([status]);
CREATE INDEX [CMP_TEMPLATE_RESPONSES_DELETED_ON_INDEX] ON [CMP_TEMPLATE_RESPONSES] ([deleted_on]);


/* [Compliance Service] [20200819120131] - 20200819120131_add_userid_in_template_response.ts */;
ALTER TABLE [CMP_TEMPLATE_RESPONSES] ADD [user_id] uniqueidentifier;


/* [Compliance Service] [20200908191218] - 20200908191218_cmp_aml_request.ts */;
CREATE TABLE [CMP_AML_REQUEST] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [user_id] uniqueidentifier not null, [aml_text] nvarchar(max), [request_reference] nvarchar(255), [remarks] nvarchar(255), [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_AML_REQUEST_pkey] PRIMARY KEY ([id]));
CREATE INDEX [CMP_AML_REQUEST_USER_ID_INDEX] ON [CMP_AML_REQUEST] ([user_id]);
CREATE INDEX [CMP_AML_REQUEST_STATUS_INDEX] ON [CMP_AML_REQUEST] ([status]);
CREATE INDEX [CMP_AML_REQUEST_TENDANT_ID_INDEX] ON [CMP_AML_REQUEST] ([tenant_id]);
CREATE INDEX [CMP_AML_REQUEST_DELETED_ON_INDEX] ON [CMP_AML_REQUEST] ([deleted_on]);


/* [Compliance Service] [20200908191238] - 20200908191238_cmp_aml_response.ts */;
CREATE TABLE [CMP_AML_RESPONSE] ([id] uniqueidentifier default NEWID(), [request_id] uniqueidentifier, [status] nvarchar(255), [response_text] nvarchar(max), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [CMP_AML_RESPONSE_pkey] PRIMARY KEY ([id]), CONSTRAINT [cmp_aml_response_request_id_foreign] FOREIGN KEY ([request_id]) REFERENCES [CMP_AML_REQUEST] ([id]) ON DELETE cascade);
CREATE INDEX [CMP_AML_RESPONSE_STATUS_INDEX] ON [CMP_AML_RESPONSE] ([status]);
CREATE INDEX [CMP_AML_RESPONSE_DELETED_ON_INDEX] ON [CMP_AML_RESPONSE] ([deleted_on]);


