import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { AuthGuard } from '@common/index';
import { Customer, CustomerPaginationList } from './customer.entity';

@ApiTags('Customers Module')
@Controller('customers')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
export class CustomerController {
    constructor(private readonly customerService: CustomersService) {
    }

    @Get('/')
    @ApiOperation({
        description:
            'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of customers information.',
        summary: 'List of all customers.',
    })
    @ApiOkResponse({ type: CustomerPaginationList, description: 'List of all customers.' })
    // @Permissions('view:users')
    async list(): Promise<CustomerPaginationList> {
        return this.customerService.list();
    }
}
