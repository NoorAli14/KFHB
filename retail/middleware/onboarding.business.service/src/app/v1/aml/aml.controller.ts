import { Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AmlService } from './aml.service';
import { AuthGuard, CurrentUser, CUSTOMER_LAST_STEPS, AML_STATUSES } from '@common/index';
import { AML } from './aml.entity';
import { Customer } from '../customers/customer.entity';
import { CustomersService } from '../customers/customers.service';

@ApiTags('AML Module')
@Controller('aml')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AmlController {
    constructor(
        private readonly amlService: AmlService,
        private readonly customerService: CustomersService,
    ) { }

    @Post('/screening')
    @ApiOperation({
        description:
            'A successful request returns the HTTP 200 OK status code and a JSON response body that shows aml status.',
        summary: 'Aml screening status',
    })
    @ApiOkResponse({ type: AML, description: 'Aml request Info' })
    @HttpCode(HttpStatus.OK)
    async screening(@CurrentUser() customer: Customer): Promise<AML> {
        const result = await this.amlService.screening(customer.id);
        const lastStep: string = result?.status === AML_STATUSES.CLEAN 
            ? CUSTOMER_LAST_STEPS.RBX_ONB_STEP_AML_SCREENING_SUCCESSFUL
            : CUSTOMER_LAST_STEPS.RBX_ONB_STEP_AML_SCREENING_FAILED;
        await this.customerService.updateLastStep(customer.id, lastStep);
        return result;
    }
}
