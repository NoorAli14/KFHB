import { Injectable } from '@nestjs/common';
import { Permission, PermissionDto } from './';
import { uuid } from '@common/utilities';

@Injectable()
export class PermissionService {
  private readonly permissions: any = [
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

  async list(): Promise<Permission[]> {
    return this.permissions;
  }

  async create(input: {[key: string]: any}): Promise<any> {
    let p =     {
      "id": uuid(),
      "record_type": input.record_type,
      "created_on": "2020-08-13T10:58:15.893Z",
      "updated_on": "2020-08-13T10:58:15.893Z",
      "deleted_on": "2020-08-13T10:58:15.893Z"
    };
    this.permissions.push(p);
    return p;
  }

  async findOne(id: string): Promise<Permission> {
    return this.permissions.find(p => p.id === id);
  }

  async update(id: string, input: PermissionDto): Promise<any> {
    let p =  this.permissions.find(p => p.id === id);
    p.record_type = input.record_type;
    this.permissions[id] = p;
    return p;
  }

  async delete(id: string): Promise<boolean> {
    delete this.permissions[id];
    return true;
  }
}
