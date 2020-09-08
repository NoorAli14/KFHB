import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { CountryModule } from './countries/country.module';

@Module({
  imports: [ 
    CommonModule,
    CountryModule,
  ],
})
export class V1Module {}
