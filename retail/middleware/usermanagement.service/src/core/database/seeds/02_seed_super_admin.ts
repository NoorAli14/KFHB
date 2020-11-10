import * as Knex from "knex";
import {TABLE, TEMP_ROLE, STATUS} from '@common/constants';
import { uuidV4 } from "@rubix/common";
export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  // await 
  // await 

  // const role_id = await create_role(knex);
  // const user = await 

  // return 
  return processSeed(knex, false);
}

export async function processSeed(
  knex: Knex,
  generateSql = true,
): Promise<any> {
  // Formats data according to db
  const userParams = {
    id: uuidV4(),
    tenant_id: process.env.ENV_RBX_TENANT_ID,
    first_name: 'john',
    last_name: 'doe',
    email: 'admin@rubix.com',
    status: STATUS.ACTIVE,
    is_owner: 1,
    password_digest: "$2b$10$F1rbUkfVYVBlvDgsHuttaOb2ekp9HOmfoyVZmWXxw8flbSlu.8HLm",
    date_of_birth: "1970-01-01",
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM
  };
  const roleParams = {
    id: uuidV4(),
    name: TEMP_ROLE.SUPER_ADMIN,
    status: STATUS.ACTIVE,
    tenant_id: process.env.ENV_RBX_TENANT_ID,
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM
  };
  const userRoleParams = {
    user_id: userParams.id,
    role_id: roleParams.id,
  };
  // Insert Data into DB
  const insertUser = () => knex(TABLE.USER).insert(userParams);
  const insertRole = () => knex(TABLE.ROLE).insert(roleParams);
  const insertUserRole = () => knex(TABLE.USER_ROLE).insert(userRoleParams);
  const insertModulePermissionRole = () => knex.raw(`INSERT INTO [${TABLE.MODULE_PERMISSION_ROLE}] ([role_id], [module_permission_id]) (SELECT '${roleParams.id}', id FROM [${TABLE.MODULE_PERMISSION}])`);
  // const insertModulePermissionRole = () => knex(TABLE.MODULE_PERMISSION_ROLE).insert({
  //   module_permission_id: modules_permissions[i].id,
  //   role_id: role[0].id || role[0]
  // });

  if (generateSql) {
    let sql = '';
    sql += `${insertUser().toString()};\r\n\n`;
    sql += `${insertRole().toString()};\r\n\n`;
    sql += `${insertUserRole().toString()};\r\n\n`;
    sql += `${insertModulePermissionRole().toString()};\r\n\n`;
    return sql;
  }

  await insertUser();
  await insertRole();
  await insertUserRole();
  return insertModulePermissionRole();
}

