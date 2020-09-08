import {Injectable} from '@nestjs/common';
import {CountryRepository} from "@core/repository";
import { Country } from './country.modal'

@Injectable()
export class CountriesService {
  constructor(private readonly countryDB: CountryRepository) {}

  async list(): Promise<Country[]> {
    return this.countryDB.list();
  }

  async findOne(id: string): Promise<Country> {
    return this.countryDB.findById(id);
  }

}
