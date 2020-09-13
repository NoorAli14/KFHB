import {Injectable} from '@nestjs/common';
import { NationalityRepository } from "@core/repository";
import { Nationality } from './nationality.modal';

@Injectable()
export class NationalitiesService {
  constructor(private readonly nationalityRepository: NationalityRepository) {}

  async list(): Promise<Nationality[]> {
    return this.nationalityRepository.list();
  }

  async findOne(id: string): Promise<Nationality> {
    return this.nationalityRepository.findById(id);
  }

}
