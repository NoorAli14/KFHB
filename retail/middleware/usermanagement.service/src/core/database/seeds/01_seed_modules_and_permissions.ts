import * as Knex from 'knex';
import {
  TABLE,
  MODULES,
  PERMISSIONS,
  TEMP_ROLE,
  STATUS,
} from '@common/constants';
import { uuidV4 } from '@rubix/common';

const modules = [];
const permissions = [];
const modulePermissions = [];

export async function seed(knex: Knex): Promise<any> {
  return processSeed(knex, false);
}

function formatSeedData() {
  PERMISSIONS.forEach(permission => {
    const formattedPermission = {
      id: uuidV4(),
      record_type: permission.name,
      created_by: TEMP_ROLE.SYSTEM,
    };
    permissions.push(formattedPermission);
  });
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
  // const formattedPermission = {
  //   id: uuidV4(),
  //   record_type: permission.name,
  //   created_by: TEMP_ROLE.SYSTEM,
  // };
  // permissions.push(formattedPermission);
  const formattedPermission = permissions.find(
    permissionObj => permissionObj.record_type === permission.name,
  );
  const formattedModulePermission = {
    module_id: moduleId,
    permission_id: formattedPermission.id,
    created_by: TEMP_ROLE.SYSTEM,
  };
  modulePermissions.push(formattedModulePermission);
}

export async function processSeed(
  knex: Knex,
  generateSql = true,
): Promise<any> {
  formatSeedData();
  // Insert Data into DB
  const insertModules = () => knex(TABLE.MODULE).insert(modules);
  const insertPermissions = () => knex(TABLE.PERMISSION).insert(permissions);
  const insertModulePermissions = () =>
    knex(TABLE.MODULE_PERMISSION).insert(modulePermissions);

  if (generateSql) {
    let sql = '';
    sql += `${insertModules().toString()};\r\n\n`;
    sql += `${insertPermissions().toString()};\r\n\n`;
    sql += `${insertModulePermissions().toString()};\r\n\n`;
    return sql;
  }

  await insertModules();
  await insertPermissions();
  await insertModulePermissions();
}
