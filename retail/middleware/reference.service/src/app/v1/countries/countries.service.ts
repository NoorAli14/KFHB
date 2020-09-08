import {Injectable} from '@nestjs/common';
import { Country } from '@app/v1/countries/country.modal'
import {CountryRepository} from "@core/repository";

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
