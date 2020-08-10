import { Injectable } from '@nestjs/common';
import {ModuleRepository} from "@core/repository/module.repository";
import {STATUS} from "@common/constants";

@Injectable()
export class ModuleService {
  constructor(private moduleDB: ModuleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.moduleDB.list(keys,{"status":STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.moduleDB.findOne({ id: id }, keys);
  }

  async update(
    id: string,
    moduleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [module] = await this.moduleDB.update({ id: id }, moduleObj, keys);
    return module;
  }

  async create(newModule: Record<string, any>, keys?: string[]): Promise<any> {
    newModule.status = STATUS.ACTIVE;
    const [module] = await this.moduleDB.create(newModule, keys);
    return module;
  }

  async delete(id: string): Promise<any> {
    return await this.update(id, {"status": STATUS.INACTIVE}, []);
  }
}
