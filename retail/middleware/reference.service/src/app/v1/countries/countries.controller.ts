import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { Country } from './country.modal';
import { CountryNotFoundException } from './exceptions';

@ApiTags('References')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of countries information.',
    summary: 'List of all countries.',
  })
  @ApiOkResponse({ type: [Country], description: 'List of all countries.' })
  async list(): Promise<Country[]> {
    return this.countryService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a country by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows country information.',
  })
  @ApiOkResponse({
    type: Country,
    description: 'Country has been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Country Not Found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Country> {
    const country: Country = await this.countryService.findOne(id);
    if (!country) {
      throw new CountryNotFoundException(id);
    }
    return country;
  }
}
