import { Controller, UseGuards, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard, CurrentUser, CUSTOMER_LAST_STEPS } from '@common/index';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/customer.entity';

@ApiTags('Session Module')
@Controller('sessions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SessionsController {
  constructor(
    private readonly sessionService: SessionsService,
    private readonly customerService: CustomersService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new session',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows session information.',
  })
  @ApiCreatedResponse({
    type: Session,
    description: 'A new Session has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@CurrentUser() currentUser: Customer): Promise<Session> {
    const result = this.sessionService.create();
    if (result) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_REG_INITIATED
      );
    }
    return result;
  }
}
