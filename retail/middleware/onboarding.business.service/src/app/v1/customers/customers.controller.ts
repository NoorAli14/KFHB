import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { AuthGuard, PaginationDTO } from '@common/index';
import { SortByDTO } from '@common/dtos/sort_by.dto';

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
    async list(@Query() pagination: PaginationDTO, @Query() filters: CustomerFilterDTO, @Query() order: SortByDTO): Promise<CustomerPaginationList> {
        let sort_by = [];
        if (order) {
            sort_by = [{
                field: order?.sort_by || 'created_on',
                direction: order?.sort_order || 'desc'
            }]
        }
        return this.customerService.list({ pagination, filters, sort_by });
    }
}
