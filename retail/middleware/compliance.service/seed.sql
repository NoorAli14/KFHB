/* [Compliance Service] - add_default_templates.ts */;
insert into [CMP_TEMPLATE] ([created_by], [id], [name], [name_ar], [tenant_id], [updated_by])
values ('SYSTEM', 'dfcaa067-c958-402e-b2bc-8b7100e70dfe', 'FATCA', 'FATCA AR', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '9a66b53b-0551-4dde-8126-c250c9e0cc67', 'CRS', 'CRS AR', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '22de1c0f-876d-449c-ac17-15e7f4a5c2b5', 'KYC', 'KYC AR', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM');

insert into [CMP_SECTION] ([created_by], [id], [level], [name], [name_ar], [template_id], [tenant_id], [updated_by])
values ('SYSTEM', '0455bc40-6b15-42c3-b497-cd2bb8ed52dc', 'level 1', 'Template 1 Section 1', 'Template 1 Section 1', 'dfcaa067-c958-402e-b2bc-8b7100e70dfe', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '1e2c06f1-333e-4044-9050-87fc8ab09349', 'level 2', 'Template 1 Section 2', 'Template 1 Section 2', 'dfcaa067-c958-402e-b2bc-8b7100e70dfe', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', 'fc60861a-44de-4034-91ba-43311e43dd9f', 'level 3', 'Template 1 Section 3', 'Template 1 Section 2', 'dfcaa067-c958-402e-b2bc-8b7100e70dfe', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '4f4ef7de-2a9e-4710-80d8-275a38f0626f', 'level 1', 'Template 2 Section 1', 'Template 1 Section 2', '9a66b53b-0551-4dde-8126-c250c9e0cc67', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '604172c7-743e-470d-abc1-1df3f67bbc1b', 'level 2', 'Template 2 Section 2', 'Template 1 Section 2', '9a66b53b-0551-4dde-8126-c250c9e0cc67', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '9c1d546c-cd13-44fc-a264-d6f1b8f454a9', 'level 1', 'Template 3 Section 1', 'Template 1 Section 2', '22de1c0f-876d-449c-ac17-15e7f4a5c2b5', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '164df4d1-cf12-4de2-a753-5c588eaee0af', 'level 2', 'Template 3 Section 2', 'Template 1 Section 2', '22de1c0f-876d-449c-ac17-15e7f4a5c2b5', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '4c38affd-2de3-40bf-8720-470678a565df', 'level 3', 'What are the anticipated banking transactions on your account', 'What are the anticipated banking transactions on your account', 'dfcaa067-c958-402e-b2bc-8b7100e70dfe', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM');

insert into [CMP_QUESTION] ([created_by], [id], [rules], [section_id], [tenant_id], [title], [title_ar], [type], [updated_by])
values ('SYSTEM', 'd5ffc5e0-db31-4ae7-901d-535d0d0214e3', '{required: true}', '0455bc40-6b15-42c3-b497-cd2bb8ed52dc', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 1', 'Question 1', 'checkbox', 'SYSTEM'),
('SYSTEM', '411d7102-9aca-46c4-a3a9-b27ae2b531ca', '{required: true}', '1e2c06f1-333e-4044-9050-87fc8ab09349', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 2', 'Question 2', 'text', 'SYSTEM'),
('SYSTEM', '34973c58-bf1e-4320-a086-0a67aa20d3ff', '{required: true}', 'fc60861a-44de-4034-91ba-43311e43dd9f', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 3', 'Question 3', 'text', 'SYSTEM'),
('SYSTEM', '6edbe23f-e4cf-4b5d-91d2-3300629ffe33', '{required: true}', '4f4ef7de-2a9e-4710-80d8-275a38f0626f', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 4', 'Question 4', 'text', 'SYSTEM'),
('SYSTEM', 'e82c1f1f-5a62-4348-b989-1a87155faf75', '{required: true}', '604172c7-743e-470d-abc1-1df3f67bbc1b', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 5', 'Question 5', 'text', 'SYSTEM'),
('SYSTEM', 'deaa41f7-5c78-4d39-ad48-77a7422a70d9', '{required: true}', '9c1d546c-cd13-44fc-a264-d6f1b8f454a9', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 6', 'Question 6', 'text', 'SYSTEM'),
('SYSTEM', '0b678c08-9e89-4241-bb50-1a15a203bb0a', '{required: true}', '164df4d1-cf12-4de2-a753-5c588eaee0af', '9013C327-1190-4875-A92A-83ACA9029160', 'Question 7', 'Question 7', 'text', 'SYSTEM'),
('SYSTEM', 'be324259-1cbf-406b-9581-66a7acae41a0', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Cash Deposit', 'Cash Deposit', 'radio button', 'SYSTEM'),
('SYSTEM', '06b57a9c-cc8e-42d7-960e-ba2a83313df0', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Cash Withdrawl', 'Cash Withdrawl', 'radio button', 'SYSTEM'),
('SYSTEM', '998acd4c-dfd0-4a3e-8bbf-1d16380d2c03', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Cheque Deposit', 'Cash Withdrawl', 'radio button', 'SYSTEM'),
('SYSTEM', '09c4d5c5-2ac3-4298-9890-de7c955cc780', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Internal Transfers to KFHB Accounts', 'Internal Transfers to KFHB Accounts', 'radio button', 'SYSTEM'),
('SYSTEM', 'da59e960-6777-4964-aaa7-74c300fbafc6', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Transfers to other banks in Bahrain', 'Transfers to other banks in Bahrain', 'radio button', 'SYSTEM'),
('SYSTEM', '12138892-fcb9-4ea9-ada8-5da59190b8cc', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Incoming International Transfers', 'Incoming International Transfers', 'radio button', 'SYSTEM'),
('SYSTEM', 'c8b0afbf-00b6-4205-b2bf-6a447e2d005d', '{required: true}', '4c38affd-2de3-40bf-8720-470678a565df', '9013C327-1190-4875-A92A-83ACA9029160', 'Outgoing International Transfers', 'Outgoing International Transfers', 'radio button', 'SYSTEM');

insert into [CMP_OPTION] ([created_by], [id], [name], [name_ar], [question_id], [tenant_id], [updated_by])
values ('SYSTEM', '1625449c-be44-4027-8d90-ec984d942486', 'TRUE', 'TRUE', 'd5ffc5e0-db31-4ae7-901d-535d0d0214e3', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '5efae43c-4cea-458e-8a7a-ee1f4e808819', 'FALSE', 'FALSE', 'd5ffc5e0-db31-4ae7-901d-535d0d0214e3', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '805488d5-470b-4fb3-a7a3-919f654c3f15', 'TEXT', 'TEXT', '411d7102-9aca-46c4-a3a9-b27ae2b531ca', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '9833639a-9883-4683-a7e0-7c3c92976a06', 'TEXT', 'TEXT', '34973c58-bf1e-4320-a086-0a67aa20d3ff', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '98676cba-775d-41a5-99ec-091663d8eb11', 'TEXT', 'TEXT', '6edbe23f-e4cf-4b5d-91d2-3300629ffe33', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '578d374c-dc4e-421a-851c-b823913463a0', 'TEXT', 'TEXT', 'e82c1f1f-5a62-4348-b989-1a87155faf75', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '3e226f17-dcfb-4a7c-a03c-27a14bb578ba', 'TEXT', 'TEXT', 'deaa41f7-5c78-4d39-ad48-77a7422a70d9', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '63b00ded-05fd-43d9-81d9-e93de5721382', 'TEXT', 'TEXT', '0b678c08-9e89-4241-bb50-1a15a203bb0a', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '4dcf38e5-a51b-4fd2-aa98-e18aaa348315', 'High', 'High', 'be324259-1cbf-406b-9581-66a7acae41a0', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', 'a83b838a-2594-4aaf-a8f6-8ff980e65401', 'Low', 'Low', 'be324259-1cbf-406b-9581-66a7acae41a0', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '3e541565-49a2-48e9-85ea-7f49c7c08c64', 'High', 'High', '06b57a9c-cc8e-42d7-960e-ba2a83313df0', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '00cb9c25-7549-4dd9-a614-2718f14284d3', 'Low', 'Low', '06b57a9c-cc8e-42d7-960e-ba2a83313df0', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '3f7fd747-f41b-4226-9962-61cb9da2a064', 'High', 'High', '998acd4c-dfd0-4a3e-8bbf-1d16380d2c03', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '57250b9b-c79d-47f5-8cea-115a137c3800', 'Low', 'Low', '998acd4c-dfd0-4a3e-8bbf-1d16380d2c03', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '1680d7ab-683e-4b6d-a626-cc522568a21e', 'High', 'High', '09c4d5c5-2ac3-4298-9890-de7c955cc780', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '436cdb43-a67a-4cca-8c0c-1e2eb16897f7', 'Low', 'Low', '09c4d5c5-2ac3-4298-9890-de7c955cc780', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '12267e4e-111d-4bb7-ae00-b3566961c76d', 'High', 'High', 'da59e960-6777-4964-aaa7-74c300fbafc6', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', 'f7f3a828-b6c3-49ac-ad08-6cddab117c84', 'Low', 'Low', 'da59e960-6777-4964-aaa7-74c300fbafc6', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '2df69117-57ef-4c6c-9e7b-b2cf6802c0d6', 'High', 'High', '12138892-fcb9-4ea9-ada8-5da59190b8cc', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', 'c5c5f21b-d974-4a13-8848-fec96226de3d', 'Low', 'Low', '12138892-fcb9-4ea9-ada8-5da59190b8cc', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', '4549a5b8-9463-41ca-b4b2-48708fd3d69a', 'High', 'High', 'c8b0afbf-00b6-4205-b2bf-6a447e2d005d', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM'),
('SYSTEM', 'd5ca7c35-9327-472c-ad53-4f637f9e7c93', 'Low', 'Low', 'c8b0afbf-00b6-4205-b2bf-6a447e2d005d', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM');




