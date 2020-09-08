import {
  Controller,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  ParseUUIDPipe,
  Param,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard, CurrentUser, Header, IHEADER } from '@common/index';

import { Template } from './compliance.entity';
import { ComplianceService } from './compliances.service';
import { ComplianceDto } from './compliance.dto';
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
  async crs(@Header() header: IHEADER): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      header,
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
  async kyc(@Header() header: IHEADER): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      header,
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
  async fatca(@Header() header: IHEADER): Promise<Template> {
    const compliance = await this.complianceService.findOneByName(
      header,
      this.__template.FATCA,
    );
    if (!compliance) throw new NotFoundException(`Template not found.`);
    return compliance;
  }

  @Post(':template_id/submit')
  @ApiBody({
    description: 'Sets the template properties.',
    type: ComplianceDto,
  })
  @ApiOperation({
    summary: 'Submit compliance response',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'Template response has been successfully submitted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  @HttpCode(HttpStatus.OK)
  async submit(
    @Param('template_id', ParseUUIDPipe) template_id: string,
    @CurrentUser() customer: any,
    @Header() header: IHEADER,
    @Body() input: ComplianceDto,
  ): Promise<Template> {
    const params: { [key: string]: any } = {
      template_id: template_id,
      user_id: customer.id,
      results: JSON.stringify(input.results),
      remarks: input.remarks,
    };
    return this.complianceService.submitResponse(header, params);
  }
}
