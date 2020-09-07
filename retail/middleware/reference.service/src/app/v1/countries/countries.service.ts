import {Injectable} from '@nestjs/common';

import {CountryRepository} from "@core/repository";

@Injectable()
export class CountriesService {
  constructor(private countryDB: CountryRepository) {}

  async list(): Promise<any> {
    return this.countryDB.list();
  }

  async findOne(id: string): Promise<any> {
    return this.countryDB.findById(id);
  }

}
