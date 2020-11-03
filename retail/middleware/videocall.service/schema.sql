/* [Video Call Service] - create migration table */
CREATE TABLE [RUBIX_VIDEO_MIGRATION] ([id] int identity(1,1) not null primary key, [name] nvarchar(255), [batch] int, [migration_time] datetime2 default CURRENT_TIMESTAMP);


/* [Video Call Service] [20200831113427] - 20200831113427_add_appointment_table.ts */
CREATE TABLE [VC_APPOINTMENT] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [user_id] uniqueidentifier not null, [call_time] datetimeoffset not null, [gender] nvarchar(255), [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [VC_APPOINTMENT_pkey] PRIMARY KEY ([id]));
CREATE INDEX [VC_APPOINTMENT_TENANT_ID_INDEX] ON [VC_APPOINTMENT] ([tenant_id]);
CREATE INDEX [VC_APPOINTMENT_USER_ID_INDEX] ON [VC_APPOINTMENT] ([user_id]);
CREATE INDEX [VC_APPOINTMENT_GENDER_INDEX] ON [VC_APPOINTMENT] ([gender]);
CREATE INDEX [VC_APPOINTMENT_STATUS_INDEX] ON [VC_APPOINTMENT] ([status]);
CREATE INDEX [VC_APPOINTMENT_DELETED_ON_INDEX] ON [VC_APPOINTMENT] ([deleted_on]);

/* [Video Call Service] Add 20200831113427_add_appointment_table.ts to migration table */
insert into [RUBIX_VIDEO_MIGRATION] ([batch], [name]) values (1, '20200831113427_add_appointment_table.ts');


/* [Video Call Service] [20201013203203] - 20201013203203_APS_646_add_attachment.ts */
CREATE TABLE [VC_ATTACHMENT] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [customer_id] uniqueidentifier not null, [file_name] nvarchar(255), [file_size] nvarchar(255), [file_path] nvarchar(255), [attachment_type] nvarchar(255), [status] nvarchar(255) not null default 'ACTIVE', [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [VC_ATTACHMENT_pkey] PRIMARY KEY ([id]));
CREATE INDEX [VC_ATTACHMENT_TENANT_ID_INDEX] ON [VC_ATTACHMENT] ([tenant_id]);
CREATE INDEX [VC_ATTACHMENT_CUSTOMER_ID_INDEX] ON [VC_ATTACHMENT] ([customer_id]);
CREATE INDEX [VC_ATTACHMENT_STATUS_INDEX] ON [VC_ATTACHMENT] ([status]);
CREATE INDEX [VC_ATTACHMENT_DELETED_ON_INDEX] ON [VC_ATTACHMENT] ([deleted_on]);

/* [Video Call Service] Add 20201013203203_APS_646_add_attachment.ts to migration table */
insert into [RUBIX_VIDEO_MIGRATION] ([batch], [name]) values (1, '20201013203203_APS_646_add_attachment.ts');


