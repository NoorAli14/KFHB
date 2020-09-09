import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { CountryModule } from './countries/country.module';
import { NationalityModule } from './nationalities/nationality.module';
import { CurrencyModule } from './currencies/currency.module';

@Module({
  imports: [ 
    CommonModule,
    CountryModule,
    NationalityModule,
    CurrencyModule,
  ],
})
export class V1Module {}
