import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { Currency } from './currency.modal';
import { CurrencyNotFoundException } from './exceptions';

@ApiTags('References')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currencyService: CurrenciesService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of currencies information.',
    summary: 'List of all currencies.',
  })
  @ApiOkResponse({ type: [Currency], description: 'List of all currencies.' })
  async list(): Promise<Currency[]> {
    return this.currencyService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a currency by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows currency information.',
  })
  @ApiOkResponse({
    type: Currency,
    description: 'Currency has been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Currency Not Found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Currency> {
    const currency: Currency = await this.currencyService.findOne(id);
    if (!currency) {
      throw new CurrencyNotFoundException(id);
    }
    return currency;
  }
}
