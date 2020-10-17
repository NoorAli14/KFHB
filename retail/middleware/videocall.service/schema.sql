/* [Video Call Service] [20200831113427] - 20200831113427_add_appointment_table.ts */;
CREATE TABLE [VC_APPOINTMENT] ([id] uniqueidentifier default NEWID(), [tenant_id] uniqueidentifier not null, [user_id] uniqueidentifier not null, [call_time] datetimeoffset not null, [gender] nvarchar(255), [status] nvarchar(255), [created_on] datetimeoffset default CURRENT_TIMESTAMP, [created_by] nvarchar(255), [updated_on] datetimeoffset default CURRENT_TIMESTAMP, [updated_by] nvarchar(255), [deleted_on] datetimeoffset, [deleted_by] nvarchar(255), CONSTRAINT [VC_APPOINTMENT_pkey] PRIMARY KEY ([id]));
CREATE INDEX [VC_APPOINTMENT_TENANT_ID_INDEX] ON [VC_APPOINTMENT] ([tenant_id]);
CREATE INDEX [VC_APPOINTMENT_USER_ID_INDEX] ON [VC_APPOINTMENT] ([user_id]);
CREATE INDEX [VC_APPOINTMENT_GENDER_INDEX] ON [VC_APPOINTMENT] ([gender]);
CREATE INDEX [VC_APPOINTMENT_STATUS_INDEX] ON [VC_APPOINTMENT] ([status]);
CREATE INDEX [VC_APPOINTMENT_DELETED_ON_INDEX] ON [VC_APPOINTMENT] ([deleted_on]);


