import { Injectable } from '@nestjs/common';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { uuid } from '@common/utilities';

@Injectable()
export class ModuleService {

  private readonly permissions: any =  [
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a11",
      "record_type": "create",
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
      "deleted_on": "2020-08-13T10:58:15.893Z"
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a12",
      "record_type": "update",
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
      "deleted_on": "2020-08-13T10:58:15.893Z"
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a13",
      "record_type": "delete",
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
      "deleted_on": "2020-08-13T10:58:15.893Z"
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a14",
      "record_type": "list",
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
      "deleted_on": "2020-08-13T10:58:15.893Z"
    }
  ];

  private modules: any = [
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a11",
      "name": "User Management",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a12",
      "name": "Configuration",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a13",
      "name": "Calender",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a14",
      "name": "Customization",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
    }
  ];

  constructor() {
    this.modules[1].sub_modules.push(this.modules[0]);
    this.modules[2].sub_modules.push(this.modules[1]);
    this.modules[3].sub_modules.push(this.modules[2]);
    this.modules[3].parent = this.modules[0];
  }

  async list(): Promise<Module[]> {
    return this.modules;
  }

  async create(input: ModuleDto): Promise<Module> {
    let parent = null;
    let permissions = [];
    if(input?.parent_id){
      parent = this.modules.find(m => m?.id == input?.parent_id)
    }
    const ids = input.permissions.map(p => p.id)
    if(input?.permissions?.length > 0){
      permissions = this.permissions.filter(p => ids.includes(p.id))
    }
    let p: Module =     {
      "id": uuid(),
      "parent_id": input.parent_id,
      "name": input.name,
      parent: parent,
      sub_modules: [],
      permissions: permissions,
      created_on: new Date(),
      updated_on: new Date(),
    };
    this.modules.push(p);
    return p;
  }

  async findOne(id: string): Promise<Module> {
    return this.modules.find(p => p.id === id);
  }

  async update(id: string, input: ModuleDto): Promise<any> {
    let index: number = this.modules.findIndex(obj => obj.id == id);
    let p = this.modules[index];
    if(!p)
      return null;
    let parent = null;
    let permissions = [];
    if(input.parent_id){
      parent = this.modules.find(m => m.id == input.parent_id)
    }
    const ids = input.permissions.map(p => p.id)
    if(input?.permissions?.length > 0){
      permissions = this.permissions.filter(p => ids.includes(p.id))
    }
    p.parent = parent ? parent : p.parent;
    p.name = input.name;
    p.permissions = permissions;
    p.updated_on = new Date();
    this.modules[index] = p;
    delete p.sub_modules;
    return p;
  }

  async delete(id: string): Promise<boolean> {
    this.modules = this.modules.filter(role => role.id != id);
    return true;
  }
}
