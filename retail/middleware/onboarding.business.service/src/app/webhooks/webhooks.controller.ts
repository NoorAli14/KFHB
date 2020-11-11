import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AML_STATUSES, BasicAuthGuard, CUSTOMER_LAST_STEPS } from '@common/index';
import { WebhooksService } from './webhooks.service';
import { Appointment } from './webhook.entity';
import { AMLAlertDTO } from './webhook.dto';
import { CustomersService } from '../v1/customers/customers.service';

@ApiTags('Webhooks')
@Controller('callback')
@ApiBearerAuth()
@UseGuards(BasicAuthGuard)
export class WebhooksController {
  constructor(private readonly webhookService: WebhooksService, private readonly customerService: CustomersService) {}

  @Post('/aml/alert')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows a webhook status.',
    summary: 'AML request callback',
  })
  @ApiCreatedResponse({
    type: Appointment,
    description: 'Appointment has been successfully created.',
  })
  @HttpCode(HttpStatus.OK)
  async create(@Body() input: AMLAlertDTO): Promise<any> {
    const result: any = await this.webhookService.create(input);
    const lastStep: string =
      result?.status === AML_STATUSES.CLEAN
        ? CUSTOMER_LAST_STEPS.RBX_ONB_STEP_AML_SCREENING_SUCCESSFUL
        : CUSTOMER_LAST_STEPS.RBX_ONB_STEP_AML_SCREENING_FAILED;
    await this.customerService.updateLastStep(result.user_id, lastStep);
    return { status: result ? 'SUCCESS' : 'FALSE' };
  }
}
