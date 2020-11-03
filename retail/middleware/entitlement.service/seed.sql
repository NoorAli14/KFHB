/* [Rubix | Entitlement Service] - 01_seed_modules_and_permissions.ts */;
insert into [ENT_MODULE] ([created_by], [id], [name], [parent_id], [slug], [status])
values ('SYSTEM', 'bfc61c3e-e3c3-4c8b-8370-f62c156fd834', 'Entitlement', NULL, 'entitlement', 'ACTIVE'),
('SYSTEM', '199abc55-4608-4d61-b476-3aeee89129d7', 'User Management', 'bfc61c3e-e3c3-4c8b-8370-f62c156fd834', 'users', 'ACTIVE'),
('SYSTEM', 'bf0d8425-d156-4bfb-b1ea-f48753188ee7', 'Role Management', 'bfc61c3e-e3c3-4c8b-8370-f62c156fd834', 'roles', 'ACTIVE'),
('SYSTEM', '967d5abb-5946-420b-96ed-8e538ff75178', 'Calender', NULL, 'calender', 'ACTIVE'),
('SYSTEM', '7186416b-d49b-4efd-8691-c6f4e1561dac', 'Working Week', '967d5abb-5946-420b-96ed-8e538ff75178', 'working-days', 'ACTIVE'),
('SYSTEM', '3c69d1ba-1bcc-49c9-8c10-1264e5944fa2', 'Holidays', '967d5abb-5946-420b-96ed-8e538ff75178', 'holidays', 'ACTIVE'),
('SYSTEM', '3eef1f70-165a-405a-b50b-f8d15a1bacf6', 'Leaves', '967d5abb-5946-420b-96ed-8e538ff75178', 'leaves', 'ACTIVE'),
('SYSTEM', '901e62ad-2736-417a-9b8e-ebc538492d30', 'Agent Portal', NULL, 'agent-portal', 'ACTIVE'),
('SYSTEM', '482f7f59-572e-44ea-bddf-4c6510accb16', 'Video', '901e62ad-2736-417a-9b8e-ebc538492d30', 'video', 'ACTIVE'),
('SYSTEM', '14068297-3c37-4aa8-b40a-797d803d2b42', 'Customers', '901e62ad-2736-417a-9b8e-ebc538492d30', 'customers', 'ACTIVE');

insert into [ENT_PERMISSION] ([created_by], [id], [record_type])
values ('SYSTEM', 'd29b0918-ae54-47d0-9451-d44d7711977a', 'view'),
('SYSTEM', 'f96fa5f4-6bc2-4ae9-90fc-2f1df1f36c24', 'view'),
('SYSTEM', '76348ee2-140d-400b-81ed-a03fc29a804d', 'edit'),
('SYSTEM', '4cdea7f7-e209-4d37-bbd1-2912c19d3a7c', 'delete'),
('SYSTEM', 'bdc809d8-5e2b-42af-b2f8-14f4d17f24db', 'create'),
('SYSTEM', '78878360-bcdc-4a72-b37d-56e17773e4d0', 'view'),
('SYSTEM', 'a444bca7-a298-44e2-8543-5a5e1506c09c', 'edit'),
('SYSTEM', 'd33bbc2c-d26e-497f-b31f-5d22f4da156d', 'delete'),
('SYSTEM', 'ea370d06-bf6b-4fa1-88b1-52bf56a2cc5a', 'create'),
('SYSTEM', '061cf297-29c9-4372-92c7-ed87dcd03481', 'view'),
('SYSTEM', '12c1666a-ad56-411c-afe6-27a6b2d0f9f7', 'view'),
('SYSTEM', '120cab0e-d296-4eb7-b00a-b60aae2aa049', 'edit'),
('SYSTEM', 'd84630a3-0041-48e4-b8a8-99b792b5c5b8', 'delete'),
('SYSTEM', '73b93717-05c2-44a3-9850-33350ddf919a', 'create'),
('SYSTEM', 'c9889684-08a9-4a84-9540-6f5f3219a229', 'view'),
('SYSTEM', '277d373f-cb3c-43a6-956a-4b0dd479aead', 'edit'),
('SYSTEM', '79b8c9f1-4383-4514-99c4-cc1e9e946ae1', 'delete'),
('SYSTEM', '95a6e016-0095-4840-85db-fb6391d9916c', 'create'),
('SYSTEM', 'f6738216-0cbc-4635-855b-b91fdaa2c14c', 'view'),
('SYSTEM', 'de3ce0bf-868e-4802-bbe4-9304b6ebd452', 'edit'),
('SYSTEM', '9b3f4fbd-eca4-4c18-bc26-c93defc8516f', 'delete'),
('SYSTEM', '08e5e6e8-d681-4273-8f3a-11c93e144425', 'create'),
('SYSTEM', 'a80c871a-d766-4dd6-b1a2-705ef595599f', 'view'),
('SYSTEM', '12c6bf39-f542-465c-b298-a6c582433e42', 'view'),
('SYSTEM', '34e64772-7508-4b79-a0ca-0ea19249f45b', 'attend'),
('SYSTEM', '305f011c-f23c-4955-90cd-9ccde6924ce9', 'view'),
('SYSTEM', '52b4a249-f56f-412d-a9ea-bca21d0bde79', 'edit');

insert into [ENT_MODULE_PERMISSION] ([created_by], [module_id], [permission_id])
values ('SYSTEM', 'bfc61c3e-e3c3-4c8b-8370-f62c156fd834', 'd29b0918-ae54-47d0-9451-d44d7711977a'),
('SYSTEM', '199abc55-4608-4d61-b476-3aeee89129d7', 'f96fa5f4-6bc2-4ae9-90fc-2f1df1f36c24'),
('SYSTEM', '199abc55-4608-4d61-b476-3aeee89129d7', '76348ee2-140d-400b-81ed-a03fc29a804d'),
('SYSTEM', '199abc55-4608-4d61-b476-3aeee89129d7', '4cdea7f7-e209-4d37-bbd1-2912c19d3a7c'),
('SYSTEM', '199abc55-4608-4d61-b476-3aeee89129d7', 'bdc809d8-5e2b-42af-b2f8-14f4d17f24db'),
('SYSTEM', 'bf0d8425-d156-4bfb-b1ea-f48753188ee7', '78878360-bcdc-4a72-b37d-56e17773e4d0'),
('SYSTEM', 'bf0d8425-d156-4bfb-b1ea-f48753188ee7', 'a444bca7-a298-44e2-8543-5a5e1506c09c'),
('SYSTEM', 'bf0d8425-d156-4bfb-b1ea-f48753188ee7', 'd33bbc2c-d26e-497f-b31f-5d22f4da156d'),
('SYSTEM', 'bf0d8425-d156-4bfb-b1ea-f48753188ee7', 'ea370d06-bf6b-4fa1-88b1-52bf56a2cc5a'),
('SYSTEM', '967d5abb-5946-420b-96ed-8e538ff75178', '061cf297-29c9-4372-92c7-ed87dcd03481'),
('SYSTEM', '7186416b-d49b-4efd-8691-c6f4e1561dac', '12c1666a-ad56-411c-afe6-27a6b2d0f9f7'),
('SYSTEM', '7186416b-d49b-4efd-8691-c6f4e1561dac', '120cab0e-d296-4eb7-b00a-b60aae2aa049'),
('SYSTEM', '7186416b-d49b-4efd-8691-c6f4e1561dac', 'd84630a3-0041-48e4-b8a8-99b792b5c5b8'),
('SYSTEM', '7186416b-d49b-4efd-8691-c6f4e1561dac', '73b93717-05c2-44a3-9850-33350ddf919a'),
('SYSTEM', '3c69d1ba-1bcc-49c9-8c10-1264e5944fa2', 'c9889684-08a9-4a84-9540-6f5f3219a229'),
('SYSTEM', '3c69d1ba-1bcc-49c9-8c10-1264e5944fa2', '277d373f-cb3c-43a6-956a-4b0dd479aead'),
('SYSTEM', '3c69d1ba-1bcc-49c9-8c10-1264e5944fa2', '79b8c9f1-4383-4514-99c4-cc1e9e946ae1'),
('SYSTEM', '3c69d1ba-1bcc-49c9-8c10-1264e5944fa2', '95a6e016-0095-4840-85db-fb6391d9916c'),
('SYSTEM', '3eef1f70-165a-405a-b50b-f8d15a1bacf6', 'f6738216-0cbc-4635-855b-b91fdaa2c14c'),
('SYSTEM', '3eef1f70-165a-405a-b50b-f8d15a1bacf6', 'de3ce0bf-868e-4802-bbe4-9304b6ebd452'),
('SYSTEM', '3eef1f70-165a-405a-b50b-f8d15a1bacf6', '9b3f4fbd-eca4-4c18-bc26-c93defc8516f'),
('SYSTEM', '3eef1f70-165a-405a-b50b-f8d15a1bacf6', '08e5e6e8-d681-4273-8f3a-11c93e144425'),
('SYSTEM', '901e62ad-2736-417a-9b8e-ebc538492d30', 'a80c871a-d766-4dd6-b1a2-705ef595599f'),
('SYSTEM', '482f7f59-572e-44ea-bddf-4c6510accb16', '12c6bf39-f542-465c-b298-a6c582433e42'),
('SYSTEM', '482f7f59-572e-44ea-bddf-4c6510accb16', '34e64772-7508-4b79-a0ca-0ea19249f45b'),
('SYSTEM', '14068297-3c37-4aa8-b40a-797d803d2b42', '305f011c-f23c-4955-90cd-9ccde6924ce9'),
('SYSTEM', '14068297-3c37-4aa8-b40a-797d803d2b42', '52b4a249-f56f-412d-a9ea-bca21d0bde79');




/* [Rubix | Entitlement Service] - 02_seed_super_admin.ts */;
insert into [ENT_USER] ([created_by], [date_of_birth], [email], [first_name], [id], [is_owner], [last_name], [password_digest], [status], [tenant_id], [updated_by])
values ('SYSTEM', '1970-01-01', 'admin@rubix.com', 'john', 'afb077c8-3423-4104-a873-76d55f4a2832', 1, 'doe', '$2b$10$F1rbUkfVYVBlvDgsHuttaOb2ekp9HOmfoyVZmWXxw8flbSlu.8HLm', 'ACTIVE', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM');

insert into [ENT_ROLE] ([created_by], [id], [name], [status], [tenant_id], [updated_by])
values ('SYSTEM', 'c8e5c696-cb06-4f90-b6be-329fdc33a9eb', 'SUPER ADMIN', 'ACTIVE', '9013C327-1190-4875-A92A-83ACA9029160', 'SYSTEM');

insert into [ENT_USER_ROLE] ([role_id], [user_id])
values ('c8e5c696-cb06-4f90-b6be-329fdc33a9eb', 'afb077c8-3423-4104-a873-76d55f4a2832');

INSERT INTO [ENT_MODULE_PERMISSION_ROLE] ([role_id], [module_permission_id]) (SELECT 'c8e5c696-cb06-4f90-b6be-329fdc33a9eb', id FROM [ENT_MODULE_PERMISSION]);




