import {
    Controller,
    Get,
    Param,
    NotFoundException,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOkResponse,
    ApiOperation,
    ApiNotFoundResponse,
  } from '@nestjs/swagger';
  import { NationalitiesService } from './nationalities.service';
  import { Nationality } from './nationality.modal';
  
  @ApiTags('References')
  @Controller('nationalities')
  export class NationalitiesController {
    constructor(private readonly nationalityService: NationalitiesService) {}
  
    @Get('/')
    @ApiOperation({
      description:
        'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of nationalities information.',
      summary: 'List of all nationalities.',
    })
    @ApiOkResponse({ type: [Nationality], description: 'List of all nationalities.' })
    async list(): Promise<Nationality[]> {
      return this.nationalityService.list();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Find a nationality by ID',
      description:
        'A successful request returns the HTTP 200 OK status code and a JSON response body that shows nationality information.',
    })
    @ApiOkResponse({
      type: Nationality,
      description: 'Nationality has been retrieved successfully.',
    })
    @ApiNotFoundResponse({
      type: Error,
      description: 'Nationality Not Found.',
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Nationality> {
      const nationality: Nationality = await this.nationalityService.findOne(id);
      if (!nationality) {
        throw new NotFoundException('Nationality Not Found');
      }
      return nationality;
    }
  }
  