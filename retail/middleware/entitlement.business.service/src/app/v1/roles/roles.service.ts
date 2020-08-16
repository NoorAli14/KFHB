import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleDto } from './role.dto';
import { uuid } from '@common/utilities';

@Injectable()
export class RoleService {

  private permissions: any =  [
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
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a12",
      "name": "Configuration",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a13",
      "name": "Calender",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      "id": "3dfdecc1-a616-4817-a841-61d824d82a14",
      "name": "Customization",
      "status": "ACTIVE",
      parent: null,
      sub_modules: [],
      permissions: this.permissions,
      created_on: new Date(),
      updated_on: new Date(),
    }
  ];

  private roles: Role[] = [
    { 
      id: '3dfdecc1-a616-4817-a841-61d824d82a11', 
      name: 'Manger', 
      status: 'ACTIVE',
      modules: [],
      created_on: new Date(),
      updated_on: new Date(),
    }, 
    { 
      id: '3dfdecc1-a616-4817-a841-61d824d82a12', 
      name: 'Admin', 
      status: 'ACTIVE',
      modules: [],
      created_on: new Date(),
      updated_on: new Date(),
    }
  ];
  constructor() {
    this.modules[1].sub_modules.push(this.modules[0]);
    this.modules[2].sub_modules.push(this.modules[1]);
    this.modules[3].sub_modules.push(this.modules[2]);
    this.modules[3].parent = this.modules[0];
    this.roles[0].modules.push(this.modules[1]);
    this.roles[0].modules.push(this.modules[2]);
    this.roles[1].modules.push(this.modules[3])
    this.roles[1].modules.push(this.modules[4])
  }
  async list(): Promise<Role[]> {
    return this.roles;
  }

  async create(input: RoleDto): Promise<Role> {

    let role: Role = {
      "id": uuid(),
      "name": input.name,
      description: input.description,
      modules: [],
      "created_on": new Date(),
      "updated_on": new Date(),
      "deleted_on": null
    };
    if(input?.modules?.length > 0){
      const ids = input.modules.map(p => p.id)
      role.modules = this.modules.filter(p => ids.includes(p.id))
    }
    this.roles.push(role);
    return role; 
  }

  async findOne(id: string): Promise<Role> {
    return this.roles.find(role => role.id === id);
  }

  async update(id: string, input: RoleDto): Promise<Role> {
    let index: number = this.roles.findIndex(obj => obj.id == id);
    this.roles[index].name = input.name;
    this.roles[index].description = input.description;
    this.roles[index].updated_on = new Date();
    return this.roles[index]
  }
  
  async delete(id: string): Promise<boolean> {
    this.roles = this.roles.filter(role => role.id != id);
    return true; 
  }
}