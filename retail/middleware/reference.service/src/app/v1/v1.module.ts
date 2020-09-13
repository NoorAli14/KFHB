import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { CountryModule } from './countries/country.module';
import { CurrencyModule } from './currencies/currency.module';

@Module({
  imports: [ 
    CommonModule,
    CountryModule,
    CurrencyModule,
  ],
})
export class V1Module {}
