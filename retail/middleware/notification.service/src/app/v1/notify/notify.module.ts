import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { NotifyRepository } from '@rubix/core/repository/';
import { NotifyService } from './notify.service';
import { NotifyResolver } from './notify.resolver';
import { FirebaseModule } from '@rubix/common/connections/firebase/firebase.module';

@Module({
  imports: [RepositoryModule, FirebaseModule],
  providers: [NotifyService, NotifyRepository, NotifyResolver],
})
export class NotifyModule {}
