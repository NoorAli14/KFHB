import { Module } from '@nestjs/common';

import { CustomerModule } from './customers/customer.module';
import { DocumentModule } from './documents/document.module';

@Module({
  imports: [CustomerModule, DocumentModule],
})
export class OnboardingModule { }
