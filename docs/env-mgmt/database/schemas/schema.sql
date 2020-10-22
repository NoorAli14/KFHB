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


/* [Usermanagement Service] [20200625222904] - 20200625222904_create_users_table.ts */;
CREATE TABLE [ENT_USER] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [username] nvarchar(255), [first_name] nvarchar(255), [last_name] nvarchar(255), [middle_name] nvarchar(255), [email] nvarchar(255) not null, [contact_no] nvarchar(255), [password_digest] nvarchar(255), [gender] nvarchar(255), [date_of_birth] nvarchar(255), [nationality_id] nvarchar(255), [is_owner] bit default '0', [status] nvarchar(255) not null, [password_reset_token] nvarchar(255), [password_reset_token_expiry] datetimeoffset, [invitation_token] nvarchar(255), [invitation_token_expiry] datetimeoffset, [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_USER_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_USER_USERNAME_INDEX] ON [ENT_USER] ([username]);
CREATE INDEX [ENT_USER_EMAIL_INDEX] ON [ENT_USER] ([email]);
CREATE INDEX [ENT_USER_NATIONALITY_ID_INDEX] ON [ENT_USER] ([nationality_id]);
CREATE INDEX [ENT_USER_STATUS_INDEX] ON [ENT_USER] ([status]);
CREATE INDEX [ENT_USER_GENDER_INDEX] ON [ENT_USER] ([gender]);
CREATE INDEX [ENT_USER_CONTACT_NO_INDEX] ON [ENT_USER] ([contact_no]);
CREATE INDEX [ENT_USER_IS_OWNER_INDEX] ON [ENT_USER] ([is_owner]);
CREATE INDEX [ENT_USER_TENANT_ID_INDEX] ON [ENT_USER] ([tenant_id]);
CREATE INDEX [ENT_USER_PASSWORD_RESET_TOKEN_INDEX] ON [ENT_USER] ([password_reset_token]);
CREATE INDEX [ENT_USER_INVITATION_TOKEN_INDEX] ON [ENT_USER] ([invitation_token]);
CREATE INDEX [ENT_USER_DELETED_ON_INDEX] ON [ENT_USER] ([deleted_on]);


/* [Usermanagement Service] [20200719230156] - 20200719230156_create_role_table.ts */;
CREATE TABLE [ENT_ROLE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255) not null, [description] nvarchar(255), [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_ROLE_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_ROLE_NAME_INDEX] ON [ENT_ROLE] ([name]);
CREATE INDEX [ENT_ROLE_STATUS_INDEX] ON [ENT_ROLE] ([status]);
CREATE INDEX [ENT_ROLE_TENANT_ID_INDEX] ON [ENT_ROLE] ([tenant_id]);
CREATE INDEX [ENT_ROLE_DELETED_ON_INDEX] ON [ENT_ROLE] ([deleted_on]);


/* [Usermanagement Service] [20200719230642] - 20200719230642_create_user_role_table.ts */;
CREATE TABLE [ENT_USER_ROLE] ([id] uniqueidentifier default NEWID(), [user_id] uniqueidentifier, [role_id] uniqueidentifier, CONSTRAINT [ENT_USER_ROLE_pkey] PRIMARY KEY ([id]), CONSTRAINT [ent_user_role_user_id_foreign] FOREIGN KEY ([user_id]) REFERENCES [ENT_USER] ([id]) ON DELETE cascade, CONSTRAINT [ent_user_role_role_id_foreign] FOREIGN KEY ([role_id]) REFERENCES [ENT_ROLE] ([id]) ON DELETE cascade);


/* [Usermanagement Service] [20200719231448] - 20200719231448_create_module_table.ts */;
CREATE TABLE [ENT_MODULE] ([id] uniqueidentifier default NEWID(), [name] nvarchar(255) not null, [parent_id] uniqueidentifier, [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, CONSTRAINT [ENT_MODULE_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_MODULE_NAME_INDEX] ON [ENT_MODULE] ([name]);
CREATE INDEX [ENT_MODULE_STATUS_INDEX] ON [ENT_MODULE] ([status]);
CREATE INDEX [ENT_MODULE_PARENT_ID_INDEX] ON [ENT_MODULE] ([parent_id]);


/* [Usermanagement Service] [20200719232143] - 20200719232143_create_permission_table.ts */;
CREATE TABLE [ENT_PERMISSION] ([id] uniqueidentifier default NEWID(), [record_type] nvarchar(255) not null, [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, CONSTRAINT [ENT_PERMISSION_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_PERMISSION_RECORD_TYPE_INDEX] ON [ENT_PERMISSION] ([record_type]);


/* [Usermanagement Service] [20200819042239] - 20200819042239_create_working_week_table.ts */;
CREATE TABLE [ENT_WORKING_WEEK] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [week_day] nvarchar(255) not null, [start_time_local] nvarchar(255), [end_time_local] nvarchar(255), [full_day] int, [remarks] nvarchar(255), [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_WORKING_WEEK_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_WORKING_WEEK_WEEK_DAY_INDEX] ON [ENT_WORKING_WEEK] ([week_day]);
CREATE INDEX [ENT_WORKING_WEEK_STATUS_INDEX] ON [ENT_WORKING_WEEK] ([status]);
CREATE INDEX [ENT_WORKING_WEEK_TENANT_ID_INDEX] ON [ENT_WORKING_WEEK] ([tenant_id]);
CREATE INDEX [ENT_WORKING_WEEK_START_TIME_LOCAL_INDEX] ON [ENT_WORKING_WEEK] ([start_time_local]);
CREATE INDEX [ENT_WORKING_WEEK_END_TIME_LOCAL_INDEX] ON [ENT_WORKING_WEEK] ([end_time_local]);
CREATE INDEX [ENT_WORKING_WEEK_DELETED_ON_INDEX] ON [ENT_WORKING_WEEK] ([deleted_on]);


/* [Usermanagement Service] [20200824173103] - 20200824173103_create_holiday_table.ts */;
CREATE TABLE [ENT_HOLIDAY] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [holiday_date] date not null, [description] nvarchar(255), [remarks] nvarchar(255), [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_HOLIDAY_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_HOLIDAY_STATUS_INDEX] ON [ENT_HOLIDAY] ([status]);
CREATE INDEX [ENT_HOLIDAY_TENANT_ID_INDEX] ON [ENT_HOLIDAY] ([tenant_id]);
CREATE INDEX [ENT_HOLIDAY_HOLIDAY_DATE_INDEX] ON [ENT_HOLIDAY] ([holiday_date]);
CREATE INDEX [ENT_HOLIDAY_DELETED_ON_INDEX] ON [ENT_HOLIDAY] ([deleted_on]);


/* [Usermanagement Service] [20200824175601] - 20200824175601_create_leave_type_table.ts */;
CREATE TABLE [ENT_LEAVE_TYPE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255) not null, [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_LEAVE_TYPE_pkey] PRIMARY KEY ([id]));
CREATE INDEX [ENT_LEAVE_TYPE_NAME_INDEX] ON [ENT_LEAVE_TYPE] ([name]);
CREATE INDEX [ENT_LEAVE_TYPE_TENANT_ID_INDEX] ON [ENT_LEAVE_TYPE] ([tenant_id]);
CREATE INDEX [ENT_LEAVE_TYPE_STATUS_INDEX] ON [ENT_LEAVE_TYPE] ([status]);
CREATE INDEX [ENT_LEAVE_TYPE_DELETED_ON_INDEX] ON [ENT_LEAVE_TYPE] ([deleted_on]);


/* [Usermanagement Service] [20200824175602] - 20200824175602_create_leave_table.ts */;
CREATE TABLE [ENT_LEAVE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [leave_type_id] uniqueidentifier not null, [user_id] uniqueidentifier not null, [start_date] date not null, [end_date] date not null, [remarks] nvarchar(255), [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset not null default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [ENT_LEAVE_pkey] PRIMARY KEY ([id]), CONSTRAINT [ent_leave_user_id_foreign] FOREIGN KEY ([user_id]) REFERENCES [ENT_USER] ([id]) ON DELETE CASCADE, CONSTRAINT [ent_leave_leave_type_id_foreign] FOREIGN KEY ([leave_type_id]) REFERENCES [ENT_LEAVE_TYPE] ([id]) ON DELETE CASCADE);
CREATE INDEX [ENT_LEAVE_START_DATE_INDEX] ON [ENT_LEAVE] ([start_date]);
CREATE INDEX [ENT_LEAVE_END_DATE_INDEX] ON [ENT_LEAVE] ([end_date]);
CREATE INDEX [ENT_LEAVE_TENANT_ID_INDEX] ON [ENT_LEAVE] ([tenant_id]);
CREATE INDEX [ENT_LEAVE_STATUS_INDEX] ON [ENT_LEAVE] ([status]);
CREATE INDEX [ENT_LEAVE_DELETED_ON_INDEX] ON [ENT_LEAVE] ([deleted_on]);


/* [Usermanagement Service] [20200826201822] - 20200826201822_create_module_permission_table.ts */;
CREATE TABLE [ENT_MODULE_PERMISSION] ([id] uniqueidentifier default NEWID(), [module_id] uniqueidentifier, [permission_id] uniqueidentifier, [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, CONSTRAINT [ENT_MODULE_PERMISSION_pkey] PRIMARY KEY ([id]), CONSTRAINT [ent_module_permission_module_id_foreign] FOREIGN KEY ([module_id]) REFERENCES [ENT_MODULE] ([id]) ON DELETE cascade, CONSTRAINT [ent_module_permission_permission_id_foreign] FOREIGN KEY ([permission_id]) REFERENCES [ENT_PERMISSION] ([id]) ON DELETE cascade);
CREATE UNIQUE INDEX [ent_module_permission_module_id_permission_id_unique] ON [ENT_MODULE_PERMISSION] ([module_id], [permission_id]) WHERE [module_id] IS NOT NULL AND [permission_id] IS NOT NULL;


/* [Usermanagement Service] [20200826201941] - 20200826201941_create_module_permission_role_table.ts */;
CREATE TABLE [ENT_MODULE_PERMISSION_ROLE] ([module_permission_id] uniqueidentifier, [role_id] uniqueidentifier, CONSTRAINT [ent_module_permission_role_module_permission_id_foreign] FOREIGN KEY ([module_permission_id]) REFERENCES [ENT_MODULE_PERMISSION] ([id]) ON DELETE cascade, CONSTRAINT [ent_module_permission_role_role_id_foreign] FOREIGN KEY ([role_id]) REFERENCES [ENT_ROLE] ([id]) ON DELETE cascade, CONSTRAINT [ENT_MODULE_PERMISSION_ROLE_pkey] PRIMARY KEY ([module_permission_id], [role_id]));


/* [Usermanagement Service] [20201004171753] - 20201004171753_alter_users_table_remove_username_column.ts */;
ALTER TABLE [ENT_USER] alter column [date_of_birth] date;
DROP INDEX [ENT_USER_USERNAME_INDEX] ON [ENT_USER];
ALTER TABLE [ENT_USER] DROP COLUMN [username];


/* [Usermanagement Service] [20201004172044] - 20201004172044_alter_module_table_add_slug_column.ts */;
ALTER TABLE [ENT_MODULE] ADD [slug] nvarchar(255);
CREATE INDEX [ENT_MODULE_SLUG_INDEX] ON [ENT_MODULE] ([slug]);


/* [Identity Service] [20200625222902] - 20200625222902_create_document_type_table.ts */;
CREATE TABLE [IDT_DOCUMENT_TYPE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [name] nvarchar(255) not null, [record_type] nvarchar(50) not null, [is_required] bit default '0', [status] nvarchar(255) default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255) not null, [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [IDT_DOCUMENT_TYPE_pkey] PRIMARY KEY ([id]));
CREATE INDEX [IDT_DOCUMENT_TYPE_TENANT_ID_INDEX] ON [IDT_DOCUMENT_TYPE] ([tenant_id]);
CREATE INDEX [IDT_DOCUMENT_TYPE_NAME_INDEX] ON [IDT_DOCUMENT_TYPE] ([name]);
CREATE INDEX [IDT_DOCUMENT_TYPE_RECORD_TYPE_INDEX] ON [IDT_DOCUMENT_TYPE] ([record_type]);
CREATE INDEX [IDT_DOCUMENT_TYPE_STATUS_INDEX] ON [IDT_DOCUMENT_TYPE] ([status]);
CREATE UNIQUE INDEX [idt_document_type_name_tenant_id_unique] ON [IDT_DOCUMENT_TYPE] ([name], [tenant_id]) WHERE [name] IS NOT NULL AND [tenant_id] IS NOT NULL;


/* [Identity Service] [20200625222903] - 20200625222903_create_customer_table.ts */;
CREATE TABLE [IDT_CUSTOMER] ([id] uniqueidentifier default NEWID(), [first_name] nvarchar(255), [middle_name] nvarchar(255), [last_name] nvarchar(255), [email] nvarchar(255), [contact_no] nvarchar(255), [gender] nvarchar(255), [date_of_birth] nvarchar(255), [national_id_no] nvarchar(255), [national_id_expiry] nvarchar(255), [nationality] nvarchar(255), [nationality_code] nvarchar(255), [device_id] nvarchar(255), [platform] nvarchar(255), [tenant_id] uniqueidentifier not null, [session_id] uniqueidentifier, [next_step] nvarchar(255), [is_aml_verified] bit default '0', [is_email_verified] bit default '0', [is_contact_no_verified] bit default '0', [is_evaluation_verified] bit, [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255) not null, [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [IDT_CUSTOMER_pkey] PRIMARY KEY ([id]));
CREATE INDEX [IDT_CUSTOMER_SESSION_ID_INDEX] ON [IDT_CUSTOMER] ([session_id]);
CREATE INDEX [IDT_CUSTOMER_TENANT_ID_INDEX] ON [IDT_CUSTOMER] ([tenant_id]);
CREATE INDEX [IDT_CUSTOMER_EMAIL_INDEX] ON [IDT_CUSTOMER] ([email]);
CREATE INDEX [IDT_CUSTOMER_NATIONAL_ID_NO_INDEX] ON [IDT_CUSTOMER] ([national_id_no]);
CREATE INDEX [IDT_CUSTOMER_NATIONALITY_CODE_INDEX] ON [IDT_CUSTOMER] ([nationality_code]);
CREATE INDEX [IDT_CUSTOMER_DEVICE_ID_INDEX] ON [IDT_CUSTOMER] ([device_id]);
CREATE INDEX [IDT_CUSTOMER_STATUS_INDEX] ON [IDT_CUSTOMER] ([status]);


/* [Identity Service] [20200625222904] - 20200625222904_create_session_table.ts */;
CREATE TABLE [IDT_SESSION] ([id] uniqueidentifier default NEWID(), [customer_id] uniqueidentifier, [tenant_id] uniqueidentifier not null, [reference_id] uniqueidentifier not null, [check_id] nvarchar(255) not null, [target_user_id] nvarchar(255) not null, [fido_reg_req_id] nvarchar(255) not null, [fido_reg_req] nvarchar(max) not null, [evaluation_id] nvarchar(255), [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255) not null, [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [IDT_SESSION_pkey] PRIMARY KEY ([id]), CONSTRAINT [idt_session_customer_id_foreign] FOREIGN KEY ([customer_id]) REFERENCES [IDT_CUSTOMER] ([id]) ON DELETE cascade);
CREATE INDEX [IDT_SESSION_TENANT_ID_INDEX] ON [IDT_SESSION] ([tenant_id]);
CREATE INDEX [IDT_SESSION_REFERENCE_ID_INDEX] ON [IDT_SESSION] ([reference_id]);
CREATE INDEX [IDT_SESSION_TARGET_USER_ID_INDEX] ON [IDT_SESSION] ([target_user_id]);
CREATE INDEX [IDT_SESSION_TARGET_CHECK_ID_INDEX] ON [IDT_SESSION] ([check_id]);
CREATE INDEX [IDT_SESSION_EVALUATION_ID_INDEX] ON [IDT_SESSION] ([evaluation_id]);


/* [Identity Service] [20200625222906] - 20200625222906_create_session__reference_table.ts */;
CREATE TABLE [IDT_SESSION_REFERENCE] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [session_id] uniqueidentifier, [document_type_id] uniqueidentifier, [attachable_id] nvarchar(255) not null, [status] nvarchar(255) not null, [processed_data] nvarchar(max), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255) not null, [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [IDT_SESSION_REFERENCE_pkey] PRIMARY KEY ([id]), CONSTRAINT [idt_session_reference_session_id_foreign] FOREIGN KEY ([session_id]) REFERENCES [IDT_SESSION] ([id]) ON DELETE cascade, CONSTRAINT [idt_session_reference_document_type_id_foreign] FOREIGN KEY ([document_type_id]) REFERENCES [IDT_DOCUMENT_TYPE] ([id]) ON DELETE cascade);
CREATE INDEX [IDT_SESSION_REFERENCE_TENANT_ID_INDEX] ON [IDT_SESSION_REFERENCE] ([tenant_id]);
CREATE INDEX [IDT_SESSION_REFERENCE_ATTACHABLE_ID_INDEX] ON [IDT_SESSION_REFERENCE] ([attachable_id]);
CREATE INDEX [IDT_SESSION_REFERENCE_STATUS_INDEX] ON [IDT_SESSION_REFERENCE] ([status]);

/* [Notification Service] [20200825203734] - 20200825203734_create_otp_table.ts */;
CREATE TABLE [NTF_OTP] ([id] uniqueidentifier default NEWID(), [user_id] uniqueidentifier not null, [tenent_id] uniqueidentifier not null, [delivery_mode] nvarchar(255) not null, [mobile_no] nvarchar(255), [email] nvarchar(255), [otp_code] nvarchar(255) not null, [status] nvarchar(255) not null, [created_on] datetime2 default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetime2 default CURRENT_TIMESTAMP, [updated_by] nvarchar(255) not null, CONSTRAINT [NTF_OTP_pkey] PRIMARY KEY ([id]));


/* [Notification Service] [20200825204004] - 20200825204004_alter_otp_table.ts */;
ALTER TABLE [NTF_OTP] alter column [updated_by] nvarchar(255);


/* [Notification Service] [20200827122822] - 20200827122822_create_push_notification_table.ts */;
CREATE TABLE [NTF_PUSHNOTIFICATION] ([id] uniqueidentifier default NEWID(), [platform] nvarchar(255) not null, [device_id] nvarchar(255) not null, [text] nvarchar(255) not null, [status] nvarchar(255) not null, [created_on] datetime2 default CURRENT_TIMESTAMP, [created_by] nvarchar(255) not null, [updated_on] datetime2 default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetime2 default CURRENT_TIMESTAMP, [deleted_by] nvarchar(255), CONSTRAINT [NTF_PUSHNOTIFICATION_pkey] PRIMARY KEY ([id]));


/* [Notification Service] [20200901173616] - 20200901173616_update_push_notification_table.ts */;
ALTER TABLE [NTF_PUSHNOTIFICATION] ADD [token] nvarchar(255), [message_title] nvarchar(255) not null, [message_body] nvarchar(255) not null, [image_url] nvarchar(255), [action] nvarchar(255);
ALTER TABLE [NTF_PUSHNOTIFICATION] DROP COLUMN [text];


/* [Notification Service] [20200901195705] - 20200901195705_remove_token_from_push_notification_table.ts */;
ALTER TABLE [NTF_PUSHNOTIFICATION] DROP COLUMN [token];


/* [Notification Service] [20200910183650] - 20200910183650_alter_tenant_id_in_otp.ts */;
exec sp_rename '[NTF_OTP].tenent_id', 'tenant_id', 'COLUMN';


/* [Notification Service] [20200913113017] - 20200913113017_alter_otp_table.ts */;
ALTER TABLE [NTF_OTP] DROP COLUMN [mobile_no];
ALTER TABLE [NTF_OTP] DROP COLUMN [email];


/* [Reference Service] [20200902155745] - 20200902155745_create_countries_table.ts */;
CREATE TABLE [REF_COUNTRY] ([id] uniqueidentifier default NEWID(), [name] nvarchar(255), [iso_code] nvarchar(255), [continent_code] nvarchar(255), [capital_name] nvarchar(255), [phone_code] nvarchar(255), [nationality] nvarchar(255), [status] nvarchar(255) default 'ACTIVE', [created_by] nvarchar(255), [updated_by] nvarchar(255), [deleted_by] nvarchar(255), [created_on] datetime2 default CURRENT_TIMESTAMP, [updated_on] datetime2 default CURRENT_TIMESTAMP, [deleted_on] datetime2, CONSTRAINT [REF_COUNTRY_pkey] PRIMARY KEY ([id]));
CREATE INDEX [REF_COUNTRY_NAME_INDEX] ON [REF_COUNTRY] ([name]);
CREATE INDEX [REF_COUNTRY_ISO_CODE_INDEX] ON [REF_COUNTRY] ([iso_code]);
CREATE INDEX [REF_COUNTRY_STATUS_INDEX] ON [REF_COUNTRY] ([status]);


/* [Reference Service] [20200908203205] - 20200908203205_create_currencies_table.ts */;
CREATE TABLE [REF_CURRENCY] ([id] uniqueidentifier default NEWID(), [name] nvarchar(255), [iso_code] nvarchar(255), [numeric_code] int, [minor_unit] int, [status] nvarchar(255) default 'ACTIVE', [created_by] nvarchar(255), [updated_by] nvarchar(255), [deleted_by] nvarchar(255), [created_on] datetime2 default CURRENT_TIMESTAMP, [updated_on] datetime2 default CURRENT_TIMESTAMP, [deleted_on] datetime2, CONSTRAINT [REF_CURRENCY_pkey] PRIMARY KEY ([id]));
CREATE INDEX [REF_CURRENCY_NAME_INDEX] ON [REF_CURRENCY] ([name]);
CREATE INDEX [REF_CURRENCY_ISO_CODE_INDEX] ON [REF_CURRENCY] ([iso_code]);
CREATE INDEX [REF_CURRENCY_STATUS_INDEX] ON [REF_CURRENCY] ([status]);


/* [Video Call Service] [20200831113427] - 20200831113427_add_appointment_table.ts */;
CREATE TABLE [VC_APPOINTMENT] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [user_id] uniqueidentifier not null, [call_time] datetimeoffset not null, [gender] nvarchar(255), [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [VC_APPOINTMENT_pkey] PRIMARY KEY ([id]));
CREATE INDEX [VC_APPOINTMENT_TENANT_ID_INDEX] ON [VC_APPOINTMENT] ([tenant_id]);
CREATE INDEX [VC_APPOINTMENT_USER_ID_INDEX] ON [VC_APPOINTMENT] ([user_id]);
CREATE INDEX [VC_APPOINTMENT_GENDER_INDEX] ON [VC_APPOINTMENT] ([gender]);
CREATE INDEX [VC_APPOINTMENT_STATUS_INDEX] ON [VC_APPOINTMENT] ([status]);
CREATE INDEX [VC_APPOINTMENT_DELETED_ON_INDEX] ON [VC_APPOINTMENT] ([deleted_on]);
