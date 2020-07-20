import { Module } from '@nestjs/common';

import { IdentityController } from './identity.controller';

@Module({
  imports: [],
  controllers: [IdentityController],
  providers: [IdentityController],
})
export class IdentityModule {}
