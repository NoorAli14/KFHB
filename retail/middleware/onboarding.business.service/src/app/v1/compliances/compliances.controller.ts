import {
  Controller,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Body,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard, CurrentUser, CUSTOMER_LAST_STEPS, PermissionsGuard } from '@common/index';

import { Template } from './compliance.entity';
import { ComplianceService } from './compliances.service';
import { ComplianceDto } from './compliance.dto';
import { ITemplateResponse } from './compliance.interface';
import { Customer } from '../customers/customer.entity';
import { CustomersService } from '../customers/customers.service';
@ApiTags('Compliance Module')
@Controller('compliance')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class CompliancesController {
  private readonly logger = new Logger(CompliancesController.name);
  private readonly __template: any = {
    CRS: 'CRS',
    KYC: 'KYC',
    FATCA: 'FATCA',
  };
  constructor(
    private readonly complianceService: ComplianceService,
    private readonly customerService: CustomersService,
  ) { }

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
    return this.complianceService.findOneByName(this.__template.CRS);
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
    return this.complianceService.findOneByName(this.__template.KYC);

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
  async fatca(): Promise<Template> {
    return this.complianceService.findOneByName(this.__template.FATCA);
  }

  @Post('fatca')
  @ApiBody({
    description: 'Sets the template properties.',
    type: ComplianceDto,
  })
  @ApiOperation({
    summary: 'Submit FATCA response',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'FATCA response has been successfully submitted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  @HttpCode(HttpStatus.OK)
  async submitFatca(@CurrentUser() currentUser: Customer, @Body() input: ComplianceDto): Promise<Template> {
    return this.submitResponse(
      this.__template.FATCA,
      currentUser.id,
      CUSTOMER_LAST_STEPS.RBX_ONB_STEP_FATCA_SUBMITTED,
      input,
    );
  }

  @Post('crs')
  @ApiBody({
    description: 'Sets the template properties.',
    type: ComplianceDto,
  })
  @ApiOperation({
    summary: 'Submit CRS response',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'CRS response has been successfully submitted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  @HttpCode(HttpStatus.OK)
  async submitCRS(@CurrentUser() currentUser: Customer, @Body() input: ComplianceDto): Promise<Template> {
    return this.submitResponse(
      this.__template.CRS,
      currentUser.id,
      CUSTOMER_LAST_STEPS.RBX_ONB_STEP_CRS_SUBMITTED,
      input,
    );
  }

  @Post('kyc')
  @ApiBody({
    description: 'Sets the template properties.',
    type: ComplianceDto,
  })
  @ApiOperation({
    summary: 'Submit KYC response',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: Template,
    description: 'KYC response has been successfully submitted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Template Not Found.',
  })
  @HttpCode(HttpStatus.OK)
  async submitKYC(@CurrentUser() currentUser: Customer, @Body() input: ComplianceDto): Promise<Template> {
    return this.submitResponse(
      this.__template.KYC,
      currentUser.id,
      CUSTOMER_LAST_STEPS.RBX_ONB_STEP_KYC_SUBMITTED,
      input,
    );
  }
  async submitResponse(name: string, user_id: string, last_step: string, input: ComplianceDto): Promise<Template> {
    const compliance: Template = await this.complianceService.findOneByName(name);
    if (!compliance) throw new NotFoundException(`Template not found.`);
    const params: ITemplateResponse = {
      template_id: compliance.id,
      user_id,
      results: input.results,
      remarks: input.remarks,
    };
    const result = await this.complianceService.submitResponse(params);
    if (result) {
      await this.customerService.updateLastStep(user_id, last_step);
    }
    return result;
  }
}
