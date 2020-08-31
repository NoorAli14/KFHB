import { Controller, Get, UseGuards, NotFoundException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@common/index';

import { Template } from './compliance.entity';
import { ComplianceService } from './compliances.service';

@ApiTags('Compliance')
@Controller('compliances')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CompliancesController {
  private readonly __template: any = {
    CRS: 'CRS',
    KYC: 'KYC',
    FATCA: 'FATCA',
  };
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('crs')
  @ApiOperation({
    summary: 'Find a template by name',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows template information.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'Template Information has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  async crs(): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      this.__template.CRS,
    );
    if (!compliance) throw new NotFoundException(`Template not found.`);
    return compliance;
  }

  @Get('kyc')
  @ApiOperation({
    summary: 'Find a template by name',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows template information.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'Template Information has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  async kyc(): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      this.__template.KYC,
    );
    if (!compliance) throw new NotFoundException(`Template not found.`);
    return compliance;
  }

  @Get('fatca')
  @ApiOperation({
    summary: 'Find a template by name',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows template information.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'Template Information has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  async findOne(): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      this.__template.FATCA,
    );
    if (!compliance) throw new NotFoundException(`Template not found.`);
    return compliance;
  }
}
