import * as Knex from "knex";
import { TABLE, MODULES, TEMP_ROLE, STATUS } from '@common/constants';
export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex(TABLE.MODULE).del();
  await knex(TABLE.PERMISSION).del();
  await knex(TABLE.MODULE_PERMISSION).del();
  for (let i = 0; i < MODULES.length; i++) {
    await create_module(knex, MODULES[i], null);
  }
  return knex(TABLE.MODULE).select(['id']);
}

const create_module = async (knex, module, parent?: any): Promise<any> => {
  const params = { name: module.name, slug: module?.slug || null };
  let _module = await knex(TABLE.MODULE)
    .select(['id'])
    .where(params)
    .first();
  if (!_module) {
    params['created_by'] = TEMP_ROLE.SYSTEM;
    params['status'] = STATUS.ACTIVE;
    if (parent) {
      params['parent_id'] = parent;
    }
    [_module] = await knex(TABLE.MODULE).insert(params, ['id']);
  }
  const module_id = _module.id || _module;
  if (module?.sub_modules) {
    for (let i = 0; i < module?.sub_modules.length; i++) {
      await create_module(knex, module?.sub_modules[i], module_id);
    }
  }
  if (module?.permissions) {
    for (let i = 0; i < module?.permissions.length; i++) {
      await create_permission(knex, module_id, module?.permissions[i]);
    }
  }
  return module_id;
};
const create_permission = async (knex, module_id, permission): Promise<any> => {
  const params = { record_type: permission.name };
  let _permission = await knex(TABLE.PERMISSION)
    .select(['id'])
    .where(params)
    .first();
  if (!_permission) {
    params['created_by'] = TEMP_ROLE.SYSTEM;
    [_permission] = await knex(TABLE.PERMISSION).insert(params, ['id']);
  }
  const params2 = {
    module_id: module_id,
    permission_id: _permission.id || _permission,
  };
  const module_permission = await knex(TABLE.MODULE_PERMISSION)
    .select(['id'])
    .where(params2)
    .first();
  if (!module_permission) {
    params2['created_by'] = TEMP_ROLE.SYSTEM;
    await knex(TABLE.MODULE_PERMISSION).insert(params2, ['module_id']);
  }
  return _permission;
};
