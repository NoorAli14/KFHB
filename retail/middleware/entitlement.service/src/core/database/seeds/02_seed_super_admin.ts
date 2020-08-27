import * as Knex from "knex";
import {TABLE, TEMP_ROLE, STATUS} from '@common/constants';
export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex(TABLE.ROLE).del();
  await knex(TABLE.USER).del();

  const role_id = await create_role(knex);

  const user = await knex(TABLE.USER).insert({email: 'admin@rubix.com',
    status: STATUS.ACTIVE,
    is_owner: true,
    password_digest: "$2b$10$F1rbUkfVYVBlvDgsHuttaOb2ekp9HOmfoyVZmWXxw8flbSlu.8HLm",
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM}, ['id']);

  return await knex(TABLE.USER_ROLE).insert({user_id: user[0].id || user[0],
    role_id: role_id,
    status: STATUS.ACTIVE,
    created_by: TEMP_ROLE.SYSTEM});
}

const create_role = async (knex): Promise<any> => {
  const modules_permissions = await knex(TABLE.MODULE_PERMISSION).select(['id']);
  const role = await knex(TABLE.ROLE).insert({name: TEMP_ROLE.SUPER_ADMIN, status: STATUS.ACTIVE, created_by: TEMP_ROLE.SYSTEM, updated_by: TEMP_ROLE.SYSTEM}, ['id'])
  for (let i = 0; i < modules_permissions.length; i++) {
    await knex(TABLE.MODULE_PERMISSION_ROLE).insert({module_permission_id: modules_permissions[i].id, role_id: role[0].id || role[0]}, ['role_id']);
  }
  return role[0].id || role[0]
};
