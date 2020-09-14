import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard, Header, IHEADER } from '@common/index';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@ApiTags('Customer Module')
@Controller('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

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
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Header() header: IHEADER,
  ): Promise<Customer> {
    const customer: Customer = await this.customerService.findOne(header, id);
    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }
    return customer;
  }
}
