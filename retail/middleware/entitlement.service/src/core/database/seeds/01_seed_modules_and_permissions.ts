import * as Knex from 'knex';
import { TABLE, MODULES, TEMP_ROLE, STATUS } from '@common/constants';
import { uuidV4 } from '@rubix/common';

let modules = [];
let permissions = [];
let modulePermissions = [];

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  // await knex(TABLE.MODULE).del();
  // await knex(TABLE.PERMISSION).del();
  // await knex(TABLE.MODULE_PERMISSION).del();
  // for (let i = 0; i < MODULES.length; i++) {
  //   await create_module(knex, MODULES[i], null);
  // }
  // return knex(TABLE.MODULE).select(['id']);
  return processSeed(knex, false);
}

function formatSeedData() {
  MODULES.forEach(module => {
    formatModule(module);
  });
}

function formatModule(module: any, parentId?: string) {
  const formattedModule = {
    id: uuidV4(),
    name: module.name,
    slug: module?.slug || null,
    status: STATUS.ACTIVE,
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM,
  };
  if (parentId) {
    formattedModule['parent_id'] = parentId;
  }
  modules.push(formattedModule);
  if (module?.permissions) {
    module.permissions.forEach(permission => {
      formatPermission(permission, formattedModule.id);
    });
  }
  if (module?.sub_modules) {
    module.sub_modules.forEach(subModule => {
      formatModule(subModule, formattedModule.id);
    });
  }
}

function formatPermission(permission, moduleId) {
  const formattedPermission = {
    id: uuidV4(),
    record_type: permission.name,
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM,
  };
  permissions.push(formattedPermission);
  const formattedModulePermission = {
    module_id: moduleId,
    permission_id: formattedPermission.id,
    created_by: TEMP_ROLE.SYSTEM,
    updated_by: TEMP_ROLE.SYSTEM,
  };
  modulePermissions.push(formattedModulePermission);
}

export async function processSeed(
  knex: Knex,
  generateSql = true,
): Promise<any> {
  formatSeedData();
  // Deletes ALL existing entries
  const deleteModulePermissions = () => knex(TABLE.MODULE_PERMISSION).del();
  const deletePermissions = () => knex(TABLE.PERMISSION).del();
  const deleteModules = () => knex(TABLE.MODULE).del();
  // Insert Data into DB
  const insertModules = () => knex(TABLE.MODULE).insert(modules);
  const insertPermissions = () => knex(TABLE.PERMISSION).insert(permissions);
  const insertModulePermissions = () =>
    knex(TABLE.MODULE_PERMISSION).insert(modulePermissions);

  if (generateSql) {
    let sql = '';
    sql += `${deleteModulePermissions().toString()};\r\n\n`;
    sql += `${deletePermissions().toString()};\r\n\n`;
    sql += `${deleteModules().toString()};\r\n\n`;
    sql += `${insertModules().toString()};\r\n\n`;
    sql += `${insertPermissions().toString()};\r\n\n`;
    sql += `${insertModulePermissions().toString()};\r\n\n`;
    return sql;
  }

  await deleteModulePermissions();
  await deletePermissions();
  await deleteModules();
  await insertModules();
  await insertPermissions();
  await insertModulePermissions();
}

// const create_module = async (knex, module, parent?: any): Promise<any> => {
//   const params = { name: module.name, slug: module?.slug || null };
//   let _module = await knex(TABLE.MODULE)
//     .select(['id'])
//     .where(params)
//     .first();
//   if (!_module) {
//     params['created_by'] = TEMP_ROLE.SYSTEM;
//     params['status'] = STATUS.ACTIVE;
//     if (parent) {
//       params['parent_id'] = parent;
//     }
//     [_module] = await knex(TABLE.MODULE).insert(params, ['id']);
//   }
//   const module_id = _module.id || _module;
//   if (module?.sub_modules) {
//     for (let i = 0; i < module?.sub_modules.length; i++) {
//       await create_module(knex, module?.sub_modules[i], module_id);
//     }
//   }
//   if (module?.permissions) {
//     for (let i = 0; i < module?.permissions.length; i++) {
//       await create_permission(knex, module_id, module?.permissions[i]);
//     }
//   }
//   return module_id;
// };
// const create_permission = async (knex, module_id, permission): Promise<any> => {
//   const params = { record_type: permission.name };
//   let _permission = await knex(TABLE.PERMISSION)
//     .select(['id'])
//     .where(params)
//     .first();
//   if (!_permission) {
//     params['created_by'] = TEMP_ROLE.SYSTEM;
//     [_permission] = await knex(TABLE.PERMISSION).insert(params, ['id']);
//   }
//   const params2 = {
//     module_id: module_id,
//     permission_id: _permission.id || _permission,
//   };
//   const module_permission = await knex(TABLE.MODULE_PERMISSION)
//     .select(['id'])
//     .where(params2)
//     .first();
//   if (!module_permission) {
//     params2['created_by'] = TEMP_ROLE.SYSTEM;
//     await knex(TABLE.MODULE_PERMISSION).insert(params2, ['module_id']);
//   }
//   return _permission;
// };
