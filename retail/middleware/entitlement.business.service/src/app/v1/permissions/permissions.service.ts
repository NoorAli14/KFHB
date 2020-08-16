import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { uuid } from '@common/utilities';

@Injectable()
export class PermissionService {
  private permissions: any = [
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
    let index: number = this.permissions.findIndex(obj => obj.id == id);
    this.permissions[index].record_type = input.record_type;
    return this.permissions[index];
  }

  async delete(id: string): Promise<boolean> {
    this.permissions = this.permissions.filter(role => role.id != id);
    return true;
  }
}
