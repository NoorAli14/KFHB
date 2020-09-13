import {Injectable} from '@nestjs/common';
import { CurrencyRepository } from "@core/repository";
import { Currency } from './currency.modal';

@Injectable()
export class CurrenciesService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async list(): Promise<Currency[]> {
    return this.currencyRepository.list();
  }

  async findOne(id: string): Promise<Currency> {
    return this.currencyRepository.findById(id);
  }

}
