import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { NationalityRepository } from '@rubix/core/repository';
import { NationalitiesService } from '@rubix/app/v1/nationalities/nationalities.service';
import { NationalitiesController } from '@rubix/app/v1/nationalities/nationalities.controller';

@Module({
  imports: [RepositoryModule],
  providers: [NationalityRepository, NationalitiesService],
  controllers: [NationalitiesController],
})
export class NationalityModule {}
