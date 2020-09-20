import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@common/index';

@ApiTags('Customer')
@Controller('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {}
