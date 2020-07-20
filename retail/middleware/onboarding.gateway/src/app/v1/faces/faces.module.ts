import { Module } from '@nestjs/common';

import { FacesController } from './faces.controller';

@Module({
  imports: [],
  controllers: [FacesController],
  providers: [FacesController],
})
export class FaceModule {}
