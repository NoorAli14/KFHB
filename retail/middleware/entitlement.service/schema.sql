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


