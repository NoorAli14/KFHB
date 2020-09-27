import { Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AmlService } from './aml.service';
import { AuthGuard, CurrentUser } from '@common/index';
import { Aml } from './aml.entity';
import { Customer } from '../customers/customer.entity';

@ApiTags('Aml Module')
@Controller('aml')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AmlController {
    constructor(private readonly amlService: AmlService) {
    }

    @Post('/screening')
    @ApiOperation({
        description:
            'A successful request returns the HTTP 200 OK status code and a JSON response body that shows aml status.',
        summary: 'Aml screening status',
    })
    @ApiOkResponse({ type: Aml, description: 'Aml request Info' })
    @HttpCode(HttpStatus.OK)
    async screening(@CurrentUser() customer: Customer): Promise<Aml> {
        return this.amlService.screening(customer.id);
    }
}
