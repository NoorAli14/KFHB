import {Injectable} from '@nestjs/common';

import { NationalityRepository } from "@core/repository";

@Injectable()
export class NationalitiesService {
  constructor(private readonly nationalityRepository: NationalityRepository) {}

  async list(): Promise<any> {
    return this.nationalityRepository.list();
  }

  async findOne(id: string): Promise<any> {
    return this.nationalityRepository.findById(id);
  }

}
