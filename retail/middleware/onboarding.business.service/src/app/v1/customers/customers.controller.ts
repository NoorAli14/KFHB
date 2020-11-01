import { Controller, UseGuards, Get, Query, ParseUUIDPipe, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { AuthGuard, PaginationDTO, PermissionsGuard, Permissions } from '@common/index';
import { SortByDTO } from '@common/dtos/sort_by.dto';

import { Customer, CustomerPaginationList } from './customer.entity';
import { CustomerFilterDTO } from './dtos/customer-filter.dto';

@ApiTags('Customers Module')
@Controller('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomersService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of customers information.',
    summary: 'List of all customers.',
  })
  @ApiOkResponse({
    type: CustomerPaginationList,
    description: 'List of all customers.',
  })
  @Permissions('view:customers')
  async list(
    @Query() pagination: PaginationDTO,
    @Query() filters: CustomerFilterDTO,
    @Query() order: SortByDTO,
  ): Promise<CustomerPaginationList> {
    let sort_by = [];
    if (order) {
      sort_by = [
        {
          field: order?.sort_by || 'created_on',
          direction: order?.sort_order || 'desc',
        },
      ];
    }
    return this.customerService.list({ pagination, filters, sort_by });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a customer by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows customer information.',
  })
  @ApiOkResponse({
    type: Customer,
    description: 'Customer has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Customer Not Found.',
  })
  @Permissions('attend:video')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    return this.customerService.find360(id);
  }
}
