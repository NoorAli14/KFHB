/* [Reference Service] - create migration table */
CREATE TABLE [RUBIX_REFERENCE_MIGRATIONS] ([id] int identity(1,1) not null primary key, [name] nvarchar(255), [batch] int, [migration_time] datetime2 default CURRENT_TIMESTAMP);


/* [Reference Service] [20200902155745] - 20200902155745_create_countries_table.ts */
CREATE TABLE [REF_COUNTRY] ([id] uniqueidentifier default NEWID(), [name] nvarchar(255), [iso_code] nvarchar(255), [continent_code] nvarchar(255), [capital_name] nvarchar(255), [phone_code] nvarchar(255), [nationality] nvarchar(255), [status] nvarchar(255) default 'ACTIVE', [created_by] nvarchar(255), [updated_by] nvarchar(255), [deleted_by] nvarchar(255), [created_on] datetime2 default CURRENT_TIMESTAMP, [updated_on] datetime2 default CURRENT_TIMESTAMP, [deleted_on] datetime2, CONSTRAINT [REF_COUNTRY_pkey] PRIMARY KEY ([id]));
CREATE INDEX [REF_COUNTRY_NAME_INDEX] ON [REF_COUNTRY] ([name]);
CREATE INDEX [REF_COUNTRY_ISO_CODE_INDEX] ON [REF_COUNTRY] ([iso_code]);
CREATE INDEX [REF_COUNTRY_STATUS_INDEX] ON [REF_COUNTRY] ([status]);

/* [Reference Service] Add 20200902155745_create_countries_table.ts to migration table */
insert into [RUBIX_REFERENCE_MIGRATIONS] ([batch], [name]) values (1, '20200902155745_create_countries_table.ts');


/* [Reference Service] [20200908203205] - 20200908203205_create_currencies_table.ts */
CREATE TABLE [REF_CURRENCY] ([id] uniqueidentifier default NEWID(), [name] nvarchar(255), [iso_code] nvarchar(255), [numeric_code] int, [minor_unit] int, [status] nvarchar(255) default 'ACTIVE', [created_by] nvarchar(255), [updated_by] nvarchar(255), [deleted_by] nvarchar(255), [created_on] datetime2 default CURRENT_TIMESTAMP, [updated_on] datetime2 default CURRENT_TIMESTAMP, [deleted_on] datetime2, CONSTRAINT [REF_CURRENCY_pkey] PRIMARY KEY ([id]));
CREATE INDEX [REF_CURRENCY_NAME_INDEX] ON [REF_CURRENCY] ([name]);
CREATE INDEX [REF_CURRENCY_ISO_CODE_INDEX] ON [REF_CURRENCY] ([iso_code]);
CREATE INDEX [REF_CURRENCY_STATUS_INDEX] ON [REF_CURRENCY] ([status]);

/* [Reference Service] Add 20200908203205_create_currencies_table.ts to migration table */
insert into [RUBIX_REFERENCE_MIGRATIONS] ([batch], [name]) values (1, '20200908203205_create_currencies_table.ts');


