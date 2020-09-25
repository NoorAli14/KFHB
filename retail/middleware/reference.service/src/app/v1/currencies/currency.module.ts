import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { CurrencyRepository } from '@rubix/core/repository';
import { CurrenciesService } from '@rubix/app/v1/currencies/currencies.service';
import { CurrenciesController } from '@rubix/app/v1/currencies/currencies.controller';

@Module({
  imports: [RepositoryModule],
  providers: [CurrencyRepository, CurrenciesService],
  controllers: [CurrenciesController],
})
export class CurrencyModule {}
