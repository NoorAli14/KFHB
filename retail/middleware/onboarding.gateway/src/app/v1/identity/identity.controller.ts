import { Body, Controller, Post, Get, HttpService } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { map } from 'rxjs/operators';

@ApiTags('Document')
@Controller('documents')
export class IdentityController {

  @Get('/')
  @ApiOkResponse()
  async list(): Promise<any> {}

  @Post('nationality_card/front')
  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  async civil_id_front(): Promise<any> {}

  @Post('nationality_card/back')
  @ApiCreatedResponse({
    description: 'Customer has been successfully registered.',
  })
  @ApiUnprocessableEntityResponse()
  async civil_id_back(): Promise<any> {}

  @Post('passport')
  @ApiCreatedResponse({
    description: 'Customer has been successfully registered.',
  })
  @ApiUnprocessableEntityResponse()
  async passport(): Promise<any> {}

  @Post('driving_license')
  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  async driving_license(): Promise<any> {}

  @Get('nationality_card/front/ocr/details')
  @ApiOkResponse({})
  @ApiUnprocessableEntityResponse()
  async civil_id_front_ocr(): Promise<any> {}

  @Get('nationality_card/back/ocr/details')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async civil_id_back_ocr(): Promise<any> {}

  @Get('passport/ocr/details')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async passport_ocr(): Promise<any> {}

  @Get('driving_license/ocr/details')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async driving_license_ocr(): Promise<any> {}
}
