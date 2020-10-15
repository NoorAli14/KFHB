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


