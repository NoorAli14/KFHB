import { Injectable } from '@nestjs/common';

import { ModuleRepository } from '@core/repository/module.repository';
import { STATUS } from '@common/constants';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Module } from './module.model';

@Injectable()
export class ModuleService {
  constructor(private moduleDB: ModuleRepository) {}

  async list(output: string[]): Promise<any> {
    return this.moduleDB.listWithoutPagination(output);
  }

  async findById(id: string, output?: string[]): Promise<Module> {
    return await this.moduleDB.findOne({ id: id }, output);
  }

  async findByProperty(
    checks: KeyValInput[],
    output?: string[],
  ): Promise<Module[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.moduleDB.findBy(conditions, output);
  }

  async update(
    id: string,
    moduleObj: Record<string, any>,
    output?: string[],
  ): Promise<Module> {
    const [result] = await this.moduleDB.update({ id: id }, moduleObj, output);
    return result;
  }

  async create(
    newModule: Record<string, any>,
    output?: string[],
  ): Promise<Module> {
    if (!newModule.status) {
      newModule.status = STATUS.ACTIVE;
    }
    const [result] = await this.moduleDB.create(newModule, output);
    return result;
  }

  async delete(id: string): Promise<any> {
    return await this.moduleDB.delete({ id: id });
  }
}
