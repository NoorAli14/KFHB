import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { CountryModule } from './countries/country.module';
import { NationalityModule } from './nationalities/nationality.module';

@Module({
  imports: [ 
    CommonModule,
    CountryModule,
    NationalityModule,
  ],
})
export class V1Module {}
