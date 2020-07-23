import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionRepository } from '@core/repository/option.repository';
import { OptionsResolver } from './options.resolver';

@Module({
  imports: [OptionsModule],
  providers: [OptionsService, OptionRepository, OptionsResolver],
})
export class OptionsModule {}
