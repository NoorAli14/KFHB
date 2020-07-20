import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Forensic')
@Controller('forensic')
export class ForensicController {
  constructor() {}
  @Post('/check')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async check(): Promise<any> {}
}
