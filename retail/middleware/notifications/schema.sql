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


