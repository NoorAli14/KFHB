import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { AuthGuard, PaginationDTO, SortByDTO } from '@common/index';
import { CustomerPaginationList } from './customer.entity';
import { CustomerFilterDTO } from './dtos/customer-filter.dto';

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
    async list(@Query('pagination') pagination: PaginationDTO, @Query('filters') filters: CustomerFilterDTO, @Query('sort_by') sort_by: [SortByDTO]): Promise<CustomerPaginationList> {
        return this.customerService.list({ pagination, filters, sort_by });
    }
}
