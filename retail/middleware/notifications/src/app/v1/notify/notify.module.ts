import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { NotifyRepository } from '@rubix/core/repository/';
import { NotifyService } from './notify.service';
import { NotifyResolver } from './notify.resolver';


@Module({
  imports: [RepositoryModule],
  providers: [
    NotifyService,
    NotifyRepository,
    NotifyResolver,
  ],
})
export class NotifyModule {}
