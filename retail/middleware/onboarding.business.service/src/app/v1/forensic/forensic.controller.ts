import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Forensic')
@Controller('forensic')
export class ForensicController {

  @Post('/check')
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async check(): Promise<any> {}
  
}
