import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { CountryRepository } from '@rubix/core/repository/';
import { CountriesService } from '@rubix/app/v1/countries/countries.service';
import { CountriesController } from '@rubix/app/v1/countries/countries.controller';

@Module({
  imports: [RepositoryModule],
  providers: [CountryRepository, CountriesService],
  controllers: [CountriesController],
})
export class CountryModule {}
